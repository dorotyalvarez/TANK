// Cargar la imagen del enemigo
const enemyImage = new Image();
enemyImage.src = 'tanke.png'; // Reemplaza con la ruta de tu imagen

// Definir los enemigos
const enemies = [
    { x: 50, y: 50, size: 30, speed: 1, direction: Math.random() * 2 * Math.PI },
    { x: 200, y: 150, size: 30, speed: 1, direction: Math.random() * 2 * Math.PI }
];

// Función para dibujar los enemigos en el canvas
function renderEnemies(ctx) {
    enemies.forEach(enemy => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.size, enemy.size); // Usar la imagen del enemigo
    });
}

// Actualizar la posición de los enemigos
function updateEnemies() {
    enemies.forEach(enemy => {
        // Calcular el nuevo movimiento basado en su dirección
        const newEnemyX = enemy.x + Math.cos(enemy.direction) * enemy.speed;
        const newEnemyY = enemy.y + Math.sin(enemy.direction) * enemy.speed;

        // Crear un rectángulo del nuevo enemigo
        const newEnemyRect = { x: newEnemyX, y: newEnemyY, size: enemy.size };

        // Verificar colisiones con obstáculos
        if (!checkObstacleCollisions(newEnemyRect)) {
            // Si no hay colisión, actualizar la posición
            enemy.x = newEnemyX;
            enemy.y = newEnemyY;
        } else {
            // Si hay colisión, revertir el movimiento (opcionalmente puedes cambiar la dirección)
            enemy.direction = Math.random() * Math.PI * 2; // Cambiar dirección
        }

        // Limitar el movimiento de los enemigos dentro del canvas
        if (enemy.x < 0 || enemy.x + enemy.size > canvasWidth) {
            enemy.direction = Math.PI - enemy.direction; // Cambiar dirección horizontal
        }
        if (enemy.y < 0 || enemy.y + enemy.size > canvasHeight) {
            enemy.direction = -enemy.direction; // Cambiar dirección vertical
        }
    });

    // Llamar a la función de disparo de enemigos
    shootFromEnemies();
}

// Variables de balas de enemigos
let enemyBullets = [];
const enemyBulletSpeed = 2;
const enemyBulletSize = 5;

// Disparar balas enemigas de forma aleatoria
function shootFromEnemies() {
    enemies.forEach(enemy => {
        // Aumentar la probabilidad de disparo para pruebas
        if (Math.random() < 0.01) { // 10% de probabilidad
            const bullet = {
                x: enemy.x + enemy.size / 2 - enemyBulletSize / 2,
                y: enemy.y + enemy.size / 2 - enemyBulletSize / 2,
                direction: Math.floor(Math.random() * 4) // Dirección aleatoria
            };
            enemyBullets.push(bullet);
        }
    });
}

// Actualizar las balas de los enemigos
function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let bullet = enemyBullets[i];

        // Mover la bala en una dirección aleatoria
        if (bullet.direction === 0) bullet.y -= enemyBulletSpeed; // Arriba
        if (bullet.direction === 1) bullet.x += enemyBulletSpeed; // Derecha
        if (bullet.direction === 2) bullet.y += enemyBulletSpeed; // Abajo
        if (bullet.direction === 3) bullet.x -= enemyBulletSpeed; // Izquierda

        // Eliminar balas que salen del canvas
        if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
            enemyBullets.splice(i, 1);
        }
    }
}

// Dibujar las balas de los enemigos en el canvas
function renderEnemyBullets(ctx) {
    ctx.fillStyle = 'blue';
    enemyBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, enemyBulletSize, enemyBulletSize);
    });
}