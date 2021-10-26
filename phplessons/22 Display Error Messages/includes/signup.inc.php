<?php
    
    //ERROR HANDLING EXAMPLE
    //FOR SIGN UP
    //(best to used prepared statements, shown below
    //this is just used to serve as an example for
    //error handling)

    //check for ERROR first 
    //then check for success

    //check if the user has clicked sign up
    if (isset($_POST['submit'])) {  
        //include the database connection      
        include_once "dbh.inc.php";

        //get the data from the sign up form
        $first = $_POST['first'];
        $last = $_POST['last'];
        $email = $_POST['email'];
        $uid = $_POST['uid'];
        $pwd = $_POST['pwd'];

        //check if inputs are empty
        if(empty($first) || empty($last) || empty($email) || empty($uid) || empty($pwd)) {
            header("Location: ../index.php?signup=empty");
            exit();
        }else {
            //check if characters are valid
            if (!preg_match("/^[a-zA-Z]*$/", $first)){
                header("Location: ../index.php?signup=chart&last=$last&email=$email&uid=$uid");
                exit();
                if(!preg_match("/^[a-zA-Z]*$/", $last)){
                    header("Location: ../index.php?signup=char&first=$first&email=$email&uid=$uid");
                    exit();
                    if(!preg_match("/^[a-zA-Z]*$/", $uid)){
                        header("Location: ../index.php?signup=char&first=$first&last=$last&email=$email");
                        exit();
                    }
                }
            }else {
                //check if email is valid
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    header("Location: ../index.php?signup=invalidemail&first=$first&last=$last&uid=$uid");
                    exit();
                }else {
                    header("Location: ../index.php?signup=success");
                    exit();
                }
            }            
        }
    }else {
        header("Location: ../index.php?");
        exit();
    }
    /*
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
    */
//closing language tags are not needed if
//only one scripting language is used in file
?>