import { useState } from "react";
import LinkedList from "../data-structures/LinkedList";
import mockSongs from "../data-structures/mockSongs";

// Creamos la lista y la llenamos UNA sola vez con los datos simulados
const songList = new LinkedList();
mockSongs.forEach((song) => songList.append(song));

function SongsPage() {
  // Guardamos en el estado la posición (índice) de la canción actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pedimos a la lista enlazada la canción que está en esa posición
  const currentSong = songList.getAt(currentIndex);

  const handleNext = () => {
    // Solo avanzamos si no estamos ya en la última canción
    if (currentIndex < songList.size - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    // Solo retrocedemos si no estamos ya en la primera canción
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎵 Reproductor de Canciones</h1>

      <h2>
        Estás escuchando: {currentSong.title} - {currentSong.artist}
      </h2>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          ⬅ Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === songList.size - 1}
          style={{ marginLeft: "10px" }}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}

export default SongsPage;