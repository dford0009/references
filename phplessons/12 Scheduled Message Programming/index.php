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
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <?php
            //Scheduled Message Programming

            $dayofweek = date("w");
            
            switch ($dayofweek) {
                case 1:
                    echo "It is Sunday";
                    break;
                case 2:
                    echo "It is Monday";
                    break;
                case 3:
                    echo "It is Tuesday";
                    break;
                case 4:
                    echo "<p>It is Wednesday</p>";
                    break;
                case 5:
                    echo "<p>It is Thursday</p>";
                    break;
                case 6:
                    echo "It is Friday";
                    break;
                case 7:
                    echo "It is Saturday";
                    break;

            }
        ?>
        <script src="" async defer></script>
    </body>
</html>