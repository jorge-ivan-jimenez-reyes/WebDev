<?php
include 'includes/db.php';
include 'auth.php'; // Verificar autenticación
checkLogin(); // Verificar que el usuario esté logueado

// Obtener el rol del usuario desde la sesión
$rol = $_SESSION['rol'];

// Obtener productos
$sql = "SELECT * FROM productos";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Gestión de Productos</title>
</head>
<body>
    <header>
        <h1><?php echo ($rol == 'administrador') ? "Panel de Administración" : "Productos Disponibles"; ?></h1>
        <nav>
            <a href="logout.php">Cerrar sesión</a>
        </nav>
    </header>

    <main>
        <?php if ($rol == 'administrador') { ?>
            <section id="admin-form">
                <h2>Agregar Producto</h2>
                <form action="productos.php" method="POST">
                    <label for="nombre">Nombre del Producto</label>
                    <input type="text" id="nombre" name="nombre" required>
                    
                    <label for="descripcion">Descripción</label>
                    <textarea id="descripcion" name="descripcion" required></textarea>
                    
                    <label for="precio">Precio</label>
                    <input type="number" step="0.01" id="precio" name="precio" required>
                    
                    <button type="submit">Agregar Producto</button>
                </form>
                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST" && $rol == 'administrador') {
                    $nombre = $_POST['nombre'];
                    $descripcion = $_POST['descripcion'];
                    $precio = $_POST['precio'];

                    $sql = "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ssd", $nombre, $descripcion, $precio);
                    if ($stmt->execute()) {
                        echo "<p>Producto agregado exitosamente.</p>";
                    } else {
                        echo "<p>Error al agregar el producto.</p>";
                    }
                }
                ?>
            </section>
        <?php } ?>
        
        <section id="productos-lista">
            <h2>Lista de Productos</h2>
            <ul>
                <?php while ($row = $result->fetch_assoc()) { ?>
                    <li>
                        <strong><?php echo $row['nombre']; ?></strong><br>
                        <?php echo $row['descripcion']; ?><br>
                        Precio: $<?php echo $row['precio']; ?>
                    </li>
                <?php } ?>
            </ul>
        </section>
    </main>
</body>
</html>
