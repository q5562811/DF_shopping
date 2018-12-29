<?php
$user = isset($_POST["user"])?$_POST["user"]:null;
$pwd = isset($_POST["pwd"])?$_POST["pwd"]:null;
$register = isset($_POST["register"])?$_POST["register"]:null;
$type = isset($_POST["type"])?$_POST["type"]:null;

$conn = new mysqli("localhost","root","","dfgw-index");
if($conn->connect_error){
	var_dump($conn->connect_error);
}
$conn->set_charset("utf8");
/*判断类型，如果没有传值就登录*/
if($type){
	$res = $conn->query('select username from SignIn where username="'.$user.'" and password="'.$pwd.'"');
	if($res->num_rows > 0){
		$content = $res->fetch_all(MYSQLI_ASSOC);
		echo json_encode($content,JSON_UNESCAPED_UNICODE);;
	}
	$res->close();
}else{
	if($register){
		$res = $conn->query('insert into SignIn (username,password) values ("'.$user.'","'.$pwd.'")');
		if($res){
			echo true;
		}

	}else {
		$res = $conn->query('select *from SignIn where username="'.$user.'"');
		if($res->num_rows > 0){
			echo "该用户名已被注册";
		}else{
			echo "√";		
		}

	}	
}









$conn->close();


?>