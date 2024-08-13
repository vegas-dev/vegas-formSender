<?php
ini_set("display_errors", "1");
error_reporting(E_ALL);

/**
 * Created by vegas s.
 */

sleep(2);

$error = true;

if ($error) {
	header($_SERVER['SERVER_PROTOCOL'] . '500 Внутренняя ошибка сервера', true, 500);
} else {
	$result = [
		'errors' => true,
		'title' => 'Data received successfully',
		'msg' => 'We will contact you as soon as possible'
	];
}

echo json_encode($result);
