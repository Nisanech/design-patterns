/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour(): void;
}

// Products

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cChicken burger", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cBeef burger", COLORS.red);
  }
}

class Water implements Drink {
  pour(): void {
    console.log("Pouring a glass of %cWater", COLORS.blue);
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Pouring a glass of %cSoda", COLORS.pink);
  }
}

// Factories

interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createDrink(): Drink {
    return new Soda();
  }

  createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class HealthyFoodRestaurantFactory implements RestaurantFactory {
  createDrink(): Drink {
    return new Water();
  }

  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

// Implemented pattern

function main(factory: RestaurantFactory) {
  const hamburger = factory.createHamburger();
  const drink = factory.createDrink();

  hamburger.prepare();

  drink.pour();
}

console.log("\n%cOrder from the regular menu", COLORS.green);
main(new FastFoodRestaurantFactory());

console.log("\n\n%cOrder from the healthy menu", COLORS.green);
main(new HealthyFoodRestaurantFactory())
