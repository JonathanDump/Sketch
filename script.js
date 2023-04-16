const BTN_BG_COLOR = "#3F3F3F";
const BTN_TEXT_COLOR = "#C0C0C0";

const holst = document.querySelector(".holst");
let pixels = document.querySelectorAll(".pixel");

const colorPicker = document.querySelector("#color-picker");
const rainbow = document.querySelector("#rainbow");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const slider = document.querySelector("#myRange");

getHolst(50, 50);

for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

slider.addEventListener("mouseup", () => {
    let val = slider.style.getPropertyValue("--value");
    getHolst(val, val);
});

slider.oninput = () => {
    let val = slider.style.getPropertyValue("--value");
    const gridSizeText = document.querySelector(".grid-size-text");
    gridSizeText.textContent = `${val}x${val}`;
};




function getHolst(rows, columns) {
    if (holst.hasChildNodes()) {
        clearHolst();
    }

    const pixelSize = 640 / rows;
    for (let i = 0; i < rows * columns; i++) {

        const divPixel = document.createElement("div");
        divPixel.classList.add("pixel");
        holst.appendChild(divPixel);
    }
    pixels = document.querySelectorAll(".pixel");
    for (pixel of pixels) {
        pixel.setAttribute("style", `height:${pixelSize}px; width:${pixelSize}px`);
    }

}

function clearHolst() {

    for (pixel of pixels) {
        holst.removeChild(pixel);
    }
}



let color = colorPicker.value;

colorPicker.addEventListener("input", () => {
    color = colorPicker.value;
    document.querySelector(".color-picker-text").style.color = `${color}`
});

let brushActive = false;
let isDrawing = true;
let isEraser = false;
let isRainbow = false;

holst.addEventListener("mousedown", () => {
    brushActive = true;

});

document.addEventListener("mouseup", () => {
    brushActive = false;

});

// document.addEventListener("mouseleave", () => {
//     brushActive = false;
// });

holst.addEventListener("mouseover", (e) => {
    if (isDrawing && brushActive) {
        e.target.style.backgroundColor = color;
    } else if (isEraser && brushActive) {
        e.target.style.backgroundColor = `unset`;
    } else if (isRainbow && brushActive) {
        let randomColor = getRandomColor();
        console.log(randomColor);
        e.target.style.backgroundColor = `#${randomColor}`
    }

});


colorPicker.addEventListener("click", () => {
    isDrawing = true;
    isEraser = false;
    isRainbow = false;
    setButtonToInactive(eraser);
    setButtonToInactive(rainbow);
});

rainbow.addEventListener("click", () => {
    if (isRainbow) {
        isRainbow = false;
        isDrawing = true;
        setButtonToInactive(rainbow);
    } else {
        isRainbow = true;
        isDrawing = false;
        isEraser = false;
        setButtonToActive(rainbow);
        setButtonToInactive(eraser);
    }
});


eraser.addEventListener("click", () => {
    if (isEraser) {
        isEraser = false;
        isDrawing = true;
        setButtonToInactive(eraser);
    } else {
        isEraser = true;
        isDrawing = false;
        isRainbow = false;
        setButtonToActive(eraser);
        setButtonToInactive(rainbow);
    }
});




clearBtn.addEventListener("click", () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "white";
    });
});

function setButtonToInactive(button){
    button.classList.remove("button-active");
}

function setButtonToActive(button) {
    button.classList.add("button-active")
}

function getRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}