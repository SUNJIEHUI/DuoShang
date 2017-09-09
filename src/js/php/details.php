<?php

	include 'connect.php';

	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$url = isset($_GET['url']) ? $_GET['url'] : '';
	$name = isset($_GET['name']) ? $_GET['name'] : '';
	$price = isset($_GET['price']) ? $_GET['price'] : '';
	$qty = isset($_GET['qty']) ? $_GET['qty'] : '';

	//echo $price;
	$sql = "insert into personal (username,url,name,price,qty) values('$username','$url','$name','$price','$qty')";

		$result = $conn->query($sql);

		if ($result) {
		    echo "true";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}

	$conn->close();
?>