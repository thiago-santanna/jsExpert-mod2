const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("./../../src/service/carService");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");

const carDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCar: require("./../mocks/valid-car.json"),
  validCarCategory: require("./../mocks/valid-carCategory.json"),
  validCostumer: require("./../mocks/valid-costumer.json"),
};

describe("CarService Suite tests", () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({ cars: carDatabase });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve the random position from an array", () => {
    const positions = [0, 1, 2, 3, 4, 5];
    const result = carService.getRandomPositionFromArray(positions);
    expect(result).to.be.lte(positions.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a CarCategory it should return available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.carRepository.find.calledWithExactly(car.id));
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});