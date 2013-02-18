<!DOCTYPE html>
<!-- see: paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>      <html class="no-js ie6 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js ie7 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js ie8 lt-ie9"> <![endif]-->
<!--[if IE 9]>     	   <html class="ie ie9 lte9"> <![endif]-->
<!--[if gt IE 9]><!--> 
<html class="no-js <?php if (!empty($isAndroid)) echo 'android'; ?>"> 
<!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php echo $title_for_layout; ?></title>
        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	    <!--[if lt IE 9]>
	      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	    <![endif]-->
        <link type="text/css" rel="stylesheet" href="http://snappi.snaphappi.com/min/b=static/css/bootstrap&f=bootstrap.min.css" />
        <link type="text/css" rel="stylesheet" href="http://snappi.snaphappi.com/min/b=static/css/bootstrap&f=bootstrap-responsive.css" />
        <script src="http://snappi.snaphappi.com/static/js/bootstrap/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <?php
        	echo $this->fetch('meta'); 
			echo $this->fetch('script'); 
        	echo $this->fetch('css'); 
        	echo $this->fetch('HEAD_bottom'); 
        ?>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<!--  This code taken from Cakephp layouts/default.ctp  -->
		
		<div id="container" >
			<div id="header"> 
				<?php echo $this->fetch('body_header');?>
			</div>
			<div id="content">
				<?php echo $this->Session->flash(); ?>
				<?php echo $this->fetch('content'); ?>
			</div>
			<div id="footer" >
				<div class="container">
					<?php echo $this->fetch('body_footer');?>
					<p>&copy; 2013 Snaphappi Inc.
						<a class="cakephp" target="_blank" href="http://www.cakephp.org/">
						</a>
					</p>
				</div>
			</div>
		</div> <!-- /container -->
		<!-- // jquery with fallback -->		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="http://snappi.snaphappi.com/static/js/bootstrap/jquery-1.8.3.min.js"><\/script>')</script>
		<!-- // bootstrap -->
		<script type="text/javascript" src="http://snappi.snaphappi.com/min/b=static/js/bootstrap&amp;f=bootstrap.js,jquery.scrollTo-1.4.3.1-min.js"></script>
		<?php 
			echo $this->element('sql_dump'); 
			echo $this->fetch('javascript_Bottom');
		?>
    </body>
</html>
	