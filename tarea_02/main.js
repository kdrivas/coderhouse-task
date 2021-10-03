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
      await fs.promises.writeFile(this.name_file, JSON.stringify(objs));
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

      await fs.promises.writeFile(this.name_file, JSON.stringify(newObjs));
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

(
  async () => {
    const testCont = new Contenedor('myFile.txt');

    await testCont.save({
      'title': 'Escuadra',
      'price': 123.23,
      'thumbnail': 'http1'
    });

    await testCont.save({
      'title': 'Calc',
      'price': 521.12,
      'thumbnail': 'http2'
    });

    await testCont.save({
      'title': 'Globo',
      'price': 601.35,
      'thumbnail': 'http3'
    });

    const allProds = await testCont.getAll();
    console.log('Productos:', allProds);

    const prod = await testCont.getById(2);
    console.log('Producto con ID 2:', prod);

    await testCont.deleteById(1);
    const newAllProds = await testCont.getAll();
    console.log('Productos despues de eliminar ID 1:', newAllProds);

    await testCont.deleteAll();
    const newDelProds = await testCont.getAll();
    console.log('Productos despues de eliminar todo:', newDelProds);
  }
)();

