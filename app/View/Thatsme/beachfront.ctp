<?php 
	$title = "Snaphappi &middot; Curated Family Photos";
	$description = (isset($og_description)) ? $og_description : "What do you do with your 10,000 photos &middot; how do you find those precious moments? Only Snaphappi provides Trained Editors who find your Beautiful Photos and feature them on Curated Timelines. Put your photos on our To-do list and Play with your photos once again.";
	$viewport = "width=device-width, initial-scale=1.0";
	
	/**
	 * meta
	 */
	if (empty($this->viewVars['title_for_layout'])) $this->set("title_for_layout", $title);
	$this->Html->meta(array('name'=>'viewport', 'content'=>$viewport), null, array('inline' => false));
	$this->Html->meta('favicon.ico', '/img/beachfront/bp.ico', array('type' => 'icon', 'inline' => false));
	if ($this->action=='home')  $this->Html->meta('description', $description, array('inline' => false));
	/**
	 * CSS
	 */
	// $this->Html->css(array('fonts', 'beachfront.css', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));
	if ($isLocal) {
$this->Less->css('bootstrap', array('no_output'=>true));		
$this->Less->css('responsive', array('no_output'=>true));
$this->Less->css('beachfront-2', array('no_output'=>true));
// $min = "/min/b=css&f=bootstrap.css,responsive.css";
// $this->Html->css($min, null, array('inline' => false));		
		$min = "/min/b=css&f=bootstrap.css,responsive.css,fonts.css,beachfront-2.css,beachfront.css,responsive-tablet.css,responsive-mobile.css,font-awesome.css";
		$this->Html->css($min, null, array('inline' => false));
		$this->start('css');
			$this->Less->css('beachfront-less');
		$this->end();	
	} else {
		$this->Less->css('bootstrap', array('no_output'=>true));		
		$this->Less->css('responsive', array('no_output'=>true));
		$this->Less->css('beachfront-2', array('no_output'=>true));
		$this->Less->css('beachfront-less', array('no_output'=>true));
		$min = "/min/b=css&f=bootstrap.css,responsive.css,fonts.css,beachfront-2.css,beachfront.css,responsive-tablet.css,responsive-mobile.css,beachfront-less.css,font-awesome.css";
		$this->Html->css($min, null, array('inline' => false));
	}	
	
	/**
	 * other HEAD
	 */
	$this->startIfEmpty('HEAD_bottom');
		echo $this->element('fb_open_graph', compact('description'));
	$this->end();
	/**
	 * javascript HEAD
	 */
	$scriptBlock = array('CFG = {};');
	if ($isTouch) {
		$scriptBlock[] = 'CFG.isTouch = true;';
	}	 
	$this->Html->ScriptBlock(implode(' ', $scriptBlock), array('inline'=>false));
	
	/**
	 * javascript body bottom
	 */ 
	 
	$js_bottom = array();
	if ( 0 ) {
		// $js_bottom[] = '/js/vendor/TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.js';
		// $js_bottom[] = '/js/vendor/carouFredSel-6.2.0/jquery.carouFredSel-6.2.0.js';	
		// $js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js';	}
	// NOTE: append &123 to minify request string for 1 year max-age
	if ( Configure::read('debug') ) {
		$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=bootstrap/modernizr-2.6.2-respond-1.1.0.min.js,bootstrap/bootstrap.js,bootstrap/font-checker.js,bootstrap/jquery.cookie.js,bootstrap/jquery.scrollTo-1.4.3.1-min.js,TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js&123';		$js_bottom[] = 'base';
		// $js_bottom[] = 'http://www.youtube.com/iframe_api';		$js_bottom[] = "vendor";	// mixpanel and youtube control scripts
	} else {
		$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=bootstrap/modernizr-2.6.2-respond-1.1.0.min.js,bootstrap/bootstrap.js,bootstrap/font-checker.js,bootstrap/jquery.cookie.js,bootstrap/jquery.scrollTo-1.4.3.1-min.js,TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js&123';
		$js_bottom[] = '/min/b=js&f=base.js,vendor.js';		// $js_bottom[] = 'http://www.youtube.com/iframe_api';
	}
	
	/*
	 * prepend, put these scripts first, any additional scripts in extended view files go after
	 */
	$this->prepend('javascript_Bottom', $this->Html->script($js_bottom));
	
	if (0 || $isLocal == false) {
		// load google analytics/mixpanel only from snaphappi.com, also ?debug=true/false
		$this->start('javascript_Bottom');
			if (!empty($ga_experiment)) {
				// analytic experiments must be BEFORE analytics tracking code
				echo $this->element("analytics/exp-{$ga_experiment}");
			}
			echo $this->element('analytics/gaq');				// google analytics
			echo $this->element('analytics/mixpanel');			// mixpanel
			echo $this->element('analytics/fb');				// fb conversion tracking
		$this->end();	 
	}
?>

<!-- NAVBAR -->
<?php $this->startIfEmpty('body_header'); 
		echo $this->element('navbar', array('hash'=>true));
	    echo $this->element('notify');
 	$this->end(); 
?> 

    
<!-- FOOTER -->
<?php $this->startIfEmpty('body_footer'); ?>      
      <footer >
        <p><a href="/faq#faq-privacy">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
<?php $this->end(); ?>

<!-- BODY CONTENT -->
<?php 
	echo $this->element('bg-slideshow');
	echo $this->fetch('content'); 
?>
