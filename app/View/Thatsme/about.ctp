<?php 
	$title = "Snaphappi &middot; About";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('about');
	
	$this->extend('/Thatsme/beachfront');  
?> 	      
