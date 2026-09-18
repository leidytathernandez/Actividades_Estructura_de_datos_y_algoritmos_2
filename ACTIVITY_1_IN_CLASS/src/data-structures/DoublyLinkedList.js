// Cada nodo representa una página visitada en el navegador
class PageNode {
  constructor(page) {
    this.page = page;   // Datos de la página (url, título, etc.)
    this.next = null;   // Apunta a la página siguiente (hacia adelante)
    this.prev = null;   // Apunta a la página anterior (hacia atrás)
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;    // Primera página visitada
    this.tail = null;    // Última página visitada
    this.current = null; // Página en la que estás parada ahora mismo
    this.size = 0;
  }

  // Agrega una página nueva al final del historial
  append(page) {
    const newNode = new PageNode(page);

    if (!this.head) {
      // Si el historial está vacío, esta página es la primera y la actual
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      // Conectamos el nuevo nodo al final, en ambas direcciones
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Retrocede a la página anterior (si existe)
  goBack() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current ? this.current.page : null;
  }

  // Avanza a la página siguiente (si existe)
  goForward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current ? this.current.page : null;
  }

  // Devuelve la página en la que estás parada actualmente
  getCurrent() {
    return this.current ? this.current.page : null;
  }

  // Convierte todo el historial en un arreglo (por si quieres mostrarlo completo)
  toArray() {
    const result = [];
    let node = this.head;
    while (node !== null) {
      result.push(node.page);
      node = node.next;
    }
    return result;
  }
}

export default DoublyLinkedList;