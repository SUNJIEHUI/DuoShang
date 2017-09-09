<?php
	
	include 'connect.php';

	$user = isset($_GET['username']) ? $_GET['username'] : '';
	$psw = isset($_GET['password']) ? $_GET['password'] : '';


	if($psw == '' && $user != ''){
		$sql = "select username from personal where username='$user'";

		$result = $conn->query($sql);

		if($result->num_rows>0){
			echo "false";
		}else{echo "true";}
	}else{
		$psw = md5($psw);


		$sql = "insert into personal (username,password) values('$user','$psw')";


		$result = $conn->query($sql);

		if ($result) {
		    echo "插入数据成功";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}

	$result->free();

	$conn->close();
?>