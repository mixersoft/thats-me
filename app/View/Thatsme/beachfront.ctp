<?php 
	$title = "Snaphappi &middot; Curated Family Photos";
	$description = "What do you do with your 10,000 photos &middot; how do you find those precious moments? Only Snaphappi provides Trained Editors who find your Beautiful Photos and feature them on Curated Timelines. Put your photos on our To-do list and Play with your photos once again.";
	$viewport = "width=device-width, initial-scale=1.0";
	/**
	 * meta
	 */
	$this->set("title_for_layout", $title);
	$this->Html->meta(array('name'=>'viewport', 'content'=>$viewport), null, array('inline' => false));
	$this->Html->meta('favicon.ico', '/favicon.ico', array('type' => 'icon', 'inline' => false));
	$this->Html->meta('description', $description, array('inline' => false));
	/**
	 * CSS
	 */
	if ($isTouch) {
		// $this->Html->css(array('fonts', 'beachfront.css', 'touch', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));		$min = "/min/b=css&f=fonts.css,beachfront.css,touch.css,responsive-tablet.css,responsive-mobile.css";
		$this->Html->css($min, null, array('inline' => false));
	} else {
		// $this->Html->css(array('fonts', 'beachfront.css', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));		$min = "/min/b=css&f=fonts.css,beachfront.css,responsive-tablet.css,responsive-mobile.css";
		$this->Html->css($min, null, array('inline' => false));
	}
	$this->start('css');
		$this->Less->css('beachfront-less');
	$this->end();
	/**
	 * other HEAD
	 */
	$this->start('HEAD_bottom');
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
	if ($isTouch) {
		$js_bottom[] = 'http://snappi.snaphappi.com/min/f=static/js/iscroll/iscroll.js';
	} else {
		// $js_bottom[] = '/js/vendor/TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.js';
		// $js_bottom[] = '/js/vendor/carouFredSel-6.2.0/jquery.carouFredSel-6.2.0.js';			$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js';
	}
	if (Configure::read('isLocal')) {
		$js_bottom[] = 'base';
		$js_bottom[] = "vendor";	// mixpanel and youtube control scripts
	} else {
		$js_bottom[] = '/min/b=js&f=base.js,vendor.js';
	}
		// $js_bottom[] = '/min/b=js&f=base.js,vendor.js';	$js_bottom[] = 'http://www.youtube.com/iframe_api';
	$this->Html->script($js_bottom, array('block' => 'javascript_Bottom'));
	 
	$this->start('javascript_Bottom');
?>
		<!-- start google Analytics -->
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-4086550-2']);
		  _gaq.push(['_setDomainName', 'snaphappi.com']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
		<!-- start Mixpanel -->
		<script type="text/javascript">
			(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
			typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.increment people.append people.track_charge".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||
			[]);
			mixpanel.init("22ee941178e2f8bb1702c92f84cf91b2");
		</script>		
<?php
	$this->end();	 
?>

<?php $this->start('body_header'); ?>
    <!-- NAVBAR
    ================================================== -->
      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
	    <div class='bounding-box '>
        <div class="navbar navbar-inverse navbar-fixed-top alpha70b">
          <div class="navbar-inner container alpha70b">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/i-need-this"><img src='/img/beachfront/snaphappi-logo-v2.png'></a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse pull-right">
              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="#home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#how-it-works" >How It Works</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#call-to-action" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha70b">
                  	<li><a href="#see-the-movie">See the Movie Again</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#FAQ">FAQ</a></li>
                    <li class='hide'><a href="#">Playground</a></li>
                  </ul>
                </li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->
       </div>
        <div class="alert-wrapper show-navbar invisible fadeOut" >
        	<div class='fade-wrap'>
        		<div class='alert alert-info'></div>
        	</div>
        </div>

<?php $this->end(); ?> 

   
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
	<div id="bg-slideshow">
		<div class='fixed bg pix' name='0'></div>
	</div>
	
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
		        	<figure class="graphic">
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-02.png"></div>
		        		<figcaption>Trained Editors
		        			<span class="action right">find your</span>
		        		</figcaption>
		        	</figure>
		        	<figure class="graphic">
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-01.png"></div>
		        		<figcaption>Beautiful Photos</figcaption>
		        	</figure>
		        	<figure class="graphic">
		        		<div class="wrapH"><img src="/img/beachfront/icon-sm-06.png"></div>
		        		<figcaption>
		        			<span class="action left">featured on</span>
		        			Curated Timelines
		        		</figcaption>
		        	</figure>
		        </div>
		        <div class="featurette-heading">
		        	<div class="subhead">
		        		Put your photos on <u>our</u> To-do list and Play with your photos once again.
		        </div></div>
		   </div>     
        </div></div></div>        
        <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
        		<div class="pull-right"><a href='#features'>Learn More</a></div>
        	</div>
        </div>
      </div>

	
	
	
	
    <!-- Carousel: Features
    ================================================== -->
    <a class='anchor' name='features'></a>
    <div id="features" class="featurette carousel track-page-view">
		
    <div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body ">
		<div class="featurette-heading center">
			<h1 class="">Features &amp; Benefits</h1>	    	
       		<div class="subhead">Trained Photo Editors finding Beautiful Photos featured on Curated Timelines &mdash; for only a Penny a Photo!</div>
       </div>			
      <div id="features-iscroll" class="carousel-inner">
      	<ul class="scroller invisible">
      		<li class="item active">
			<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-02.png"></div>
        		<figcaption>Screened By Real Editors
        			<div class="body">
No other photo service out there uses real people like we do. 
Our trained photo editors hand-select the beautiful photos that are featured on your Timeline and hide duplicates just for you. 
We promise 100% privacy.
					</div>
        		</figcaption>
        	</figure>
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-06.png"></div>
        		<figcaption>Beautiful Curated Timeline
        			<div class="body">
   	<p>Your most precious moments are highlighted in a stunning Curated Timeline, marked by beautiful photos.</p>
<p>Quickly zoom across your Timeline, jumping from moment to moment; 
    		re-live those moments through beautiful Curated Stories; 
    		and dive deep into your photo archives when you want to see everything.</p>	          	
					</div>
        		</figcaption>
        	</figure>
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-05.png"></div>
        		<figcaption>Faster Uploads
        			<div class="body">
    	<p>Our Uploader lets you upload up to 100x faster than other photo sites - we've seen speeds up to 3000 photos/hour.</p>
					</div>
        		</figcaption>
        	</figure
        </li><li class="item">
       	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-03.png"></div>
        		<figcaption>Share Loved Memories
        			<div class="body">
        <p>The hardest part about sharing is finding something worth sharing. 
        But thanks to our Curated Timelines, you'll have quick and easy access to all your precious moments and beautiful photos. 
        The rest is a snap.
          </p>
					</div>
        		</figcaption>
        	</figure>
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-04.png"></div>
        		<figcaption>You're in Control
        			<div class="body">
    	<p>You have complete control. You can adjust the photos highlighted on your Timeline
by rating the ones you love.
	          		</p>
					</div>
        		</figcaption>
        	</figure>
        </li>
        </ul> 
      </div> <!-- /.carousel-inner  -->
<div class="carousel-pager center"></div>       
<div class="carousel-control-wrap">
	<a class="left carousel-control" href="#features" direction="prev">&lsaquo;</a>        
	<a class="right carousel-control" href="#features" direction="next">&rsaquo;</a>
</div>
<div class="center"><a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a></div>
		</div> <!-- / .vcenter-body .fw-band alpha70b --> 
	</div>	<!-- / .vcenter-padding --> 
</div>	<!-- / .vcenter-wrap --> 
  
      <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
        		<div class="pull-right"><a href='#how-it-works'>Learn More</a></div>
        	</div>
        </div>  
    </div><!-- /.carousel -->
       
	
    <!-- Carousel: How It Works
    ================================================== -->
    <a name='how-it-works'></a>
    <div id="how-it-works" class="featurette carousel track-page-view ">
    	
<div class="vcenter-wrap">
	<div class="vcenter-padding">
		<div class="fw-band alpha70r vcenter-body ">
			<div class="featurette-heading center">
				<h1 class="featurette-heading center">How It Works</h1>	
			</div>
      <div id="how-it-works-iscroll" class="carousel-inner">
      <ul class="scroller invisible">	
        <li class="item active">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-06.png"></div>
        		<figcaption>Send Us Your Photos
        			<div class="body">
<p>With a few clicks, you can upload your entire photo archive to Snaphappi – whether 10 or 100 thousand shots!</p>
<p>Our Uploader works up to 100x faster than normal photo sites - we've seen speeds up to 3000 photos/hour.</p>	    	
					</div>
        		</figcaption>
        	</figure>
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-02.png"></div>
        		<figcaption>We'll Find your Beautiful Photos
        			<div class="body">
<p>Our trained editors will find the beautiful photos that are featured on your Timeline. 
It may take awhile, but they will rate all your photos and hide the duplicates just for you.</p>
<p>And yes, they are <u>real</u> people - who else can say that?</p>	
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-04.png"></div>
        		<figcaption>And Build Your Curated Timeline
        			<div class="body">
<p>You'll find all your photos on a stunning Curated Timeline to make your precious moments easy to find and a joy to use.</p>
<p>Your timeline is organized using automatic event detection to make your moments easy to find and 
we'll highlight your events with beautiful photos to make it a joy to use. 
<p>Your photos are ready to play.</p>        				
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-03.png"></div>
        		<figcaption>Push Your Finger<br />to Play
        			<div class="body">
<p>Re-live and share your special moments on the iPad with the push of a finger.</p>
<p>Quickly zoom across your Curated Timeline, jumping from moment to moment; 
	re-live those moments through beautiful Curated Stories; 
	and dive deep into your photo archives when you want to see everything.</p>
<p>We promise you'll see the Big Picture before you see the thumbnails.</p>
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-01.png"></div>
        		<figcaption>Just a penny a photo!
        			<div class="body">
<p>There are many places to go to share your beautiful photos, but <u>someone</u> has to do the work to find them.
If it's not going to be you, then let it be Snaphappi.</p>
<p>Only Snaphappi uses real people - trained photos editors - to sort through your photos. 	
We think it's a small price to pay for all the time you'll save.</p>					
					</div>
        		</figcaption>
        	</figure>        	
        </li> 
        </ul>
      </div> <!-- /.carousel-inner  -->
<div class="carousel-pager center"></div>       
<div class="carousel-control-wrap">
	<a class="left carousel-control" href="#how-it-works" direction="prev">&lsaquo;</a>
	<a class="right carousel-control" href="#how-it-works" direction="next">&rsaquo;</a>
</div>
<div class="center"><a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a></div>
		</div> <!-- / .vcenter-body .fw-band alpha70b --> 
	</div>	<!-- / .vcenter-padding --> 
</div>	<!-- / .vcenter-wrap --> 
      <div class='fw-band footer'>
    	<div class="container ">
    		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
    		<div class="pull-right"><a href='#see-the-movie'>Learn More</a></div>
    	</div>
      </div>  
    </div><!-- /.carousel -->
    
    
        
    
    
    
    
    
    
    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

<!--       <hr class="featurette-divider"> -->
      
	  <a name='see-the-movie'></a>	
      <div id="see-the-movie" class="featurette see-the-movie">
      	<div class='fw-band vcenter-body'>
	      	<div class="featurette-heading center">
		        <h1>See the Movie</h1>
		        <div class="subhead hide">It'll knock your socks off</div>
	       	</div>
	        <div class='vcenter-body center'>
	        	<iframe id="yt-player" type="text/html"  src="http://www.youtube.com/embed/kVdU49dg3oo?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>
			</div>
	    </div>
	    <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-right"><a href='#call-to-action'>I Want It</a></div>
        	</div>
        </div>
      </div>

      
      <a name='call-to-action'></a>
      <div id='call-to-action' class="featurette call-to-action alpha70b">
      	<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="heading">
					        <h1>Still in the Darkroom</h1>
					        <div class="subhead">We're working hard to build Snaphappi into a service you never knew you needed but can't live without.</div>
				       	</div>
					</div>
      			</div>
	        <div class="row">
	        	<div class="offset1 span5 donate">
					<p class="lead">
If you want this service ASAP, let us know &mdash; we need your vocal support! 
Cheer us on through those long sleepless nights by sending us a buck <span class="dollar">($1)</span>. 
<br />We'll get the message. 
	        		</p>
	        	</div>
	        	<div class="span5 join">
<p class="lead">
If you are not completely sold on the idea just yet, you'll still have an opportunity to help shape this service with your early participation and feedback. 
<br />We'll send you an invite to our preview.
</p>
	        	</div>
	        	<div class="span1"></div>
	        </div>  <!-- / .row -->
	        <div class="row">
	        	<div class="span12 center">
	        		
<form class="form-inline call-to-action center" action="" method="post">	        		
	<div class="control-group">
	  <div class="controls">
	  	<div class="input-prependx input-appendx">
	  		<div class='wrapH left'>
		  		<button id='cheer' type="submit" class="btn btn-primary track-click" track='cheer' title='Cheer us on for just a buck!'>
		  			I Want it ASAP!
		  		</button>
		  		<i class="icon-arrow-left icon-white"></i>
	  		</div>
	  		<div class="wrapH">
		    	<input type="email" placeholder="Email" class='email' required title="Join our email list">
		    </div>
		    <div class='wrapH right'>
			    <i class="icon-arrow-right icon-white"></i>
			    <button id='invite' type="submit" class="btn btn-warning track-click" track='invite' title='Request an invitation to our preview'>
			    	I Want an Invite
			    </button>
		    </div>
		</div>
	  </div>
	</div>
</form>		

<div class='donate-form-wrap' style='display:none;'>
	        				<h2>We like your enthusiasm!</h2>
	        				<p>Use one of the buttons below to cheer us on with a $1 donation</p>
	        				<!--  Payal 	        			 -->
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" title="Donate $1 with PayPal - The safer, easier way to pay online!">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="H8VZABJRNDHX4">
<input class='track-click' track='donate-PayPal'  type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="Donate $1 with PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>


		<!--  Amazon Simple Pay  https://payments.amazon.com/sdui/sdui/standardbuttoncreate -->
<form action="https://authorize.payments.amazon.com/pba/paypipeline" method="post" title="Donate $1 with Amazon Payments">
  <input type="hidden" name="returnUrl" value="http://thats-me.snaphappi.com/i-need-this#thank-you" >
  <input type="hidden" name="ipnUrl" value="http://thats-me.snaphappi.com/donate/Amazon_IPN" >
  <input type="hidden" name="processImmediate" value="1" >
  <input type="hidden" name="signatureMethod" value="HmacSHA256" >
  <input type="hidden" name="accessKey" value="11SEM03K88SD016FS1G2" >
  <input type="hidden" name="collectShippingAddress" value="0" >
  <input type="hidden" name="isDonationWidget" value="0" >
  <input type="hidden" name="amazonPaymentsAccountId" value="NGWBMIUTOSUY31UM3CKJQBJQKRNJE6LDCALFR9" >
  <input type="hidden" name="cobrandingStyle" value="logo" >
  <input type="hidden" name="immediateReturn" value="1" >
  <input type="hidden" name="amount" value="USD 1.00" >
  <input type="hidden" name="description" value="Go Snaphappi! I want Curated Family Photos." >
  <input type="hidden" name="abandonUrl" value="http://thats-me.snaphappi.com/i-need-this#not-yet" >
  <input type="hidden" name="signatureVersion" value="2" >
  <input type="hidden" name="signature" value="WPGLkoL/P0tPocJb8pCB76MCcSAcLg2MhUgPnHStVbs=" >
  <input  class='track-click' track='donate-Amazon' alt="Donate $1 with Amazon Payments" type="image" src="http://g-ecx.images-amazon.com/images/G/01/asp/golden_small_paynow_withlogo_darkbg.gif" border="0">
</form>		
</div>
	        	</div>  
	        </div> <!-- / .row -->
	        <div class="row">
	        	<div class='wrapH center'>
    				<img src="/img/beachfront/icon-lg-01.png">
    			</div>
	        </div> <!-- / .row -->
        </div>
      </div> <!-- / .vcenter-body  -->
    </div> 
      
      <a name='thank-you'></a>
      <a name='sharing'></a>
      <div id='sharing' class="featurette sharing alpha70cr">
      	<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="heading alpha70b">
					        <h1>
					        	<span class="thank-you hide">Thank You for Your Support <span class="muted">and</span></span>
					        	<span class="muted">Spread the Word!</span>
					        </h1>
					        <div class="subhead">You can also show your support by sharing Snaphappi will all your friends. We'd be very grateful.</div>
					        
				<div class="wrapH center">
      				<div class="social-sharing">
		        		<div class="fb-like" data-href="http://thats-me.snaphappi.com/i-need-this" data-send="true" data-layout="button_count" data-width="225" data-show-faces="true" data-font="arial"></div>
		        		<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://thats-me.snaphappi.com/i-need-this" 
		        			data-text="Checkout Snaphappi, it's a great new site for Curated Family Photos.">Tweet</a>
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

      <a name='about'></a>
      <div id='about' class="featurette about track-page-view alpha70ph">
		<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="heading alpha70b">
					        <h1>About Snaphappi</h1>
				       	</div>
					</div>
      			</div>
      			<div class="row">
		        	<div class="span12 body">
						<p>
At Snaphappi, we know that a single photo can launch a thousand happy memories. 
But with a growing family and a hectic job, 
who has time to scroll through 10,000 thumbnails to find your Beautiful Photos? 
Most likely, it's not going to be you, and it's certainly not going to be fancy computer algorithm.        		
			        	</p>
			        	<p>
Only Snaphappi uses real photo editors to screen your family photos. 
We'll find your beautiful photos and hide duplicates, 
saving you hours of time and making fun and easy to re-live your precious moments. 
Let us roll up our sleeves so you can just play.
	        			</p>
	        			<div class='wrapH center'>
	        				<img src="/img/beachfront/icon-lg-03.png">
	        			</div>
	        	</div></div>
      		</div>
		</div>	      	
		<div class='fw-band footer'>
	    	<div class="container ">
	    		<div class="pull-left"><a href='#call-to-action'>I Want It</a></div>	
	    		<div class="pull-right"><a href='#home'>Top</a></div>
	    	</div>
	    </div> 
      </div>
      
      
	

      <a name='FAQ'></a>
      <div id='FAQ' class="featurette FAQ track-page-view  alpha70r">
		<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="heading alpha70b">
					        <h1>Frequently Asked Questions</h1>
				       	</div>
					</div>
      			</div>
      			<div class="row">
		        	<div class="span12 body">
<?php echo $this->element('faq'); ?>
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
      <!-- FOOTER -->
<?php $this->start('body_footer'); ?>      
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p><a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
      <div id="fb-root"></div>
<?php $this->end(); ?>
