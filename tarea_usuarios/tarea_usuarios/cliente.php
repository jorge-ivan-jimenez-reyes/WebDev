<?php
session_start();
include 'includes/db.php'; 
include 'templates/header.php'; 

if ($_SESSION['rol'] != 'cliente') {
    header("Location: login.php");
    exit();
}

// Obtener los productos de la base de datos
$sql = "SELECT * FROM productos";
$result = $conn->query($sql);
?>

<main>
    <h2>Lista de Productos Disponibles</h2>
    <ul>
        <?php while ($row = $result->fetch_assoc()) { ?>
            <li>
                <!-- Mostrar la imagen del producto -->
                <img src="<?php echo $row['imagen']; ?>" alt="<?php echo htmlspecialchars($row['nombre']); ?>" style="width:150px;height:auto;">
                <strong><?php echo htmlspecialchars($row['nombre']); ?></strong><br>
                <?php echo htmlspecialchars($row['descripcion']); ?><br>
                Precio: $<?php echo number_format($row['precio'], 2); ?>
            </li>
        <?php } ?>
    </ul>
</main>

<?php include 'templates/footer.php'; ?>
