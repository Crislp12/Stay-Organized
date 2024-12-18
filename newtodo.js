document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadCategories();
  setupFormSubmission();
});

async function loadUsers() {
  try {
    const response = await fetch("http://localhost:8083/api/users");
    const users = await response.json();
    const userSelect = document.getElementById("userid");

    users.forEach((user) => {
      
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      userSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

async function loadCategories() {
  try {
    console.log("Fetching categories...");
    const response = await fetch("http://localhost:8083/api/categories");
    const categories = await response.json();
    console.log("Categories received:", categories);
    const categorySelect = document.getElementById("category");
    if (!categorySelect) {
      console.error("Category select element not found!");
      return;
    }

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      categorySelect.appendChild(option);
      console.log("Added category:", category.name);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}


function setupFormSubmission() {
  const form = document.getElementById("newTodoForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      userid: document.getElementById("userid").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      deadline: document.getElementById("deadline").value,
      priority: document.getElementById("priority").value
    };

    try {
      const response = await fetch("http://localhost:8083/api/todos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newTodo = await response.json();
        alert("Todo added successfully!");
        
        window.location.href = `todo.html`;
      } else {
        alert("Error adding todo");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
}
