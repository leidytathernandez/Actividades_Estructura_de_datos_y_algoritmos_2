class Stack {
    constructor() {
        this.libros = [];
    }

push(value) {
    this.libros.push(value);
}

pop() {
    return this.libros.length > 0 ? this.libros.pop() : null;    
}

peek() {
    return this.libros.length > 0 ? this.libros[this.libros.length - 1] : null;
}

isEmpty() {
    return this.libros.length === 0;
}

size() {
    return this.libros.length;
}

print() {
    this.libros.slice().reverse().forEach(libros => {
        console.log(libros);
    });
}
}

const stack = new Stack();
stack.push({
    nombre: "Cien Años de Soledad",
    isbn: 1113698658, 
    autor: "Leidy Hernandez", 
    editorial: "ABC"
});

stack.push({
    nombre: 'Detras del ultimo no hay nadie', 
    isbn: 29876064, 
    autor: 'Carlos Pantoja', 
    editorial: 'ABC'
});

stack.push({
    nombre: 'Madre Siniestra', 
    isbn: 94380838, 
    autor: 'Ana Cifuenteds', 
    editorial: 'ABC'
});

console.log("--- Libros apilados ---");
stack.print();

console.log("--- pop() ---");
console.log(stack.pop());

console.log("--- peek() ---");
console.log(stack.peek());

console.log("--- isEmpty() ---");
console.log(stack.isEmpty());