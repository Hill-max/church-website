<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);

// Save password to session
if (isset($data['password'])) {
    $_SESSION['password'] = $data['password'];
}
?>
