// Calculadora de operaciones básicas
function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    let result;

    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            result = num2 !== 0 ? num1 / num2 : "Error (división por 0)";
            break;
        case "modulus":
            result = num1 % num2;
            break;
        case "exponent":
            result = Math.pow(num1, num2);
            break;
        default:
            result = "Operación no válida";
    }

    document.getElementById("result").innerText = "Resultado: " + result;
}

// Graficadora de funciones
function plotFunction() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const funcType = document.getElementById("functionType").value;
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el eje
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Variables para graficar la función
    const scale = 20;  // Escala de la gráfica
    ctx.beginPath();
    ctx.strokeStyle = "#0000ff";

    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
        const radians = x / scale;
        let y;

        switch (funcType) {
            case "sin":
                y = Math.sin(radians);
                break;
            case "cos":
                y = Math.cos(radians);
                break;
            case "tan":
                y = Math.tan(radians);
                break;
            case "cot":
                y = 1 / Math.tan(radians);
                break;
            case "sec":
                y = 1 / Math.cos(radians);
                break;
            case "csc":
                y = 1 / Math.sin(radians);
                break;
            default:
                y = 0;
        }

        const canvasX = x + canvas.width / 2;
        const canvasY = canvas.height / 2 - y * scale;

        if (x === -canvas.width / 2) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
}
