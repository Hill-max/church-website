<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);

// Save phone number to session
if (isset($data['phoneNumber'])) {
    $_SESSION['phoneNumber'] = $data['phoneNumber'];
}
?>
