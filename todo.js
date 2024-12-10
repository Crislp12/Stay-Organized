document.addEventListener('DOMContentLoaded', () => {
    setupFormSubmission();
});

function setupFormSubmission() {
    const form = document.getElementById('newTodoForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('api/todos', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Todo added successfully!');
                form.reset();
            } else {
                alert('Error adding todo');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error adding todo');
        }
    });
}
