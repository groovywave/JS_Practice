// Create an array to store the inventory items
let inventory = [];

// Function to add a new item to the inventory
function addItem(itemName, quantity) {
  let item = {
    name: itemName,
    quantity: quantity,
  };
  inventory.push(item);
}

// Function to remove an item from the inventory
function removeItem(itemName, quantity) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name === itemName) {
      inventory[i].quantity -= quantity;
      if (inventory[i].quantity <= 0) {
        inventory.splice(i, 1);
      }
      break;
    }
  }
}

// Function to display the current inventory
function showInventory() {
  console.log("Current Inventory:");
  for (let i = 0; i < inventory.length; i++) {
    console.log(`${inventory[i].name}: ${inventory[i].quantity}`);
  }
}
