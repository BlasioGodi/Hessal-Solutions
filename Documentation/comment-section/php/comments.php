<?php
include 'config.php';

if (isset($_POST['post_comments'])) {

    $name = $_POST['user_name'];
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
            <input type="text" class="name" name="user_name" placeholder="Name">
            <br>
            <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
            <br>
            <button type="submit" class="btn" name="post_comments">Post Comment</button>
        </form>
    </div>
    <div class="content">
        <?php

        $sql = "SELECT * FROM demo";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while ($row = mysqli_fetch_assoc($result)) {
                ?>
        <h1>
            <?php echo $row['name']; ?>
        </h1>
        <p>
            <?php echo $row['message']; ?>
        </p>
        <?php }
        } ?>

    </div>

</body>

</html>