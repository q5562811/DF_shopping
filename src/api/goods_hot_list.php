<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dfgw-index";



$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
    var_dump($conn->connect_error)
;}
$conn -> set_charset("utf8");

$res = $conn -> query('select * from hotlist');
    $content = $res->fetch_all(MYSQLI_ASSOC);
    $contentarr = json_encode($content,JSON_UNESCAPED_UNICODE);
    echo $contentarr;
    $res->close(); 
    $conn->close();
 ?>
