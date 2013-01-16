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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 	<link rel="stylesheet" href="/css/cake.generic.css"> -->
        <link rel="stylesheet" href="/css/bootstrap.min.css">
   		<style>
            body {
                padding-top: 0px;
                padding-bottom: 40px;
            }
        </style>
        <script type="text/javascript">CFG = {};</script>
        <link rel="stylesheet" href="/css/bootstrap-responsive.css">
        <link rel="stylesheet" href="/css/main.css">

        <script src="/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        
        <?php $this->Layout->output($this->viewVars['HEAD_for_layout']); ?>
        
        
    </head>
    <body data-spy="scroll" data-target=".navbar">
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
				<?php $this->Layout->output($this->viewVars['footer_for_layout']); ?>
				<p>&copy; 2013 Snaphappi Inc.
				<?php echo $this->Html->link(
						$this->Html->image('cake.power.gif', array('border' => '0')),
						'http://www.cakephp.org/',
						array('target' => '_blank', 'escape' => false)
					);
				?></p>
			</div>
		</div> <!-- /container -->
		<?php echo $this->element('sql_dump'); ?>
        

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>

        <script src="/js/vendor/bootstrap.min.js"></script>
		<script src="http://www.youtube.com/iframe_api"></script>
        

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
		<!-- end Mixpanel -->       	
		<script src="/js/main.js"></script>
        <?php $this->Layout->output($this->viewVars['javascript_for_layout']); ?>
        
    </body>
</html>
	