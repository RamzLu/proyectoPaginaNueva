document.addEventListener("DOMContentLoaded", () => {
  const MiFomulario = document.getElementById("formulario-pregunta");
  const MiModal = new bootstrap.Modal(document.getElementById("preguntaModal"));

  MiFomulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    // aquí tomamos lo que el usuario ingrese y selecciona
    const descripcion = document.getElementById("descripcionPregunta").value;
    const tema = document.getElementById("temaPregunta").value;

    // validación ppara asegurar campos no vacios
    if (descripcion.trim() === "" || tema === "Selecciona una asignatura") {
      alert("Por favor complete todos los campos");
      return;
    }

    console.log("los datos estan llegando", { descripcion, tema });
    try {
      const respond = await fetch("http://localhost:3000/api/preguntas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // esto es para convertir los datos a texto json
        body: JSON.stringify({
          descripcion: descripcion,
          tema: tema,
        }),
      });

      //   revisión
      if (respond.ok) {
        alert("¡Pregunta enviada con éxito!");
        // se limpia el formulario
        MiFomulario.reset();
        MiModal.hide();

        const lista = document.getElementById("lista-preguntas");
        const nuevaPregunta = document.createElement("div");

        nuevaPregunta.classList.add("card", "mt-2", "shadow-sm");
        nuevaPregunta.style.width = "40rem";
        nuevaPregunta.innerHTML = `
 <div class="card-body col-9">
    <!-- Usuario -->
    <div class="d-flex align-items-center mb-3">
      <img src="https://via.placeholder.com/40" alt="Foto perfil" 
           class="rounded-circle me-2 border" 
           style="width:40px; height:40px; object-fit:cover;">
      <div>
        <h6 class="mb-0 fw-bold">Nombre Usuario</h6>
        <small class="text-muted">Publicado el 28/08/2025</small>
      </div>
    </div>

    <!-- Tema + descripción -->
    <span class="badge bg-primary mb-2">${tema}</span>
    <p class="card-text">${descripcion}</p>
  </div>

        `;
        lista.prepend(nuevaPregunta);
      } else {
        alert("Hubo un error al enviar una pregunta");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert(
        "No se pudo conectar con la cocina (servidor). Revisa que esté encendida."
      );
    }
  });
});

async function cargarPreguntas() {
  try {
    const resp = await fetch("http://localhost:3000/api/preguntas");
    const data = await resp.json();

    const lista = document.getElementById("lista-preguntas");
    lista.innerHTML = "";
    data.forEach((p) => {
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
        <small class="text-muted">Publicado el 28/08/2025</small>
      </div>
    </div>

    <!-- Tema + descripción -->
    <span class="badge bg-primary mb-2">${tema}</span>
    <p class="card-text">${descripcion}</p>
  </div>

`;
      lista.prepend(preguntaEl);
    });
  } catch (error) {
    console.error("Error cargando preguntas:", err);
  }
}

document.addEventListener("DOMContentLoaded", cargarPreguntas);
