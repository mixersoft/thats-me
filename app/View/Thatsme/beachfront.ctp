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
	// $this->Html->css(array('fonts', 'beachfront.css', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));	$min = "/min/b=css&f=fonts.css,beachfront.css,responsive-tablet.css,responsive-mobile.css";
	$this->Html->css($min, null, array('inline' => false));
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
	if ( 1 ) {
		// $js_bottom[] = '/js/vendor/TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.js';
		// $js_bottom[] = '/js/vendor/carouFredSel-6.2.0/jquery.carouFredSel-6.2.0.js';			$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js';		// $js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js';
	}
	if ($isLocal) {
		$js_bottom[] = 'base';
		$js_bottom[] = 'http://www.youtube.com/iframe_api';		$js_bottom[] = "vendor";	// mixpanel and youtube control scripts
	} else {
		$js_bottom[] = '/min/b=js&f=base.js,vendor.js';		$js_bottom[] = 'http://www.youtube.com/iframe_api';
	}
	$this->Html->script($js_bottom, array('block' => 'javascript_Bottom'));
	
	if ($isLocal == false) {
		// load google analytics/mixpanel only from snaphappi.com		$this->start('javascript_Bottom');
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
<!-- start Mixpanel --><script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,
e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
mixpanel.init("22ee941178e2f8bb1702c92f84cf91b2");
mixpanel.set_config({ cross_subdomain_cookie: false });
CFG['mixpanel'].instance = mixpanel;
</script><!-- end Mixpanel -->
<?php
		$this->end();	 
	}
?>

<?php $this->start('body_header'); ?>
    <!-- NAVBAR
    ================================================== -->
      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
 		<?php echo $this->element('navbar'); ?> 
        <div class="alert-wrapper invisible fadeOut" >
        	<div class='fade-wrap'>
        		<div class='alert alert-info'></div>
        	</div>
        </div>
		<div class="show-navbar"></div>
<?php $this->end(); ?> 

   
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
	<div id="bg-slideshow">
		<div class='fixed bg pix' name='1'></div>
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
		        <div class="featurette-heading footer">
		        	<div class="subhead">
		        		Put your photos on <strong>our</strong> To-do list &mdash; and <strong>Play</strong> with your photos once again.
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
    <div id="features" class="featurette carousel body-opaque track-page-view  track-carousel-end">
	    <div class="vcenter-wrap opaque">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body ">
		<div class="featurette-heading center">
			<h1 class="">Features &amp; Benefits</h1>	    	
       		<div class="subhead">
Trained Photo Editors finding Beautiful Photos featured on Curated Timelines &mdash; 
<strong class="nowrap">for only a Penny a Photo!</strong></div>
       </div>			
      <div class="carousel-inner">
      	<ul class="scroller xxxinvisible">
      		<li class="item active">
			<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-sm-02.png"></div>
        		<figcaption>Screened by <span class="nowrap">Real Editors</span>
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
        		<figcaption>Beautiful <span class="nowrap">Curated Timeline</span>
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
<div class="center"><a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a></div>     
<div class="carousel-control-wrap">
	<div class="left carousel-control-btn" href="#features" direction="prev">&lsaquo;</div>        
	<div class="right carousel-control-btn" href="#features" direction="next">&rsaquo;</div>
</div>
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
    <div id="how-it-works" class="featurette carousel track-page-view track-carousel-end">
    	
<div class="vcenter-wrap">
	<div class="vcenter-padding">
		<div class="fw-band alpha70card vcenter-body ">
			<div class="featurette-heading center">
				<h1 class="featurette-heading center">How It Works</h1>	
			</div>
      <div class="carousel-inner">
      <ul class="scroller xxxinvisible">	
        <li class="item left-image active">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-06.png"></div>
        		<figcaption>Send Us Your Photos
        			<div class="body">
<p>With a few clicks, you can upload your entire photo archive to Snaphappi – whether 10 or 100 thousand shots!</p>
<p>Our Uploader works up to 100x faster than normal photo sites - we've seen speeds up to 3000 photos/hour.</p>	    	
					</div>
        		</figcaption>
        	</figure>
        </li><li class="item left-image">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-02.png"></div>
        		<figcaption>We'll Find Your <span class="nowrap">Beautiful Photos</span>
        			<div class="body">
<p>Our Trained Editors will find the Beautiful Photos that are featured on your Curated Timeline. 
They work quickly (assisted by sophisticated algorithms) to rate photos and hide duplicates &mdash; just for you.</p>
<p>And yes, they are <strong>real people</strong> - who else can say that?</p>	
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item left-image">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-04.png"></div>
        		<figcaption>And Build Your <span class="nowrap">Curated Timeline</span>
        			<div class="body">
<p>You'll find all your photos on a stunning Curated Timeline 
	to make your precious moments easy to find and a joy to use.</p>
<p>Your Timeline is automatically organized by events and always feature Beautiful Photos, not thumbnails, to connect you instantly with the moment. 
<p>We'll get your photos are Ready to Play.</p>        				
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item left-image">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-03.png"></div>
        		<figcaption>Push Your Finger <span class="nowrap">to Play</span>
        			<div class="body">
<p>Re-live and share your special moments on the iPad with the push of a finger.</p>
<p>Quickly zoom across your Curated Timeline, jumping from moment to moment; 
	re-live those moments through beautiful Curated Stories; 
	and dive deep into your photo archives when you want to see everything.</p>
<p>We promise you'll see the Big Picture before you see the thumbnails.</p>
					</div>
        		</figcaption>
        	</figure>        	
        </li><li class="item left-image">
        	<figure class="graphic">
        		<div class='wrapH'><img src="/img/beachfront/icon-lg-01.png"></div>
        		<figcaption>Just a Penny a Photo!
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
<div class="center"><a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a></div>  
   
<div class="carousel-control-wrap">
	<div class="left carousel-control-btn" href="#how-it-works" direction="prev">&lsaquo;</div>
	<div class="right carousel-control-btn" href="#how-it-works" direction="next">&rsaquo;</div>
</div>
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
      <div id="see-the-movie" class="featurette see-the-movie body-opaque">
      	<div class="opaque">
	      	<div class='fw-band vcenter-body'>
		      	<div class="featurette-heading center">
			        <h1>See the Movie</h1>
			        <div class="subhead hide">It'll knock your socks off</div>
		       	</div>
		        <div class='vcenter-body center'>
		        	<iframe id="yt-player" type="text/html"  src="http://www.youtube.com/embed/kVdU49dg3oo?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>
				</div>
		    </div>
	    </div>
	    <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-right"><a href='#call-to-action'>I Want It</a></div>
        	</div>
        </div>
      </div>

      <a name='not-yet' id='not-yet' class='track-page-view' ></a>
      <a name='call-to-action'></a>
      <div id='call-to-action' class="featurette call-to-action  track-page-view alpha70b">
      	<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="featurette-heading">
		      				<div class='wrapZ'>
		      					<img class='darkroom' src='/img/spacer.gif'>
						        <h1>Still in the Darkroom</h1>
						        <div class="subhead">We're working hard to build Snaphappi into a service you never knew you needed but can't live without.</div>
					        </div>
				       	</div>
					</div>
      			</div>
	        <div class="row">
	        	<div class="offset1 span5 donate">
					<p class="lead">
If you want this service ASAP, let us know &mdash; we need your vocal support! 
Cheer us on through those long sleepless nights by sending us a buck <span class="strong">($1)</span>. 
<span>We'll get the message.</span> 
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
	        		
<form class="form-inline call-to-action center" action="/action/sign-me-up" method="post" onsubmit="return false;">	        		
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
		    	<input type="email" placeholder="Email" class='email' 
		    		required 
		    		title="Join our email list" 
		    		data-content="Please enter a valid email address." 
		    		data-placement='bottom' 
		    		data-trigger='manual' >
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
							<i class="icon-remove-sign icon-white pull-right"></i>
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
      
      <a name='thank-you' id='thank-you' class='track-page-view'></a>
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

      <a name='about'></a>
      <div id='about' class="featurette about track-page-view alpha70card">
		<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="featurette-heading alpha70b">
					        <h1>About Snaphappi</h1>
				       	</div>
					</div>
      			</div>
      			<div class="row">
		        	<div class="offset1 span10 body">
						<p>
At Snaphappi, we know that a single photo can launch a thousand happy memories. 
But with a growing family and a hectic job, 
who has time to scroll through 10,000 thumbnails to find your Beautiful Photos? 
Most likely, it's not going to be you, and it's certainly not going to be fancy computer algorithm.        		
			        	</p>
			        	<p>
Only Snaphappi uses Trained Editors <strong>(real people)</strong> assisted by sophisticated algorithms to screen your family photos. 
We'll find your beautiful photos and hide duplicates, 
saving you hours of time and making it fun and easy to re-live your precious moments. 
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
      <div id='FAQ' class="featurette FAQ track-page-view  alpha70b">
		<div class='fw-band vcenter-body'>
      		<div class="container">
      			<div class='row'>
		      		<div class="span12">
		      			<div class="featurette-heading ">
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
      <footer >
        <p><a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
      <div id="fb-root"></div>
<?php $this->end(); ?>
