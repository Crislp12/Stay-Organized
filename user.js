"use strict";
let filterUsers = document.querySelector("#filterUsers");
let filterTasks = document.querySelector("#filterTasks");
let cardContainer = document.querySelector("#card-container");

async function getUsers() {
  try {
    let response = await fetch("http://localhost:8081/api/users");
    let users = await response.json();
    console.log("users", users);
    return users;
  } catch (error) {
    console.log("error:", error.message);
  }
}

async function getTasks() {
  try {
    let response = await fetch("http://localhost:8083/api/todos");
    let tasks = await response.json();
    console.log("tasks", tasks);
    return tasks;
  } catch (error) {
    console.log("error:", error.message);
  }
}

function populateUserSelect(users) {
  users.forEach((user) => {
    let option = document.createElement("option");
    option.value = user.id;
    option.innerText = user.name;
    filterUsers.appendChild(option);
  });
}

function createTaskCard(task) {
  const user = getUserById(task.userid);

  const cardCol = document.createElement("div");
  cardCol.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card mb-3";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = task.category;

  const userInfo = document.createElement("p");
  userInfo.textContent = `Assigned to: ${user.name} (${user.username})`;

  const description = document.createElement("p");
  description.textContent = `Description: ${task.description}`;

  const deadline = document.createElement("p");
  deadline.textContent = `Deadline: ${task.deadline}`;

  const priority = document.createElement("p");
  priority.textContent = `Priority: ${task.priority}`;

  const status = document.createElement("p");
  status.textContent = `Status: ${task.completed ? "Completed" : "Not Completed"}`;

  cardBody.append(title, userInfo, description, deadline, priority, status);
  card.appendChild(cardBody);
  cardCol.appendChild(card);

  cardContainer.appendChild(cardCol);
}

function filterTasksByUserAndStatus(tasks, userId, status) {
  let filteredTasks = tasks;

  if (userId !== "all") {
    filteredTasks = filteredTasks.filter((task) => task.userid == userId);
  }

  if (status === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  } else if (status === "not_completed") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  } else if (status === "high_priority") {
    filteredTasks = filteredTasks.filter((task) => task.priority === "High");
  }

  return filteredTasks;
}

async function filterTasks() {
  let userId = filterUsers.value;
  let taskStatus = filterTasks.value;

  let tasks = await getTasks();
  let filteredTasks = filterTasksByUserAndStatus(tasks, userId, taskStatus);
  
  cardContainer.innerHTML = ""; // Clear existing cards
  filteredTasks.forEach((task) => createTaskCard(task));
}

async function initializePage() {
  let users = await getUsers();
  populateUserSelect(users);

  let tasks = await getTasks();
  tasks.forEach((task) => createTaskCard(task));
}

initializePage();

filterUsers.addEventListener("change", filterTasks);
filterTasks.addEventListener("change", filterTasks);
