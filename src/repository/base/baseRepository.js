const { readFile } = require("fs/promises");
class BaseRepository {
  constructor({ fileName }) {
    this.fileName = fileName;
  }

  async find(itemId) {
    const fileContent = JSON.parse(await readFile(this.fileName));
    if (!itemId) return fileContent;

    return fileContent.find(({ id }) => id === itemId);
  }
}

module.exports = BaseRepository;
