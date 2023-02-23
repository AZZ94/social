// - Stwórz nowy komponent FollowRecommendations.js .

import axios from "axios";
import { useState } from "react";

// - Stwórz stan recommendations, który będzie uzupełniała funkcja getRecommendations.

// - W return stwórz całą strukturę listy osób do followowania z przyciskiem follow.

// - Dla przycisku follow tworzymy funkcje follow(), która będzie wysyłała do API id osoby zaobserwowanej, a następnie aktualizowała posty na stronie.

// "https://akademia108.pl/api/social-app/follows/follow"


// - Przycisk unfollow robimy w Post.js .


// "https://akademia108.pl/api/social-app/follows/disfollow"


const FollowRecommendations = (props) => {


    const [recommendations, getRecommendations] = useState();

    const followRec = () => {
        axios
        .post('https://akademia108.pl/api/social-app/follows/follow')
        .then((res) => {
            getRecommendations(res.data);
            // console.log(res.data);
        });
    };

    return (
        <div className="recommendList">
            <button className="btn"></button>
        </div>
    );
};

export default FollowRecommendations;