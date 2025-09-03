document.addEventListener("DOMContentLoaded", () => {
  const MiFomulario = document.getElementById("formulario-pregunta");
  const MiModal = new bootstrap.Modal(document.getElementById("preguntaModal"));
  const lista = document.getElementById("lista-preguntas");

  function renderPregunta(p) {
    const preguntaEl = document.createElement("div");
    preguntaEl.classList.add("card", "mt-2", "shadow-sm");
    preguntaEl.style.width = "40rem";
    preguntaEl.innerHTML = `
      <div class="card-body col-9">
        <!-- Usuario -->
        <div class="d-flex align-items-center mb-3">
          <img src="https://via.placeholder.com/40" alt="Foto perfil" 
               class="rounded-circle me-2 border" 
               style="width:40px; height:40px; object-fit:cover;">
          <div>
            <h6 class="mb-0 fw-bold">Nombre Usuario</h6>
            <small class="text-muted">
              Publicado el ${new Date(p.createdAt).toLocaleString()}
            </small>
          </div>
        </div>

        <span class="badge bg-primary mb-2">${p.tema}</span>
        <p class="card-text">${p.descripcion}</p>
         <button class="btn btn-danger btn-sm btn-eliminar" data-id="${p.id}">
        Eliminar
      </button>
      </div>
    `;
    lista.prepend(preguntaEl);

    const btnEliminar = preguntaEl.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", async () => {
      if (confirm("¿Seguro que deseas eliminar esta pregunta?")) {
        try {
          const resp = await fetch(
            `http://localhost:3000/api/preguntas/${p.id}`,
            {
              method: "DELETE",
            }
          );

          if (resp.ok) {
            preguntaEl.remove(); // la quitamos del DOM
            alert("Pregunta eliminada");
          } else {
            alert("Error al eliminar la pregunta");
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
          alert("No se pudo conectar con el servidor");
        }
      }
    });
  }

  async function cargarPreguntas() {
    try {
      const resp = await fetch("http://localhost:3000/api/preguntas");
      const data = await resp.json();
      lista.innerHTML = "";
      data.forEach(renderPregunta);
    } catch (error) {
      console.error("Error cargando preguntas:", error);
    }
  }

  MiFomulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const descripcion = document.getElementById("descripcionPregunta").value;
    const tema = document.getElementById("temaPregunta").value;

    if (descripcion.trim() === "" || tema === "Selecciona una asignatura") {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      const respond = await fetch("http://localhost:3000/api/preguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, tema }),
      });

      if (respond.ok) {
        const nuevaPregunta = await respond.json();
        renderPregunta(nuevaPregunta);

        alert("¡Pregunta enviada con éxito!");
        MiFomulario.reset();
        MiModal.hide();
      } else {
        alert("Hubo un error al enviar una pregunta");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Revisa que esté encendido.");
    }
  });

  cargarPreguntas();
});
