const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filterInput = document.getElementById("filter");

function createIcon(classString) {
  const icon = document.createElement("i");
  icon.className = classString;
  return icon;
}

function createButton(classString) {
  const button = document.createElement("button");
  button.className = classString;
  button.append(createIcon("fa-solid fa-xmark"));
  return button;
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert("Please add an item!");
    return;
  }
  // Create item DOM element
  addItemToDOM(newItem);
  // Add item to localStorage
  addItemToStorage(newItem);

  itemInput.value = "";
  checkUI();
}

function addItemToDOM(itemText) {
  // Create List Item
  const newListItem = document.createElement("li");
  newListItem.append(document.createTextNode(itemText));
  newListItem.append(createButton("remove-item btn-link text-red"));
  itemList.append(newListItem);
}

function addItemToStorage(item) {
  // Initialize an itemsFromStorage variable that will be an array
  let itemsFromStorage;
  // Check to see if there are any items in local storage and populate the itemsFromStorage array accordingly
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  // Add the new item to the itemsFromStorage array
  itemsFromStorage.push(item);

  // Convert the itemsFromStorage array to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this item?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearItems() {
  if (
    confirm("Are you sure you want to clear all items of the shopping list?")
  ) {
    while (itemList.firstElementChild) {
      itemList.firstElementChild.remove();
    }
    checkUI();
  }
}

function checkUI() {
  if (itemList.querySelectorAll("li").length === 0) {
    filterInput.style = "display: none;";
    clearButton.style = "display: none;";
  } else {
    filterInput.style = "";
    clearButton.style = "";
  }
}

function filterItems(e) {
  const items = itemList.children;
  const filterInputText = e.target.value.toLowerCase();
  for (const item of items) {
    const itemText = item.firstChild.textContent.toLowerCase();
    // if (itemText.indexOf(filterInputText) !== -1) {
    if (itemText.includes(filterInputText)) {
      item.style = "";
    } else {
      item.style = "display: none;";
    }
  }
}

// EVENT LISTENERS

itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
filterInput.addEventListener("input", filterItems);

checkUI();
