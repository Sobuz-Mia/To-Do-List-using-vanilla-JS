let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.innerHTML.trim();
    if (taskDescription !== "") {
        const task = {
            id: Date.now(),
            description: taskDescription,
            completed: false,
            pinned: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.innerHTML = "";
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function togglePin(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, pinned: !task.pinned };
        }
        return task;
    });
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }
        if (task.pinned) {
            taskElement.style.border = "2px solid #ffcc00";
        }
        taskElement.innerHTML = `
            <span class="list">${task.description}</span>
            <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            <button class="pin-btn" onclick="togglePin(${task.id})">${task.pinned ? "Unpin" : "Pin"}</button>
        `;
        
        // Check if the task description contains an <img> tag
        if (task.description.includes("<img")) {
            const img = task.description.substring(task.description.indexOf("<img"));
            taskElement.querySelector(".list").innerHTML = img;
        }
        
        taskList.appendChild(taskElement);
    });
}

// Handle image insertion
function openImageUploader() {
    document.getElementById("imageInput").click();
}

document.getElementById("imageInput").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("task-image");
            const taskInput = document.getElementById("taskInput");
            const caretPosition = window.getSelection().getRangeAt(0).endOffset;
            const textBeforeCaret = taskInput.innerHTML.substring(0, caretPosition);
            const textAfterCaret = taskInput.innerHTML.substring(caretPosition);
            taskInput.innerHTML = textBeforeCaret + `<img class="task-image" src="${e.target.result}" alt="Inserted Image">` + textAfterCaret;
        };
        reader.readAsDataURL(file);
    }
});
