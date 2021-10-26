<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <?php

            //Global scope example
            //this variable can be used throughout the 
            //whole page
            //Local scope - this variable can only be
            //used in this function
            /*
            echo $x;
            echo $y;//produces ERROR because 'y' is outside of scope
            */

            //$GLOBALS
            //be able to refer to 'x' inside function
            /*
            $x = 5;

            function something() {
                $y = 10;
                echo $GLOBALS["x"];
            }
            something();
            */

            //$_POST



            //$_GET
            $x = 5;

            function something() {
                $y = 10;
            }
            
            
            //SUPERGLOBALS
            /*
            $GLOBALS
            $_POST - hides submitted info to url
            $_GET - shows submitted info to url
            $_COOKIE - saves info on user side
            $_SESSION - saves info on user on server side
            */

            //the GET/POST function call must be the
            //same format as 'name' or whatever 
            //parameter is passed
            echo $_POST["name"];

            //Cookies are used for less sensitive information
            //USER SIDE (BROSER)
            //'display previously viewed products

            //1st param = name of cookie
            //2nd param = value
            //3rd param = time to expire
            //  to 'destroy all cookies' you can subtract 
            //  any number from the current time 
            setcookie("name", "Daniel", time() + 86400);


            //Session is used to know when a 'user' might be logged in
            //SERVER SIDE
            //'store user name/pw

            //inside brackets, name of session
            //if name is 'user ID' then a hacker 
            //would not be able to access
            
            $_SESSION["name"] = "12";

        ?>
        <!--
            method tells submit button what to do 
            with information
            
            GET - passes info into url
                - !shows info!

            POST - still passes into url but cannot see it
                 - !hides info!
        -->
        <form method="POST">
            <input type="hidden" name="name" value="Daniel">
            <button type="submit">PRESS ME!</button>
        </form>
        <script src="" async defer></script>
    </body>
</html>