package run.blog.app.content.comment;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;
import java.util.Set;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.mock.web.reactive.function.server.MockServerRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import run.blog.app.content.TestPost;
import run.blog.app.core.extension.Counter;
import run.blog.app.core.extension.User;
import run.blog.app.core.extension.content.Comment;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.service.RoleService;
import run.blog.app.core.extension.service.UserService;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.Ref;
import run.blog.app.infra.SystemConfigurableEnvironmentFetcher;
import run.blog.app.infra.SystemSetting;
import run.blog.app.infra.utils.JsonUtils;
import run.blog.app.metrics.CounterService;
import run.blog.app.metrics.MeterUtils;
import run.blog.app.plugin.ExtensionComponentsFinder;
import run.blog.app.security.authorization.AuthorityUtils;

/**
 * Tests for {@link CommentServiceImpl}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(SpringExtension.class)
class CommentServiceImplTest {

    @Mock
    private SystemConfigurableEnvironmentFetcher environmentFetcher;

    @Mock
    private ReactiveExtensionClient client;

    @Mock
    private UserService userService;

    @Mock
    private RoleService roleService;

    @Mock
    private ExtensionComponentsFinder extensionComponentsFinder;

    @InjectMocks
    private CommentServiceImpl commentService;

    @Mock
    private CounterService counterService;

    @BeforeEach
    void setUp() {
        SystemSetting.Comment commentSetting = getCommentSetting();
        lenient().when(environmentFetcher.fetchComment()).thenReturn(Mono.just(commentSetting));

        ListResult<Comment> comments = new ListResult<>(1, 10, 3, comments());
        when(client.listBy(eq(Comment.class), any(ListOptions.class), any(PageRequest.class)))
            .thenReturn(Mono.just(comments));

        when(userService.getUserOrGhost(eq("A-owner")))
            .thenReturn(Mono.just(createUser("A-owner")));
        when(userService.getUserOrGhost(eq("B-owner")))
            .thenReturn(Mono.just(createUser("B-owner")));
        when(client.fetch(eq(User.class), eq("C-owner")))
            .thenReturn(Mono.empty());

        when(roleService.contains(Set.of("USER"),
            Set.of(AuthorityUtils.COMMENT_MANAGEMENT_ROLE_NAME)))
            .thenReturn(Mono.just(false));

        PostCommentSubject postCommentSubject = Mockito.mock(PostCommentSubject.class);
        when(extensionComponentsFinder.getExtensions(eq(CommentSubject.class)))
            .thenReturn(List.of(postCommentSubject));

        when(postCommentSubject.supports(any())).thenReturn(true);
        when(postCommentSubject.get(eq("fake-post"))).thenReturn(Mono.just(post()));
    }

    private static User createUser(String name) {
        User user = new User();
        user.setMetadata(new Metadata());
        user.getMetadata().setName(name);
        user.setSpec(new User.UserSpec());
        user.getSpec().setAvatar(name + "-avatar");
        user.getSpec().setDisplayName(name + "-displayName");
        user.getSpec().setEmail(name + "-email");
        return user;
    }

    @Test
    void listComment() {
        when(userService.getUserOrGhost(any()))
            .thenReturn(Mono.just(ghostUser()));
        when(userService.getUserOrGhost("A-owner"))
            .thenReturn(Mono.just(createUser("A-owner")));
        when(userService.getUserOrGhost("B-owner"))
            .thenReturn(Mono.just(createUser("B-owner")));

        ServerWebExchange exchange = mock(ServerWebExchange.class);
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        MockServerRequest request = MockServerRequest.builder()
            .queryParams(queryParams)
            .exchange(exchange)
            .build();
        ServerHttpRequest httpRequest = mock(ServerHttpRequest.class);
        when(exchange.getRequest()).thenReturn(httpRequest);
        when(httpRequest.getQueryParams()).thenReturn(queryParams);
        final var listResultMono = commentService.listComment(new CommentQuery(request));
        Counter counterA = new Counter();
        counterA.setUpvote(3);
        String commentACounter = MeterUtils.nameOf(Comment.class, "A");
        when(counterService.getByName(eq(commentACounter))).thenReturn(Mono.just(counterA));

        Counter counterB = new Counter();
        counterB.setUpvote(9);
        String commentBCounter = MeterUtils.nameOf(Comment.class, "B");
        when(counterService.getByName(eq(commentBCounter))).thenReturn(Mono.just(counterB));

        Counter counterC = new Counter();
        counterC.setUpvote(0);
        String commentCCounter = MeterUtils.nameOf(Comment.class, "C");
        when(counterService.getByName(eq(commentCCounter))).thenReturn(Mono.just(counterC));

        StepVerifier.create(listResultMono)
            .consumeNextWith(result -> {
                try {
                    JSONAssert.assertEquals(expectListResultJson(),
                        JsonUtils.objectToJson(result),
                        true);
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            })
            .verifyComplete();
    }

    @Test
    @WithMockUser(username = "B-owner")
    void create() throws JSONException {
        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setRaw("fake-raw");
        commentRequest.setContent("fake-content");
        commentRequest.setAllowNotification(true);
        commentRequest.setSubjectRef(Ref.of(post()));

        ArgumentCaptor<Comment> captor = ArgumentCaptor.forClass(Comment.class);

        when(client.fetch(eq(User.class), eq("B-owner")))
            .thenReturn(Mono.just(createUser("B-owner")));
        Comment commentToCreate = commentRequest.toComment();
        commentToCreate.getMetadata().setName("fake");
        Mono<Comment> commentMono = commentService.create(commentToCreate);
        when(client.create(any())).thenReturn(Mono.empty());
        StepVerifier.create(commentMono)
            .verifyComplete();

        verify(client, times(1)).create(captor.capture());
        Comment comment = captor.getValue();
        comment.getSpec().setCreationTime(null);
        JSONAssert.assertEquals("""
                {
                    "spec": {
                        "raw": "fake-raw",
                        "content": "fake-content",
                        "owner": {
                            "kind": "User",
                            "name": "B-owner",
                            "displayName": "B-owner-displayName"
                        },
                        "priority": 0,
                        "top": false,
                        "allowNotification": true,
                        "approved": false,
                        "hidden": false,
                        "subjectRef": {
                            "group": "content.blog.run",
                            "version": "v1alpha1",
                            "kind": "Post",
                            "name": "fake-post"
                        }
                    },
                    "apiVersion": "content.blog.run/v1alpha1",
                    "kind": "Comment",
                    "metadata": {
                        "name": "fake"
                    }
                }
                """,
            JsonUtils.objectToJson(comment),
            true);
    }

    private List<Comment> comments() {
        Comment a = comment("A");
        a.getSpec().getOwner().setKind(Comment.CommentOwner.KIND_EMAIL);
        a.getSpec().getOwner()
            .setAnnotations(Map.of(Comment.CommentOwner.AVATAR_ANNO, "avatar",
                Comment.CommentOwner.WEBSITE_ANNO, "website"));
        return List.of(a, comment("B"), comment("C"));
    }

    private Comment comment(String name) {
        Comment comment = new Comment();
        comment.setMetadata(new Metadata());
        comment.getMetadata().setName(name);

        comment.setSpec(new Comment.CommentSpec());
        Comment.CommentOwner commentOwner = new Comment.CommentOwner();
        commentOwner.setKind(User.KIND);
        commentOwner.setDisplayName("displayName");
        commentOwner.setName(name + "-owner");
        comment.getSpec().setOwner(commentOwner);

        comment.getSpec().setSubjectRef(Ref.of(post()));

        comment.setStatus(new Comment.CommentStatus());
        return comment;
    }

    private Post post() {
        Post post = TestPost.postV1();
        post.getMetadata().setName("fake-post");
        return post;
    }

    private static SystemSetting.Comment getCommentSetting() {
        SystemSetting.Comment commentSetting = new SystemSetting.Comment();
        commentSetting.setEnable(true);
        commentSetting.setSystemUserOnly(true);
        commentSetting.setRequireReviewForNew(true);
        return commentSetting;
    }

    User ghostUser() {
        User user = new User();
        user.setMetadata(new Metadata());
        user.getMetadata().setName("ghost");
        user.setSpec(new User.UserSpec());
        user.getSpec().setDisplayName("Ghost");
        user.getSpec().setEmail("");
        return user;
    }

    private String expectListResultJson() {
        return """
            {
                "page": 1,
                "size": 10,
                "total": 3,
                "totalPages": 1,
                "items": [
                    {
                        "comment": {
                            "spec": {
                                "owner": {
                                    "kind": "Email",
                                    "name": "A-owner",
                                    "displayName": "displayName",
                                    "annotations": {
                                        "website": "website",
                                        "avatar": "avatar"
                                    }
                                },
                                "subjectRef": {
                                    "group": "content.blog.run",
                                    "version": "v1alpha1",
                                    "kind": "Post",
                                    "name": "fake-post"
                                }
                            },
                            "status": {},
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Comment",
                            "metadata": {
                                "name": "A"
                            }
                        },
                        "owner": {
                            "kind": "Email",
                            "name": "A-owner",
                            "displayName": "displayName",
                            "avatar": "avatar",
                            "email": "A-owner"
                        },
                        "subject": {
                            "spec": {
                                "title": "post-A",
                                "headSnapshot": "base-snapshot",
                                "baseSnapshot": "snapshot-A"
                            },
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Post",
                            "metadata": {
                                "name": "fake-post",
                                "version": 1
                            }
                        },
                        "stats": {
                            "upvote": 3
                        }
                    },
                    {
                        "comment": {
                            "spec": {
                                "owner": {
                                    "kind": "User",
                                    "name": "B-owner",
                                    "displayName": "displayName"
                                },
                                "subjectRef": {
                                    "group": "content.blog.run",
                                    "version": "v1alpha1",
                                    "kind": "Post",
                                    "name": "fake-post"
                                }
                            },
                            "status": {},
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Comment",
                            "metadata": {
                                "name": "B"
                            }
                        },
                        "owner": {
                            "kind": "User",
                            "name": "B-owner",
                            "displayName": "B-owner-displayName",
                            "avatar": "B-owner-avatar",
                            "email": "B-owner-email"
                        },
                        "subject": {
                            "spec": {
                                "title": "post-A",
                                "headSnapshot": "base-snapshot",
                                "baseSnapshot": "snapshot-A"
                            },
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Post",
                            "metadata": {
                                "name": "fake-post",
                                "version": 1
                            }
                        },
                        "stats": {
                           "upvote": 9
                        }
                    },
                    {
                        "comment": {
                            "spec": {
                                "owner": {
                                    "kind": "User",
                                    "name": "C-owner",
                                    "displayName": "displayName"
                                },
                                "subjectRef": {
                                    "group": "content.blog.run",
                                    "version": "v1alpha1",
                                    "kind": "Post",
                                    "name": "fake-post"
                                }
                            },
                            "status": {},
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Comment",
                            "metadata": {
                                "name": "C"
                            }
                        },
                        "owner": {
                            "kind": "User",
                            "name": "ghost",
                            "displayName": "Ghost",
                            "email": ""
                        },
                        "subject": {
                            "spec": {
                                "title": "post-A",
                                "headSnapshot": "base-snapshot",
                                "baseSnapshot": "snapshot-A"
                            },
                            "apiVersion": "content.blog.run/v1alpha1",
                            "kind": "Post",
                            "metadata": {
                                "name": "fake-post",
                                "version": 1
                            }
                        },
                        "stats": {
                            "upvote": 0
                        }
                    }
                ],
                "first": true,
                "last": true,
                "hasNext": false,
                "hasPrevious": false
            }
            """;
    }
}