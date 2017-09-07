<?php
	include 'connect.php';
	
	$pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
	$cate = isset($_GET['cate']) ? $_GET['cate'] : '';

	$sql = "select * from goods";

	if($cate){
		$sql .= " where category='$cate'";
	}

	$startIdx = $qty*($pageNo-1);

	$sql .= " limit $startIdx,$qty";

	$result = $conn->query($sql);

	$row = $result->fetch_all(MYSQLI_ASSOC);

    $res = array(
    	'pageNo'=>$pageNo,
    	'qty'=>$qty,
    	'total'=>$conn->query('select count(*) from goods')->fetch_row()[0],
    	'data'=>$row,
    	'status'=>200,
    	'msg'=>'success'
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);


	$conn->close();
?>