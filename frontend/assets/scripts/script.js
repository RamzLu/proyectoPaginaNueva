
    document.getElementById('guardarPerfil').addEventListener('click', function() {
        const usuario = document.getElementById('usuario').value;
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const compania = document.getElementById('compania').value;
        const twitter = document.getElementById('twitter').value;
        const facebook = document.getElementById('facebook').value;
        const google = document.getElementById('google').value;
        const linkedin = document.getElementById('linkedin').value;
        const instagram = document.getElementById('instagram').value;
        const notifica_comentario = document.getElementById('notifica_comentario').checked;
        const notifica_respuesta = document.getElementById('notifica_respuesta').checked;
        const notifica_seguir = document.getElementById('notifica_seguir').checked;
        const notifica_noticias = document.getElementById('notifica_noticias').checked;
        const notifica_actualizaciones = document.getElementById('notifica_actualizaciones').checked;
        const notifica_blog = document.getElementById('notifica_blog').checked;

        fetch('http://localhost:3000/api/perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario, nombre, email, compania,
                twitter, facebook, google, linkedin, instagram,
                notifica_comentario, notifica_respuesta, notifica_seguir,
                notifica_noticias, notifica_actualizaciones, notifica_blog
            })
        })
        .then(res => res.json())
        .then(data => {
            alert('Datos guardados correctamente');
        })
        .catch(err => {
            alert('Error al guardar los datos');
            console.error(err);
        });
    });

    window.addEventListener('DOMContentLoaded', function() {
        fetch('http://localhost:3000/api/perfil')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    document.getElementById('usuario').value = data.usuario || '';
                    document.getElementById('nombre').value = data.nombre || '';
                    document.getElementById('email').value = data.email || '';
                    document.getElementById('compania').value = data.compania || '';
                    document.getElementById('twitter').value = data.twitter || '';
                    document.getElementById('facebook').value = data.facebook || '';
                    document.getElementById('google').value = data.google || '';
                    document.getElementById('linkedin').value = data.linkedin || '';
                    document.getElementById('instagram').value = data.instagram || '';
                    document.getElementById('notifica_comentario').checked = !!data.notifica_comentario;
                    document.getElementById('notifica_respuesta').checked = !!data.notifica_respuesta;
                    document.getElementById('notifica_seguir').checked = !!data.notifica_seguir;
                    document.getElementById('notifica_noticias').checked = !!data.notifica_noticias;
                    document.getElementById('notifica_actualizaciones').checked = !!data.notifica_actualizaciones;
                    document.getElementById('notifica_blog').checked = !!data.notifica_blog;
                }
            });
    });