<?php
	include 'connect.php';

	$id = isset($_GET['id']) ? $_GET['id'] : '';

	if($id == ''){
		
		$sql = "select * from personal";

		$result = $conn->query($sql);

		$row = $result->fetch_all(MYSQLI_ASSOC);

	    echo json_encode($row,JSON_UNESCAPED_UNICODE);

	}else{

		$sql = "DELETE FROM personal where id='$id'";

		$result = $conn->query($sql);

	    echo '删除成功';

	}

	$conn->close();
?>