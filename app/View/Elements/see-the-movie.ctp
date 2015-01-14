<?php  $yt_movie_id = '8iL3eoxqUOE'; ?>
	  <a name='see-the-movie'></a>	
      <div id="see-the-movie" class="featurette see-the-movie track-page-view ">
      	<div class='fw-band vcenter-body alpha'>
	      	<div class="featurette-heading center">
		        <h1>See the Movie</h1>
	       	</div>
	        <div class='vcenter-body center'>
	        	<iframe id="yt-player" type="text/html"  src="http://www.youtube.com/embed/<?php echo $yt_movie_id ?>?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>
				<div class='content'>
					<p class="center">
			        		Find out how we save you time 
			        		and make it fun &amp; easy 
			        		<span class='nowrap'>to re-live the precious moments buried in your Family Photos (50 sec)</span>
			        </p>
			        <br />
<?php	if (false && in_array($this->action, array("home_deferred", 'home', 'iWantIt'))) { ?>			        
		        	<div class="center">
						<a class="btn btn-large btn-primary" href="/timeline/venice" onclick='return CFG["util"].load_demo.apply(this,arguments);' target='snappi-demo'>See the Demo <i class='icon-external-link' title='opens in a new tab or window'></i></a>
					</div>
					<br />
<?php } ?>					
					<div class="center"> <?php echo $this->element('social-button-row'); ?>	
					</div> 
	  			</div>
	  		</div>	
	    </div>
	    <div class='fw-band footer  alpha rgba80b'>
        	<div class="container ">
				<div class="pull-left"><a href='#call-to-action'><button class="btn btn-awesome" title='Go to the next section to learn more about Snaphappi'>
			    	I Want It
			    </button></a></div>	
        		<div class="pull-right"><a href='#how-it-works'  data-next='.featurette'><button class="btn btn-awesome" >
			    	Learn More
			    </button></a></div>
        	</div>
        </div>
      </div>
