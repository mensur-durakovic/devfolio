---
title: 'The most important design patterns you need to know as a developer (part 1)'
date: '2022-11-30T15:00:00.00Z'
description: "I consider design patterns as good weapons for developer's arsenal..."
isStcArticle: false
stcUrl: ''
---

I consider design patterns as good weapons for developers' arsenal. The more you have/know, the better. 

However, you must not make the same mistake I did when I first discovered them. Let me be metaphoric here, if you want to hunt a deer, you will not use a bazooka, but a shotgun or rifle. Very similar logic is with design patterns in the code, if you use the wrong pattern or try to force it, it’s gonna blow up your project. 

When I first read about them, I was trying to “patternize” everything and it back-fired heavily. Knowing when to use a pattern is the hardest part about them. You can not learn that, you have to discover that with trial and error, build the experience in order to be able to feel when a specific pattern will be a good fit and when is best to avoid it.

This article is part 1 of the design pattern series which will consist of 3 articles. Here we will focus on creational patterns:

1. Builder
2. Singleton
3. Abstract Factory
4. Factory Method
5. Prototype (Clone)

Creational patterns provide a variety of object generation strategies, increasing flexibility and reusing existing code. We will go through each pattern and give examples from real life followed by code implementation in TypeScript.

## 1) Builder

Let’s start with the simple and very popular one - a builder. This is a design pattern that lets you construct your object piece by piece. It is used a lot in situations where you need to create different types of the base object.

Imagine you have a pancake shop, people can order any type of pancakes they like with different toppings.

![pancake](./pancake.jpg)

For example, customers can add nutella, banana, walnut, coconut, forest fruit, cinnamon, cherries, chocolate pudding, etc.

Let’s implement this in the code. For the sake of simplicity, we will only take 3 ingredients: nutella, banana, and ice cream.

```typescript
class PancakeBuilder {
  private name: string;
  private nutella: boolean;
  private banana: boolean;
  private icecream: boolean;

  constructor(name: string) {
    this.name = name;
  }

  get Name() {
    return this.name;
  }

  addNutella(): PancakeBuilder {
    this.nutella = true;
    return this;
  }

  get Nutella() {
    return this.nutella;
  }

  addBanana(): PancakeBuilder {
    this.banana = true;
    return this;
  }

  get Banana() {
    return this.banana;
  }

  addIceCream(): PancakeBuilder {
    this.icecream = true;
    return this;
  }

  get Icecream() {
    return this.icecream;
  }

  cook(): Pancake {
    return new Pancake(this);
  }
}

class Pancake {
  private name: string;
  private nutella: boolean;
  private banana: boolean;
  private icecream: boolean;

  constructor(builder: PancakeBuilder) {
    this.name = builder.Name;
    this.nutella = builder.Nutella;
    this.banana = builder.Banana;
    this.icecream = builder.Icecream;
  }

  public toString = (): string => {
    const ingredients = {
      Nutella: this.nutella,
      Banana: this.banana,
      Icecream: this.icecream,
    };
    let result = `${this.name}\nIngredients: `;
    for (const [k, v] of Object.entries(ingredients)) {
      result += v ? `${k}, ` : "";
    }
    return result;
  };
}
```

As you can see above, first, the builder class ```PancakeBuilder``` is implemented and it consists of all the steps we might need to cook a pancake with different kinds of ingredients. 

For example, there is ```addNutella``` method which simply set the property value to ```true``` and returns the ```PancakeBuilder``` instance. 

Plus, there is also a getter for each ingredient (eg. ```Nutella```) which simply returns the value. Finally, there is ```cook``` method which returns a new instance of ```Pancake```.

The ```Pancake``` class accepts the ```PancakeBuilder``` instance in the constructor and takes the values for various ingredients. There is also overridden ```toString``` method which prints the pancake with all the ingredients.

Let’s test this:

```typescript
const pancake: Pancake = new PancakeBuilder("Customer pancake")
  .addBanana()
  .addIceCream()
  .cook();

console.log(pancake.toString());
// "Customer pancake
// Ingredients: Banana, Icecream, "
```

## 2) Singleton

By implementing singleton you can ensure that a specific class can only have one instance and you provide global access to that instance.

This is usually used in situations when there is a specific limit to resources. 

For example, if you go to Mcdonald's, you can see that they have a lot of self-service terminals. So customers can order any meals they want, which implies there is no limit to resources. 

The opposite of that is buying tickets for movies in the cinema. Seats are a limited resource and if you picked seats while buying tickets, no one else should be able to pick your seats. Usually, the website gives you a timer to finish your purchase, otherwise, you lose your seats.

![cinema](./cinema-seats.jpg)

Lets’s implement singleton: 

```typescript
class CinemaSeats {
  private static singleton: CinemaSeats;
  private constructor() {}

  public static getInstance(): CinemaSeats {
    if (!CinemaSeats.singleton) {
      CinemaSeats.singleton = new CinemaSeats();
    }
    return CinemaSeats.singleton;
  }
}

const bad: CinemaSeats = new CinemaSeats();             // throws an error
const good: CinemaSeats = CinemaSeats.getInstance();    // ok

const singleton1 = CinemaSeats.getInstance();
const singleton2 = CinemaSeats.getInstance();

// proof that it's the same instance, prints true
console.log(singleton1 === singleton2);                 
```

As you can see, inside the class, you need to have a variable that acts like a placeholder, that variable is used to store singleton.

There is also a private constructor which ensures that no instances can be created.

Finally, there is the ```getInstance``` method which checks if an instance of the class already exists and if not a new one is created. If it exists, an existing instance is returned.

## 3) Abstract factory

This pattern is used to elegantly generate instances of familiar classes without having to specify their exact classes.

Sounds complicated but it’s actually very simple, so let’s explain it with a real-life example. 

Let’s say you need to implement a clothing style mechanism for a webshop. To make things simple, we will use only 3 clothing styles: business, sportswear and vintage. Each style has shoes, pants, and a shirt. Visually it looks like this:

![clothing styles](./styles.jpg)

Basically, you want to produce matching clothing pieces. You don’t want to mix vintage shirts with sportswear pants.

This is where abstract factory comes in handy. So let’s implement it in the code. 

For the sake of simplicity, we will only implement business and sports clothing lines with 2 products, shoes and shirts.

```typescript
interface Shirt {
  createShirt(): string;
}

interface Shoes {
  createShoes(): number;
}

interface ClothingFactory {
  createShirt(): Shirt;
  createShoes(): Shoes;
}

class SportShirt implements Shirt {
  createShirt = () => {
    return "This is sports shirt!";
  };
}

class SportShoes implements Shoes {
  createShoes = () => {
    return 43;
  };
}

class BusinessShirt implements Shirt {
  createShirt = () => {
    return "This is business shirt!";
  };
}

class BusinessShoes implements Shoes {
  createShoes = () => {
    return 44;
  };
}

class SportStyleFactory implements ClothingFactory {
  createShirt(): Shirt {
    return new SportShirt();
  }

  createShoes(): Shoes {
    return new SportShoes();
  }
}

class BusinessStyleFactory implements ClothingFactory {
  createShirt(): Shirt {
    return new BusinessShirt();
  }

  createShoes(): Shoes {
    return new BusinessShoes();
  }
}

class ClothingLine {
  private shirt: Shirt;
  private shoes: Shoes;

  constructor(factory: ClothingFactory) {
    this.shirt = factory.createShirt();
    this.shoes = factory.createShoes();
  }

  public produce(): void {
    console.log(this.shirt.createShirt());
    console.log(this.shoes.createShoes());
  }
}
```

As you can see above, abstract factory for this example is implemented in a couple of steps:
- Interfaces for products are defined (```Shirt``` and ```Shoes```)
- Interface for the factory is defined (```ClothingFactory```)
- Classes which implement product interfaces are defined (```SportShirt```, ```SportShoes```, ```BusinessShirt```, ```BusinessShoes```)
- Concrete factory classes which implement factory interface are defined (```SportStyleFactory```, ```BusinessStyleFactory```)
- Finally, there is ```ClothingLine``` class which accepts ```ClothingFactory``` instance and creates products

We can test this code like this:

```typescript
const sportStyleFactory: ClothingFactory = new SportStyleFactory();
const sportClothingLine: ClothingLine = new ClothingLine(sportStyleFactory);
sportClothingLine.produce();
// "This is sports shirt!"
// 43

const businessStyleFactory: ClothingFactory = new BusinessStyleFactory();
const businessClothingLine: ClothingLine = new ClothingLine(businessStyleFactory);
businessClothingLine.produce();
// "This is business shirt!"
// 44
```

As you can see each clothing line produces family specific clothing pieces.

## 4) Factory Method

This design pattern provides an interface to create objects in the base class but it also offers flexibility for extension classes to alter the type of objects which will be created.

Let’s take a fast food restaurant with delivery as an example. They do delivery with bikes but also with motorbikes and cars.

Let's implement that use case in the code:

```typescript
interface Delivery {
  method(param?: any): void;
}

class ByCar implements Delivery {
  method = (param?: any) => {
    return "Food delivery by a car!";
  };
}

class ByMotorBike implements Delivery {
  method = (param?: any) => {
    return "Food delivery by a motor bike!";
  };
}

class ByBike implements Delivery {
  method = (param?: any) => {
    return "Food delivery by a bike!";
  };
}

enum DeliveryTypes {
  byBike,
  byMotorBike,
  byCar,
}

namespace FastFood {
  export function deliverFood(deliveryType: DeliveryTypes): Delivery {
    if (deliveryType === DeliveryTypes.byBike) {
      return new ByBike();
    } else if (deliveryType === DeliveryTypes.byMotorBike) {
      return new ByMotorBike();
    } else if (deliveryType === DeliveryTypes.byCar) {
      return new ByCar();
    }
    return new ByBike();
  }
}
```

As you can see there are 3 delivery types that are implementing the ```Delivery``` interface. 

Next, there is a namespace ```FastFood``` with a factory method called ```deliverFood```. 

This method accepts the type of delivery and simply returns the concrete delivery type. If the desired delivery type is not found (eg. delivery by truck), the default delivery type by bike is returned.

Let’s test this:

```typescript
const a: Delivery = FastFood.deliverFood(DeliveryTypes.byCar);
const b: Delivery = FastFood.deliverFood(DeliveryTypes.byBike);

console.log(a.method());
// "Food delivery by a car!"

console.log(b.method());
// "Food delivery by a bike!"
```

## 5) Prototype (Clone)

This design pattern is a good choice when you need to create copies of an existing object but you don’t want to be dependent on object classes. The main signature of this pattern is ```clone``` method which is often used in JavaScript libraries.

The problem this pattern solves is the tedious process of copying the object. First, you need to create a copy object. Then you need to go through all the class fields in the original object and copy their values over to the copy object.

This process is ok until you realize that there are private fields in some objects which are not visible outside of the object.

All these problems are solved by the Prototype pattern.

A good example of the cloning process is zombies in video games or movies. If you get bitten by a zombie, you will become a zombie yourself.

![zombies](./zombies.jpg)

Let’s implement this in the code. 

```typescript
interface IZombie {
  clone(): IZombie;
  bite(): void;
}

class Zombie implements IZombie {
  public color: string;
  public strength: number;

  constructor() {
    this.color = "Green";
    this.strength = 50;
  }

  clone(): IZombie {
  	Zombie zombie = new Zombie()
    zombie.color = this.color;
    zombie.strength = this.strength;
    return zombie;
  }

  bite(): void {
    console.log("bite!");
  }
}

class Zombies {
  public allZombies: Map<string, IZombie>;

  constructor() {
    this.allZombies = new Map<string, IZombie>();
  }

  public add(key: string, prototype: IZombie) {
    this.allZombies.set(key, prototype.clone());
  }

  public get(key: string): IZombie {
    if (this.allZombies.has(key)) {
      return this.allZombies.get(key).clone();
    }
    throw new RangeError("No zombie exists with that key!");
  }
}
```

In the code, we can see the ```IZombie``` interface with ```clone``` and ```bite``` methods. 

Next, there is the ```Zombie``` class which implements the interface and creates a basic zombie, the green one with a strength of 50.

There is also a ```Zombies``` class, which contains a map of all zombies and also methods ```add``` and ```get```. Method ```add``` is for adding the zombie into a collection, and ```get``` will clone the specific zombie and return it.

We can test it like this:

```typescript
const zombies = new Zombies();

const greenZombie = new Zombie();
zombies.add("Green", greenZombie);

const blueZombie = new Zombie();
blueZombie.color = "Blue";
zombies.add("Blue", blueZombie);

// Create a strong blue zombie
const strongZombie: Zombie = <Zombie>zombies.get("Blue");
strongZombie.strength = 70;

// Create a weak green zombie
const weakZombie: Zombie = <Zombie>zombies.get("Green");
weakZombie.strength = 20;
```

That's all for the first part. Hope you find it useful. 

Stay tuned for the next part! 
