for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));

}

getCanvas(50, 50);
const slider = document.querySelector("#myRange");


slider.addEventListener("mouseup", () => {
    let val = slider.style.getPropertyValue("--value");
     getCanvas(val, val);
});

slider.oninput = () => {
    let val = slider.style.getPropertyValue("--value");
    const gridSizeText = document.querySelector(".grid-size-text");
    gridSizeText.textContent = `${val}x${val}`;
};



function getCanvas(rows, columns) {

    clearCanvas();

    const pixelSize = 640 / rows;
    for (let i = 0; i < rows * columns; i++) {

        const divPixel = document.createElement("div");
        divPixel.classList.add("pixel");

        const canvas = document.querySelector(".canvas");
        canvas.appendChild(divPixel);
    }

    const pixels = document.querySelectorAll(".pixel");
    for (pixel of pixels) {
        pixel.setAttribute("style", `height:${pixelSize}px; width:${pixelSize}px`);
    }

}

function clearCanvas() {
    const pixels = document.querySelectorAll(".pixel");
    const canvas = document.querySelector(".canvas");

    for (pixel of pixels) {
        canvas.removeChild(pixel);
    }
}

