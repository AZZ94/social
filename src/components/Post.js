import { useState } from "react";
import './Post.css';
import axios from "axios";
// import like from './like.svg';
// import dislike from './dislike.svg';

const Post = (props) => {

    // likes - liczba moze sie zmieniac - stan

    const [likesCount, setLikesCount] = useState(props.post.likes.length)

    // stan do posta - pop up przy usuwaniu posta - potrzebujemy stan
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    // like - tablica, wyswietlanie zalezne od tego, czy dany zalogowany uzytkownik juz polubil post
    const [doesUserLike, setDidUserLike] = useState(props.post.likes.filter(like=>like.username === props.user?.username).length !==0);

    // like.username takie samo jak props.user.username
    // .length !==0 - jezeli tablica nie jest = 0 to juz zalajkowal


    const deletePost = (id) => {
        axios.post('https://akademia108.pl/api/social-app/post/delete', {
            post_id: id
        }).then((res) => {
            // console.log(res.data);
            // odswiezanie po usunieciu:
            console.log(props.setPosts);
            props.setPosts((posts) => {
                return posts.filter((post) => post.id !== res.data.post_id)
            })
            setDeleteModalVisible(false);
            //
        });
    };

    const likePost = (id, isLiked) => {
        axios.post('https://akademia108.pl/api/social-app/post/' + (isLiked ?'dislike' : 'like'), {
            post_id: id
        }).then(()=>{
            setLikesCount(likesCount + (isLiked? -1 : 1));
            setDidUserLike(!isLiked)
            // ?
        })
    };

    const unfollow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/disfollow", {
            leader_id: id,
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>

            <div className="postData">
                <div className="postMeta">
                    <div className="author">{props.post.user.username}</div>
                    <div className="date">{props.post.created_at.substring(0, 10)}</div>
                </div>


                <div className="postContent">
                    {props.post.content}
                </div>

                <div className="likes">

                    {/* zeby przycisk pojawial sie tylko przy postach zalogowanego uzytkownika - warunkowe renderowanie */}
                    {/* props.user?.username  - ten ? to operator - przy null??*/}
                    {/* istnieje czy nie istnieje - jezeli nie istnieje nie ma sensu przeprowadzac dalszych operacji */}
                    {props.user?.username === props.post.user.username && <button className="btn" onClick={() => setDeleteModalVisible(true)}>Delete</button>}
                    {/* on click - pop up widoczny */}

                    {props.user && props.user.username !== props.post.user.username && <button className="btn" onClick={() => unfollow(props.post.user.id)}>Unfollow</button>}


                    {doesUserLike ? (
                        <button className="btn dislike" onClick={() => likePost(props.post.id, doesUserLike)}>&#10084;</button>
                        ) : (
                    <button className="btn" onClick={() => likePost(props.post.id, doesUserLike)}>&#10084;</button>)}
                    

                    {likesCount}
                </div>
            </div>


            {deleteModalVisible && (
                <div className="deleteConfirmation">
                    <h1>Are you sure you want to delete this post?</h1>
                    <button className="btn yes" onClick={() => deletePost(props.post.id)}>yes</button>
                    <button className="btn no" onClick={() => setDeleteModalVisible(false)}>no</button>
                </div>)}
        </div>
    );
}

export default Post;