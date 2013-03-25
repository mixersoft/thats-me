<?php
	$title = "Snaphappi &middot; Ad creative";
	$description = "Some ads we've put together";
	$viewport = "width=device-width, initial-scale=1.0";
	
	if (empty($this->viewVars['title_for_layout'])) $this->set("title_for_layout", $title);
	$this->Html->meta(array('name'=>'viewport', 'content'=>$viewport), null, array('inline' => false));
	$this->Html->meta('favicon.ico', '/img/beachfront/bp.ico', array('type' => 'icon', 'inline' => false));
	
	
	$min = "/min/b=css&f=fonts.css,beachfront.css,responsive-tablet.css,responsive-mobile.css,font-awesome.css";
	$this->Html->css($min, null, array('inline' => false));
	$this->start('css');
		$this->Less->css('beachfront-less');
		$this->Less->css('ads-less');
	$this->end();	
	
	$this->startIfEmpty('body_header'); 
		echo $this->element('navbar', array('hash'=>false));
	    echo $this->element('notify');
 	$this->end(); 
	
	// dummy vars
	$this->set(array_fill_keys(array('isLocal','isTouch'), null));
	$this->extend('/Thatsme/beachfront');
	
	
?>
<div class="fw-band alpha rgba70b center "> 
	<div class='container'>
		<div class="featurette-heading text-left">
			<h1 class="">Snaphappi Display Ads</h1>	    	
        </div>
        <div class='row'>
	<div class='display-ad leaderboard text-left' title='728x90'>
		<div class="alpha xxxrgba70b">
			<img class='timeline' src='/img/beachfront/darkroom.png'>
			<img class="pull-left" style="width: 90px; height: 90px;" src='/img/beachfront/icon-sm-02.png'>
<div class="vcenter-wrap" style="padding-left: 10px; width: auto; height: 90px;" >
		<div class="vcenter-padding">
			<div class="vcenter-body"> 
					<h4 class="">
						<span class="logo">
						snap<span class="cursive">happi</span>
						</span>
						Curated Family Photos</h4>          	
					<p>Find out how we take the "work" out of your family photos<br />
						so you can just play.</p>
					
</div></div></div>
		</div>
	</div>
	<div class='display-ad leaderboard text-left' title='728x90'>
		<div class="alpha xxxrgba70b">
			<img class='timeline' src='/img/beachfront/darkroom.png'>
			<img class="pull-left" style="width: 90px; height: 90px;" src='/img/beachfront/icon-sm-02.png'>
<div class="vcenter-wrap" style="padding-left: 10px; width: auto; height: 90px;" >
		<div class="vcenter-padding">
			<div class="vcenter-body"> 
					<h4 class="">
						<span class="logo">
						snap<span class="cursive">happi</span>
						</span>
						Curated Family Photos</h4>          	
					<p>Family photos made easy!</p>
					
</div></div></div>
		</div>
	</div>	
	<div class='display-ad skyscraper' title='160x600'><div class='ad-wrap'>
		<div class='text-center'>
			<div class="logo alpha rgba70b">
			snap<span class="cursive">happi</span>
			</div>
		</div>
		<img src='/img/beachfront/icon-sm-06.png'>
		<div class='center'>
			<h1 class='shadow'>Curated Family Photos</h1>
			<p class='lead shadow'>Find out how we take the “work” out of your family photos</p>
			<a class='btn btn-large btn-warning'>See the movie</a>
		</div>
		<div class='center bottom'>
			<p>Like us on <i class='icon-facebook-sign'></i></p>
		</div>
	</div></div>
	<div class='display-ad skyscraper' title='160x600'><div class='ad-wrap'>
		<div class='text-center'>
			<div class="logo alpha rgba70b">
			snap<span class="cursive">happi</span>
			</div>
		</div>
		<img src='/img/beachfront/icon-sm-02.png'>
		<div class='center'>
			<h1 class='shadow'>Curated Family Photos</h1>
			<p class='lead shadow'>Overwhelmed by your 10,000 family photos? No problem!</p>
			<a class='btn btn-large btn-warning'>See the movie</a>
		</div>
		<div class='center bottom'>
			<p>Like us on <i class='icon-facebook-sign'></i></p>
		</div>
	</div></div>	
	<div class='display-ad skyscraper' title='160x600'><div class='ad-wrap'>
		<div class='text-center'>
			<div class="logo alpha rgba70b">
			snap<span class="cursive">happi</span>
			</div>
		</div>
		<div class='center'>
			<br/>
			<p class='lead shadow'>Trained Editors screen your Family Photos for <strong class='nowrap'>how much?!?</strong></p>
			<img style="margin: -20px 0;" src='/img/beachfront/icon-lg-01.png'>
			<h1 class='shadow'>Curated Family Photos</h1>
			<br />
			<a class='btn btn-large btn-warning'>Learn More</a>
		</div>
		<div class='center bottom'>
			<p>Like us on <i class='icon-facebook-sign'></i></p>
		</div>
	</div></div>
	
	
	
	<div class='display-ad medium' title='300x250'>
		
	</div>
        </div>
	</div>
</div>
