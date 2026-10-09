class PersonNode {
  constructor(nombre, edad) {
    this.tipo = "persona";
    this.nombre = nombre;
    this.edad = edad;
  }
}

class CityNode {
  constructor(nombre) {
    this.tipo = "ciudad";
    this.nombre = nombre;
  }
}

class Graph {
  constructor() {
    this.adjacency = new Map();
  }

  addNode(node) {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, []);
    }
  }

  
  addEdge(a, b) {
    this.adjacency.get(a).push(b);
    this.adjacency.get(b).push(a);
  }

  
  connectPersonToCity(person, city) {
    if (person.tipo !== "persona" || city.tipo !== "ciudad") {
      throw new Error("Solo se puede conectar una persona con una ciudad");
    }

    const yaTieneCiudad = this.adjacency
      .get(person)
      .some((vecino) => vecino.tipo === "ciudad");

    if (yaTieneCiudad) {
      throw new Error(`${person.nombre} ya está conectada a una ciudad`);
    }

    this.addEdge(person, city);
  }

  
  getPeopleInCity(cityName) {
    const city = [...this.adjacency.keys()].find(
      (nodo) =>
        nodo.tipo === "ciudad" &&
        nodo.nombre.toLowerCase() === cityName.toLowerCase()
    );

    if (!city) return [];

    return this.adjacency.get(city).filter((vecino) => vecino.tipo === "persona");
  }
}


const graph = new Graph();

const cali = new CityNode("Cali");
const bogota = new CityNode("Bogotá");
const medellin = new CityNode("Medellín");

const ana = new PersonNode("Ana", 22);
const luis = new PersonNode("Luis", 25);
const marta = new PersonNode("Marta", 30);
const pedro = new PersonNode("Pedro", 28);
const sofia = new PersonNode("Sofía", 21);

[cali, bogota, medellin, ana, luis, marta, pedro, sofia].forEach((nodo) =>
  graph.addNode(nodo)
);

graph.connectPersonToCity(ana, cali,);
graph.connectPersonToCity(luis, cali);
graph.connectPersonToCity(sofia, cali);
graph.connectPersonToCity(marta, bogota);
graph.connectPersonToCity(pedro, medellin);


function imprimirPersonasEn(ciudad) {
  const personas = graph.getPeopleInCity(ciudad);
  console.log(`Personas que viven en ${ciudad}:`);
  personas.forEach((p) => console.log(`  - ${p.nombre} (${p.edad} años)`));
}

imprimirPersonasEn("Cali");
imprimirPersonasEn("Bogotá");
imprimirPersonasEn("Medellín");


try {
  graph.connectPersonToCity(ana, bogota);
} catch (error) {
  console.log("\nError esperado:", error.message);
}