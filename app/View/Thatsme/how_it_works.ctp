<?php 
	$title = "Snaphappi &middot; How It Works";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('how-it-works');
	
	$this->extend('/Thatsme/beachfront');  
?> 	
 