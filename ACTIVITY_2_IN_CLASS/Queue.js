function generarFechaLlegada() {
  const ahora = new Date();
  const minutosAleatorios = Math.floor(Math.random() * 120);
  ahora.setMinutes(ahora.getMinutes() - minutosAleatorios);
  return ahora;
}

class Queue {
  constructor() {
    this.personas = []; 
  }

  enqueue(persona) {
    this.personas.push(persona);
  }

  dequeue() {
    return this.personas.length > 0 ? this.personas.shift() : null;
  }

  peek() {
    return this.personas.length > 0 ? this.personas[0] : null;
  }

  isEmpty() {
    return this.personas.length === 0;
  }

  size() {
    return this.personas.length;
  }

  print() {
    const ordenados = this.personas
      .slice()
      .sort((a, b) => a.fechaLlegada - b.fechaLlegada);

    ordenados.forEach((persona) => {
      console.log(
        `${persona.nombre} | Retiro: $${persona.montoRetiro} | Llegó: ${persona.fechaLlegada.toLocaleTimeString()}`
      );
    });
  }
}

const queue = new Queue();

queue.enqueue({
  nombre: "Juan Pérez",
  montoRetiro: 150000,
  fechaLlegada: generarFechaLlegada(),
});

queue.enqueue({
  nombre: "María Gómez",
  montoRetiro: 300000,
  fechaLlegada: generarFechaLlegada(),
});

queue.enqueue({
  nombre: "Carlos Ruiz",
  montoRetiro: 80000,
  fechaLlegada: generarFechaLlegada(),
});

console.log("--- Cola de personas en el cajero, ordenada por fecha de llegada ---");
queue.print();