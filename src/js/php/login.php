<?php
	include 'connect.php';

	$user = isset($_GET['username']) ? $_GET['username'] : '';
	$psw = isset($_GET['password']) ? $_GET['password'] : '';

	$psw = md5($psw);

	$sql = "select * from users where username='$user' and password='$psw'";

	//echo "$sql";

	$result = $conn->query($sql);

	$row = $result->fetch_row();

	//print_r($row[0]);

	if($row[0]){
		echo 'true';
	}else{
		echo 'false';
	}
	
	$result->free();

	$conn->close();
?>