let backgroundImage = new Image();
backgroundImage.src = './mapa.jpg';
let tankImage = new Image();
tankImage.src = './carro.png'; //  la ruta de tu imagen de tanque
// Obtener el canvas y el contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: true });

// Seleccionar los elementos del DOM
const menu = document.getElementById('menu');
const gameCanvas = document.getElementById('gameCanvas');


function startGame(level) {
    console.log(`Nivel ${level} seleccionado`); // Mostrar nivel seleccionado en consola
    selectLevel(level); // Llamar a la función para establecer el nivel
    gameCanvas.style.display = 'block'; // Asegúrate de que el canvas esté visible
    gameCanvas.focus(); // Dar el foco al canvas para recibir eventos de teclado
    gameLoop(); // Iniciar el bucle del juego
}

// Escuchar clics en los botones del menú
document.getElementById('level1').addEventListener('click', function() {
    startGame(1); // Iniciar el juego con el nivel 1
});
document.getElementById('level2').addEventListener('click', function() {
    startGame(2); // Iniciar el juego con el nivel 2
});
document.getElementById('level3').addEventListener('click', function() {
    startGame(3); // Iniciar el juego con el nivel 3
});

function selectLevel(level) {
    setLevel(level); // Establecer la cantidad de enemigos
    initializeEnemies(); // Inicializar los enemigos según el nivel
}

// Asignar eventos a los botones del menú
document.getElementById('level1').addEventListener('click', () => selectLevel(1));
document.getElementById('level2').addEventListener('click', () => selectLevel(2));
document.getElementById('level3').addEventListener('click', () => selectLevel(3));


// Definir el tamaño del canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Variables para la velocidad de actualización
const fps = 60;
let gameRunning = true;

// Variables del tanque
const tankSize = 30;
let tankX = canvasWidth / 2 - tankSize / 2;
let tankY = canvasHeight / 2 - tankSize / 2;
let tankSpeed = 2;
let tankDirection = 0; // 0: arriba, 1: derecha, 2: abajo, 3: izquierda

// Variables de balas
let bullets = [];
const bulletSpeed = 4;
const bulletSize = 5;

// Mapeamos las teclas de flechas
let keys = {};

// Vidas del tanque del jugador
let playerLives = 3;

// Detectar cuándo se presiona una tecla
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;

    // Disparar con la tecla espacio
    if (e.key === ' ') {
        shoot();
    }
});

// Detectar cuándo se suelta una tecla
window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// Función para verificar colisiones
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.size &&
        rect1.x + rect1.size > rect2.x &&
        rect1.y < rect2.y + rect2.size &&
        rect1.y + rect1.size > rect2.y;
}

// Función para restar vida al jugador
function losePlayerLife() {
    playerLives--;
    console.log(`Vida del jugador: ${playerLives}`);
    if (playerLives <= 0) {
        console.log("El jugador ha sido derrotado.");
        // Implementar lógica para finalizar el juego aquí
        gameRunning = false; // Detener el bucle del juego
    }
}

// Actualizar el tanque (movimiento)
function updateTank() {
    let previousTankX = tankX;
    let previousTankY = tankY;

    if (keys['ArrowUp']) {
        tankDirection = 0;
        tankY -= tankSpeed;
    }
    if (keys['ArrowRight']) {
        tankDirection = 1;
        tankX += tankSpeed;
    }
    if (keys['ArrowDown']) {
        tankDirection = 2;
        tankY += tankSpeed;
    }
    if (keys['ArrowLeft']) {
        tankDirection = 3;
        tankX -= tankSpeed;
    }

    // Crear un rectángulo del tanque
    const tankRect = { x: tankX, y: tankY, size: tankSize };

    // Limitar el movimiento del tanque dentro del canvas
    if (tankX < 0) tankX = 0;
    if (tankX + tankSize > canvasWidth) tankX = canvasWidth - tankSize;
    if (tankY < 0) tankY = 0;
    if (tankY + tankSize > canvasHeight) tankY = canvasHeight - tankSize;

    // Verificar colisiones con los enemigos
    enemies.forEach(enemy => {
        const enemyRect = { x: enemy.x, y: enemy.y, size: enemy.size };
        if (isColliding(tankRect, enemyRect)) {
            // Si colisiona con un enemigo, restar una vida
            losePlayerLife();
            tankX = previousTankX; // Revertir posición del tanque
            tankY = previousTankY;

        }

        // Verificar colisiones con obstáculos
        if (checkObstacleCollisions(tankRect)) {
            tankX = previousTankX; // Revertir posición del tanque si colisiona con un obstáculo
            tankY = previousTankY;
        }

    });


}

// Dibujar el tanque en el canvas
function renderTank() {
    // Dibujar la imagen del tanque
    ctx.drawImage(tankImage, tankX, tankY, tankSize, tankSize);

    // Dibujar la dirección del tanque (opcional, para orientación)
    ctx.fillStyle = 'red';
    if (tankDirection === 0) ctx.fillRect(tankX + tankSize / 4, tankY - 5, tankSize / 2, 5); // arriba
    if (tankDirection === 1) ctx.fillRect(tankX + tankSize, tankY + tankSize / 4, 5, tankSize / 2); // derecha
    if (tankDirection === 2) ctx.fillRect(tankX + tankSize / 4, tankY + tankSize, tankSize / 2, 5); // abajo
    if (tankDirection === 3) ctx.fillRect(tankX - 5, tankY + tankSize / 4, 5, tankSize / 2); // izquierda
}

// Función para disparar balas
function shoot() {
    const bullet = {
        x: tankX + tankSize / 2 - bulletSize / 2,
        y: tankY + tankSize / 2 - bulletSize / 2,
        direction: tankDirection
    };
    bullets.push(bullet);
}

// Actualizar las balas
function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        let bullet = bullets[i];

        // Mover la bala en la dirección del tanque
        if (bullet.direction === 0) bullet.y -= bulletSpeed;
        if (bullet.direction === 1) bullet.x += bulletSpeed;
        if (bullet.direction === 2) bullet.y += bulletSpeed;
        if (bullet.direction === 3) bullet.x -= bulletSpeed;

        // Verificar colisiones con enemigos
        enemies.forEach((enemy, enemyIndex) => {
            const enemyRect = { x: enemy.x, y: enemy.y, size: enemy.size };
            const bulletRect = { x: bullet.x, y: bullet.y, size: bulletSize };

            if (isColliding(bulletRect, enemyRect)) {
                // Si hay una colisión, eliminar bala y enemigo
                bullets.splice(i, 1);
                enemies.splice(enemyIndex, 1);
            }
        });

        // Eliminar balas fuera del canvas
        if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
            bullets.splice(i, 1);
        }
    }
}
// Colisión con balas enemigas
function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let bullet = enemyBullets[i];

        // Mover la bala enemiga en la dirección correspondiente
        if (bullet.direction === 0) bullet.y -= enemyBulletSpeed; // Arriba
        if (bullet.direction === 1) bullet.x += enemyBulletSpeed; // Derecha
        if (bullet.direction === 2) bullet.y += enemyBulletSpeed; // Abajo
        if (bullet.direction === 3) bullet.x -= enemyBulletSpeed; // Izquierda

        // Crear un rectángulo del tanque para verificar colisiones
        const tankRect = { x: tankX, y: tankY, size: tankSize };
        const bulletRect = { x: bullet.x, y: bullet.y, size: enemyBulletSize };

        // Verificar colisión entre la bala enemiga y el tanque
        if (isColliding(bulletRect, tankRect)) {
            losePlayerLife(); // Reducir una vida del jugador
            enemyBullets.splice(i, 1); // Eliminar la bala enemiga tras la colisión
        }

        // Eliminar balas que salen del canvas
        if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
            enemyBullets.splice(i, 1);
        }
    }
}

// Dibujar las balas en el canvas
function renderBullets() {
    ctx.fillStyle = 'green';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
    });
}
// Función para verificar colisiones entre dos rectángulos
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.size &&
        rect1.x + rect1.size > rect2.x &&
        rect1.y < rect2.y + rect2.size &&
        rect1.y + rect1.size > rect2.y;
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'p') {
        gameRunning = !gameRunning; // Alterna entre pausa y ejecución
        if (gameRunning) {
            gameLoop(); // Reinicia el bucle del juego si se despausa
        }
    }
});
// Actualizar el estado del juego
function update() {

    // Actualizar el tanque
    updateTank();

    // Actualizar las balas
    updateBullets();

    // Actualizar enemigos
    updateEnemies();

    // Actualizar balas de enemigos
    updateEnemyBullets();
}

// Dibujar todos los elementos en el canvas
function render() {
    // Limpiar el canvas antes de dibujar

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Dibujar el tanque
    renderTank();

    // Dibujar los enemigos
    renderEnemies(ctx); // <-- Aquí agregamos el renderizado de los enemigos
    // Dibujar balas de enemigos
    renderEnemyBullets(ctx);

    // Dibujar las balas
    renderBullets();
    // Dibujar obstáculos
    renderObstacles(ctx); // Llamamos a la función para dibujar obstáculos

    // Mostrar vidas restantes
    ctx.fillStyle = 'blue';
    ctx.font = '20px Arial';
    ctx.fillText(`Vidas: ${playerLives}`, 10, 20);
}



// Llamar a shootFromEnemies en el bucle principal (puedes llamarlo cada cierto tiempo)
setInterval(shootFromEnemies, 2000); // Disparar cada 2 segundos
// Cargar el archivo de sonido
const victorySound = new Audio('gg.mp3');
// sonido de derrota
const defeatSound = new Audio('der.mp3');
const backgroundMusic = new Audio('Artillería.mp3');

backgroundMusic.loop = true; // Hacer que la música se repita


function gameLoop() {
    update(); // Actualiza el estado del juego
    render(); // Renderiza los elementos
    backgroundMusic.play(); // Reproducir la música al inicio

    // Verificar si el jugador ganó (todos los enemigos eliminados)
    if (enemies.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.fillStyle = 'green';
        ctx.font = '40px Arial';
        ctx.fillText("¡Ganaste!", canvas.width / 2 - 100, canvas.height / 2);

        // Reproducir el sonido de victoria
        victorySound.play();

        // Detener la música de fondo
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar la música para que no se escuche al reiniciar

        // Detener el sonido después de 3 segundos
        setTimeout(() => {
            victorySound.pause(); // Pausar el sonido
            victorySound.currentTime = 0; // Reiniciar el tiempo para que vuelva a empezar desde el inicio si se reproduce nuevamente
        }, 5000); // 5000 milisegundos = 5 segundos

        return; // Detener el bucle del juego
    }

    // Verificar si el jugador ha perdido (vidas del jugador <= 0)
    if (playerLives <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText("¡Juego terminado!", canvas.width / 2 - 150, canvas.height / 2);

        // Mensaje para elegir un nivel
        ctx.fillStyle = 'black'; // Cambiar el color del texto
        ctx.font = '30px Arial';
        ctx.fillText("Elige un nivel...", canvas.width / 2 - 100, canvas.height / 2 + 50);

        // Reproducir el sonido de derrota
        defeatSound.play();

        // Detener la música de fondo
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar la música para que no se escuche al reiniciar

        // Recargar la página después de 3 segundos
        setTimeout(() => {
            location.reload(); // Recargar la página para reiniciar el juego
        }, 5000); // Esperar 5000 milisegundos (5 segundos)

        return; // Detener el bucle del juego
    }


    // Continuar el bucle del juego si no ha ganado o perdido
    requestAnimationFrame(gameLoop); // Usar requestAnimationFrame para un mejor rendimiento
}
// Iniciar el bucle del juego
gameLoop();