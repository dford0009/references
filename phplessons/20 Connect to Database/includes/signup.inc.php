<?php
    include_once 'dbh.inc.php';

    //select data with SQL statement
    //first semicolon is for SQL
    //second semicolon is PHP
    //can use multiple variations of this 
    //sql statement

    /*$sql = "SELECT * FROM users";// WHERE user_id='Admin';";

    //first param = actual connection to DB
    //second param = the SQL query we want executed
    $result = mysqli_query($conn, $sql);


    //check if there is a result above '0'
    
    $resultCheck = mysqli_num_rows($result);

    if($resultCheck > 0) {
        //while loops gets all the data requested
        //then assigns each row to the '$rows' 
        //variable as an array

        //'mysqli_fetch_assoc() returns DB data
        //as rows
        while($row = mysqli_fetch_assoc($result)){
            echo $row['user_uid']."<br>";
        }
    }
    */

    //PROTECT AGAINST SQL INJECTION

    //using mysqli_real_escape_string protects 
    //your DB by keeping your program from reading
    //the user inputs as 'code'.
    
    $first = mysqli_real_escape_string($conn, $_POST['first']);
    $last = mysqli_real_escape_string($conn,$_POST['last']);
    $email = mysqli_real_escape_string($conn,$_POST['email']);
    $uid = mysqli_real_escape_string($conn,$_POST['uid']);
    $pwd = mysqli_real_escape_string($conn,$_POST['pwd']);
    
    //this statement is used for inserting 
    //users into DB
    
    $sql = "INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd)
        VALUES ('$first', '$last', '$email', '$uid', '$pwd');";
    mysqli_query($conn, $sql);
    
    header("Location: ../index.php?signup=success");
?>