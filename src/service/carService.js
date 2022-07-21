const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ fileName: cars });
  }

  getRandomPositionFromArray(list) {
    const length = list.length;
    return Math.floor(Math.random() * length);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomCarIndex];
  }

  async getAvailableCar(carCategories) {
    const carId = this.chooseRandomCar(carCategories);
    const car = await this.carRepository.find(carId);
    return car;
  }
}

module.exports = CarService;
