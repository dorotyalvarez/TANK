//codigo para que el juego inie antes de escoger un nivel

/*function gameLoop() {
    update(); // Actualiza el estado del juego
    render(); // Renderiza los elementos

    // Verificar si el jugador ganó (todos los enemigos eliminados)
    if (enemies.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.fillStyle = 'green';
        ctx.font = '40px Arial';
        ctx.fillText("¡Ganaste!", canvas.width / 2 - 100, canvas.height / 2);
        return; // Detener el bucle del juego
    }

    // Verificar si el jugador perdió (vidas agotadas)
    if (playerLives <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText("¡Juego terminado!", canvas.width / 2 - 150, canvas.height / 2);
        ctx.fillStyle = 'black'; // Cambiar el color del texto
        ctx.font = '30px Arial';
        ctx.fillText("Elige un nivel...", canvas.width / 2 - 100, canvas.height / 2 + 50);
        setTimeout(() => {
            location.reload(); // Recargar la página para reiniciar el juego
        }, 3000); // Esperar 3000 milisegundos (3 segundos)
        return; // Detener el bucle del juego
    }

    // Continuar el bucle del juego si no ha ganado o perdido
    requestAnimationFrame(gameLoop); // Usar requestAnimationFrame para un mejor rendimiento
}

// Iniciar el bucle del juego al cargar la imagen de fondo
backgroundImage.onload = function() {
    gameLoop();
};*/