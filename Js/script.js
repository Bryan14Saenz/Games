// Windows
const carga = document.getElementById("carga");
const main = document.getElementById("main");
const clasico = document.getElementById("clasico");
const avanzado = document.getElementById("avanzado");
const laberinto = document.getElementById("laberinto");

// Botones
const btnAtras = document.querySelectorAll(".btnAtras");
const btnClasico = document.getElementById("btnClasico");
const btnAvanzado = document.getElementById("btnAvanzado");
const btnLaberinto = document.getElementById("btnLaberinto");

// Botones del Juego 1
const btnPiedra = document.getElementById("btnPiedra");
const btnPapel = document.getElementById("btnPapel");
const btnTijeras = document.getElementById("btnTijera");

// Botones del Juego 2
const btnPiedraJ2 = document.getElementById("btnPiedraJ2");
const btnPapelJ2 = document.getElementById("btnPapelJ2");
const btnTijerasJ2 = document.getElementById("btnTijeraJ2");
const btnLizardJ2 = document.getElementById("btnLagartoJ2");
const btnSpockJ2 = document.getElementById("btnSpockJ2");

// Juego 1
const resJuego1 = document.getElementById("resultadoJuego1");
const divPuntos = document.getElementById("puntuacion");
const puntosJugador = document.getElementById("puntosJugador");
const puntosComputer = document.getElementById("puntosComputer");

// Juego 2
const resJuego2 = document.getElementById("resultadoJuego2");
const divPuntosJ2 = document.getElementById("puntuacionJ2");
const puntosJugadorJ2 = document.getElementById("puntosJugadorJ2");
const puntosComputerJ2 = document.getElementById("puntosComputerJ2");

// Juego 3
const generarLaberinto = (tam = 15) => {
  const lab = Array.from({ length: tam }, () => Array(tam).fill("pared"));

  // Direcciones: arriba, abajo, izquierda, derecha
  const dirs = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  function enRango(x, y) {
    return x > 0 && x < tam - 1 && y > 0 && y < tam - 1;
  }

  function mezclar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function dfs(x, y) {
    lab[x][y] = "camino";
    for (const [dx, dy] of mezclar([...dirs])) {
      const nx = x + dx,
        ny = y + dy;
      if (enRango(nx, ny) && lab[nx][ny] === "pared") {
        // Quita la pared intermedia
        lab[x + dx / 2][y + dy / 2] = "camino";
        dfs(nx, ny);
      }
    }
  }

  // Empieza en (1,1)
  dfs(1, 1);

  // Coloca inicio y meta
  lab[1][1] = "inicio";
  lab[tam - 2][tam - 2] = "meta";

  // Bordes como pared
  for (let i = 0; i < tam; i++) {
    lab[0][i] = "pared";
    lab[tam - 1][i] = "pared";
    lab[i][0] = "pared";
    lab[i][tam - 1] = "pared";
  }

  return lab;
};
const laberintoNivel = generarLaberinto(15);
const player = () => {
  const playerImg = document.createElement("img");

  playerImg.src = "../Assets/Svg/Player.svg";
  playerImg.className =
    "absolute z-20 w-10 h-10 transition-transform duration-300";

  return playerImg;
};

// Función de Carga
setTimeout(() => {
  carga.remove();
  main.classList.remove("hidden");
}, 1000);

// Eventos de los Botones
btnAtras.forEach((button) => {
  button.addEventListener("click", () => {
    clasico.classList.add("hidden");
    avanzado.classList.add("hidden");
    laberinto.classList.add("hidden");
    main.classList.remove("hidden");

    resJuego1.innerHTML = "";
    puntosJugador.textContent = "0";
    puntosComputer.textContent = "0";
    divPuntos.textContent = "Puntuación: 0 - 0";
  });
});

btnClasico.addEventListener("click", () => {
  main.classList.add("hidden");
  clasico.classList.remove("hidden");
});

btnAvanzado.addEventListener("click", () => {
  main.classList.add("hidden");
  avanzado.classList.remove("hidden");
});

btnLaberinto.addEventListener("click", () => {
  main.classList.add("hidden");
  laberinto.classList.remove("hidden");

  laberinto.innerHTML = "";

  if (window.matchMedia("(max-width: 1024px)").matches) {
    const info = document.createElement("h2");
    info.className = "text-white text-2xl font-bold text-center m-4 ";
    info.textContent =
      "El laberinto no se ha generado, por favor, cambia a una pantalla más grande para jugar.";

    laberinto.appendChild(info);
  } else {
    laberinto.appendChild(crearLaberinto(laberintoNivel));
  }

  if (!window.laberintoListener) {
    document.addEventListener("keydown", moverJugador);
    window.laberintoListener = true;
  }
});

btnPiedra.addEventListener("click", () => {
  const resJugador = "🪨";
  const resComputer = obtenerResComputer();
  const resultado = determinarGanador(resJugador, resComputer);

  mostrarResultado(resultado, resJugador, resComputer);
});

btnPapel.addEventListener("click", () => {
  const resJugador = "📃";
  const resComputer = obtenerResComputer();
  const resultado = determinarGanador(resJugador, resComputer);

  mostrarResultado(resultado, resJugador, resComputer);
});

btnTijeras.addEventListener("click", () => {
  const resJugador = "✂️";
  const resComputer = obtenerResComputer();
  const resultado = determinarGanador(resJugador, resComputer);

  mostrarResultado(resultado, resJugador, resComputer);
});

btnPiedraJ2.addEventListener("click", () => {
  const resJugador = "🪨";
  const resComputer = obtenerResComputerJ2();
  const resultado = determinarGanadorJ2(resJugador, resComputer);

  mostrarResultadoJ2(resultado, resJugador, resComputer);
});

btnPapelJ2.addEventListener("click", () => {
  const resJugador = "📃";
  const resComputer = obtenerResComputerJ2();
  const resultado = determinarGanadorJ2(resJugador, resComputer);
  mostrarResultadoJ2(resultado, resJugador, resComputer);
});

btnTijerasJ2.addEventListener("click", () => {
  const resJugador = "✂️";
  const resComputer = obtenerResComputerJ2();
  const resultado = determinarGanadorJ2(resJugador, resComputer);

  mostrarResultadoJ2(resultado, resJugador, resComputer);
});

btnLizardJ2.addEventListener("click", () => {
  const resJugador = "🦎";
  const resComputer = obtenerResComputerJ2();
  const resultado = determinarGanadorJ2(resJugador, resComputer);

  mostrarResultadoJ2(resultado, resJugador, resComputer);
});

btnSpockJ2.addEventListener("click", () => {
  const resJugador = "🖖";
  const resComputer = obtenerResComputerJ2();
  const resultado = determinarGanadorJ2(resJugador, resComputer);
  mostrarResultadoJ2(resultado, resJugador, resComputer);
});

// Funciones
const obtenerResComputer = () => {
  const opciones = ["🪨", "📃", "✂️"];
  const randomIndex = Math.floor(Math.random() * opciones.length);
  return opciones[randomIndex];
};

const determinarGanador = (jugador, computer) => {
  if (jugador === computer) {
    return "Empate";
  } else if (
    (jugador === "🪨" && computer === "✂️") ||
    (jugador === "📃" && computer === "🪨") ||
    (jugador === "✂️" && computer === "📃")
  ) {
    return "Jugador gana";
  } else {
    return "Computer gana";
  }
};

const mostrarResultado = (resultado, resJugador, resComputer) => {
  const resultadoDiv = document.createDocumentFragment();
  const resultText = document.createElement("p");

  resultText.className =
    "text-lg font-bold text-white max-sm:text-sm text-balanced";
  resultText.textContent = `Jugador: ${resJugador} - Computer: ${resComputer} - ${resultado}`;

  if (resultado === "Jugador gana") {
    puntosJugador.textContent = parseInt(puntosJugador.textContent) + 1;
  } else if (resultado === "Computer gana") {
    puntosComputer.textContent = parseInt(puntosComputer.textContent) + 1;
  }

  divPuntos.textContent = `Puntuación: ${puntosJugador.textContent} - ${puntosComputer.textContent}`;

  resultadoDiv.appendChild(resultText);
  resJuego1.appendChild(resultadoDiv);
};

const obtenerResComputerJ2 = () => {
  const opciones = ["🪨", "📃", "✂️", "🦎", "🖖"];
  const randomIndex = Math.floor(Math.random() * opciones.length);
  return opciones[randomIndex];
};

const determinarGanadorJ2 = (jugador, computer) => {
  if (jugador === computer) {
    return "Empate";
  } else if (
    (jugador === "🪨" && (computer === "✂️" || computer === "🦎")) ||
    (jugador === "📃" && (computer === "🪨" || computer === "🖖")) ||
    (jugador === "✂️" && (computer === "📃" || computer === "🦎")) ||
    (jugador === "🦎" && (computer === "📃" || computer === "🖖")) ||
    (jugador === "🖖" && (computer === "🪨" || computer === "✂️"))
  ) {
    return "Jugador gana";
  } else {
    return "Computer gana";
  }
};

const mostrarResultadoJ2 = (resultado, resJugador, resComputer) => {
  const resultadoDiv = document.createDocumentFragment();
  const resultText = document.createElement("p");

  resultText.className = "text-lg font-bold text-white max-sm:text-sm text-balanced";
  resultText.textContent = `Jugador: ${resJugador} - Computer: ${resComputer} - ${resultado}`;
  if (resultado === "Jugador gana") {
    puntosJugadorJ2.textContent = parseInt(puntosJugadorJ2.textContent) + 1;
  } else if (resultado === "Computer gana") {
    puntosComputerJ2.textContent = parseInt(puntosComputerJ2.textContent) + 1;
  }

  divPuntosJ2.textContent = `Puntuación: ${puntosJugadorJ2.textContent} - ${puntosComputerJ2.textContent}`;

  resultadoDiv.appendChild(resultText);
  resJuego2.appendChild(resultadoDiv);
};

const crearLaberinto = (laberinto) => {
  const contenedorLaberinto = document.createElement("div");
  contenedorLaberinto.className =
    "relative flex flex-col items-center justify-center border bg-gray-800 rounded-lg shadow-lg p-4";

  laberinto.forEach((fila, i) => {
    const filaDiv = document.createElement("div");
    filaDiv.className = "flex";

    fila.forEach((celda, j) => {
      const celdaDiv = document.createElement("div");
      celdaDiv.className = `w-10 h-10 border border-gray-600 ${
        celda === "pared" ? "bg-black" : ""
      } ${celda === "inicio" ? "bg-green-500" : ""} ${
        celda === "meta" ? "bg-yellow-500" : ""
      }`;

      if (celda === "pared") {
        celdaDiv.classList.add("pared");
      }

      if (celda === "camino") {
        celdaDiv.classList.add("camino");
      }

      if (celda === "meta") {
        celdaDiv.classList.add("meta");
      }

      // Añadir el jugador en la celda de inicio
      if (celda === "inicio" && !document.getElementById("jugador")) {
        celdaDiv.appendChild(player());
        celdaDiv.id = "jugador";
      }

      filaDiv.appendChild(celdaDiv);
    });

    contenedorLaberinto.appendChild(filaDiv);
  });

  return contenedorLaberinto;
};

const moverJugador = (e) => {
  const jugPosicion = document.getElementById("jugador");

  if (!jugPosicion) return;

  const filaDiv = jugPosicion.parentElement;
  const i = Array.from(filaDiv.parentElement.children).indexOf(filaDiv);
  const j = Array.from(filaDiv.children).indexOf(jugPosicion);

  let posicionX = i;
  let posicionY = j;

  switch (e.key) {
    case "ArrowUp":
      posicionX--;
      break;

    case "ArrowDown":
      posicionX++;
      break;

    case "ArrowLeft":
      posicionY--;
      break;

    case "ArrowRight":
      posicionY++;
      break;

    default:
      return;
  }

  const nuevaFilaDiv = filaDiv.parentElement.children[posicionX];
  if (!nuevaFilaDiv) return;

  const nuevaCeldaDiv = nuevaFilaDiv.children[posicionY];
  if (!nuevaCeldaDiv || nuevaCeldaDiv.classList.contains("pared")) return;

  nuevaCeldaDiv.appendChild(jugPosicion.firstChild);
  jugPosicion.removeAttribute("id");
  nuevaCeldaDiv.id = "jugador";

  if (nuevaCeldaDiv.classList.contains("meta")) {
    alert("¡Has ganado!");
  }
};
