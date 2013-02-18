<?php 
	$title = "Snaphappi &middot; See the Movie";
	$this->set("title_for_layout", $title);
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>

<?php 
	echo $this->element('see-the-movie');
	
	$this->extend('/Thatsme/beachfront');  
?> 	

 