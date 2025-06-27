const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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
}

// EVENT LISTENERS

itemForm.addEventListener("submit", addItem);
