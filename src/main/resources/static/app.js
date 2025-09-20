const API_URL = '/api/tasks';
window.onload = loadTasks;

// Elements
const addTaskBtn = document.getElementById('addTaskBtn');
const closeFormBtn = document.getElementById('closeForm');
const submitTaskBtn = document.getElementById('submitTaskBtn');
const modal = document.getElementById('taskFormContainer');

// Event listeners
addTaskBtn.addEventListener('click', showAddForm);
closeFormBtn.addEventListener('click', closeForm);
submitTaskBtn.addEventListener('click', submitTask);

// Load all tasks
function loadTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(tasks => {
            const container = document.getElementById('taskCards');
            container.innerHTML = '';
            tasks.forEach(task => {
                container.innerHTML += `
                    <div class="task-card">
                        <h3>${escapeQuotes(task.title)}</h3>
                        <p>${escapeQuotes(task.description)}</p>
                        ${task.completed ? '<span class="completed">Completed</span>' : ''}
                        <div class="actions">
                            <button class="edit-btn" onclick="editTask(${task.id}, '${escapeQuotes(task.title)}', '${escapeQuotes(task.description)}', ${task.completed})">Edit</button>
                            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                        </div>
                    </div>
                `;
            });
        });
}

// Escape quotes
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// Show Add Task Form
function showAddForm() {
    document.getElementById('formTitle').innerText = 'Add Task';
    document.getElementById('taskId').value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCompleted').checked = false;
    modal.style.display = 'block';
}

// Close form
function closeForm() {
    modal.style.display = 'none';
}

// Submit task
function submitTask() {
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const completed = document.getElementById('taskCompleted').checked;

    if (!title.trim() || !description.trim()) {
        alert("Title and Description cannot be empty!");
        return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, description, completed})
    })
    .then(res => res.json())
    .then(() => {
        loadTasks();
        closeForm();
    });
}

// Edit task
function editTask(id, title, description, completed) {
    document.getElementById('formTitle').innerText = 'Edit Task';
    document.getElementById('taskId').value = id;
    document.getElementById('taskTitle').value = title;
    document.getElementById('taskDescription').value = description;
    document.getElementById('taskCompleted').checked = completed;
    modal.style.display = 'block';
}

// Delete task
function deleteTask(id) {
    if(confirm('Are you sure you want to delete this task?')) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => loadTasks());
    }
}
