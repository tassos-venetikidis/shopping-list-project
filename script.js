const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filterInput = document.getElementById("filter");

function getItemsFromStorage() {
  // Initialize an itemsFromStorage variable that will be an array
  let itemsFromStorage;
  // Check to see if there are any items in local storage and populate the itemsFromStorage array accordingly
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function displayItemsFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  for (const item of itemsFromStorage) {
    addItemToDOM(item);
  }
  checkUI();
}

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

function addItemToDOM(itemText) {
  // Create List Item
  const newListItem = document.createElement("li");
  newListItem.append(document.createTextNode(itemText));
  newListItem.append(createButton("remove-item btn-link text-red"));
  itemList.append(newListItem);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // Add the new item to the itemsFromStorage array
  itemsFromStorage.push(item);
  // Convert the itemsFromStorage array to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this item?")) {
      e.target.parentElement.parentElement.remove();
      // // My take on remove
      // const items = getItemsFromStorage();
      // const positionInArray = items.indexOf(
      //   e.target.parentElement.previousSibling.textContent
      // );
      // items.splice(positionInArray, 1);
      // localStorage.setItem("items", JSON.stringify(items));
      // //
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

function init() {
  // EVENT LISTENERS
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", removeItem);
  clearButton.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItemsFromStorage);
}

init();
