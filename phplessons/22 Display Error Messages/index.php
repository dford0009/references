<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Error Handler Tutorial!</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <h2>Signup</h2>
        <!--THIS FORM IS USED FOR THE 'SIGN UP' FILE-->
                
        <form action="includes/signup.inc.php" method="POST">
            <?php
                if(isset($_GET['first'])) {
                    $first = $_GET['first'];
                    echo '<input type="text" name="first" placeholder="Firstname" value="'.$first.'">';
                }else{
                    echo '<input type="text" name="first" placeholder="Firstname">';
                }

                if(isset($_GET['last'])){
                    $last = $_GET['last'];
                    echo '<input type="text" name="last" placeholder="Lastname" value="'.$last,'">';
                }else{
                    echo '<input type="text" name="last" placeholder="Lastname">';
                }
            ?>
            <input type="text" name="email" placeholder="Email">

            <?php

                if(isset($_GET['uid'])){
                    $uid = $_GET['uid'];
                    echo '<input type="text" name="uid" placeholder="Username" value="'.$uid.'">';
                }else{
                    echo '<input type="text" name="uid" placeholder="Username">';
                }
            ?>
            <input type="password" name="pwd" placeholder="Password">           
            <button type="submit" name="submit">SIGN UP</button>
        </form>
        <?php
            //check if there is even a signup in url
            if (!isset($_GET['signup'])) {
                exit();
            } else {
                //this variable's vaule
                // will be whatever comes after 'signup' 
                $signupCheck = $_GET['signup'];

                if($signupCheck == "empty"){
                    echo "<p class = error>You did not fill in all fields!</p>";
                    exit();
                }
                elseif($signupCheck == "char"){
                    echo "<p class = error>Your letters are funky!</p>";
                    exit();
                }
                elseif($signupCheck == "invalidemail"){
                    echo "<p class = error>FAKE EMAIL!</p>";
                    exit();
                }
                elseif($signupCheck == "success"){
                    echo "<p class = error>You're MINE NOW'!</p>";
                    exit();
                }
            }
            
            /*
            //this variable holds the complete url
            $fullUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

            if (strpos($fullUrl, "signup=empty") == true){
                echo "<p class = 'error'>You did not fill in all fields!</p>";
                exit();
            }elseif (strpos($fullUrl, "signup=char") == true){
                echo "<p class = 'error'>Invalid Characters!</p>";
                exit();
            }elseif (strpos($fullUrl, "signup=invalidemail") == true){
                echo "<p class = 'error'>FAKE EMAIL!</p>";
                exit();
            }elseif (strpos($fullUrl, "signup=success") == true){
                echo "<p class = 'success'>You're MINE NOW'!</p>";
                exit();
            }
            */
        ?>
        <script src="" async defer></script>
    </body>
</html>