// push to firebase to save blogs to site
import {db} from './firebase-init.js';
import {ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.getElementById("post-btn").addEventListener('click', publishPost);

function publishPost() {

    console.log('testing')
    const content = document.getElementById("post-content").value;
    const title = document.getElementById("post-title").value;
    
    if (!title || !content) {
        //alert("need both pls");
        console.log("need both")
        return;
    }

    const now = new Date();
    const dateString = now.toLocaleDateString('en-US',{
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    console.log(db)
    
    //get reference to post to database
    const postsRef= ref(db, 'posts');

     // Create a new post object
    const newPostData = {
        title: title,
        content: content,
        date: dateString,
        timestamp: now.getTime() 

    };

    push(postsRef, newPostData)
        .then(() => {
            console.log("Post successfully saved to Firebase!");
            // After successful save, update the DOM
            const postElement = document.createElement('article');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-date">${dateString}</span>
                    <h1 class="post-title">${title}</h1>
                </div>
                <p class="post-excerpt">${content}</p>
                <div class="post-footer">
                </div>
            `;
            document.getElementById('blog-feed').prepend(postElement);
            document.getElementById('post-content').value = '';
            document.getElementById('post-title').value = '';
        })
        .catch((error) => {
            console.error("Error saving post to Firebase: ", error);
            alert("Failed to save your post. Please try again.");
        });
}

function loadBlogPosts() {
    console.log('--- loadBlogPosts function started ---');
    const blogFeed = document.getElementById('blog-feed');
    const postsRef = ref(db, 'posts');

    onValue(postsRef, (snapshot) => {
        console.log("Snapshot received:", snapshot.val()); // ADD THIS LINE
        blogFeed.innerHTML = '';

        const posts = snapshot.val();

        if (posts) {
            console.log("Posts found:", Object.keys(posts).length); 
            const postList = Object.keys(posts).map(key => ({
                id: key,
                ...posts[key]
            }));
            postList.sort((a, b) => b.timestamp - a.timestamp); 

            postList.forEach(post => {
                const postElement = document.createElement('article');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <div class="post-header">
                        <span class="post-date">${post.date}</span>
                        <h1 class="post-title">${post.title}</h1>
                    </div>
                    <p class="post-excerpt">${post.content}</p>
                    <div class="post-footer">
                        <!-- Placeholder for future features like like/comment buttons -->
                    </div>
                `;
                // Append the newly created post element to the blog feed.
                // Using appendChild adds it to the end of the feed.
                blogFeed.appendChild(postElement);
            });
        } else {
            console.log("No blog posts found in Firebase."); // ADD THIS LINE
            blogFeed.innerHTML = '<p>No posts yet. Be the first to publish!</p>';
        }
    }, (error) => {
        console.error("Error loading blog posts from Firebase: ", error); // Check this error!
        blogFeed.innerHTML = '<p>Error loading posts.</p>';
    });
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);
