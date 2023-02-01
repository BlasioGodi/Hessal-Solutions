<?php
include 'config.php';

if (isset($_POST['post_comments'])) {

    $name = $_POST['name'];
    $message = $_POST['message'];

    $sql = "INSERT INTO demo (name, message)
        VALUES ('$name','$message')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="comments.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet">
    <title>Comments Section</title>
</head>

<body>
    <div class="container">
        <form action="#" method="post" class="form">
            <input type="text" class="name" name="name" placeholder="Name">
            <br>
            <textarea name="" id="message" cols="30" rows="10" placeholder="message"></textarea>
            <br>
            <button type="submit" class="btn" name="post_comments">Post Comment</button>
        </form>
    </div>
    <div class="content">
        <h1>John Doe</h1>
        <p>Lorem Ipsum sit amet conectur dispade dispise commodi sint</p>
        <h1>John Doe</h1>
        <p>Lorem Ipsum sit amet conectur dispade dispise commodi sint</p>

    </div>

</body>

</html>