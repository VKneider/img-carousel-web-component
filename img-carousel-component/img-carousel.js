//TODO: Meter atributo de "botones = true/false" para mostrar botones debajo del carrusel con los que se pueda deslizar entre imágenes. 
//TODO: Hacer una función que deslice las imágenes en un intervalo de tiempo (podría ser un atributo el tiempo)
//TODO: Hacer un atributo para cambiar el aspect-ratio del web component

class ImgCarousel extends HTMLElement {
    constructor() {
        super();

        this._images = [];
        this.slides = [];
        this.currentImage = 0;
        this.maxImage = 0;

        this.setupShadow();
    }

    connectedCallback() {
        const nextBtn = this.shadow.querySelector(".btn-next");
        nextBtn.addEventListener('click', (e) => this.moveNext());

        const prevBtn = this.shadow.querySelector(".btn-prev");
        prevBtn.addEventListener('click', (e) => this.movePrev());
    }

    set images(images) {
        this._images = images;
        this.maxImage = images.length - 1;
        this.create();
    }

    get images() {
        return this._images;
    }

    setupShadow() {
        this.shadow = this.attachShadow({ mode: "open" });
        const template = document.getElementById("img-carousel-template");
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    moveNext() {
        if (this.currentImage === this.maxImage) {
            this.currentImage = 0;
        } else {
            this.currentImage++;
        }

        this.slides.forEach((slide, idx) => {
            slide.style.transform = `translateX(${100 * (idx - this.currentImage)}%)`
        });
    }

    movePrev() {
        if (this.currentImage === 0) {
            this.currentImage = this.maxImage;
        } else {
            this.currentImage--;
        }

        this.slides.forEach((slide, idx) => {
            slide.style.transform = `translateX(${100 * (idx - this.currentImage)}%)`
        });
    }

    create() {
        this.images.forEach((img, idx) => {

            let slider = this.shadow.querySelector(".slider");

            let slide = document.createElement("div");
            slide.classList.add("slide");
            slide.style.transform = `translateX(${idx * 100}%)`;

            let image = document.createElement("img");
            image.src = img;

            slide.appendChild(image);
            slider.appendChild(slide);
            this.slides.push(slide);
        })
    }
}

customElements.define("img-carousel", ImgCarousel);