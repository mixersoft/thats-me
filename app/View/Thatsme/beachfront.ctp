<?php $this->Layout->blockStart('HEAD'); ?>
	<meta property="og:title" content="Snaphappi - Curated Family Photos" />
	<meta property="og:type" content="company" />
	<meta property="og:site_name" content="Snaphappi" />
	<meta property="og:description" content="What will you do when you have 10K photos, how will you find those precious moments? <br> Put your phones on <i>our</i> To-do list and Play with your photos once again." />
	<meta property="og:url" content="thats-me.snaphappi.com/" />
	<meta property="og:image" content="https://launchrock-assets.s3.amazonaws.com/facebook-files/FXZVYWTV_1356050477938.jpg?_=1" />
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
            <a class="brand" href="/beachfront"><img src='/img/beachfront/snaphappi-logo-v2.png'></a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse pull-right">              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="#home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#how-it-works" >How It Works</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#still-in-the-darkroom" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu">
                  	<li data-toggle="collapse" data-target=".nav-collapse"><a href="#call-to-action">I Still Want It</a></li>
                  	<li class="divider"></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li class="divider"></li>
                    <li data-toggle="collapse" data-target=".nav-collapse"><a href="#see-the-movie">See the Movie Again</a></li>
                    <li><a href="#">Playground</a></li>
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
	
	  <a name='home'></a>
      <div id="home" class="featurette connect track-page-view">
      	<div class='bg pix p1'></div>
        <div class="fw-band body alpha70b">
			<div class="container">
				<div class="offset1 span10">
			        <h2 class="featurette-heading">Curated Family Photos</h2>
			        <p>What will you do when you have 100,000 photos &middot; how will you find those precious moments?</p>
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
        		<div class="pull-left"><a href='#still-in-the-darkroom'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#features'>Learn More</a></div>
        	</div>
        </div>
      </div>

	
	
	
	
    <!-- Carousel: Features
    ================================================== -->
    <a name='features'></a>
    <div id="features" class="featurette carousel slide track-page-view">

      <div class="carousel-inner">
      	
        <div class="item active">
        	<div class='bg pix p2'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset5 span7">
	    <div class="carousel-caption"><h1>Screened By Real Editors</h1></div>
	    <p>Our trained editors find the beautiful photos that are featured on your Timeline. They'll rate all your photos and hide the duplicates just for you. We promise 100% privacy.</p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
  
		          </div>
				</div>          
        </div>
        <div class="item">
        	<div class='bg pix p3'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span7">
    	<div class="carousel-caption"><h1>Beautiful Memory Timeline</h1></div>
    	<p>Your most precious moments are highlighted in a stunning timeline, marked by top-rated photos. 
Have fun zooming from moment to moment or diving deep to find other photos from a point in your life.
	          	</p>
      	<a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div>
        <div class="item">
        	<div class='bg pix p4'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="span7">
    	<div class="carousel-caption"><h1>Faster Uploads</h1></div>
    	<p>Our Uploader lets you upload up to 100x faster than normal photo sites - we've seen speeds up to 3000 photos/hour.</p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div> 
        <div class="item">
        	<div class='bg pix p5'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset7 span5">
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
        <div class="item">
        	<div class='bg pix p3'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span8">
    	<div class="carousel-caption"><h1>Quick &amp; Easy Sharing</h1></div>
        <p>The hardest part about sharing is finding something worth sharing. 
        But thanks to our curated Timelines, you'll have quick and easy access to all your precious moments and beautiful photos. 
        The rest is a piece of cake.
          </p>
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
        		<div class="pull-left"><a href='#still-in-the-darkroom'>Sign up for early access</a></div>	
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
				<div><p>"Sort through all my photos - at just a penny a photo? <span class="muted">Thats a Great idea!</span></p></div>
				<div class="center">
					<a class="btn btn-large btn-warning" href="#">Send us $1 to cheer us on!</a>
				</div>
			</div>
			<div class='fw-band footer'>
        	<div class="container ">
        		<div class="pull-left"><a href='#still-in-the-darkroom'>Sign up for early access</a></div>	
        		<div class="pull-right"><a href='#how-it-works'>Learn More</a></div>
        	</div>
        </div>
		</div>
      </div>    
    
    
	
	
    <!-- Carousel: How It Works
    ================================================== -->
    <a name='how-it-works'></a>
    <div id="how-it-works" class="featurette carousel slide track-page-view">

      <div class="carousel-inner">
      	
        <div class="item active">
        	<div class='bg pix p2'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset5 span6">
	    <div class="carousel-caption"><h1>Send Us Your Photos</h1></div>
	    <p>
With a few clicks, you can upload your entire photo archive to Snaphappi – whether 10,000, 20,000, or over 100,000 shots! 
Our Uploader lets you upload up to 100x faster than normal photo sites - we've seen speeds up to 3000 photos/hour.</p>	    	
	    </p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
  
		          </div>
				</div>          
        </div>
        <div class="item">
        	<div class='bg pix p3'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="offset2 span7">
    	<div class="carousel-caption"><h1>We'll Find your Beautiful Photos</h1></div>
    	<p>
Our trained editors find the beautiful photos that are featured on your Timeline. 
It may take awhile, but they'll actually rate all your photos and hide the duplicates just for you.
	          	</p>
	    <p>And yes, they are <u>real</u> people - who else can say that?</p>	
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div>
        <div class="item">
        	<div class='bg pix p4'></div>
				<div class="fw-band alpha70b">        	
		          <div class="container">
		          	
  <div class="row carousel-row">
    <div class="span7">
    	<div class="carousel-caption"><h1>And Build Your Curated Timeline</h1></div>
    	<p>
You'll find all your photos organized on a stunning Curated Timeline marked by beautiful photos to make your precious moments easy to find. 
</p>
<p></p>
    </div><!-- /.span -->
  </div><!-- /.row -->          	
		          
		          </div>
				</div>          
        </div> 
        <div class="item">
        	<div class='bg pix p5'></div>
				<div class="fw-band alpha70b">        	
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
				</div>          
        </div> 
        <div class="item">
        	<div class='bg pix p3'></div>
				<div class="fw-band alpha70b">        	
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
        </div> 
      </div> <!-- /.carousel-inner  -->
<div><a class="right carousel-control" href="#how-it-works" data-slide="next">&rsaquo;</a></div>
<div><a class="left carousel-control" href="#how-it-works" data-slide="prev">&lsaquo;</a></div>	      
	  	
      <div class='fw-band footer'>
      	<div class="carousel-pager center">
			<div class="active">0</div>
			<div>1</div><div>2</div><div>3</div><div>4</div>
        </div>
        	<div class="container ">
        		<div class="pull-left"><a href='#still-in-the-darkroom'>Sign up for early access</a></div>	
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
        		<div class="pull-right"><a href='#still-in-the-darkroom'>I Want It</a></div>
        	</div>
        </div>
      </div>

<!-- 	  <hr class="featurette-divider"> -->
      
      <a name='still-in-the-darkroom'></a>
      <div id='still-in-the-darkroom' class="featurette still-in-the-darkroom">
      	<div class='bg pix p2'></div>
      	<div class="container">
	      	<div class="wrap alpha75w">
	        <h2 class="featurette-heading">We're in the Darkroom <span class="muted">Still Developing...</span></h2>
	        <p class="lead">We’re a small company working as fast as we can to develop our ideas, and 
	        there's a lot of work to do before this story is ready to share.
	        Our touch-friendly Timeline is still just a twinkle in our eye...</p>
	        <p class="lead">Your support will help us build our team quickly and work a lot faster.</p>
	        <a class="btn btn-large btn-primary" href="#call-to-action">I Still Want It</a> 
        </div></div>
      </div>
      
<!--       <hr class="featurette-divider"> -->
      
	  <a name='call-to-action'></a>	
      <div id="call-to-action" class="featurette call-to-action track-page-view">
      	<div class='bg pix p1'></div>
      	<div class="container">
	      	<div class="wrap alpha75w">
		        <h2 class="featurette-heading">I Still Want It. <span class="muted">Count Me In.</span></h2>
		        <p class="lead">You've got me. I want this. I need this. What can I do to get this ASAP?</p>
		        <p>Your vocal support will make it easier for us to attract talented developers and rich investors. 
		        	We appreciate your willingness to stand up and be counted.</p>
		        <fieldset >	
		        	<legend>Count Me In</legend>
			        <p>Here’s my email, keep me posted</p>
			        	<form class="navbar-form">
			                <input class="span2" type="text" placeholder="Email">
			                <button type="submit" class="btn btn-primary">Submit</button>
			            </form>
			            <br />
			            <p>I'll give you my time:</p>
			        	<ul>
			        		<li>I want an invite to join the private beta</li>
			        		<li>contact me, I will join your “focus group”</li>
			        	</ul>
			        	<p>I'll give you money:</p>
			        	<ul>
			        		<li>I’ll chip in $1 just so you know I’m serious
		<!--  Payal 	        			 -->
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" title="Donate through Paypal">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="hosted_button_id" value="H8VZABJRNDHX4">
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
			<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
		</form>
		<!--  Amazon Simple Pay  -->
		<form action="https://authorize.payments.amazon.com/pba/paypipeline" method="post"  title="Donate through Amazon">
		  <input type="hidden" name="amount" value="USD 1" >
		  <input type="hidden" name="processImmediate" value="1" >
		  <input type="hidden" name="signatureMethod" value="HmacSHA256" >
		  <input type="hidden" name="accessKey" value="11SEM03K88SD016FS1G2" >
		  <input type="hidden" name="collectShippingAddress" value="0" >
		  <input type="hidden" name="isDonationWidget" value="0" >
		  <input type="hidden" name="description" value="Go Snaphappi! Make my photos play again" >
		  <input type="hidden" name="amazonPaymentsAccountId" value="NGWBMIUTOSUY31UM3CKJQBJQKRNJE6LDCALFR9" >
		  <input type="hidden" name="cobrandingStyle" value="logo" >
		  <input type="hidden" name="signatureVersion" value="2" >
		  <input type="hidden" name="immediateReturn" value="1" >
		  <input type="hidden" name="signature" value="BcNk43X2xxb1MutaMVASG5HtGP/7g5FSrxJ4IfXlAjc=" >
		  <input type="image" src="http://g-ecx.images-amazon.com/images/G/01/asp/golden_small_paynow_withlogo_whitebg.gif" border="0">
		</form>
		</li>
			        		<li>I want it so bad, I’ll prepay now</li>
			        	</ul>
			        	<p>I'll give you friends:</p>
			        	<ul>
			        		<li>Like this page</li>
			        		<li>Tweet</li>
			        		<li>Email my friends</li>
			        		<li>Share on Facebook</li>
			        	</ul>
		        	</fieldset>
        	
			</div></div>
      </div>

      <a name='tag-line'></a>
      <div id='tag-line' class="featurette tag-line">
      	<div class='bg pix p5'></div>
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
      	<div class='bg pix p2'></div>
      	<div class="container">
      		<div class="wrap alpha50b">
        	<h2 class="featurette-heading">About</h2>
        	<p>
At Snaphappi, we know that a single photo can launch a thousand happy memories. 
But with a growing family and a hectic job, who has time to scroll through 30,000 thumbnails to find those best shots? 
Your photos are not a to-do list.        		
        	</p>
        	<p>
With Snaphappi’s personal photo concierge service, your digital photos are sorted, rated, and organized for you, saving you hours of time.
        	</p>
        </div></div>
      </div>
      <!-- FOOTER -->
<?php $this->Layout->blockStart('footer'); ?>      
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p><a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
<?php $this->Layout->blockEnd(); ?>



<?php $this->Layout->blockStart('javascript'); ?>
    <!-- Le javascript
    ================================================== -->
    <script type="text/javascript">
    	// update Global CFG
		CFG['mixpanel'] = {
			TRIGGER : 'beachfront',
			FIRST_SECTION : '#help-me',
			VIDEO_NAME : 'imagine',
		}
		CFG['carousel'] = { DISABLED: false};
		
		/*
		 * dot paging for carousels
		 */
		var init_CarouselDotPaging = function(o) {
			  // .carousel({ interval: 5000 }) 
			o.bind('slid', function(e) { 
				var pager = o.find(".carousel-pager"),
					dots = pager.find("div");
				var next = pager.attr('next') || 1;
				dots.removeClass('active').eq(next).addClass('active'); 
				if (++next >= dots.length) next = 0; 
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
			
			var DELAY = {
				lingering : 1000,
				carousel : 5000,
			};
			timers[id] = setTimeout(function() {
				timers[id] = 0;
				if (_isScrolledIntoView(o)) {
					/* If the object is completely visible in the window, fade it in */
					if (o.hasClass('activated')) return
					else {
						o.addClass('activated').carousel({ interval: DELAY['carousel'], pause: 'hover'});
					}
				}
			}, DELAY['lingering']);
		}
		
		! function($) {
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
			});
			
	
			
			
			
		}(window.jQuery)
    </script>
<?php $this->Layout->blockEnd(); ?>