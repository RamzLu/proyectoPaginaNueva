document.addEventListener("DOMContentLoaded", () => {
  const MiFomulario = document.getElementById("formulario-pregunta");
  const MiModal = new bootstrap.Modal(document.getElementById("preguntaModal"));
  const lista = document.getElementById("lista-preguntas");

  function renderPregunta(p) {
    const preguntaEl = document.createElement("div");
    preguntaEl.classList.add("card", "mt-2", "shadow-sm");
    preguntaEl.style.width = "40rem";
    preguntaEl.style.background =
      "linear-gradient(to bottom right, #d9e3eeff, #e9ecef)"; // Degradado de blanco muy claro a gris claro
    preguntaEl.style.border = "1px solid #dee2e6"; // Borde suave
    preguntaEl.style.borderRadius = "0.5rem"; // Bordes un poco más redondeados
    preguntaEl.innerHTML = `
      <div class="card-body">
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

      <p class="card-text">${p.descripcion}</p>
      ${
        p.imagen
          ? `<img src="http://localhost:3000/uploads/${p.imagen}" class="img-fluid rounded mt-2" alt="Imagen pregunta">`
          : ""
      }
      <div class="mt-auto">
  
  <div class="d-flex justify-content-between align-items-center original-controls">
    <span class="badge bg-secondary">${p.tema}</span>
    <button class="btn btn-danger btn-sm btn-eliminar mb-2" data-id="${p.id}">
      <i class="bi bi-trash3"></i> Eliminar
    </button>
  </div>

<div class="text-end confirmation-controls" style="display: none;">
  <button class="btn btn-secondary btn-sm btn-cancelar me-1">Cancelar</button>
  <button class="btn btn-success btn-sm btn-confirmar-eliminar">Confirmar</button>
</div>

</div>

    </div>
    `;
    lista.prepend(preguntaEl);
    const originalControls = preguntaEl.querySelector(".original-controls");
    const confirmationControls = preguntaEl.querySelector(
      ".confirmation-controls"
    );
    const btnEliminar = preguntaEl.querySelector(".btn-eliminar");
    const btnCancelar = preguntaEl.querySelector(".btn-cancelar");
    const btnConfirmar = preguntaEl.querySelector(".btn-confirmar-eliminar");

    btnEliminar.addEventListener("click", () => {
      originalControls.style.display = "none"; // Oculta los controles originales
      confirmationControls.style.display = "block"; // Muestra la confirmación
    });

    // 2. Cuando el usuario hace clic en "Cancelar"
    btnCancelar.addEventListener("click", () => {
      originalControls.style.display = "flex"; // Vuelve a mostrar los originales
      confirmationControls.style.display = "none"; // Oculta la confirmación
    });

    // 3. Cuando el usuario hace clic en "Confirmar"
    btnConfirmar.addEventListener("click", async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/api/preguntas/${p.id}`,
          { method: "DELETE" }
        );

        if (resp.ok) {
          preguntaEl.remove(); // Quita la tarjeta del DOM

          // Lanza la notificación TOAST en la esquina superior derecha
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Pregunta eliminada",
            showConfirmButton: false,
            timer: 3000, // El mensaje dura 3 segundos
            timerProgressBar: false,
          });
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Error al eliminar",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
          }); // Puedes cambiar esto por un toast de error también
          originalControls.style.display = "flex"; // Vuelve a mostrar los originales
          confirmationControls.style.display = "none";
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo conectar con el servidor");
      }
    });
  }
  async function cargarPreguntas() {
    try {
      const resp = await fetch("http://localhost:3000/api/preguntas");
      const data = await resp.json();
      data.sort(
        (a, b) =>
          new Date(b.fecha || b.createdAt) - new Date(a.fecha || a.createdAt)
      );
      lista.innerHTML = "";
      data.forEach((p) => renderPregunta(p));
    } catch (error) {
      console.error("Error cargando preguntas:", error);
    }
  }

  MiFomulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const descripcion = document.getElementById("descripcionPregunta").value;
    const tema = document.getElementById("temaPregunta").value;
    const imagen = document.getElementById("imagenPregunta").files[0];

    const formData = new FormData();
    formData.append("descripcion", descripcion);
    formData.append("tema", tema);
    if (imagen) formData.append("imagen", imagen);

    if (descripcion.trim() === "" || tema === "Selecciona una asignatura") {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Por favor, completa todos los campos",
        showConfirmButton: false,
        timer: 3500, // Un poco más de tiempo para que se lea
        timerProgressBar: false,
      });
      return;
    }

    try {
      const respond = await fetch("http://localhost:3000/api/preguntas", {
        method: "POST",
        body: formData,
      });

      if (respond.ok) {
        const nuevaPregunta = await respond.json();
        renderPregunta(nuevaPregunta);

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
