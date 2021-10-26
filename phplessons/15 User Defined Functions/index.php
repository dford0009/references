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
            //USER DEFINED FUNCTIONS
            //make sure one function does one thing 

            //Accept input and print out 75% of input
            
            //make sure to define parameters for inputs
            function newCalc ($n) {
                $newnr = $n * 0.75;
                echo "Here is 75% of your input: ".$newnr."<br>";
            }

            $x = 100;
            newCalc($x);

            $a = 10;
            newCalc($a);

        ?>
        <script src="" async defer></script>
    </body>
</html>