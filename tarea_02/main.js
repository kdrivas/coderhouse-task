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

