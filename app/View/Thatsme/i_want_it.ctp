<?php 
	$title = "Snaphappi &middot; I Want It";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('i-want-it');
	
	$this->extend('/Thatsme/beachfront');  
?> 	
