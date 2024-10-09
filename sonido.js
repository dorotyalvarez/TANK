// Obtener elementos de control de sonido
const bgVolumeControl = document.getElementById('bg-volume');
const sfxVolumeControl = document.getElementById('sfx-volume');

// Establecer el volumen inicial
backgroundMusic.volume = bgVolumeControl.value; // Música de fondo
victorySound.volume = sfxVolumeControl.value; // Efecto de sonido de victoria
defeatSound.volume = sfxVolumeControl.value; // Efecto de sonido de derrota

// Función para actualizar el volumen de la música de fondo
bgVolumeControl.addEventListener('input', (event) => {
    backgroundMusic.volume = event.target.value; // Ajustar volumen de música
});

// Función para actualizar el volumen de los efectos de sonido
sfxVolumeControl.addEventListener('input', (event) => {
    victorySound.volume = event.target.value; // Ajustar volumen de victoria
    defeatSound.volume = event.target.value; // Ajustar volumen de derrota
});
// Guardar volumen de música en localStorage
bgVolumeControl.addEventListener('input', (event) => {
    backgroundMusic.volume = event.target.value; // Ajustar volumen de música
    localStorage.setItem('bgVolume', event.target.value); // Guardar en localStorage
});

// Cargar volumen de música desde localStorage
const savedBgVolume = localStorage.getItem('bgVolume');
if (savedBgVolume) {
    bgVolumeControl.value = savedBgVolume;
    backgroundMusic.volume = savedBgVolume;
}

// Guardar volumen de efectos en localStorage
sfxVolumeControl.addEventListener('input', (event) => {
    victorySound.volume = event.target.value; // Ajustar volumen de victoria
    defeatSound.volume = event.target.value; // Ajustar volumen de derrota
    localStorage.setItem('sfxVolume', event.target.value); // Guardar en localStorage
});

// Cargar volumen de efectos desde localStorage
const savedSfxVolume = localStorage.getItem('sfxVolume');
if (savedSfxVolume) {
    sfxVolumeControl.value = savedSfxVolume;
    victorySound.volume = savedSfxVolume;
    defeatSound.volume = savedSfxVolume;
}