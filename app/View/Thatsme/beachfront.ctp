<?php 
	$this->set("title_for_layout","Snaphappi &middot; Curated Family Photos");
	$this->Layout->blockStart('HEAD'); ?>
	<meta property="og:title" content="Snaphappi &middot; Curated Family Photos" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://thats-me.snaphappi.com/i-need-this" />
	<meta property="og:image" content="http://thats-me.snaphappi.com/img/beachfront/snaphappi-logo-v2.png" />
	<meta property="og:description" content="What do you do with your 10,000 photos &middot; how do you find those precious moments? Curated Timelines with Beautiful Photos picked by Trained Editors. Put your photos on our To-do list and Play with your photos once again." />
	<meta property="og:site_name" content="Snaphappi" />
	<meta property="fb:admins" content="214157" />	
	<link rel="stylesheet" href="/css/beachfront.css">
<?php $this->Layout->blockEnd(); ?>

<?php $this->Layout->blockStart('header'); ?>
    <!-- NAVBAR
    ================================================== -->
      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
	    <div class='bounding-box '   data-spy="affix" data-offset-top="10">
        <div class="navbar navbar-inverse">
          <div class="navbar-inner alpha65b">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/i-need-this"><img src='/img/beachfront/snaphappi-logo-v2.png'></a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse pull-right">              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="#home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#how-it-works" >How It Works</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#call-to-action" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right">
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
        <div class="alert-wrapper hide" >
        	<div class='fade-wrap' style='diplay:none;'>
        		<div class='alert alert-info'></div>
        	</div>
        </div>

<?php $this->Layout->blockEnd(); ?> 

   
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
	<div id="fold"></div>
	<div id="bg-slideshow">
		<div class='fixed bg pix' name='0'></div>
	</div>
	
	
      <div id="home" class="featurette connect track-page-view">
      	<a name='home'></a>
        <div class="fw-band body alpha70b">
			<div class="container">
				<div class="offset1 span10">
			        <h2 class="featurette-heading">Curated Family Photos</h2>
			        <p>What do you do with your 10,000 photos? How do you find those precious moments?</p>
			        <div style="position:relative">
			        	<div class="graphic">Curated Timelines</div>
			        	<div class="muted">with</div>
			        	<div class="graphic">Beautiful Photos</div>
			        	<div class="muted">picked by</div>
			        	<div class="graphic">Trained Editors</div>
			        </div>
			        	
			        <p>Put your photos on <u>our</u> To-do list and Play with your photos once again.</p>
		        </div>
		   </div>     
        </div>        
        <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#features'>Learn More</a></div>
        	</div>
        </div>
      </div>

	
	
	
	
    <!-- Carousel: Features
    ================================================== -->
    <a class='anchor' name='features'></a>
    <div id="features" class="featurette carousel slide track-page-view">
		
      <div class="carousel-inner">
      	
        <div class="item active">
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset5 span5">
	    <div class="carousel-caption"><h1>Screened By Real Editors</h1></div>
	    <p>
No other photo service out there uses real people like we do. 
Our trained photo editors hand-select the beautiful photos that are featured on your Timeline and hide duplicates just for you. 
We promise 100% privacy.
		</p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
  
		          </div>
				</div>          
        </div>
        <div class="item">
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span7">
    	<div class="carousel-caption"><h1>Beautiful Curated Timeline</h1></div>
    	<p>Your most precious moments are highlighted in a stunning Curated Timeline, marked by beautiful photos.</p>
<p>Quickly zoom across your Timeline, jumping from moment to moment; 
    		re-live those moments through beautiful Curated Stories; 
    		and dive deep into your photo archives when you want to see everything.</p>	          	
      	<a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div>
        
        <div class="item">
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="span4">
    	<div class="carousel-caption"><h1>Faster Uploads</h1></div>
    	<p>Our Uploader lets you upload up to 100x faster than other photo sites - we've seen speeds up to 3000 photos/hour.</p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div> 
        
        <div class="item">
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span8">
    	<div class="carousel-caption"><h1>Share Loved Memories</h1></div>
        <p>The hardest part about sharing is finding something worth sharing. 
        But thanks to our Curated Timelines, you'll have quick and easy access to all your precious moments and beautiful photos. 
        The rest is a snap.
          </p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div> 
        
        <div class="item">
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="span4">
    	<div class="carousel-caption"><h1>You're in Control</h1></div>
    	<p>You have complete control. You can adjust the photos highlighted on your Timeline
by rating the ones you love.
	          		</p>
      	<a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div>         
      </div> <!-- /.carousel-inner  -->
<div><a class="right carousel-control" href="#features" data-slide="next">&rsaquo;</a></div>
<div><a class="left carousel-control" href="#features" data-slide="prev">&lsaquo;</a></div>	      
	  	
      <div class='fw-band footer'>
      	<div class="carousel-pager center">
			<div class="active">0</div>
			<div>1</div><div>2</div><div>3</div><div>4</div>
        </div>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#on-our-way'>Learn More</a></div>
        	</div>
        </div>  
    </div><!-- /.carousel -->
    
    
    
    
    
    <!-- Carousel
    ================================================== -->
    
      <a name='on-our-way'></a>
      <div id="on-our-way" class="featurette respond track-page-view">
      	<div class='bg'></div>
		<div class="container">
			<h2 class="featurette-heading">Snaphappi is still in the darkroom <span class="">and we need to hear from you.</span></h2>
			<div class="wrap ">
				<div><p>"Curated Timelines featuring Beautiful Photos picked by Trained Photo Editors &mdash; for only a Penny a Photo? <span class="muted">Thats a Terrific idea!</span></p></div>
				<div class="center">
					<a class="btn btn-large btn-warning" href="#">Donate $1 to cheer us on!</a>
				</div>
			</div>
			<div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#how-it-works'>Learn More</a></div>
        	</div>
        </div>
		</div>
      </div>    
    
    
	
	
    <!-- Carousel: How It Works
    ================================================== -->
    <a name='how-it-works'></a>
    <div id="how-it-works" class="featurette carousel slide track-page-view">
    	
<div class="vcenter-wrap">
	<div class="vcenter-padding">
		<div class="fw-band alpha70b vcenter-body">
			
      <div class="carousel-inner">
      	
        <div class="item active">
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset4 span6">
	    <div class="carousel-caption"><h1>Send Us Your Photos</h1></div>
	    <p>
With a few clicks, you can upload your entire photo archive to Snaphappi – whether 10,000, 20,000, or over 100,000 shots! 
Our Uploader lets you upload up to 100x faster than normal photo sites - we've seen speeds up to 3000 photos/hour.</p>	    	
	    </p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
  
		          </div>
        </div><div class="item">
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span7">
    	<div class="carousel-caption"><h1>We'll Find your Beautiful Photos</h1></div>
    	<p>
Our trained editors will find the beautiful photos that are featured on your Timeline. 
It may take awhile, but they will rate all your photos and hide the duplicates just for you.
	          	</p>
	    <p>And yes, they are <u>real</u> people - who else can say that?</p>	
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
        </div><div class="item">
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="span7">
    	<div class="carousel-caption"><h1>And Build Your Curated Timeline</h1></div>
    	<p>
You'll find all your photos on a stunning Curated Timeline to make your precious moments easy to find and a joy to use. 
</p>
		<p>Your timeline is organized using automatic event detection to make your moments easy to find and 
			we'll highlight your events with beautiful photos to make it a joy to use. 
		<p>Your photos are ready to play.</p>
<p></p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
        </div><div class="item">
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span8">
    	<div class="carousel-caption"><h1>Just Push Your Finger to Play</h1></div>
    	<p>Re-live and share your special moments on the iPad with the push of a finger.</p>
    	<p>Quickly zoom across your Curated Timeline, jumping from moment to moment; 
    		re-live those moments through beautiful Curated Stories; 
    		and dive deep into your photo archives when you want to see everything.</p>
 		<p>We promise you'll see the Big Picture before you see the thumbnails.</p>
 		<a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
        </div><div class="item">
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span8">
    	<div class="carousel-caption"><h1>All this for just a penny a photo!</h1></div>
        <p>There are many places to go to share your beautiful photos, but <u>someone</u> has to do the work to find them.
        	If it's not going to be you, then let it be Snaphappi.</p>
         <p>Only Snaphappi uses real people - trained photos editors - to sort through your photos. 	
       	We think it's a small price to pay for all the time you'll save.
          </p>
      	
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
        </div> 
      </div> <!-- /.carousel-inner  -->
		</div> <!-- / .vcenter-body .fw-band alpha70b --> 
	</div>	<!-- / .vcenter-padding --> 
</div>	<!-- / .vcenter-wrap --> 
<div><a class="right carousel-control" href="#how-it-works" data-slide="next">&rsaquo;</a></div>
<div><a class="left carousel-control" href="#how-it-works" data-slide="prev">&lsaquo;</a></div>	      
	  	
      <div class='fw-band footer'>
      	<div class="carousel-pager center">
			<div class="active">0</div>
			<div>1</div><div>2</div><div>3</div><div>4</div>
        </div>
        	<div class="container ">
        		<div class="pull-left"><a href='#call-to-action'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#see-the-movie'>Learn More</a></div>
        	</div>
        </div>  
    </div><!-- /.carousel -->
    
    
        
    
    
    
    
    
    
    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

<!--       <hr class="featurette-divider"> -->
      
	  <a name='see-the-movie'></a>	
      <div id="see-the-movie" class="featurette the-movie">
      	<div class='bg'></div>
      	<div class="container body">
	        <h2 class="featurette-heading">See the Movie. <span class="muted">It'll knock your socks off.</span></h2>
	        <div class='center'>
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
      <div id='call-to-action' class="featurette call-to-action">
      	<div class="container">
	      	<div class="wrap alpha75w">
	        <h2 class="featurette-heading">Still in the Darkroom</h2>
	        <p class="lead">
We're working hard to build Snaphappi into a service you never knew you needed but can't live without. 
</p>	        	

	        <div class="row">
	        	<div class="span4">
<p class="lead">
While we are still in the darkroom, you have a great opportunity to help shape this service with your early participation and invaluable feedback.</p>
					<form class="form-inline sign-up" action="/action/sign-me-up" method="post">
			                <input type="text" placeholder="Email" class='email'><button type="submit" class="btn btn-primary">I Want It</button>
					</form>
	        	</div>
	        	<div class="span5 donate">
					<p class="lead">
But if you want this service ASAP, <b>let us know!</b> 
We need your vocal support and by donating $1 to our favorite charity you'll be cheering us on through those long sleepless nights. 
	        		</p>
	        		<a class="btn btn-large btn-success" href="#" onclick='return SHOW_DONATE();'>I Want It ASAP!</a>
	        			<div class='donate-form-wrap alpha70b' style='display:none;'>
	        				<p class="lead">We like your enthusiasm!</p>
	        				<p>Use one of the buttons below to donate $1 to Snaphappi</p>
	        				<!--  Payal 	        			 -->
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" title="Donate $1 with PayPal - The safer, easier way to pay online!">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="H8VZABJRNDHX4">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="Donate $1 with PayPal - The safer, easier way to pay online!">
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
  <input type="hidden" name="amount" value="USD 1" >
  <input type="hidden" name="description" value="Go Snaphappi! I want Curated Family Photos." >
  <input type="hidden" name="abandonUrl" value="http://thats-me.snaphappi.com/i-need-this#not-yet" >
  <input type="hidden" name="signatureVersion" value="2" >
  <input type="hidden" name="signature" value="707KWak1F2qHXC3DGVso74QmLVsECFAGkwx5fd6orOg=" >
<!--   <input type="image" src="http://g-ecx.images-amazon.com/images/G/01/asp/beige_small_paynow_withmsg_whitebg.gif" border="0" alt="Donate $1 with Amazon Payments"> -->
  <input type="image" src="http://g-ecx.images-amazon.com/images/G/01/asp/golden_small_paynow_withlogo_darkbg.gif" border="0" alt="Donate $1 with Amazon Payments">
</form> 
					</div>
	        	</div>
	        </div>  <!-- / .row -->
        </div></div>
      </div>
      
      <a name='thank-you'></a>
      <a name='sharing'></a>
      <div id='sharing' class="featurette sharing">
      	<div class="container">
      		<div class="wrap alpha70b">
	        	<h2 class="featurette-heading .thank-you"><span class="thank-you hide">Thank You for Your Support<br></span><span class="muted">Spread the Word!</span></h2>
	        	<div class="social-sharing">
		        		<div class="fb-like" data-href="http://thats-me.snaphappi.com/i-need-this" data-send="true" data-layout="button_count" data-width="225" data-show-faces="true" data-font="arial"></div>
		        		<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://thats-me.snaphappi.com/i-need-this" 
		        			data-text="Checkout Snaphappi, it's a great new site for Curated Family Photos.">Tweet</a>
		        	</div>
	        	<div class="row">
	        		<div class="offset4 span5"><p class="lead">You can also show your support by sharing Snaphappi will all your friends. We'd be very grateful.</p></div>
	        	</div>
	        	
	        	
        	</div>
        </div>
        <div class='fw-band footer'>
        	<div class="container ">
        	</div>
        </div>
      </div>

      <a name='tag-line'></a>
      <div id='tag-line' class="featurette tag-line">
      	<div class="container">
      		<div class="wrap alpha50b">
        	<h2 class="featurette-heading">Snaphappi <br><span class="muted">Your Photos Ready to Play</span></h2>
        	
        </div></div>
        <div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-right">Next</div>
        	</div>
        </div>
      </div>
	

      <a name='about'></a>
      <div id='about' class="featurette about track-page-view">
      	<div class="container">
      		<div class="wrap alpha70b">
        	<h2 class="featurette-heading">About</h2>
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
        </div></div>
        <div class='fw-band footer'>
        	<div class="container ">
        	</div>
        </div>
      </div>
      
      
	

      <a name='FAQ'></a>
      <div id='FAQ' class="featurette FAQ track-page-view">
      	<div class='bg'></div>
      	<div class="container">
      		<div class="wrap alpha70b center">
	        	<h1 class="featurette-heading">Frequently Asked Questions</h1>
	       </div>
	       <div class="faq-section alpha70b">
	        	<h2>Photo Editing</h2>
	        	<p class="question">
	How do you know which photos are beautiful?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	How do you build the Curated Timeline?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	How do you find events?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>	        	
	        	<p class="question">
	How do you find duplicates?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
				<p class="question">
	What about face detection?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>        	
	        	<p class="question">
	How long does it take for your Editors to screen my photos?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	How much does it cost?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	       </div>
	       <div class="faq-section alpha70b"> 	
	        	<h2>Privacy &amp; Sharing</h2>
	        	<p class="question">
	What about the safety and privacy of my photos?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	What about sharing photos?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
			</div>
	       <div class="faq-section alpha70b">	
				<h2>Darkroom &amp; Launch</h2>
				<p class="question">
	Why do you want $1 from me?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
				<p class="question">
	When will your service be ready?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        </div>
	       <div class="faq-section alpha70b">	
	        	<h2>Platforms &amp Systems</h2>
				<p class="question">
	Why is the Curated Timeline only available as an iPad App?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>	        	
	        	<p class="question">
	How do I upload my 10,000+ photos to Snaphappi?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
				<p class="question">
	How long does it take to upload 10,000 photos?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	How and where are my photos stored?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	What about the originals?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	
	        	<p class="question">
	What platforms do you support?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	What file types do you support?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	What about the photos on my smartphone?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>
	        	<p class="question">
	What about my photos on Facebook/Flickr/Instagram/Picasaweb/iCloud/etc?	        		
	        	</p>
	        	<p class="answer">
	Answer.        		
	        	</p>	        		        	
	        </div>
	        <div class='padding'></div>
	        <div class='fw-band footer'>
	        	<div class="container ">
	        		<div class="pull-right"><a href='#call-to-action'>I Want It</a></div>
	        	</div>
	        </div>
        </div>
      </div>      
      <!-- FOOTER -->
<?php $this->Layout->blockStart('footer'); ?>      
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p><a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
      <div id="fb-root"></div>
<?php $this->Layout->blockEnd(); ?>



<?php $this->Layout->blockStart('javascript'); ?>
    <!-- Le javascript
    ================================================== -->
    <script type="text/javascript">
    	// update Global CFG
		CFG['mixpanel'] = {
			TRIGGER : 'i-need-this',
			FIRST_SECTION : '#home',
			VIDEO_NAME : 'imagine',
		}
		CFG['carousel'] = { DISABLED: false};
		CFG['timing'] = {
			linger: 1000,
			carousel: 5000,
			slideshow: 7000,
		}
		CFG['slideshow'] = {
			timer: null,
			next: null,			// next slide, function
			count: 5,
		}
		var FIND = {c:{}};
		var BG_SLIDESHOW_TIMER, SHOW_DONATE;
		/*
		 * dot paging for carousels
		 */
		
		var init_CarouselDotPaging = function(o) {
			FIND['c'][o.attr("id")] = o;
			  // .carousel({ interval: 5000 }) 
			o.bind('slid', function(e) { 
				var pager = o.find(".carousel-pager"),
					dots = pager.find("div");
				var next = o.find('.item.active').index();
				dots.removeClass('active').eq(next).addClass('active'); 				if (++next >= dots.length) next = 0; 
				pager.attr('next', next);
			  }); 
				
		    o.find(".carousel-pager div").click(function(e){ 
		      var index = $(this).index(); 
		      o.carousel({interval:false}).carousel(index);
		      var pager = o.find(".carousel-pager").attr('next', index);
		      e.preventDefault();
		    }); 
		}
		
		/*
		 * dot paging for carousels, 
		 * 	- initialize AFTER first scroll into view
		 */
		var init_CarouselAutoPaging = function(o, timers) {
			
			var id = o.attr('id');
			if (timers[id]) return;	// already checking
			
			timers[id] = setTimeout(function() {
				timers[id] = 0;
				if (_isScrolledIntoView(o)) {
					/* If the object is completely visible in the window, fade it in */
					if (o.hasClass('activated')) return
					else {
						// bug: carousel does not pause:'hover' if it was started while hovering
						if (o.is(":hover")) {
							o.one("mouseleave", function(){
								o.addClass('activated').carousel({ interval: CFG['timing']['carousel'], pause: 'hover'});
							})
						} else 
							o.addClass('activated').carousel({ interval: CFG['timing']['carousel'], pause: 'hover'});
					}
				}
			}, CFG['timing']['lingering']);
		}
		
		! function($) {
			
			/*
			 * animations
			 */
			switch (window.location.hash) {
				case '#thank-you': 	// donate success return 
					$('#sharing .thank-you').removeClass('hide');
					break;
				case '#not-yet': 	// donate cancel return 
					break;
			}
			
			// bg-slideshow
			CFG['slideshow'].preloader = $('<img />')	
				.bind('load', function() {
				    // Background image has loaded.
				    var fade = $('#bg-slideshow .fading').addClass('fade-slow');
				    setTimeout(function(){
				    	fade.remove();
				    	delete fade;
					}, 600);
				});
			CFG['slideshow'].next = function(){
				if (CFG['slideshow'].timer == null) {
					CFG['slideshow'].timer = setInterval(
						CFG['slideshow'].next,
						CFG['timing']['slideshow']
					);
				} 
				var bg = $('#bg-slideshow .bg.fixed');
				if (bg.size()>1) return;
				
				var fade = bg.clone().addClass('fading');
				$('#bg-slideshow').append(fade);
				
				// next slide
				var i = parseInt(bg.attr('name'))+1;
				if (i > CFG['slideshow'].count) i=1;
				bg.attr('name', i );	
				
				// PRELOAD image
				var bkgSrc = bg.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "")
				CFG['slideshow'].preloader.attr('src', bkgSrc);
			}
			CFG['slideshow'].next();
			
			
			
						
			// make global
			SHOW_DONATE = function() { 
				$('#call-to-action .donate-form-wrap').fadeIn({
						duration:400, 
						complete: function(){
								$('#call-to-action .donate a.btn').animate({opacity:0});
							}
						});
				return false;		// onclick return value
			}
			
			$('.carousel').each(function(i, elem) {
				init_CarouselDotPaging($(elem));
			});
			
			var isLingeringTimer = {};
			$(window).scroll(function(e) {
				/* Check the location of each desired element */
				$('.carousel').each(function(i, elem) {
					if (CFG['carousel'].DISABLED) return;
					init_CarouselAutoPaging($(elem), isLingeringTimer);
				});
				// manually implemented ScrollSpy
				$('.featurette').each(function(i, elem) {
					if (_isScrolledIntoView($(elem))) {
						var id = $(elem).attr('id');
						$('.navbar .nav li').removeClass('active');
						var a = $('.navbar .nav li a[href$="#'+id+'"]').parent().addClass('active');
						return false;					
					}
				});
			});
			
			$('a').bind('click', function(e) {
				var target = this.hash;
				if (target) {
			        e.preventDefault();
			        console.log(target);
			        $.scrollTo(target, 500);
			    }
		   });
			
			
		}(window.jQuery);

				(function() {  //Closure, to not leak to the scope
			// facebook javascript jdk 		
			!function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  // js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=16753672679";				  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk');
			
			// twitter
			!function(d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}
			}(document,"script","twitter-wjs");
			
		})();  
    </script>
<?php $this->Layout->blockEnd(); ?>