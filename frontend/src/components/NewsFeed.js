import { api, getPosts, ShowPost } from '../main';
import { useEffect, useState } from 'react';
import NewPost from './NewPost';
import '../styles/NewsFeed.css';

// async function getUsers(query) {
//     // let Posts = []
//     return await getContent(query).then(items => {
//         console.log(items);
//         return [...items]
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// function ShowPost({ post }) {
//     return (
//         <div>
//             {Array.isArray(post) ? (

//                 post.map((singlePost) => {
//                     return <Post key={'post-' + singlePost.id} post={singlePost} user={singlePost.UserId} />
//                 })
//             ) : <Post key={'post-' + post.id} post={post} user={post.UserId} />
//             }
//         </div>
//     )
// }

function NewsFeed() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts(api.posts).then((res) => {
            setPosts(res)
        })
    }, [])

    return (
        <div className="news-feed-wrapper">
            <h2>Welcome back!</h2>

            <NewPost />
            {posts ? (<ShowPost post={posts} displayLikes={true} displayComment={true}/>) : (
                <div>
                    <h2 className='error-message'>
                        No posts to display
                    </h2>
                </div>)
            }
        </div>
    )
}

export default NewsFeed