<?php


$name = $_POST["name"];
$email = $_POST["email"];
$emailMessage = $_POST["emailMessage"];


$errorCode["id"] = 0;
$errorCode["message"] = "Message Sent Successful";


$name = addslashes($name);
$email = $_POST["email"];
$emailMessage = $_POST["emailMessage"];

if (!empty($name) &&  !empty($email) && !empty($emailMessage)) { 
    
    try{
        $message_body = '';
        unset($_POST['submit']);
        foreach($_POST as $key => $value){
            $message_body .= "$key: $value\n";
        }
    
        $to = 'contact@qian-ma.com';
        $subject = 'Contact Form Submit';
        mail($to, $subject, $message_body);

    }catch (PDOException $e) {
        $errorCode["id"] = -2;
        $errorCode["message"] = "Message Sent Failed.";
    }
}

$data = json_encode($errorCode);

header("Content-Type: application/json");

print($data);


?>