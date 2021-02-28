const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const taskList = document.querySelector("#task-list");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
let items = [];

function loadItem() {
  items = getItemsLocal();

  items.forEach((item) => createItem(item));
}

function getItemsLocal() {
  if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
  }

  return items;
}
function setItemLocal(text) {
  items = getItemsLocal();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemLocal(text) {
  items = getItemsLocal();
  items.forEach((item, index) => {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function createItem(text) {
  const liElement = document.createElement("li");
  liElement.className = "list-group-item list-group-item-secondary";
  liElement.appendChild(document.createTextNode(text));

  const aElement = document.createElement("a");
  aElement.className = "delete-item float-right";
  aElement.href = "#";
  aElement.innerHTML += '<li class="fas fa-times"></li>';

  liElement.appendChild(aElement);
  taskList.appendChild(liElement);
}

function addItem(e) {
  e.preventDefault();

  if (input.value == "") {
    alert("Please add new item");
  } else {
    createItem(input.value);
    setItemLocal(input.value);
  }
  input.value = "";
}

function deleteItem(e) {
  if (e.target.className == "fas fa-times") {
    e.target.parentElement.parentElement.remove();
    deleteItemLocal(e.target.parentElement.parentElement.textContent);
  }
}

function deleteAllItems() {
  if (confirm("Are you sure you want to delete all?")) {
    taskList.innerHTML = "";
    localStorage.removeItem("items");
  }
}
loadItem();
form.addEventListener("submit", addItem);
taskList.addEventListener("click", deleteItem);
btnDeleteAll.addEventListener("click", deleteAllItems);
