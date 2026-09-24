/* ===== DATOS DE PRUEBA ===== */
const rutas = [
  { origen: "Somoto", destino: "Matagalpa", salida: "8:00 AM", llegada: "9:00 AM", duracion: "1h" },
  { origen: "Esteli", destino: "Somoto", salida: "8:30 AM", llegada: "10:00 AM", duracion: "1h 30m" },
  { origen: "Ocotal", destino: "Pueblo Nuevo", salida: "9:00 AM", llegada: "10:15 AM", duracion: "1h 15m" },
  { origen: "Jalapa", destino: "Esteli", salida: "10:00 AM", llegada: "11:30 AM", duracion: "1h 30m" },
  { origen: "Esteli", destino: "Ocotal", salida: "9:30 AM", llegada: "10:45 AM", duracion: "1h 15m" },
  { origen: "Somoto", destino: "Jalapa", salida: "11:00 AM", llegada: "12:15 PM", duracion: "1h 15m" }
];

/* ===== MOSTRAR TODAS LAS RUTAS ===== */
function mostrarRutas(inicio = "") {
  const lista = document.getElementById("lista-rutas");
  lista.innerHTML = "";
  rutas.filter(r => inicio === "" || (r.origen === inicio)).forEach(r => {
    lista.innerHTML += `
      <div class="tarjeta-ruta">
        <h3>${r.origen} → ${r.destino}</h3>
        <p>Salida: ${r.salida} · Llegada: ${r.llegada}</p>
        <p class="duracion">⏱ ${r.duracion}</p>
        <p class="precio">💰 ${r.precio}</p>
      </div>`;
  });
}

/* ===== BUSCAR RUTAS POR ORIGEN/DESTINO ===== */
function buscarRutas() {
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;

  const lista = document.getElementById("lista-rutas");
  lista.innerHTML = "";

  const encontradas = rutas.filter(r => r.origen === origen && r.destino === destino);

  if (encontradas.length === 0) {
    lista.innerHTML = `<p style="color:#ef4444">No hay rutas directas de ${origen} a ${destino}. Prueba otra combinación.</p>`;
  } else {
    encontradas.forEach(r => {
      lista.innerHTML += `
        <div class="tarjeta-ruta">
          <h3>${r.origen} → ${r.destino}</h3>
          <p>Salida: ${r.salida} · Llegada: ${r.llegada}</p>
          <p class="duracion">⏱ ${r.duracion}</p>
          <p class="precio">💰 ${r.precio}</p>
        </div>`;
    });
    document.getElementById("rutas").scrollIntoView({ behavior: "smooth" });
  }
}

/* ===== RASTREO DE ENCOMIENDA (simulado) ===== */
function rastrear() {
  const guia = document.getElementById("guia").value.trim();

  if (guia === "") {
    alert("Escribe un número de guía.");
    return;
  }

  const resultado = document.getElementById("resultado");
  resultado.classList.remove("oculto");
  document.getElementById("guia-mostrada").textContent = guia;

  /* Simula el avance: usa retraso si el número termina en impar */
  const hayRetraso = parseInt(guia.slice(-1)) % 2 === 1;
  const estado = document.getElementById("estado-paquete");
  const paso3 = document.getElementById("paso3");

  if (hayRetraso) {
    estado.textContent = "⚠ Retraso";
    estado.classList.add("retraso");
    paso3.textContent = "Retrasado: nueva llegada estimada 8:30 PM";
    paso3.className = "pendiente";
    document.getElementById("progreso").style.width = "60%";
  } else {
    estado.textContent = "En camino";
    estado.classList.remove("retraso");
    paso3.textContent = "Llegada estimada: hoy 6:00 PM";
    paso3.className = "pendiente";
    document.getElementById("progreso").style.width = "75%";
  }

  document.getElementById("encomiendas").scrollIntoView({ behavior: "smooth" });
}

/* ===== TABLA DE HORARIOS ===== */
const cuerpoTabla = document.getElementById("cuerpo-horarios");
rutas.forEach(r => {
  cuerpoTabla.innerHTML += `
    <tr>
      <td>${r.origen} → ${r.destino}</td>
      <td>${r.salida}</td>
      <td>${r.llegada}</td>
      <td>${r.duracion}</td>
      <td>${r.precio}</td>
    </tr>`;
});

/* ===== AL INICIAR ===== */
mostrarRutas();

/* ===== LOGIN (solo diseño - sin base de datos) ===== */
function abrirLogin() {
  document.getElementById("login-modal").classList.remove("oculto");
}

function cerrarLogin() {
  document.getElementById("login-modal").classList.add("oculto");
}

function ingresarDemo() {
  /* Prototipo: no valida contraseñas reales. Solo simula el ingreso. */
  const usuario = document.getElementById("login-usuario").value || "invitado";
  const mensaje = document.getElementById("login-mensaje");
  mensaje.textContent = "¡Bienvenido, " + usuario + "! (prototipo: el login real llegará con base de datos)";
  mensaje.classList.remove("oculto");
  setTimeout(cerrarLogin, 1500);
}

/* Cierra el login si se presiona la tecla ESC */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") cerrarLogin();
});