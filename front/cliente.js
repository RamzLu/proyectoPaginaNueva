document.addEventListener("DOMContentLoaded", () => {
  const MiFomulario = document.getElementById("formulario-pregunta");
  const MiModal = new bootstrap.Modal(document.getElementById("preguntaModal"));
  const lista = document.getElementById("lista-preguntas");

  function renderPregunta(p) {
    const preguntaEl = document.createElement("div");
    preguntaEl.classList.add("card", "mt-2", "shadow-sm");
    preguntaEl.style.width = "40rem";
    preguntaEl.style.background =
      "linear-gradient(to bottom right, #d9e3eeff, #e9ecef)";
    preguntaEl.style.border = "1px solid #dee2e6";
    preguntaEl.style.borderRadius = "0.5rem";
    preguntaEl.innerHTML = `
      <div class="card-body">
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
            <div>
                <span class="badge bg-secondary">${p.tema}</span>
               
                <button class="btn btn-sm btn-light ms-2 btn-respuestas mt-1" data-id="${
                  p.id
                }">
                    <i class="bi bi-chat-dots"></i> Ver Respuestas
                </button>
            </div>
            <button class="btn btn-danger btn-sm btn-eliminar" data-id="${
              p.id
            }">
              <i class="bi bi-trash3"></i> Eliminar
            </button>
          </div>
          <div class="text-end confirmation-controls" style="display: none;">
            <button class="btn btn-secondary btn-sm btn-cancelar me-1">Cancelar</button>
            <button class="btn btn-success btn-sm btn-confirmar-eliminar">Confirmar</button>
          </div>
        </div>
        <div class="respuestas-container mt-3" style="display: none;"></div>
      </div>
    `;
    lista.prepend(preguntaEl);

    // Lógica para eliminar
    const originalControls = preguntaEl.querySelector(".original-controls");
    const confirmationControls = preguntaEl.querySelector(
      ".confirmation-controls"
    );
    const btnEliminar = preguntaEl.querySelector(".btn-eliminar");
    const btnCancelar = preguntaEl.querySelector(".btn-cancelar");
    const btnConfirmar = preguntaEl.querySelector(".btn-confirmar-eliminar");

    btnEliminar.addEventListener("click", () => {
      originalControls.style.display = "none";
      confirmationControls.style.display = "block";
    });

    btnCancelar.addEventListener("click", () => {
      originalControls.style.display = "flex";
      confirmationControls.style.display = "none";
    });

    // --- CÓDIGO CORREGIDO AQUÍ ---
    btnConfirmar.addEventListener("click", async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/api/preguntas/${p.id}`,
          { method: "DELETE" }
        );

        if (resp.ok) {
          preguntaEl.remove(); // Quita la tarjeta del DOM
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Pregunta eliminada",
            showConfirmButton: false,
            timer: 3000,
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
          });
          originalControls.style.display = "flex";
          confirmationControls.style.display = "none";
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo conectar con el servidor");
      }
    });

    // Lógica para respuestas
    const btnRespuestas = preguntaEl.querySelector(".btn-respuestas");
    const respuestasContainer = preguntaEl.querySelector(
      ".respuestas-container"
    );

    btnRespuestas.addEventListener("click", async () => {
      const isVisible = respuestasContainer.style.display === "block";
      if (isVisible) {
        respuestasContainer.style.display = "none";
        btnRespuestas.innerHTML =
          '<i class="bi bi-chat-dots"></i> Ver Respuestas';
      } else {
        respuestasContainer.style.display = "block";
        btnRespuestas.innerHTML =
          '<i class="bi bi-x-circle"></i> Ocultar Respuestas';
        await cargarRespuestas(p.id, respuestasContainer);
      }
    });
  }

  async function cargarRespuestas(preguntaId, container) {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/respuestas/${preguntaId}`
      );
      const respuestas = await resp.json();
      container.innerHTML = `
        <hr>
        <h6>Respuestas:</h6>
      `;
      if (respuestas.length > 0) {
        respuestas.forEach((r) => {
          const respEl = document.createElement("div");
          respEl.classList.add("alert", "alert-light", "py-2", "px-3", "mb-2");
          respEl.innerHTML = `
            <div class="d-flex align-items-center">
              <img src="https://via.placeholder.com/30" class="rounded-circle me-2 border" style="width:30px; height:30px; object-fit:cover;">
              <div>
                <strong>Otro Usuario</strong>
                <p class="mb-0 small">${r.contenido}</p>
              </div>
            </div>
          `;
          container.appendChild(respEl);
        });
      } else {
        container.innerHTML +=
          '<p class="text-muted small">Aún no hay respuestas.</p>';
      }

      // Formulario para nueva respuesta
      const formRespuesta = document.createElement("form");
      formRespuesta.innerHTML = `
        <div class="input-group mt-3">
          <input type="text" class="form-control form-control-sm" placeholder="Escribe una respuesta..." required>
          <button class="btn btn-primary btn-sm" type="submit">Responder</button>
        </div>
      `;
      container.appendChild(formRespuesta);

      formRespuesta.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = formRespuesta.querySelector("input");
        const contenido = input.value.trim();

        if (contenido) {
          try {
            const postResp = await fetch(
              `http://localhost:3000/api/respuestas/${preguntaId}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contenido }),
              }
            );
            if (postResp.ok) {
              await cargarRespuestas(preguntaId, container); // Recargar
            } else {
              alert("Error al enviar la respuesta.");
            }
          } catch (error) {
            console.error("Error al publicar respuesta:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error cargando respuestas:", error);
      container.innerHTML =
        '<p class="text-danger small">No se pudieron cargar las respuestas.</p>';
    }
  }

  async function cargarPreguntas() {
    try {
      const resp = await fetch("http://localhost:3000/api/preguntas");
      const data = await resp.json();
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
        timer: 3500,
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
