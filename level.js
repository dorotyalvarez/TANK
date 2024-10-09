// level.js
let enemiesCount = 0;

// Función para establecer la cantidad de enemigos según el nivel
function setLevel(level) {
    if (level === 1) {
        enemiesCount = 2;
    } else if (level === 2) {
        enemiesCount = 4;
    } else if (level === 3) {
        enemiesCount = 6;
    }
}

// Función para inicializar los enemigos
function initializeEnemies() {
    enemies.length = 0; // Limpiar enemigos existentes
    for (let i = 0; i < enemiesCount; i++) {
        enemies.push({
            x: Math.random() * (canvasWidth - 30),
            y: Math.random() * (canvasHeight - 30),
            size: 30,
            speed: 1,
            direction: Math.random() * 2 * Math.PI,
        });
    }
}