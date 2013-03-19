<?php 
	if ($variation['follow']=='movie') {
		echo $this->element('see-the-movie');
		echo $this->element('features'); 
	} else {	// features first
		echo $this->element('features'); 
		echo $this->element('see-the-movie');
	}
	echo $this->element('how-it-works');
	echo $this->element('i-want-it');
	// echo $this->element('sharing');
	echo $this->element('about');
	echo $this->element('faq');     
?>
