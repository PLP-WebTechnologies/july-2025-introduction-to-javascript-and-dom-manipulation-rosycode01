// Store all tasks here
let tasks = [];

// Grab all the necessary elements from the page
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const showAllBtn = document.getElementById('showAllBtn');
const showHighBtn = document.getElementById('showHighBtn');
const showActiveBtn = document.getElementById('showActiveBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const markAllActiveBtn = document.getElementById('markAllActiveBtn');
const markAllCompleteBtn = document.getElementById('markAllCompleteBtn');

/* 
   Add a new task
   - Checks if input is valid
   - Creates a task object
   - Adds it to the list
   - Refreshes the UI
*/
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        completed: false,
        date: new Date().toLocaleDateString()
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
    updateStats();
}

/* 
   Toggle task completion
   - Finds a task by ID
   - Switches between complete and incomplete
*/
function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
        updateStats();
    }
}

/* 
   Delete a task
   - Asks user for confirmation
   - Removes it from the list
*/
function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    updateStats();
}

/* 
   Update statistics
   - Total tasks
   - Completed tasks
   - High priority tasks
   - Pending tasks
*/
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
    const pendingTasks = totalTasks - completedTasks;
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('highPriorityTasks').textContent = highPriorityTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

/* 
   Show tasks on the page
   - Clears the list first
   - Loops through all tasks and displays them
*/
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-info">
                <div class="task-title">${task.text}</div>
                <div>
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span>Added: ${task.date}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="complete" onclick="completeTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(taskElement);
    });
}

/* 
   Filter tasks by criteria
   - all, high priority, active, or completed
*/
function filterTasks(filter) {
    taskList.innerHTML = '';
    let filteredTasks = [];
    
    switch(filter) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'high':
            filteredTasks = tasks.filter(task => task.priority === 'high');
            break;
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
    }
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="task-item">No tasks match your filter</div>';
    } else {
        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <div class="task-info">
                    <div class="task-title">${task.text}</div>
                    <div>
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                        <span>Added: ${task.date}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="complete" onclick="completeTask(${task.id})">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            
            taskList.appendChild(taskElement);
        });
    }
}

/* Remove all completed tasks */
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    updateStats();
}

/* Mark every task as complete */
function markAllComplete() {
    tasks.forEach(task => {
        task.completed = true;
    });
    renderTasks();
    updateStats();
}

/* Mark every task as active again */
function markAllIncomplete() {
    tasks.forEach(task => {
        task.completed = false;
    });
    renderTasks();
    updateStats();
}

// Attach all event listeners for buttons and actions
addTaskBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', () => filterTasks('all'));
showHighBtn.addEventListener('click', () => filterTasks('high'));
showActiveBtn.addEventListener('click', () => filterTasks('active'));
showCompletedBtn.addEventListener('click', () => filterTasks('completed'));
clearCompletedBtn.addEventListener('click', clearCompleted);
markAllCompleteBtn.addEventListener('click', markAllComplete);
markAllActiveBtn.addEventListener('click', markAllIncomplete);

// Allow pressing Enter key to add a task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Some starter tasks when the app loads
tasks = [
    { id: 1, text: 'Create project proposal', priority: 'high', completed: false, date: new Date().toLocaleDateString() },
    { id: 2, text: 'Buy groceries', priority: 'medium', completed: true, date: new Date().toLocaleDateString() },
    { id: 3, text: 'Schedule team meeting', priority: 'medium', completed: false, date: new Date().toLocaleDateString() },
    { id: 4, text: 'Read JavaScript documentation', priority: 'low', completed: false, date: new Date().toLocaleDateString() }
];

// Show tasks and stats as soon as the app runs
renderTasks();
updateStats();
