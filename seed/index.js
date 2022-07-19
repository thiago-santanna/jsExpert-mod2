const faker = require("faker");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Costumer = require("../src/entities/costumer");
const { join } = require("path");

const { writeFile } = require("fs/promises");
seedBaseFolder = join(__dirname, "../", "database");

const ITEMS_AMOUT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const costumers = [];
for (let index = 0; index <= ITEMS_AMOUT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  cars.push(car);
  carCategory.carIds.push(car.id);

  const costumer = new Costumer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });
  costumers.push(costumer);
}

const personalisedWriter = (fileName, data) =>
  writeFile(join(seedBaseFolder, fileName), JSON.stringify(data));

(async () => {
  await personalisedWriter("cars.json", cars);
  await personalisedWriter("costumers.json", costumers);
  await personalisedWriter("carCategories.json", [carCategory]);

  console.log("cars", cars);
  console.log("costumers", costumers);
  console.log("carCategory", carCategory);
})();
