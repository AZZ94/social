import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import './Home.css';
import AddPost from "../components/AddPost";

const Home = (props) => {

    // stan - destrukturyzacja tablicy
    const [posts, setPosts] = useState([])
    // wartosc startowa to pusta tablica, funkcja setPosts zmienia stan

    // POBIERANIE POSTOW
    const getLatestPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/latest")
            .then((res) => {
                // console.log(res)
                setPosts(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getNextPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/older-then", {
            date: posts[posts.length - 1].created_at
        })
            .then((res) => {
                setPosts(posts.concat(res.data));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // odswiezanie po dodaniu posta - wyswietlanie nowszych
    const getPrevPosts = () => {
        // przekazujemy przez propsy do add posts
        axios.post("https://akademia108.pl/api/social-app/post/newer-then", {
            date: posts[0].created_at
        })
            .then((res) => {
                setPosts(res.data.concat(posts));
                // res data nie posts
                // polacz z tablica ktora juz jest, dodaj do stanu
            })
            .catch((error) => {
                console.error(error);
            });
    };

    console.log('przeladowanie');
    // useffect - parametry to funkcja i tablica/ funkcja wywola sie przy zamontowaniu tablicy
    useEffect(() => {
        getLatestPosts()
    }, [props.user])
    // o co tutaj chodzi, null przy wylogowaniu?

    console.log(posts);

    return (
        <div className="home">

            <div className="postList">
                {props.user && <AddPost getPrevPosts={getPrevPosts} />}
                {posts.map(post => {
                    return <Post post={post} key={post.id} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts} />
                    // przekazujemy informacje o tym kto jest obecnie zalogowany - do usuwania postow - odpowiedni przycisk
                    // setposts - przekazujemy info do odwiezania strony po usunieciu
                })}
                <button className="btn" onClick={getNextPosts}>Show more</button>
            </div>
        </div>
    );
}

export default Home