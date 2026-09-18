import { useState, useEffect } from "react";
import DoublyLinkedList from "../data-structures/DoublyLinkedList";
import mockPages from "../data-structures/mockPages";

// Creamos la lista doblemente enlazada y la llenamos con las páginas simuladas
const pageHistory = new DoublyLinkedList();
mockPages.forEach((page) => pageHistory.append(page));

function BrowserPage() {
  // Guardamos en el estado la página actual (empieza siendo la primera del historial)
  const [currentPage, setCurrentPage] = useState(pageHistory.getCurrent());

  const handleBack = () => {
    const page = pageHistory.goBack();
    setCurrentPage(page);
  };

  const handleForward = () => {
    const page = pageHistory.goForward();
    setCurrentPage(page);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🌐 Historial del Navegador</h1>

      <h2>
        Página actual: {currentPage.title} ({currentPage.url})
      </h2>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleBack}>⬅ Atrás</button>
        <button onClick={handleForward} style={{ marginLeft: "10px" }}>
          Adelante ➡
        </button>
      </div>
    </div>
  );
}

export default BrowserPage;