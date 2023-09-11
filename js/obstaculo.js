class obstaculo {

    constructor(estilo, velocidad, contenedor) {
        this.estilo = estilo;
        this.velocidad = velocidad
        this.contenedor = contenedor;
        let divObs;
    }
    // Método para crear el elemento HTML del obstáculo
    crearDiv() {
        this.divObs = document.createElement("div");
        this.contenedor.appendChild(this.divObs);
        this.divObs.classList.add(this.estilo);
    }

    mover() {
        let rect = this.divObs.getBoundingClientRect();
        this.divObs.style.left = `${rect.left - this.velocidad}px`; // Mueve el obstáculo hacia la izquierda aplicando la velocidad
    }
    // Método para verificar si el obstáculo ha salido de la pantalla
    seFueDePantalla() {
        let rect = this.divObs.getBoundingClientRect(); // Obtiene la posición y tamaño actual del obstáculo
        if (rect.left < -100) { // Si la posición izquierda del obstáculo está fuera de la pantalla
            return true;
        } else {
            return false;// El obstáculo aún está en la pantalla
        }
        }
    
    // Método para obtener el rectángulo de colisión del obstáculo
    
    getRect() {
        return this.divObs.getBoundingClientRect();
    }

    getEstilo(){
        return this.estilo; // Devolver el estilo del obstáculo
    }
    // Método para eliminar el elemento HTML del obstaculo
    eliminarDiv() {
        this.divObs.parentNode.removeChild(this.divObs); // Elimina el elemento del DOM
    }
}