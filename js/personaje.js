class personaje {
    constructor(estilo, contenedor) {
        this.estilo = estilo;
        this.contenedor = contenedor;
        let divPj;
    }
    crearDiv() {
        this.divPj = document.createElement("div");
        this.contenedor.appendChild(this.divPj);
        this.divPj.classList.add(this.estilo);
        this.divPj.classList.add("correr");
    }

    coliciono(obs) {
        let rect = this.divPj.getBoundingClientRect();
        let rectObs = obs.getRect();
        if (!(rect.right < rectObs.left || rect.left > rectObs.right || rect.bottom < rectObs.top || rect.top > rectObs.bottom)) {
            return true;
        }
        else {
            return false;
        }
    }
    salto() {
        this.divPj.classList.remove("correr");
        this.divPj.classList.add("salto");
        this.divPj.addEventListener("animationend", () => {
            this.divPj.classList.remove("salto");
            this.divPj.classList.add("correr");
        })
    }
    muerte() {
        this.divPj.classList.remove("correr");
        this.divPj.classList.add("muerte");
        this.divPj.addEventListener("animationend", () => {
            this.divPj.parentNode.removeChild(this.divPj);
        });
    }
    cambioEstilo(nuevoEstilo) { }
}