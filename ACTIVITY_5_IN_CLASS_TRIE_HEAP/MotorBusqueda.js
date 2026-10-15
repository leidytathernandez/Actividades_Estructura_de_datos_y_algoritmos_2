// Utilidad: normaliza texto (minúsculas y sin tildes)
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// TRIE: guarda los productos y busca por prefijo
class TrieNode {
  constructor() {
    this.children = new Map(); // letra -> siguiente nodo
    this.producto = null; // si un producto termina en este nodo, se guarda aquí
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Inserta el nombre del producto letra por letra
  insert(producto) {
    let node = this.root;
    for (const letra of normalizar(producto.nombre)) {
      if (!node.children.has(letra)) {
        node.children.set(letra, new TrieNode());
      }
      node = node.children.get(letra);
    }
    node.producto = producto;
  }

  // Baja por el prefijo y devuelve todos los productos que cuelgan de ahí
  searchByPrefix(prefijo) {
    let node = this.root;
    for (const letra of normalizar(prefijo)) {
      if (!node.children.has(letra)) return []; 
      node = node.children.get(letra);
    }
    const resultados = [];
    this.recolectar(node, resultados);
    return resultados;
  }

  // Recorre el subárbol y junta todos los productos que encuentra
  recolectar(node, resultados) {
    if (node.producto) resultados.push(node.producto);
    for (const hijo of node.children.values()) {
      this.recolectar(hijo, resultados);
    }
  }
}

// HEAP: cola de prioridad (el menor siempre queda arriba) 
class MinHeap {
  constructor(compare) {
    this.items = [];
    this.compare = compare; // compare(a, b) < 0 significa que a va antes que b
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  push(valor) {
    this.items.push(valor);
    this.subir(this.items.length - 1);
  }

  // Saca el elemento de arriba (el menor)
  pop() {
    if (this.items.length === 0) return null;
    const menor = this.items[0];
    const ultimo = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = ultimo;
      this.bajar(0);
    }
    return menor;
  }

  // El elemento nuevo sube mientras sea menor que su padre
  subir(i) {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.compare(this.items[i], this.items[padre]) >= 0) break;
      [this.items[i], this.items[padre]] = [this.items[padre], this.items[i]];
      i = padre;
    }
  }

  // El elemento de arriba baja mientras tenga un hijo menor que él
  bajar(i) {
    const n = this.items.length;
    while (true) {
      let menor = i;
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      if (izq < n && this.compare(this.items[izq], this.items[menor]) < 0) menor = izq;
      if (der < n && this.compare(this.items[der], this.items[menor]) < 0) menor = der;
      if (menor === i) break;
      [this.items[i], this.items[menor]] = [this.items[menor], this.items[i]];
      i = menor;
    }
  }
}

// MOTOR DE BÚSQUEDA: trie + heap 
class SearchEngine {
  constructor() {
    this.trie = new Trie();
  }

  addProduct(producto) {
    this.trie.insert(producto);
  }

  // Devuelve los K productos más populares que empiezan por el prefijo
  search(prefijo, k) {
    if (k <= 0) return [];

    const coincidencias = this.trie.searchByPrefix(prefijo);

    // Heap de tamaño máximo K: arriba queda el MENOS popular de los K elegidos
    const heap = new MinHeap((a, b) => a.popularidad - b.popularidad);

    for (const producto of coincidencias) {
      if (heap.size() < k) {
        heap.push(producto);
      } else if (producto.popularidad > heap.peek().popularidad) {
        heap.pop(); // sale el menos popular
        heap.push(producto); // entra el nuevo
      }
    }

    // Del heap salen de menor a mayor popularidad: se invierte para mostrar el más popular primero
    const resultado = [];
    while (heap.size() > 0) {
      resultado.push(heap.pop());
    }
    return resultado.reverse();
  }
}

// Datos simulados
const productos = [
  { nombre: "Cámara web", popularidad: 320 },
  { nombre: "Cámara deportiva", popularidad: 150 },
  { nombre: "Camiseta deportiva", popularidad: 410 },
  { nombre: "Camisa de lino", popularidad: 95 },
  { nombre: "Cafetera", popularidad: 280 },
  { nombre: "Cable HDMI", popularidad: 505 },
  { nombre: "Cargador USB-C", popularidad: 640 },
  { nombre: "Calculadora científica", popularidad: 120 },
  { nombre: "Teclado mecánico", popularidad: 360 },
  { nombre: "Teléfono móvil", popularidad: 720 },
  { nombre: "Televisor 50 pulgadas", popularidad: 450 },
  { nombre: "Tableta gráfica", popularidad: 210 },
  { nombre: "Termo", popularidad: 175 },
  { nombre: "Mouse inalámbrico", popularidad: 390 },
  { nombre: "Monitor 24 pulgadas", popularidad: 430 },
];

const motor = new SearchEngine();
productos.forEach((producto) => motor.addProduct(producto));

// ---------- Impresión en consola ----------
function mostrar(prefijo, k) {
  console.log(`\nBúsqueda: "${prefijo}" (top ${k})`);
  const resultados = motor.search(prefijo, k);
  if (resultados.length === 0) {
    console.log("  Sin resultados");
    return;
  }
  resultados.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.nombre} - ${p.popularidad} ventas`);
  });
}

mostrar("ca", 5);
mostrar("te", 3);
mostrar("cam", 10);
mostrar("MO", 3);
mostrar("xyz", 3);