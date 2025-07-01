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

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert("Please add an item!");
    return;
  }
  // Create List Item
  const newListItem = document.createElement("li");
  newListItem.append(document.createTextNode(newItem));
  newListItem.append(createButton("remove-item btn-link text-red"));
  itemList.append(newListItem);
  itemInput.value = "";
  checkUI();
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

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
filterInput.addEventListener("input", filterItems);

checkUI();
