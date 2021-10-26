<?php
    //DATABASES
    //WHAT IS A DATABASE
    //we have a website that needs to save information
    //to have user account
    // needs first, last, email, username, password
    //The website now needs to save that information
    //
    //create a database using phpMyAdmin
    //dont use big letters or dashes
    //If needed use small letters and underscores

    //databases use tables
    //need to create tables that store particular
    //information for one thing
    //  ex. : a table to store user information
    //      : a table that stores POSTS...

    //CREATING TABLES
    //One table stores one type of data inside website
    
    /*
     THIS IS SAMPLE SQL 
     TO CREATE A TABLE IN A DATABASE
    create table posts (
        id int (11) not null PRIMARY KEY AUTO_INCREMENT,
            subject varchar(128) not null, 
            content varchar(1000) not null, 
            date datetime not null    
    );
    */

    //HOW TO INSERT DATA INTO DATATABLE
    //more SQL code
    /*

    This how to insert values into a table

        INSERT into posts (subject, content, date) VALUES ('This is the subject.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021/1/28 11:05:01');

    */

    //SELECT METHOD (SQL)
    /*
        SELECT subject from posts
            (selects all subjects from posts)

        SELECT * from posts
            (* = 'all', this selects everything from posts)
        
        SELECT * from posts where id='2'
            (only selects all from specified username)
        
        SELECT * from posts where id='2' AND subject='This is the subject'
            (example of adding additional conditions to select)
        
        
    */

    //UPDATE DATABASE
    /*

        UPDATE posts
            SET subject='This is a test', content='This is the content'
        WHERE id='2'
    */

    //DELETE DATA FROM DATABASE
    //
    /*
        DELETE FROM posts 
            WHERE id='2'

    */

    //ORDER BY
    // select something from the database
    // and order or 'sort' it by different data
    /*

        SELECT * FROM posts ORDER BY id ASC
            (sorts data by id in ascending order)

        SELECT * FROM posts ORDER BY id DESC
            (sorts data by id in descending order)

        GROUPBY - need to research

        

    */
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
        
        <script src="" async defer></script>
    </body>
</html>