// Datos del usuario
let userData = {
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+54 11 1234-5678",
    city: "Buenos Aires, Argentina",
    job: "Desarrollador Frontend",
    age: "28",
    joined: "Enero 2023"
};

// Alternar modo edición
function toggleEditMode() {
    document.getElementById('viewMode').style.display = 'none';
    document.getElementById('editMode').classList.add('active');
}

// Cancelar edición
function cancelEdit() {
    document.getElementById('viewMode').style.display = 'block';
    document.getElementById('editMode').classList.remove('active');
}

// Guardar perfil
function saveProfile() {
    // Obtener valores de los campos
    userData.name = document.getElementById('editName').value;
    userData.email = document.getElementById('editEmail').value;
    userData.phone = document.getElementById('editPhone').value;
    userData.city = document.getElementById('editCity').value;
    userData.job = document.getElementById('editJob').value;
    userData.age = document.getElementById('editAge').value;
    userData.joined = document.getElementById('editJoined').value;

    // Actualizar vista
    updateDisplay();
    updateInitials();
    
    // Volver a vista normal
    cancelEdit();
    
    // Efecto de guardado
    const container = document.querySelector('.profile-container');
    container.style.transform = 'scale(0.98)';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 200);
}

// Actualizar información mostrada
function updateDisplay() {
    document.getElementById('displayName').textContent = userData.name;
    document.getElementById('displayEmail').textContent = userData.email;
    document.getElementById('displayPhone').textContent = userData.phone;
    document.getElementById('displayCity').textContent = userData.city;
    document.getElementById('displayJob').textContent = userData.job;
    document.getElementById('displayAge').textContent = userData.age + ' años';
    document.getElementById('displayJoined').textContent = userData.joined;
}

// Actualizar iniciales
function updateInitials() {
    const names = userData.name.split(' ');
    const initials = names.length >= 2 
        ? names[0][0] + names[1][0] 
        : names[0][0] + (names[0][1] || '');
    
    document.getElementById('userInitials').textContent = initials.toUpperCase();
    document.getElementById('editInitials').textContent = initials.toUpperCase();
}

// Cambiar imagen de perfil (simular)
function changePicture() {
    const emojis = ['😊', '😎', '🤓', '🙂', '😄', '🤗', '😌', '🧑‍💻'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const picture = document.querySelector('.profile-picture span');
    const oldContent = picture.textContent;
    
    picture.style.transform = 'scale(0)';
    setTimeout(() => {
        picture.textContent = randomEmoji;
        picture.style.transform = 'scale(1)';
        
        // Volver a las iniciales después de 2 segundos
        setTimeout(() => {
            picture.style.transform = 'scale(0)';
            setTimeout(() => {
                picture.textContent = oldContent;
                picture.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }, 200);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    updateInitials();
});