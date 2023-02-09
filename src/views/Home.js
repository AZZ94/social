import { useEffect, useState } from "react"
import Post from "../components/Post";
import axios from "axios";
import './Home.css';

const Home = () => {

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

    // useffect - parametry to funkcja i tablica/ funkcja wywola sie przy zamontowaniu tablicy
    useEffect(() => {
        getLatestPosts()
    }, [])

    return (
        <div className="home">
            <div className="postList">
                {posts.map(post=>{
                    return <Post post={post} key={post.id} />
                })} 
                <button className="btn" onClick={getNextPosts}>Show more</button>
            </div>
        </div>
    );
}

export default Home