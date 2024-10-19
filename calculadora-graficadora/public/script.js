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

// *** Graficadora de Funciones y Parabola ***
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function plotFunction() {
    const funcType = document.getElementById("functionType").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (funcType === "manual") {
        enableDrawing();
    } else if (funcType === "parabola") {
        drawParabola();
    } else {
        disableDrawing();
        drawGraph(funcType);
    }
}

// Función para dibujar la parábola y = x^2
function drawParabola() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
    ctx.beginPath();  // Iniciar el trazado de la parábola
    
    const scale = 20;  // Escala para ajustar el tamaño de la parábola
    ctx.moveTo(0, canvas.height / 2);  // Empezar desde la mitad del canvas

    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
        const y = Math.pow(x / scale, 2);  // Calcular y = x^2
        ctx.lineTo(x + canvas.width / 2, canvas.height / 2 - y * scale);
    }

    ctx.strokeStyle = "#007bff";  // Estilo de la línea
    ctx.lineWidth = 2;
    ctx.stroke();  // Dibujar la parábola
}

function enableDrawing() {
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
}

function disableDrawing() {
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mouseleave", stopDrawing);
}

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = getMousePosition(e);
}

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

function stopDrawing() {
    drawing = false;
}

function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
}

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
