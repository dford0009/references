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
        <form>
            <input type="text" name="num1" placeholder="Number 1">
            <input type="text" name="num2" placeholder="Number 2">
            <select name="operator">
                <option>None</option>
                <option>Add</option>
                <option>Subtract</option>
                <option>Multiply</option>
                <option>Divide</option>
            </select>
            <br>
            <button type="submit" name="submit" value="submit">Calculate</button>
        </form>
        <p>The answer is:</p>
        <?php
            //CALCULATOR
            //TWO INPUTS 
            //CHOOSE OPERATION
            //SHOW RESULT
            if (isset($_GET['submit'])){
                $result1 = $_GET['num1'];
                $result2 = $_GET['num2'];
                $operator = $_GET['operator'];
                switch($operator){
                    case "None":
                        echo "You need to select a method!";
                    break;
                    case "Add":
                        echo $result1 + $result2;
                    break;
                    case "Subtract":
                        echo $result1 - $result2;
                    break;
                    case "Multiply":
                        echo $result1 * $result2;
                    break;
                    case "Divide":
                        echo $result1 / $result2;
                    break;

                }
            }

        ?>
        <script src="" async defer></script>
    </body>
</html>