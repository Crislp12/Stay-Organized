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
      // For each user from the API
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

// Function to set up the form submission handler
function setupFormSubmission() {
  const form = document.getElementById("newTodoForm");
  form.addEventListener("submit", async (event) => {
    // Add a listener for when the form is submitted
    event.preventDefault(); //(page refresh)

    const formData = new FormData(form); // Create a FormData object containing all form fields

    try {
      const response = await fetch("http://localhost:8083/api/todos", {
        // Send a request to the API endpoint
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // If the server responded with a success status (200-299)
        alert("Todo added successfully!");
        form.reset(); // Clear all form fields
      } else {
        // If the server responded with an error status
        alert("Error adding todo");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
}
