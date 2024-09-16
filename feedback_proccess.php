<?php
    session_start();

    include "config.php";

    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }

    // Mengambil data dari form
    $name = $_POST['name'];
    $profession = $_POST['profession'];
    $explanation = $_POST['explanation'];
    $stars = $_POST['stars'];

    // Menyiapkan dan menjalankan query
    $stmt = $conn->prepare("INSERT INTO feedback (name, profession, explanation, stars) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $name, $profession, $explanation, $stars);

    if ($stmt->execute()) {
        $_SESSION['feedback_message'] = "Feedback berhasil dikirim.";
    } else {
        $_SESSION['feedback_message'] = "Terjadi kesalahan: " . $stmt->error;
    }

    // Menutup koneksi
    $stmt->close();
    $conn->close();

    // Mengarahkan kembali ke form.php
    header("Location: index.php#feedback-form");
    exit();
?>