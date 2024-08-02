<?php
ini_set("display_errors", "1");
error_reporting(E_ALL);

/**
 * Created by vegas s.
 */

sleep(2);

$error = false;

if ($error) {
	$sapi_type = php_sapi_name();
	if (substr($sapi_type, 0, 3) == 'cgi') {
		header("Status: 404 Not Found");
	} else {
		header("HTTP/1.1 404 Not Found");
	}

	$result = [
		'errors' => $error,
		'title' => 'Oops! The error came out',
		'msg' => 'Something went wrong, try it, in 100 years'
	];
} else {
	$result = [
		'errors' => false,
		'title' => 'Data received successfully',
		'msg' => 'We will contact you as soon as possible'
	];
}

echo json_encode($result);
