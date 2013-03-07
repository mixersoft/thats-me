<?php 
	$title = "Snaphappi &middot; Sharing";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('sharing');
	
	$this->extend('/Thatsme/beachfront');  
?> 	

 