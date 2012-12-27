<!DOCTYPE html>
<!-- see: paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>      <html class="no-js ie6 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js ie7 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js ie8 lt-ie9"> <![endif]-->
<!--[if IE 9]>     	   <html class="ie ie9 lte9"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<!-- 		<link rel="stylesheet" href="/css/cake.generic.css"> -->
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="/css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="/css/main.css">

        <script src="/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        
        <?php $this->Layout->output($this->viewVars['HEAD_for_layout']); ?>
        
        
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->
		<!--  This code taken from Cakephp layouts/default.ctp  -->
		<div id="container" >
			<div id="header"> 
				<?php $this->Layout->output($this->viewVars['header_for_layout']); ?>
			</div>
			<div id="content">
	
				<?php echo $this->Session->flash(); ?>
	
				<?php echo $this->fetch('content'); ?>
			</div>
			<div id="footer">
				<p>&copy; Snaphappi 2012</p>
				<?php echo $this->Html->link(
						$this->Html->image('cake.power.gif', array('border' => '0')),
						'http://www.cakephp.org/',
						array('target' => '_blank', 'escape' => false)
					);
				?>
			</div>
		</div> <!-- /container -->
		<?php echo $this->element('sql_dump'); ?>
        

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>

        <script src="/js/vendor/bootstrap.min.js"></script>

        <script src="/js/main.js"></script>

        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
        
        <?php $this->Layout->output($this->viewVars['javascript_for_layout']); ?>
        
    </body>
</html>
	