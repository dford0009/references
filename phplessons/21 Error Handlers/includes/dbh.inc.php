<?php
    //naming convention of dbh.INC.php is just a 
    //preference

    //the values of these variable should be specific
    //to YOUR database credentials.
    //This is example is for XAMMP local server
    $dbServername = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "loginsystem";

    //Take note of the order the parameters are in
    // this is specific to logging into the particular
    // database

    //variable conn is what should be referenced
    //anytime the website needs to connect to the 
    //database
    $conn = mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
    
?>