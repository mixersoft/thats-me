<?php 
	$title = "Snaphappi &middot; What Makes Us Special";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('features');
	
	$this->extend('/Thatsme/beachfront');  
?> 	
