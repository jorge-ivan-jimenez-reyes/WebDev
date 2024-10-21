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
        <h1>Sistema de Gestion de Productos para el fortalecimiento de huesos</h1>
        <nav>
            <a href="index.php">Inicio</a>
            <?php if (isset($_SESSION['usuario_id'])) { ?>
                <a href="logout.php">Cerrar sesión</a>
            <?php } ?>
        </nav>
    </header>
