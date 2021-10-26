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
        //lesson on predetermined functions
        //already defined in php, ready to use
            //strlen returns the number of chars in string
            echo strlen("Hi David");
            //counts number of words
            echo str_word_count("Hi David");
            //reverses string parameter
            echo strrev("Hi David");
            //finds position of 'key' term
            echo strpos("David Hi", "Hi");
            //replaces every instance of first parameter with second 
            echo str_replace("David", "Jason", "Hi David, David");

        ?>
        <script src="" async defer></script>
    </body>
</html>