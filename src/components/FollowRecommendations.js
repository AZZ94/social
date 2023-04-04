import axios from "axios";
import { useEffect, useState } from "react";
import './FollowRecommendations.css';


const FollowRecommendations = (props) => {
    const [recommendations, getRecommendations] = useState([]);
    // tablica

    const followRecs = () => {
        axios
            .post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                getRecommendations(res.data);
                // pobrane rekomendacje do stanu
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // wywolanie funkcji po zaladowaniu elementu i  za kazdym razem kiedy lsita postow sie zmieni
    useEffect(() => {
        followRecs()
    }, [props.posts])

    console.log(recommendations);

    const followUser = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/follow", {
            leader_id: id,
            // obiekt konfiguracyjny?
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="recommendationList">
            {recommendations.map(recommendation => {
                return (
                    <div className="followRecommendation"
                        key={recommendation.id}>
                        <h4>{recommendation.username}</h4>
                        <img src={recommendation.avatar_url} alt={"img"} />
                        <button className="btn" onClick={() => followUser(recommendation.id)}>follow</button>
                    </div>
                )
                // console.log(recommendation);
            })}
            {/* <button className="btn"></button> */}
        </div>
    );
};

export default FollowRecommendations;