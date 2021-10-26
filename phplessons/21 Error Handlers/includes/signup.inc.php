<?php
    
    //ERROR HANDLING EXAMPLE
    //FOR SIGN UP
    //(best to used prepared statements, shown below
    //this is just used to serve as an example for
    //error handling)

    //check for ERROR first 
    //then check for success
    if (isset($_POST['submit]'])) {        
        include_once "dbh.inc.php";

        $first = $_POST['first'];
        $last = $_POST['last'];
        $emal = $_POST['email'];
        $uid = $_POST['uid'];
        $pwd = $_POST['pwd'];

        if(empty($first) || empty($last) || empty($email) ||empty($uid) || empty($pwd)) {
            header("Location: ../index.php?signup=empty");
        }else {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                header("Location: ../index.php?signup=invalidemail");

            }else {
                echo "Sign up the user!";
            }
        }
    }else {
        header("Location: ../index.php?signup=error");
    }
    //This file is used to insert data from the
    //webpage to the DB

    $first = mysqli_real_escape_string($conn, $_POST['first']);
    $last = mysqli_real_escape_string($conn,$_POST['last']);
    $email = mysqli_real_escape_string($conn,$_POST['email']);
    $uid = mysqli_real_escape_string($conn,$_POST['uid']);
    $pwd = mysqli_real_escape_string($conn,$_POST['pwd']);
    
    //this statement is used for inserting 
    //users into DB
    
    $sql = "INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd)
        VALUES (?, ?, ?, ?, ?);";

    //PREPARED STATMENT EXAMPLE
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL ERROR";
    }else {
        mysqli_stmt_bind_param($stmt, "sssss", $first, $last, $email, $uid, $pwd);
        mysqli_stmt_execute($stmt);
    }
    
    header("Location: ../index.php?signup=success");
//closing language tags are not needed if
//only one scripting language is used in file
?>