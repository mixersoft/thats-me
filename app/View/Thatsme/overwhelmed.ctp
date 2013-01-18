<?php $this->Layout->blockStart('HEAD'); ?>
	<meta property="og:title" content="Snaphappi - Your Photos, Ready to Play" />
	<meta property="og:type" content="company" />
	<meta property="og:site_name" content="Snaphappi - Your Photos, Ready to Play" />
	<meta property="og:description" content="Imagine your photos knew how good they were and 
	<br>where they fit in the Big Picture.&nbsp;Imagine 
	<br> <i>'Working'</i> with your photos was <i>'Play' again</i>.&nbsp;
	<div>It's a snap with Snaphappi.</div>" />
	<meta property="og:url" content="thats-me.snaphappi.com/" />
	<meta property="og:image" content="https://launchrock-assets.s3.amazonaws.com/facebook-files/FXZVYWTV_1356050477938.jpg?_=1" />
	
	<link rel="stylesheet" href="/css/overwhelmed.css">
<?php $this->Layout->blockEnd(); ?>

<?php $this->Layout->blockStart('header'); ?>
    <!-- NAVBAR
    ================================================== -->
      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
	    <div class='bounding-box'   data-spy="affix" data-offset-top="10">
        <div class="navbar navbar-inverse">
          <div class="navbar-inner">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/overwhelmed">Snaphappi</a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse  pull-right">
              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="#help-me">Help Me</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#on-our-way" >On Our Way</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#how-it-works" >How It Works</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#still-in-the-darkroom" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu">
                  	<li data-toggle="collapse" data-target=".nav-collapse"><a href="#call-to-action">I Still Want It</a></li>
                  	<li class="divider"></li>
                    <li><a href="#">About</a></li>
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
    
	
	  <a name='help-me'></a>
      <div id="help-me" class="featurette connect track-page-view">
      	<div class='bg-wrap'></div>
      	<div class="container alpha50b">
	        <h2 class="featurette-heading">Help Me. <span class="muted">I have problems with my photos.</span></h2>
	        <p class="lead">I am overwhelmed by my photos, too many to count (but I know it's in the tens of thousands.) 
	        	I am frustrated by my inability to find, enjoy, and share my photos. 
	        	I can't deal with this problem because my eyes instantly gloss over at the sight of pages and pages of thumbnails.  
	        	It's tedious work, and I'd rather play Angry Birds for the millionth time than deal with it.</p>
	        <p class="lead">Help. Me.</p>	
        </div>
      </div>
<div class="container">      
      <hr class="featurette-divider">
      
      <a name='on-our-way'></a>
      <div id="on-our-way" class="featurette respond track-page-view">
      	<img class="featurette-image pull-left" src="http://twitter.github.com/bootstrap/assets/img/examples/browser-icon-firefox.png">
        <h2 class="featurette-heading">Snaphappi <span class="muted">We can help.</span></h2>
        <p class="lead"> 
        	Relax, it's not work, it's Play. And your photos are not a ToDo list. 
        	A few good photos are all it takes to connect you to the special moments of your life, we'll help you find them. 
        	And we've got Curated Timelines to make it fun again. 
        	Start with a <span class="muted">BAM!!!</span> your best photos upfront and skip the thumbnails, they just get in the way.
        </p>
         <p class="lead">Snaphappi <span class="muted">Your Photos, Ready to Play.</span></p>
      </div>
   </div>

	<a name='how-it-works'></a>
    <!-- Carousel
    ================================================== -->
    <div id="how-it-works" class="carousel slide track-page-view">
      <div class="carousel-inner">
        <div class="item active">
          <img src="http://twitter.github.com/bootstrap/assets/img/examples/slide-01.jpg" alt="">
          <div class="container">
          	<div class="carousel-caption">
          		<h1>How It Works.</h1>
          	</div>
	<!-- Three columns of text below the carousel -->
	      <div class="row carousel-row">
	        <div class="span4">
	<!--         	 ??? what is data-src for?  -->
<!-- 	          <img class="img-circle" data-src="holder.js/140x140">   -->
	          <h3>Send Us Your Photos</h3>
	          <p>Upload JPG photos from your photo archive - all of them. 
	          	Don't bother searching for the good ones, that's why you're here. 
	          	We'll take them by the thousands, and it takes less time than you think.</p>
	        </div><!-- /.span4 -->
	        <div class="span4">
<!-- 	          <img class="img-circle" data-src="holder.js/140x140"> -->
	          <h3>We'll Find The Good Stuff</h3>
	          <p>We'll rate your photos and hide the duplicates. 
	          	We use <em>people</em> to make the final decisions - trained editors.
	          	</p>
	          	<h4>It only costs you a penny a photo.</h4>
	        </div><!-- /.span4 -->
	        <div class="span4">
<!-- 	          <img class="img-circle" data-src="holder.js/140x140"> -->
	          <h3>And Build Your Timeline</h3>
	          <p>We'll build your Curated Timeline, organized by events and marked by great photos.
	          	It only takes a few great photos to connect you to your Story. 
	          	We'll build your Stories, as well.
	          	No more thumbnails - unless you ask for them.
	          </p>
	        </div><!-- /.span4 -->
	      </div><!-- /.row -->          	
          <a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
          </div>
        </div>
        <div class="item">
          <img src="http://twitter.github.com/bootstrap/assets/img/examples/slide-02.jpg" alt="">
          <div class="container">
          	<div class="carousel-caption">
          		<h1>How It Works (continued)</h1>
          	</div>
	<!-- Three columns of text below the carousel -->
	      <div class="row carousel-row">
	        <div class="span4">
	<!--         	 ??? what is data-src for?  -->
<!-- 	          <img class="img-circle" data-src="holder.js/140x140">   -->
	          <h3>Just Point Your Finger</h3>
	          <p>Re-live and share your special moments with the touch of a finger. 
	          	Always start with your top-rated photos - the good stuff is upfront. 
	          	See the Big Picture before you see the thumbnails.
	          	Move quickly across the years and re-connect with your photos.
	          	Now that you see your Story, it's easy to share it.
	          </p>
	        </div><!-- /.span4 -->
	        <div class="span4">
<!-- 	          <img class="img-circle" data-src="holder.js/140x140"> -->
	          <h3>You're in Control</h3>
	          <p>Make changes as you see fit. Find that photo of Aunt Bertha you treasure and 
	          	bump up the rating. 
	          	Pick your own <em>Bestshot</em> from a stack of duplicates - you know, the one with your good side.
	          	</p>
	        </div><!-- /.span4 -->
	        <div class="span4">
<!-- 	          <img class="img-circle" data-src="holder.js/140x140"> -->
	          <h3>Nothing is Wasted</h3>
	          <p>No photo is ever thrown away, everything is there when you need it.
	          	We just make it easier to start with the good stuff. 
	          </p>
	        </div><!-- /.span4 -->
	      </div><!-- /.row -->          	
          <a class="btn btn-large btn-primary" href="#see-the-movie">See the Movie</a>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#how-it-works" data-slide="prev">&lsaquo;</a>
      <a class="right carousel-control" href="#how-it-works" data-slide="next">&rsaquo;</a>
    </div><!-- /.carousel -->



    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

	<div class="container">
      <hr class="featurette-divider">
      
	  <a name='see-the-movie'></a>	
      <div id="see-the-movie" class="featurette the-movie">
        <h2 class="featurette-heading">See the Movie. <span class="muted">It'll knock your socks off.</span></h2>
        <div class='center'>
        	<iframe id="yt-player" type="text/html"  src="http://www.youtube.com/embed/kVdU49dg3oo?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>

	  <hr class="featurette-divider">
      
      <a name='still-in-the-darkroom'></a>
      <div id='still-in-the-darkroom' class="featurette still-in-the-darkroom">
      	<img class="featurette-image pull-right" src="http://twitter.github.com/bootstrap/assets/img/examples/browser-icon-safari.png">
        <h2 class="featurette-heading">We're in the Darkroom <span class="muted">Still Developing...</span></h2>
        <p class="lead">We’re a small company working as fast as we can to develop our ideas, and 
        there's a lot of work to do before this story is ready to share.
        Our touch-friendly Timeline is still just a twinkle in our eye...</p>
        <p class="lead">Your support will help us build our team quickly and work a lot faster.</p>
        <a class="btn btn-large btn-primary" href="#call-to-action">I Still Want It</a> 
      </div>
      
      <hr class="featurette-divider">
      
	  <a name='call-to-action'></a>	
      <div id="call-to-action" class="featurette call-to-action track-page-view">
      	<img class="featurette-image pull-right" src="http://twitter.github.com/bootstrap/assets/img/examples/browser-icon-firefox.png">
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
        	

      </div>

	  <hr class="featurette-divider">
      
      <a name='tag-line'></a>
      <div id='tag-line' class="featurette tag-line">
        <h2 class="featurette-heading">Snaphappi <br><span class="muted">Your Photos Ready to Play</span></h2>
      </div>
	
	  <hr class="featurette-divider">
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
			TRIGGER : 'overwhelmed',
			FIRST_SECTION : '#help-me',
			VIDEO_NAME : 'imagine',
		}
		CFG['carousel'] = { DISABLED: false};
		
		! function($) {
			

			// scroll to anchor AFTER collapse navbar, adjust for .nav-collapse height
			// use: data-toggle="collapse" data-target=".nav-collapse"
			// $(document).on('click.collapse.data-api', '.nav-collapse ul.nav a:not(".dropdown-toggle")', function(e) {
				// var $this = $(this), href, target = ( href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')//strip for ie7
				// var offsetH = $(".nav-collapse").height();
				// console.log("offsetH="+offsetH);				// $('html,body').animate({
					// scrollTop : $(target).offset().top - offsetH
				// });
				// http://mktgdept.com/ios-position-fixed-bug
				// $('body').append($('<div></div>').addClass('iosfix'));
				// setTimeout(function() {
					// $('.iosfix').remove();
				// }, 1);
			// });
			
			var isLingeringTimer = {};
			$(window).scroll(function(e) {
				/* Check the location of each desired element */
				$('.carousel').each(function(i, elem) {
					if (CFG['carousel'].DISABLED) return;
					
					var DELAY = 1000;
					var	waypoint = elem.id;
				
					if (isLingeringTimer[waypoint])
						return;
					isLingeringTimer[waypoint] = setTimeout(function() {
						isLingeringTimer[waypoint] = 0;
						if (_isScrolledIntoView(elem)) {
							/* If the object is completely visible in the window, fade it in */
							if ($(elem).hasClass('activated')) return
							else $(elem).addClass('activated').carousel();
						}
					}, DELAY);
				});
			});
	

		}(window.jQuery)
    </script>
<?php $this->Layout->blockEnd(); ?>