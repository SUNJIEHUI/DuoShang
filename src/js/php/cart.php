<?php
	include 'connect.php';

	$gId = $_GET['gId'];

	$sql = "select * from goods where id=".$gId;

	$conn->set_charset('utf8');

	$result = $conn->query($sql);

	$row = $result->fetch_assoc();
	
    $result->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);

	$conn->close();
?>