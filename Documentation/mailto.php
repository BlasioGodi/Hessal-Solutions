<?php

//Phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/vendor/autoload.php';

// Output messages
$responses = [];

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["message"];

// Check if the form was submitted
if (isset($name, $email, $message)) {
    // Validate email adress
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $responses[] = 'Email is not valid!';
    }
    // Make sure the form fields are not empty
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        $responses[] = 'Please complete all fields!';
    }
    // If there are no errors
    if (!$responses) {

        //SMTP Configuration settings
        $phpmailer = new PHPMailer(true);
        $phpmailer->isSMTP();
        $phpmailer->Host = 'smtp.titan.email';
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = 587;
        $phpmailer->Username = 'info@hessal-sol.com';
        $phpmailer->Password = 'grcVmCpnPbN86Sj';
        $phpmailer->setFrom($email, 'Hessal Website');
        $phpmailer->addReplyTo($email, 'Hessal Website');
        $phpmailer->addAddress('muhindablasio@gmail.com', 'BIM GMAIL');
        $phpmailer->Subject = "Website Message";
        $exception = new Exception();

        //SMTP Debug setting
        $phpmailer->SMTPDebug = 2;

        // Enable HTML if needed
        $phpmailer->isHTML(true);
        $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Phone: {$phone}", "Message:", nl2br($message)];
        $body = join('<br />', $bodyParagraphs);
        $phpmailer->Body = $body;

        // Try to send the mail
        if ($phpmailer->send()) {
            //Redirect page header('Location: index_light.html');
            // Success
            $responses[] = 'Message sent!';
        } else {
            $responses = 'Oops, something went wrong. Mailer Error: ' . $exception->getMessage();
            echo $exception;
        }
    }
}
?>