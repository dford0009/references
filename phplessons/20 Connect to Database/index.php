<?php
    include_once "includes/dbh.inc.php";
?>
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
        <!--
                THIS FORM IS USED FOR THE 'SIGN UP' FILE
            <form action="includes/signup.inc.php" method="POST">
            <input type="text" name="first" placeholder="Firstname">
            <br>
            <input type="text" name="last" placeholder="Lastname">
            <br>
            <input type="text" name="email" placeholder="Email">
            <br>
            <input type="text" name="uid" placeholder="Username">
            <br>
            <input type="password" name="pwd" placeholder="Password">
            <br>
            <button type="submit" name="submit">SIGN UP</button>
        </form>-->
        <?php
            $data = "jbwow";
            //Created a template
            $sql = "SELECT * FROM users WHERE user_uid=?;";
            //Create a prepared statement
            $stmt = mysqli_stmt_init($conn);
            //Prepare the prepared statments
            if(!mysqli_stmt_prepare($stmt,$sql)){
                echo "SQL Statment failed";
            }else {
                //Bind parameters to the placeholder(s)
                mysqli_stmt_bind_param($stmt, "s", $data);
                //Run parameters inside DB
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);while($row = mysqli_fetch_assoc($result)){
                    echo $row['user_first']."<br>";
                }
            }
        ?>

        <script src="" async defer></script>
    </body>
</html>