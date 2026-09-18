// Cada nodo representa una canción dentro de la lista
class SongNode {
  constructor(song) {
    this.song = song;   // Aquí se guardan los datos de la canción (título, artista, duración, etc.)
    this.next = null;   // Al crearse, todavía no apunta a nadie
  }
}
go
class LinkedList {
  constructor() {
    this.head = null; // La lista empieza vacía, sin primer nodo
    this.size = 0;     // Contador de cuántas canciones hay
  }

  // Agrega una canción al final de la lista
  append(song) {
    const newNode = new SongNode(song);

    if (!this.head) {
      // Si la lista está vacía, el nuevo nodo se convierte en el primero
      this.head = newNode;
    } else {
      // Si ya hay elementos, recorremos hasta el último nodo
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      // Y conectamos el último nodo con el nuevo
      current.next = newNode;
    }

    this.size++;
  }

  // Convierte la lista en un arreglo normal de JS, útil para mostrarla en React
  toArray() {
    const result = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.song);
      current = current.next;
    }

    return result;
  }

  // Devuelve la canción que está en una posición específica de la lista
  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null; // posición inválida (fuera de rango)
    }

    let current = this.head;
    let counter = 0;

    while (counter < index) {
      current = current.next;
      counter++;
    }

    return current.song;
  }
}

export default LinkedList;