<?php
session_start();
header('Content-Type: application/json');

// Check if password is set
if (isset($_SESSION['password'])) {
    echo json_encode(['passwordSet' => true, 'password' => $_SESSION['password']]);
} else {
    echo json_encode(['passwordSet' => false]);
}
?>
