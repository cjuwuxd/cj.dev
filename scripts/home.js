import { db } from './firebase-init.js';
import { ref, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

function loadLatestBlogPost() {
    console.log('--- loadLatestBlogPost function started ---');
    const blogFeed = document.getElementById('blog-feed');
    if (!blogFeed) return;

    // Place the loading spinner inside the feed right away
    blogFeed.innerHTML = '<div class="spinner"></div>';
    const latestPostQuery = query(ref(db, 'posts'), orderByChild('timestamp'), limitToLast(1));

    onValue(latestPostQuery, (snapshot) => {
        console.log("Snapshot received:", snapshot.val());
        blogFeed.innerHTML = '';

        const posts = snapshot.val();

        if (posts) {
            const keys = Object.keys(posts);
            const latestPost = { id: keys[0], ...posts[keys[0]] };

            const postElement = document.createElement('article');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-date">${latestPost.date}</span>
                    <h1 class="post-title">${latestPost.title}</h1>
                </div>
                <p class="post-excerpt">${latestPost.content}</p>
                <div class="post-footer"></div>
            `;
            blogFeed.appendChild(postElement);
        } else {
            console.log("No blog posts found in Firebase."); 
            blogFeed.innerHTML = '<p>No posts yet. Be the first to publish!</p>';
        }
    }, (error) => {
        console.error("Error loading blog posts from Firebase: ", error);
        if (blogFeed) blogFeed.innerHTML = '<p>Error loading posts.</p>';
    });
}

document.addEventListener('DOMContentLoaded', loadLatestBlogPost);