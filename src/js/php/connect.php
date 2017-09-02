<?php
	
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = '_shop';
	
	$conn = new mysqli($servername,$username,$password,$database);

	if($conn->connect_errno){
		die('连接失败'.$conn->connect_error);
	}

	$conn->set_charset('utf8');

?>