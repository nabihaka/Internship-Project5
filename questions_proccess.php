<?php
    session_start();

    include "config.php";

    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }

    // Mengambil data dari form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $question = $_POST['question'];

    // Menyiapkan dan menjalankan query
    $stmt = $conn->prepare("INSERT INTO questions (name, email, question) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $question);

    if ($stmt->execute()) {
        $_SESSION['feedback_message'] = "Pertanyaan berhasil dikirim. Jawaban akan kami kirim melalui email";
    } else {
        $_SESSION['feedback_message'] = "Terjadi kesalahan: " . $stmt->error;
    }

    // Menutup koneksi
    $stmt->close();
    $conn->close();

    // Mengarahkan kembali ke form.php
    header("Location: index.php#questions-form");
    exit();
?>