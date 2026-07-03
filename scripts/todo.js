import { db, auth } from '../scripts/firebase-init.js'; // Imported auth alongside db
import { ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const todoForm = document.getElementById('todo-form');
const columns = document.querySelectorAll('[data-status]');

// Add task to Firebase (Like publishPost)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Client-side authentication check
    if (!auth.currentUser) {
        alert("You must be logged in to manage tasks.");
        return;
    }

    const text = document.getElementById('todo-text').value;
    const inputDate = document.getElementById('todo-date').value;
    
    if (!text || !inputDate) return;

    const dateObject = new Date(inputDate);
    const dateString = dateObject.toLocaleDateString('en-US', {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const todosRef = ref(db, 'todos');
    const newTodoData = {
        text: text,
        date: dateString,
        status: 'todo',
        timestamp: Date.now()
    };

    push(todosRef, newTodoData)
        .then(() => {
            console.log("Task successfully saved to Firebase!");
            todoForm.reset();
        })
        .catch((error) => {
            console.error("Error saving task to Firebase: ", error);
        });
});

// Load tasks from Firebase 
function loadTodos() {
    const todosRef = ref(db, 'todos');

    onValue(todosRef, (snapshot) => {
        columns.forEach(col => col.innerHTML = ''); 
        const data = snapshot.val();
        
        if (data) {
            const todoList = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            
            // Sort by newest task first within their columns
            todoList.sort((a, b) => b.timestamp - a.timestamp);

            todoList.forEach(task => {
                const item = createTaskDOM(task.id, task);
                const targetCol = document.querySelector(`[data-status="${task.status}"]`);
                if (targetCol) targetCol.appendChild(item);
            });
        }
        setupDragAndDrop();
    }, (error) => {
        console.error("Error loading tasks: ", error);
    });
}

function createTaskDOM(id, task) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.id = id;
    
    // Check if user is logged in AND app is in admin mode to authorize alterations
    const isAdmin = document.body.classList.contains('admin-mode') && auth.currentUser;
    if (isAdmin) div.setAttribute('draggable', 'true');

    div.innerHTML = `
        <div>
            <span style="color: var(--text-main);">${task.text}</span>
            <span class="date-tag">📅 ${task.date}</span>
        </div>
        ${isAdmin ? `<button class="delete-btn">✕</button>` : ''}
    `;

    if (isAdmin) {
        div.querySelector('.delete-btn').addEventListener('click', () => {
            if (auth.currentUser) {
                remove(ref(db, `todos/${id}`));
            }
        });
    }

    return div;
}

let draggedItemId = null;
function setupDragAndDrop() {
    const isAdmin = document.body.classList.contains('admin-mode') && auth.currentUser;
    if (!isAdmin) return;

    document.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('dragstart', () => { draggedItemId = item.id; });
    });

    columns.forEach(col => {
        col.addEventListener('dragover', (e) => e.preventDefault());
        col.addEventListener('drop', () => {
            if (!draggedItemId || !auth.currentUser) return;
            const targetStatus = col.getAttribute('data-status');
            update(ref(db, `todos/${draggedItemId}`), { status: targetStatus });
            draggedItemId = null;
        });
    });
}

document.addEventListener('DOMContentLoaded', loadTodos);