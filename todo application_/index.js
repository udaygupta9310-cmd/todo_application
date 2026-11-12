let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(function(task, index) {
    const listItem = document.createElement("li");
    if (task.completed) {
      listItem.classList.add("completed");
    }
    const taskLabel = document.createElement("span");
    taskLabel.textContent = task.text;
    taskLabel.onclick = function() {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      showTasks();
    };
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    };
    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") {
    return;
  }
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  showTasks();
  input.value = "";
  input.focus();
}
showTasks();