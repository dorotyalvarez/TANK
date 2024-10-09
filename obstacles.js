// obstacles.js

// Cargar la imagen de obstáculo
const obstacleImage = new Image();
obstacleImage.src = './rockñ.png'; // Asegúrate de que la ruta sea correcta

// Definir los obstáculos
const obstacles = [
    { x: 150, y: 100, size: 60 }, // Primer obstáculo
    { x: 300, y: 300, size: 80 } // Segundo obstáculo
];

// Función para dibujar los obstáculos en el canvas
function renderObstacles(ctx) {
    obstacles.forEach(obstacle => {
        // Dibujar la imagen del obstáculo en lugar de un rectángulo
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.size, obstacle.size);
    });
}

// Función para verificar colisiones con obstáculos
function checkObstacleCollisions(rect) {
    for (let obstacle of obstacles) {
        const obstacleRect = { x: obstacle.x, y: obstacle.y, size: obstacle.size };
        if (isColliding(rect, obstacleRect)) {
            return true; // Hay colisión
        }
    }
    return false; // No hay colisión
}