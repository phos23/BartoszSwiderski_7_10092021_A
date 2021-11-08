import '../styles/UserProfile.css';
import { useEffect, useState } from 'react';
import { getUserDetails, api } from '../main'
import Post from './Post';

function UserProfile() {
    const [userDetails, setUser] = useState('');
    useEffect(() => {
        getUserDetails(api.users + '/' + document.URL.split('/')[4]).then((res) => {
            setUser(res)
        })
        console.log(userDetails)
    }, '')
    console.log(userDetails)

    return (
        <div class="user-profile-wrapper">
            <div class="user-details">
                <div class="user-details-main">
                    <div class="user-details-main__picture">
                        <img src={require('../media/default-picture.png').default} alt={userDetails.firstName + ' ' + userDetails.secondName + "'s profile picture"}/>
                    </div>
                    <h2 class="user-details-main__name">{userDetails.firstName + ' ' + userDetails.secondName}</h2>
                </div>
                <div class="user-info">

                    Email: {userDetails.email} <br />
                    Gender: {userDetails.gender}  <br />
                    Birthday: {userDetails.dob} <br />
                </div>
            </div>
            <div class="user-posts">
                <h3 className="posts-heading">{userDetails.firstName}'s posts:</h3>
                {(() => {
                    if (userDetails.Posts) {
                        return (userDetails.Posts.map((post) => (
                            <Post key={'post-' + post.id} post={post} user={post.UserId} displayLikes={false} />
                        ))
                        )
                    } else {
                        <div>No posts</div>
                    }
                })()}


            </div>
        </div>
    )
}

export default UserProfile