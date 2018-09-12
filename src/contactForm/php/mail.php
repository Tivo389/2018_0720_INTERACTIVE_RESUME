<?php
  if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
    header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
    /* choose the appropriate page to redirect users */
    // die( header( 'location: /error.php' ) );
  }
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  $formcontent="Sender: $email\n\nSubject: $subject";
  $recipient = "miyaki.shun@gmail.com";
  $mailheader = "From: $email \r\n";
  mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
  header( 'location: /thankyou.html' );
?>