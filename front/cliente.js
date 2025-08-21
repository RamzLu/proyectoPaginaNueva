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
