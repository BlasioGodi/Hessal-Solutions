<?php

//Phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/vendor/autoload.php';

// Output messages
$responses = [];

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$emailSent = ''; //Email sent declaration

// Check if the form was submitted
if (isset($name, $email, $message)) {
    // Validate email adress
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $responses[] = 'Email is not valid!';
    }
    // Make sure the form fields are not empty
    if (empty($name) || empty($email) || empty($message)) {
        $responses[] = 'Please complete all fields!';
    }
    // If there are no errors
    if (!$responses) {

        //SMTP Configuration settings
        $phpmailer = new PHPMailer(true);
        $phpmailer->isSMTP();
        $phpmailer->Host = 'smtp.gmail.com';
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = 587;
        $phpmailer->Username = 'hessalsol254@gmail.com';
        $phpmailer->Password = 'vcexzcodvcrgwnmf';
        $phpmailer->setFrom($email, 'Hessal Website');
        $phpmailer->addReplyTo($email, 'Hessal Website');
        $phpmailer->addAddress('hessalsol254@gmail.com', 'Hessal GMAIL');
        $phpmailer->addBCC('info@hessal-sol.com', 'Hessal Titan');
        $phpmailer->Subject = "Website Message";
        $exception = new Exception();

        //SMTP Debug setting
        $phpmailer->SMTPDebug = 2;

        // Enable HTML if needed
        $phpmailer->isHTML(true);
        $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", nl2br($message)];
        $body = join('<br />', $bodyParagraphs);
        $phpmailer->Body = $body;

        // Try to send the mail
        if (!$phpmailer->send()) {
            $responses[] = 'Oops, something went wrong. Mailer Error: ' . $phpmailer->ErrorInfo;
            $emailSent = 'error';

        } else {
            $responses[] = 'Message Sent!';
            $emailSent = 'success';
        }
    }
}

if ($emailSent == 'success')
    echo 'success';
else if ($emailSent == 'error')
    echo 'error';
else {
    $emailSent = 'not sure';
    echo ($emailSent);
}
?>