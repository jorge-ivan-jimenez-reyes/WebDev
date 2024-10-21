<?php
session_start();

// Redirigir si el usuario no está autenticado
function checkLogin($role = null) {
    if (!isset($_SESSION['usuario_id'])) {
        header("Location: login.php");
        exit();
    }

    // Verificar el rol si es necesario
    if ($role && $_SESSION['rol'] != $role) {
        header("Location: login.php");
        exit();
    }
}
?>
