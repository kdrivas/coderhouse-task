class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `Este es el nombre: ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({nombre, autor});
  }

  getBookNames() {
    return this.libros.map(e => e.nombre);
  }
}

const usuario1 = new Usuario('Jose', 'Perez', [], []);
// Imprimiento nombre completo
const cadena1 = usuario1.getFullName();
console.log(cadena1);

// Agregando e imprimiendo cantidad de mascotas
usuario1.addMascota('Mascota 1');
usuario1.addMascota('Mascota 2');
usuario1.addMascota('Mascota 3');
console.log('Cantidad de mascotas:', usuario1.countMascotas());

// Agregando e imprimiento cantidad de libros
usuario1.addBook('Titulo 1', 'Autor 1')
usuario1.addBook('Titulo 2', 'Autor 2')
console.log('Estos son los nombres de los libros:', usuario1.getBookNames());
