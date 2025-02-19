const dishList = document.getElementById("dish-list");
const mealPlanContainer = document.getElementById("meal-plan");
const totalCostDisplay = document.getElementById("total-cost");

function DishSelection() {
    const dishImages = document.querySelectorAll(".dishes img");
    const dishInfo = document.getElementById("dish-info");
    const dishName = document.getElementById("dish-name");
    const dishPrice = document.getElementById("dish-price");

    dishImages.forEach(image => {
        image.addEventListener("click", function () {
            dishName.textContent = `Dish: ${this.dataset.name}`;
            dishPrice.textContent = `Price: ${this.dataset.price}`;
            dishInfo.style.display = "block";
        });
    });
}

let mealPlan = [];

if (dishList) {
    showDishList();
} else {
    DishSelection();
}

function showDishList() {
    const menuItems = [
        { name: "Boneless Wings", price: 18.99 },
        { name: "Bacon Cheddar Burger", price: 12.49 },
        { name: "Carnival Fries", price: 7.99 },
        { name: "Build Your Own Burrito Bowl", price: 13.23 },
        { name: "Build Your Own Burrito", price: 9.00 },
        { name: "Build Your Own Quesadilla", price: 10.00 },
        { name: "Cheese Pizza", price: 11.39 },
        { name: "Spaghetti with Meatballs", price: 17.09 },
        { name: "Garlic Knots", price: 1.89 }
    ];

    menuItems.forEach(dish => {
        const listItem = document.createElement("li");
        listItem.textContent = `${dish.name} - $${dish.price.toFixed(2)}`;

        const addButton = document.createElement("button");
        addButton.textContent = "Add to Meal Plan";
        addButton.addEventListener("click", function () {
            addToMealPlan(dish);
        });

        listItem.appendChild(addButton);
        dishList.appendChild(listItem);
    });
}

function addToMealPlan(dish) {
    let existingItem = null;
    for (let i = 0; i < mealPlan.length; i++) {
        if (mealPlan[i].name === dish.name) {
            existingItem = mealPlan[i];
            break;
        }
    }
    if (existingItem) {
        existingItem.quantity++;
    } else {
        mealPlan.push({ ...dish, quantity: 1 });
    }
    updateMealPlan();
}

function removeFromMealPlan(dishName) {
    let newMealPlan = [];
    for (let i = 0; i < mealPlan.length; i++) {
        if (mealPlan[i].name !== dishName) {
            newMealPlan.push(mealPlan[i]);
        }
    }
    mealPlan = newMealPlan;
    updateMealPlan();
}

function changeQuantity(dishName, amount) {
    for (let i = 0; i < mealPlan.length; i++) {
        if (mealPlan[i].name === dishName) {
            mealPlan[i].quantity = Math.max(1, mealPlan[i].quantity + amount);
            break;
        }
    }
    updateMealPlan();
}

function updateMealPlan() {
    mealPlanContainer.innerHTML = "";
    let totalCost = 0;
    for (let i = 0; i < mealPlan.length; i++) {
        let item = mealPlan[i];

        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;

        const removeButton = createButton("Remove", function () {
            removeFromMealPlan(item.name);
        });
        const increaseButton = createButton("+", function () {
            changeQuantity(item.name, 1);
        });
        const decreaseButton = createButton("-", function () {
            changeQuantity(item.name, -1);
        });

        listItem.appendChild(removeButton);
        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        mealPlanContainer.appendChild(listItem);

        totalCost += item.price * item.quantity;
    }
    totalCostDisplay.textContent = totalCost.toFixed(2);
}

function createButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
}