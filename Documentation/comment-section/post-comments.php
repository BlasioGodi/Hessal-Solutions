<?php
include 'config.php';

if (isset($_POST['post_comments'])) {

    $name = $_POST['user_name'];
    $message = $_POST['message'];

    $sql = "INSERT INTO demo (user_name, message)
        VALUES ('$name','$message')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>