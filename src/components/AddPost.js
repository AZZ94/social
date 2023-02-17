import './AddPost.css';
import axios from 'axios';
import { useState } from 'react';


const AddPost = (props) => {

    // zbieranie danych - wprowadzamy stan
    const [postContent, setPostContent] = useState("");
    // domyslnie pusty ciag - pusty post

    // pobieramy wartosc formularza  kiedy wpisujemy cos - onchange


    // obsluga dodawania:

    const addPost = (e) => {
        // po submit wiec prevent def
        e.preventDefault();


        //  if(!postContent) - jezeli jest pusty
        if(!postContent) {
            return;
        } 

        axios.post('https://akademia108.pl/api/social-app/post/add', {
            //  w ciele zapytania przekazujemy obiekt z polem content
            content: postContent,
        })
        .then((res) => {
            console.log(res.data);
            // czyszczenie textarea po wyslaniu
            props.getPrevPosts();
            setPostContent('');
        })

        // ODSWIEZANIE PO WYSLANIU - home.js
    };

    return (
        <form className="addPost" onSubmit={addPost}>
            <textarea
                placeholder="What's happening?"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
            ></textarea>
            <button className="btn">send</button>
        </form>
    );
};

export default AddPost