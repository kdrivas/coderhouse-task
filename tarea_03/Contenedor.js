const fs = require('fs');

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.nameFile, 'utf-8');
      return JSON.parse(data);
    }
    catch (error) {
      console.log('Error', error);
    }
  }
}

module.exports = Contenedor;