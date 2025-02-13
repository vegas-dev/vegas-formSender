<?php
ini_set("display_errors", "1");
error_reporting(E_ALL);

/**
 * Created by vegas s.
 */

sleep(2);

$error = true;
$result = [];

if ($error) {
	header($_SERVER['SERVER_PROTOCOL'] . '500 Внутренняя ошибка сервера', true, 500);

	$result = [
		'errors' => [
			'child_history' => ['Пожалуйста, загрузите файл с историей ребенка'],
			'child_photos' => ['Пожалуйста, прикрепите фотографии ребенка.']
		],
		'title' => 'Ошибка',
		'message' => 'The given data was invalid'
	];

	echo json_encode($result);
} else {
	$result = [
		'errors' => false,
		'title' => 'Data received successfully',
		'message' => 'We will contact you as soon as possible'
	];

	echo json_encode($result);
}
