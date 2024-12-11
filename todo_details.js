document.addEventListener('DOMContentLoaded', () => {
    // Get the todo ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get('id');

    if (todoId) {
        loadTodoDetails(todoId);
    } else {
        alert('No todo ID specified');
    }
});

async function loadTodoDetails(todoId) {
    try {
        const response = await fetch(`http://localhost:8083/api/todos/${todoId}`);
        const todo = await response.json();

        // Display todo details
        document.getElementById('category').textContent = todo.category;
        document.getElementById('description').textContent = todo.description;
        document.getElementById('deadline').textContent = todo.deadline;
        document.getElementById('priority').textContent = todo.priority;

        const completeBtn = document.getElementById('completeBtn');
        
        // Disable button if todo is already completed
        if (todo.completed) {
            completeBtn.disabled = true;
            completeBtn.textContent = 'COMPLETED';
        }

        // Add click handler for complete button
        completeBtn.addEventListener('click', () => markCompleted(todoId));
    } catch (error) {
        console.error('Error loading todo details:', error);
        alert('Error loading todo details');
    }
}

async function markCompleted(todoId) {
    try {
        const response = await fetch(`http://localhost:8083/api/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const completeBtn = document.getElementById('completeBtn');
            completeBtn.disabled = true;
            completeBtn.textContent = 'COMPLETED';
            alert('Todo marked as completed!');
        } else {
            alert('Error marking todo as completed');
        }
    } catch (error) {
        console.error('Error marking todo as completed:', error);
        alert('Error marking todo as completed');
    }
}
