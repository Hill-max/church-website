<?php
session_start();
header('Content-Type: application/json');

// Check if phone number is already saved in the session
if (isset($_SESSION['phoneNumber'])) {
    echo json_encode(['phoneNumber' => $_SESSION['phoneNumber']]);
} else {
    echo json_encode(['phoneNumber' => null]);
}
?>
