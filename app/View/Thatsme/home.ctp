<?php 
	$title = "Snaphappi &middot; Curated Family Photos";
	$this->set("title_for_layout", $title);
	$this->extend('/Thatsme/beachfront');  
?>	
      <div id="home" class="featurette home track-page-view ">
      	<a name='home'></a>
<div class="vcenter-wrap">
	<div class="vcenter-padding">
		<div class="fw-band vcenter-body alpha black a70 "> 
			<div class="container center invisible"> 
				<div class="featurette-heading center">
					<h1 class="">Curated Family Photos</h1>	    	
		        	<div class="subhead">We'll find the precious moments buried under 1000s of family photos.</div>
		        </div>
		        <div class="wrapW">
		        	<figure class="graphic track-click" track='home-editors'>
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-02.png"></div>
		        		<figcaption>Trained Editors
		        			<span class="action right">find your</span>
		        		</figcaption>
		        	</figure>
		        	<figure class="graphic track-click" track='home-photos'>
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-01.png"></div>
		        		<figcaption>Beautiful Photos</figcaption>
		        	</figure>
		        	<figure class="graphic track-click" track='home-timeline'>
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-06.png"></div>
		        		<figcaption>
		        			<span class="action left">featured on</span>
		        			Curated Timelines
		        		</figcaption>
		        	</figure>
		        	<div class="vscroll-hint no-ie-alpha70b fadeOut">
		        		<div class='right'><i class='icon-remove-sign'></i></div>
		        		<i class='icon-arrow-up hide'></i><div class='body'>scroll down<br />to see each section</div><i class='icon-arrow-down'></i>
		        	</div>
		        </div>
		        <div class="featurette-heading center">
		        	<div class="subhead">
		        		Put your photos on <strong>our</strong> To-do list &mdash; and <strong>Play</strong> with your photos once again.
		        </div></div>
		   </div>     
        </div></div></div>        
        <div class='fw-band footer alpha black a85'>
        	<div class="container center">
        		<div class="pull-left"><a href='#call-to-action'><button class="btn btn-awesome" title='Go to the next section to learn more about Snaphappi'>
			    	I Want It
			    </button></a></div>	
<a title='see our Facebook page' target='_social' href='http://www.facebook.com/Snaphappi'><i class="icon-facebook-sign"></i></a>
&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
        		<div class="pull-right"><a href='#features' data-next='.featurette'><button class="btn btn-awesome" >
			    	Learn More
			    </button></a></div>
        	</div>
        </div>
      </div>
<?php 
	/*
	 * set deferred load url
	 */
	$deferred = "/home_deferred?{$_SERVER['QUERY_STRING']}";
	echo "<div id='deferred' data-href-deferred='{$deferred}'></div>";
?>      
      
