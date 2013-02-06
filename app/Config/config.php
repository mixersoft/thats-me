<?php 
$isLocal = (
	in_array(env('REMOTE_ADDR'), array('127.0.0.1', '::1'))
	or !strpos(env('HTTP_HOST'), 'snaphappi.com')
	or class_exists('ShellDispatcher')
);
$config = array(
	'isLocal' => $isLocal,
	'now' => date('Y-m-d H:i:s'),
	'Config' => array(
		'language' => 'eng'
	),
);
?>