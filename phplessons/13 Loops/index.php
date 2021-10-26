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
            //Loops
            //NEVER MAKE AN INFINITE LOOP

            //While loop
            /*
            while($x <= 5) {
                echo "WASSSUP<br>";
                $x++;
            }*/
            //Do While loop (performs action atleast once)
            /*            
            do{
                echo "WASSSUP<br>";
                $x++;
            }
            while ($x <= 5);
            */
            //For loop
            /*
            for($x = 0; $x < 10; $x++){
                echo "hi<br>";
            }
            */
            //Foreach loop

            $array = array("Daniel", "Jane", "Jacob","John","Marianne");
            foreach($array as $loopdata){
                echo "My name is ".$loopdata."<br>";
            }

        ?>
        <script src="" async defer></script>
    </body>
</html>