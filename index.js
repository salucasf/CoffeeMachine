const input = require('prompt-sync')({ sigint: true });

let inventory = {
  water: 400,
  milk: 540,
  beans: 120,
  cups: 9,
  money: 550
}

const espressoRecipe = {
  water: 250,
  milk: 0,
  beans: 16,
  cups: 1,
  cost: 4,
  name: "espresso"
}

const latteRecipe = {
  water: 350,
  milk: 75,
  beans: 20,
  cups: 1,
  cost: 7,
  name: "latte"
}

const cappuccinoRecipe = {
  water: 200,
  milk: 100,
  beans: 12,
  cups: 1,
  cost: 6,
  name: "cappuccino"
}

const recipes = Array.of(espressoRecipe, latteRecipe, cappuccinoRecipe);

mainMenu(false);

function mainMenu(exit) {
  while (exit != true) {
    let option = input(`Write action (buy, fill, take, remaining, exit): `);

    switch (option) {
      case "buy":
        buy();
        break;
      case "fill":
        fill();
        break;
      case "take":
        take();
        break;
      case "remaining":
        remaining();
        break;
      case "exit":
        exit = true;
        break;
      default:
        wrongOp();
    }
  }
}

function buy() {
  function prepareDrink(option) {
    let status = { ok: true, lacking: [] };

    for (item in inventory) {
      if (item != "money") {
        if (inventory[item] <= recipes[option - 1][item]) {
          status.lacking.push(item);
        }
      }
    }

    status.lacking.length == 0 ? status.ok = true : status.ok = false;

    if (status.ok) {
      console.log(`I have enough resources, making you a ${recipes[option - 1].name}!`);
      for (item in inventory) {
        if (item != "money") {
          inventory[item] -= recipes[option - 1][item];
        } else {
          inventory[item] += recipes[option - 1]["cost"];
        }

      }
    } else {
      console.log(`Sorry, not enough ${status.lacking[0]}`);
    }
  }

  let validOp;

  do {
    var option = input(`What do you want to buy? (1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu): `);

    switch (option) {
      case "1": validOp = true; break;
      case "2": validOp = true; break;
      case "3": validOp = true; break;
      case "back": validOp = true; break;
      default:
        validOp = false;
        console.log("Invalid Option, please enter a valid one!")
        break;
    }
  } while (!validOp);

  if (option == "back") {
    mainMenu(false);
  } else {
    prepareDrink(option);
  }
}

function fill() {
  inventory.water += Number(input("Write how many ml of water you want to add: "));
  inventory.milk += Number(input("Write how many ml of milk you want to add: "));
  inventory.beans += Number(input("Write how many g of beans you want to add: "));
  inventory.cups += Number(input("Write how many disposable cups you want to add: "));
}

function take() {
  console.log(`I gave you ${inventory.money}`);
  inventory.money = 0;
}

function remaining() {
  console.log(`The coffee machine has:
  ${inventory.water} ml of water
  ${inventory.milk} ml of milk
  ${inventory.beans} g of coffee beans
  ${inventory.cups} disposable cups
  ${inventory.money} of money\n`);
}

function wrongOp() {
  console.log("Invalid option, please try again");
}