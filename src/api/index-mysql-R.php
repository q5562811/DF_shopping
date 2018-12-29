<?php 
    $servernamer = "localhost";
    $usernamer = "root";
    $passwordr = "";
    $dbnamer = "dfgw-index";



    $connr = new mysqli($servernamer, $usernamer, $passwordr, $dbnamer);
if($connr->connect_error){
    var_dump($connr->connect_error)
;}
$connr -> set_charset("utf8");

$resr = $connr -> query('select * from indexzbr');
    $contentr = $resr->fetch_all(MYSQLI_ASSOC);
    $contentarr_r = json_encode($contentr,JSON_UNESCAPED_UNICODE);
    echo $contentarr_r;
    $resr->close(); 
    $connr->close();
 ?>
