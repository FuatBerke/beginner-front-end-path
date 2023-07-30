// Local Storage Load
window.addEventListener("load", function () {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => addItem(todo));
  childDOM();
});

// Form and Submit
let toDoForm = document.querySelector("#toDoForm");
toDoForm.addEventListener("submit", formSubmit);

// Number of tasks to be done
let taskNumber = document.querySelector("#taskNumber");
taskNumber.innerHTML = "0";
function childDOM() {
  taskNumber.innerHTML = toDoListDOM.children.length;
}

// Task add Button and specific alerts for each operation (success, error)
function formSubmit(event) {
  event.preventDefault();
  const TO_DO_INPUT = document.querySelector("#toDoInput");
  if (TO_DO_INPUT.value && TO_DO_INPUT.value.trim() !== "") {
    const newTodo = TO_DO_INPUT.value.trim();
    addItem(newTodo);
    TO_DO_INPUT.value = "";
    saveTodoList();
    alertDOM.innerHTML = alertFunction(
      "Success!",
      "Task added",
      "green",
      "green",
    );
  } else if (TO_DO_INPUT.value === "") {
    alertDOM.innerHTML = alertFunction(
      "Attention!",
      "You did not write a task",
      "red",
      "red",
    );
  } else if (TO_DO_INPUT.value.trim() === "") {
    alertDOM.innerHTML = alertFunction(
      "Error!",
      "You cannot log in with empty input",
      "yellow",
      "yellow",
    );
  }
  childDOM();
  closeClick();
}

// Local Storage Save
function saveTodoList() {
  const todoItems = toDoListDOM.querySelectorAll("li");
  const todos = Array.from(todoItems).map((item) => item.textContent);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// List DOM and (addItem)
let toDoListDOM = document.querySelector("#toDoList");
const addItem = (toDoInput) => {
  // Task Create and Task structure
  let liDOM = document.createElement("li");
  liDOM.innerHTML = `<span class="me-auto">${toDoInput}</span> <button class=" closeButton ms-auto me-2 rounded-lg duration-200 float-right px-3"> <i class="fa-solid fa-x fa-xs";"></i> </button>`;

  // List Childs and Child Style
  toDoListDOM.appendChild(liDOM);
  liDOM.classList.add(
    "hover:bg-stone-800",
    "hover:rounded-lg",
    "hover:duration-200",
    "py-2",
    "block",
    "col-span-8",
    "ps-2",
    "border-b",
    "my-2",
    "border-stone-800",
  );

  // Finished Task
  liDOM.addEventListener("click", function () {
    liDOM.classList.toggle("bg-stone-800");
    liDOM.classList.toggle("rounded-lg");
    liDOM.classList.toggle("line-through");
    liDOM.classList.toggle("decoration-stone-400");
    liDOM.classList.toggle("text-stone-600");
  });

  // Task Remove
  let closeButton = document.querySelectorAll(".closeButton");
  closeButton.forEach((button) => {
    button.addEventListener("click", function () {
      const listItem = button.parentNode;
      toDoListDOM.removeChild(listItem);
      childDOM();
      saveTodoList()
    });
  });
};

// SUCCESS AND ERROR ALERTS SETUP
let alertDOM = document.querySelector("#alert");
function alertFunction(title, message, bg, text) {
  return `<div class="rounded-md bg-${bg}-50 p-4 h-13  text-sm text-${text}-500"><b>${title}!</b> <span class="ms-1"> ${message} </span><button id="alertClose" class="ms-auto float-right pe-4"> <i class="fa-solid fa-x fa-sm closeBtnColor";"></i> </button></div>`;
}

// Close Button for Alerts
function closeClick() {
  let alertClose = document.querySelector("#alertClose");
  alertClose.addEventListener("click", function () {
    alertDOM.innerHTML = "";
  });
}

