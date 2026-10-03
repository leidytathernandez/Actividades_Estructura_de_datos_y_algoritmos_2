class MenuNode {
  constructor(titulo, link) {
    this.titulo = titulo;
    this.link = link;
    this.componentes = []; // los hijos: submenús de esta opción
  }

  // Agrega un submenú (hijo) a este nodo
  addComponente(nodoHijo) {
    this.componentes.push(nodoHijo);
  }
}

class NAryTree {
  constructor(root) {
    this.root = root;
  }

  // Recorrido DFS (profundidad primero): se mete lo más hondo posible por cada rama
  dfs(node = this.root, nivel = 0) {
    const sangria = "  ".repeat(nivel); // para que se vea la jerarquía con indentación
    console.log(`${sangria}- ${node.titulo} (${node.link})`);

    node.componentes.forEach((hijo) => this.dfs(hijo, nivel + 1));
  }

  // Recorrido BFS (anchura primero): nivel por nivel
  bfs() {
    const cola = [this.root];

    while (cola.length > 0) {
      const actual = cola.shift();
      console.log(`${actual.titulo} (${actual.link})`);

      actual.componentes.forEach((hijo) => cola.push(hijo));
    }
  }
}

// --- Datos simulados: construcción del menú ---
const inicio = new MenuNode("Inicio", "/home");

const productos = new MenuNode("Productos", "/products");
productos.addComponente(new MenuNode("Electrónica", "/products/electronica"));
productos.addComponente(new MenuNode("Ropa", "/products/ropa"));

const carrito = new MenuNode("Carrito", "/cart");

const perfil = new MenuNode("Perfil", "/profile");
perfil.addComponente(new MenuNode("Configuración", "/profile/config"));
perfil.addComponente(new MenuNode("Cerrar sesión", "/profile/logout"));

// "inicio" es la raíz, y el resto cuelgan de ella como opciones principales del menú
inicio.addComponente(productos);
inicio.addComponente(carrito);
inicio.addComponente(perfil);

const menu = new NAryTree(inicio);

// --- Impresión en consola ---
console.log("--- Recorrido DFS (jerárquico) ---");
menu.dfs();

console.log("\n--- Recorrido BFS (por niveles) ---");
menu.bfs();