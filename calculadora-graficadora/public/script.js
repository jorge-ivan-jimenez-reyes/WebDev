// *** Calculadora estilo celular ***
let displayValue = '0';
let pendingOperator = null;
let firstOperand = null;

function updateDisplay() {
    const display = document.getElementById("display");
    display.innerText = displayValue;
}

function inputNumber(number) {
    displayValue = displayValue === '0' ? String(number) : displayValue + number;
    updateDisplay();
}

function inputOperator(operator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (pendingOperator) {
        firstOperand = calculateResult(pendingOperator, firstOperand, parseFloat(displayValue));
    }
    pendingOperator = operator;
    displayValue = '0';
}

function calculate() {
    if (pendingOperator && firstOperand !== null) {
        displayValue = String(calculateResult(pendingOperator, firstOperand, parseFloat(displayValue)));
        firstOperand = null;
        pendingOperator = null;
    }
    updateDisplay();
}

function calculateResult(operator, operand1, operand2) {
    switch (operator) {
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': return operand2 !== 0 ? operand1 / operand2 : 'Error';
        case '%': return operand1 % operand2;
        case '**': return Math.pow(operand1, operand2);
        default: return operand2;
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    pendingOperator = null;
    updateDisplay();
}

// *** Operaciones Matemáticas ***
function performOperation() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    let result;

    switch (operation) {
        case "add": result = num1 + num2; break;
        case "subtract": result = num1 - num2; break;
        case "multiply": result = num1 * num2; break;
        case "divide": result = num2 !== 0 ? num1 / num2 : "Error"; break;
        case "modulus": result = num1 % num2; break;
        case "exponent": result = Math.pow(num1, num2); break;
        default: result = "Operación no válida";
    }

    document.getElementById("result").innerText = "Resultado: " + result;
}

// *** Graficadora de Funciones con opción de Dibujo Manual ***
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let lastX = 0;
let lastY = 0;

// Cambia el modo de dibujo al seleccionar una función
function plotFunction() {
    const funcType = document.getElementById("functionType").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (funcType === "manual") {
        enableDrawing();
    } else {
        disableDrawing();
        drawGraph(funcType);
    }
}

// Activa el dibujo manual
function enableDrawing() {
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
}

// Desactiva el dibujo manual
function disableDrawing() {
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mouseleave", stopDrawing);
}

// Inicia el dibujo al hacer clic
function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = getMousePosition(e);
}

// Dibuja al mover el ratón
function draw(e) {
    if (!drawing) return;
    const [x, y] = getMousePosition(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Finaliza el dibujo
function stopDrawing() {
    drawing = false;
}

// Obtiene la posición del ratón en el canvas
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
}

// Dibuja gráficos de funciones matemáticas
function drawGraph(funcType) {
    ctx.beginPath();
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;

    const scale = 50;
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        let y;
        const radians = (x - canvas.width / 2) / scale;

        switch (funcType) {
            case "sin": y = Math.sin(radians); break;
            case "cos": y = Math.cos(radians); break;
            case "tan": y = Math.tan(radians); break;
            case "cot": y = 1 / Math.tan(radians); break;
            case "sec": y = 1 / Math.cos(radians); break;
            case "csc": y = 1 / Math.sin(radians); break;
            default: y = 0;
        }

        const canvasY = canvas.height / 2 - y * scale;
        x === 0 ? ctx.moveTo(x, canvasY) : ctx.lineTo(x, canvasY);
    }
    ctx.stroke();
}
