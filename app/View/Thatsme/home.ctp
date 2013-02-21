<?php 
	$title = "Snaphappi &middot; Curated Family Photos";
	$this->set("title_for_layout", $title);
	$this->extend('/Thatsme/beachfront');  
?>	
      <div id="home" class="featurette connect track-page-view ">
      	<a name='home'></a>
<div class="vcenter-wrap">
	<div class="vcenter-padding">
		<div class="fw-band alpha70b vcenter-body"> 
			<div class="container center invisible"> 
				<div class="featurette-heading">
					<h1 class="">Curated Family Photos</h1>	    	
		        	<div class="subhead">What do you do with your 10,000 photos? How do you find those precious moments?</div>
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
		        	<div class="vscroll-hint alpha70b fadeOut"><div class='arrow up'>&and;</div><div>scroll for more</div><div class='arrow'>&or;</div></div>
		        </div>
		        <div class="featurette-heading footer">
		        	<div class="subhead">
		        		Put your photos on <strong>our</strong> To-do list &mdash; and <strong>Play</strong> with your photos once again.
		        </div></div>
		        <div class='row'>
		        	<div class='about alpha70b offset2 span8'>
						<p>
At Snaphappi, we know that a single photo can launch a thousand happy memories. 
But with a growing family and a hectic job, who has time to scroll through 10,000 thumbnails to find your great shots? 
			        	</p>
			        	<p>
Only Snaphappi uses Trained Editors <strong>(real people)</strong> to screen your family photos. 
We'll find your Beautiful Photos, hide the duplicates, and let you see it all on a stunning Curated Timeline.  
Let us do the work, and we'll get your photos ready to play.  
	        			</p>
		        	</div>
		        </div>
		   </div>     
        </div></div></div>        
        <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
        		<div class="pull-right"><a href='#features'>Learn More</a></div>
        	</div>
        </div>
      </div>

	
	
	
<?php echo $this->element('features'); ?>	
<?php echo $this->element('how-it-works'); ?>	
<?php echo $this->element('see-the-movie'); ?>
<?php echo $this->element('i-want-it'); ?>
     
      <a name='thank-you' id='thank-you' class='track-page-view  track-requires-hash'></a>
      <a name='sharing'></a>
      <div id='sharing' class="featurette sharing track-page-view alpha70ph">
      	<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="featurette-heading alpha70b">
					        <h1>
					        	<span class="thank-you hide">Thank You for Your Support <span class="muted">and</span></span>
					        	<span class="muted">Spread the Word!</span>
					        </h1>
					        <div class="subhead">You can also show your support by sharing Snaphappi will all your friends. We'd be very grateful.</div>
					        
				<div class="wrapH center">
      				<div class="social-sharing">
		        		<div class="fb-like" data-href="http://thats-me.snaphappi.com/i-need-this" data-send="true" data-layout="button_count" data-width="225" data-show-faces="true" data-font="arial"></div>
		        		<div class="tweet-wrap">
		        		<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://thats-me.snaphappi.com/i-need-this" 
		        			data-text="Checkout Snaphappi, it's a great new site for Curated Family Photos.">Tweet</a>
		        			</div>
		        	</div>
      			</div>
					        
				       	</div>
				       	<div class='wrapH center'>
	        				<img src="/img/beachfront/icon-sm-03.png">
	        			</div>
					</div>
      			</div>
      		</div>
		</div>		
        <div class='fw-band footer'>
        	<div class="container ">
	    		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
	    		<div class="pull-right"><a href='#home'>Top</a></div>
	    	</div>
        </div>
      </div>


<?php echo $this->element('about'); ?>      
<?php echo $this->element('faq'); ?>
