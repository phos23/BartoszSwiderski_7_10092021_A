import axios from 'axios';


import { api, apiUrl, getPosts, ShowPost } from '../main';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import NewPost from './NewPost';
import '../styles/NewsFeed.css';

function NewsFeed(props) {
    const history = useHistory();
    const token = localStorage.getItem('token');


    const [readPostsWhileScroll, setReadPostWhileScroll] = useState([])
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (props.unread === true) {
            axios.get(`${apiUrl}/posts/unread`, {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => {
                    console.log(res.data);
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        } else {
            getPosts(api.posts).then((res) => {
                console.log(res)
                setPosts(res)
            })
        }
    }, [])

    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }

    //TODO: finish ticking posts as read when on screen
    /* let scrollFlag = false;
    function markAsReadWhileScrolling(post) {
        console.log('marking as read', post)
        // setScrollFlag(false)
    }

    function readPostWhileScrolling() {
        const unreadPosts = document.querySelectorAll('.post-wrapper--unread');
        let watchedPost = ''
        if (!scrollFlag) {
            console.log(scrollFlag)
            unreadPosts.forEach((unreadPost) => {
                if (isInViewport(unreadPost)) {
                    // console.log('start watching', unreadPost.getAttribute('data-post-id'))
                    watchedPost = unreadPost.getAttribute('data-post-id');
                    scrollFlag = true
                }
                setTimeout(() => {
                    if (isInViewport(unreadPost) && unreadPost.getAttribute('data-post-id') === watchedPost) {
                        // console.log('finished watching true', unreadPost.getAttribute('data-post-id'))
                        markAsReadWhileScrolling(unreadPost.getAttribute('data-post-id'))
                    } else {
                        scrollFlag = true
                    }
                }, 2000);
            })
        } else {
            return
        }
        console.log('end of function', scrollFlag)
    }
    window.addEventListener('scroll', readPostWhileScrolling)*/
    return (
        <div className="news-feed-wrapper">
            <h2>Welcome back {localStorage.getItem('userName')}!</h2>
            <div><a href="/unread/">Check new posts from your last visit</a></div>
            <NewPost />
            {posts.length ? (<ShowPost post={posts} displayLikes={true} displayComment={true} unread={props.unread} />) : (
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