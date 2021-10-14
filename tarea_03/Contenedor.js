const fs = require('fs');

class Contenedor {
  constructor(name_file) {
    this.current_id = 0;
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
      this.current_id++;
      const objs = await this.getAll();
      obj['id'] = this.current_id;
      objs.push(obj)
      await fs.promises.writeFile(this.name_file, JSON.stringify(objs, null, 2));
      return this.current_id;
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