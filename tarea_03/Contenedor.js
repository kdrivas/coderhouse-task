const fs = require('fs');

class Contenedor {
  constructor(name_file) {
    this.name_file = name_file;

    // Inicializacion del archivo
    fs.promises.writeFile(this.name_file, '')
      .then(_ => console.log('File init'))
      .catch(error => console.log('Error:', error));
  }

  async getAll() {
    try {
      const data =  await fs.promises.readFile(this.name_file, 'utf-8');
      if (data) {
        return JSON.parse(data);
      }
      else {
        return [];
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async save(obj) {
    try {
      const objs = await this.getAll();
      if (!objs.length) {
        obj['id'] = 1;
      }
      else {
        obj['id'] = objs[objs.length - 1]['id'] + 1;
      }
      objs.push(obj)
      await fs.promises.writeFile(this.name_file, JSON.stringify(objs, null, 2));
      return obj['id'];
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getById(id) {
    try {
      const objs = await this.getAll();
      return objs.find(e => (e.id === id));
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deleteById(id) {
    try {
      const objs = await this.getAll();
      const newObjs = objs.filter(e => (e.id !== id));

      await fs.promises.writeFile(this.name_file, JSON.stringify(newObjs, null, 2));
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.name_file, '');
    } catch (error) {
      console.log('Error:', error);
    }
  }
}