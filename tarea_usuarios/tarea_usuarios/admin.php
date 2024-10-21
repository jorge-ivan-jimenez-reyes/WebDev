<?php
session_start();
include 'includes/db.php';
include 'templates/header.php'; 

if ($_SESSION['rol'] != 'administrador') {
    header("Location: login.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    // Procesar la imagen subida
    $imagen = $_FILES['imagen']['name'];
    $target_dir = "uploads/";  // Carpeta donde se guardarán las imágenes
    $target_file = $target_dir . basename($imagen);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen real o falsa
    $check = getimagesize($_FILES['imagen']['tmp_name']);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "El archivo no es una imagen.";
        $uploadOk = 0;
    }

    // Verificar si el archivo ya existe
    if (file_exists($target_file)) {
        echo "Lo siento, el archivo ya existe.";
        $uploadOk = 0;
    }

    // Verificar el tamaño del archivo
    if ($_FILES['imagen']['size'] > 500000) {  // Limitar el tamaño a 500KB
        echo "Lo siento, el archivo es demasiado grande.";
        $uploadOk = 0;
    }

    // Permitir solo ciertos formatos de archivo
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "Lo siento, solo se permiten archivos JPG, JPEG, PNG y GIF.";
        $uploadOk = 0;
    }

    // Verificar si $uploadOk es 0 debido a un error
    if ($uploadOk == 0) {
        echo "Lo siento, tu archivo no fue subido.";
    } else {
        // Si todo está bien, intenta subir el archivo
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file)) {
            // Insertar el producto y la ruta de la imagen en la base de datos
            $sql = "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssds", $nombre, $descripcion, $precio, $target_file);

            if ($stmt->execute()) {
                echo "Producto agregado correctamente.";
            } else {
                echo "Error al agregar el producto.";
            }
        } else {
            echo "Lo siento, hubo un error al subir tu archivo.";
        }
    }
}
?>

<h2>Agregar Producto</h2>
<form action="admin.php" method="POST" enctype="multipart/form-data">
    Nombre: <input type="text" name="nombre" required><br>
    Descripción: <textarea name="descripcion" required></textarea><br>
    Precio: <input type="number" step="0.01" name="precio" required><br>
    Imagen: <input type="file" name="imagen" required><br>
    <input type="submit" value="Agregar Producto">
</form>

<?php include 'templates/footer.php'; ?>
