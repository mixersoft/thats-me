<?php 
	$title = "Snaphappi &middot; FAQ";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('faq');
	
	$this->extend('/Thatsme/beachfront');  
?> 	
