<?php 
	$title = "Snaphappi &middot; Curated Family Photos";
	$description = "What do you do with your 10,000 photos &middot; how do you find those precious moments? Only Snaphappi provides Trained Editors who find your Beautiful Photos and feature them on Curated Timelines. Put your photos on our To-do list and Play with your photos once again.";
	$viewport = "width=device-width, initial-scale=1.0";
	
	/**
	 * meta
	 */
	if (empty($this->viewVars['title_for_layout'])) $this->set("title_for_layout", $title);
	$this->Html->meta(array('name'=>'viewport', 'content'=>$viewport), null, array('inline' => false));
	$this->Html->meta('favicon.ico', '/img/beachfront/bp.ico', array('type' => 'icon', 'inline' => false));
	if ($this->action=='home')  $this->Html->meta('description', $description, array('inline' => false));
	/**
	 * CSS
	 */
	// $this->Html->css(array('fonts', 'beachfront.css', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));
	if ($isLocal) {
		$min = "/min/b=css&f=fonts.css,beachfront.css,responsive-tablet.css,responsive-mobile.css,font-awesome.css";
		$this->Html->css($min, null, array('inline' => false));
		$this->start('css');
			$this->Less->css('beachfront-less');
		$this->end();	
	} else {
		$this->Less->css('beachfront-less', array('no_output'=>true));
		$min = "/min/b=css&f=fonts.css,beachfront.css,responsive-tablet.css,responsive-mobile.css,beachfront-less.css,font-awesome.css";
		$this->Html->css($min, null, array('inline' => false));
	}	
	
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
	if ( 0 ) {
		// $js_bottom[] = '/js/vendor/TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.js';
		// $js_bottom[] = '/js/vendor/carouFredSel-6.2.0/jquery.carouFredSel-6.2.0.js';	
		// $js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js';	}
	// NOTE: append &123 to minify request string for 1 year max-age
	if ($isLocal) {
		$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=bootstrap/modernizr-2.6.2-respond-1.1.0.min.js,bootstrap/bootstrap.js,bootstrap/font-checker.js,bootstrap/jquery.cookie.js,bootstrap/jquery.scrollTo-1.4.3.1-min.js,TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js&123';		$js_bottom[] = 'base';
		// $js_bottom[] = 'http://www.youtube.com/iframe_api';		$js_bottom[] = "vendor";	// mixpanel and youtube control scripts
	} else {
		$js_bottom[] = 'http://snappi.snaphappi.com/min/b=static/js&f=bootstrap/modernizr-2.6.2-respond-1.1.0.min.js,bootstrap/bootstrap.js,bootstrap/font-checker.js,bootstrap/jquery.cookie.js,bootstrap/jquery.scrollTo-1.4.3.1-min.js,TouchSwipe-Jquery-Plugin-master/jquery.touchSwipe.min.js,carouFredSel-6.2.0/jquery.carouFredSel-6.2.0-packed.js&123';
		$js_bottom[] = '/min/b=js&f=base.js,vendor.js';		// $js_bottom[] = 'http://www.youtube.com/iframe_api';
	}
	$this->Html->script($js_bottom, array('block' => 'javascript_Bottom'));
	
	if (0 || $isLocal == false) {
		// load google analytics/mixpanel only from snaphappi.com
		$this->start('javascript_Bottom');
?>
<script>_udn = "snaphappi.com";</script>
<!-- Google Analytics Content Experiment code -->
<script>function utmx_section(){}function utmx(){}(function(){var
k='67810021-0',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
</script><script>utmx('url','A/B');</script>
<!-- End of Google Analytics Content Experiment code -->


<!-- start google Analytics -->
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-4086550-2']);
  _gaq.push(['_setDomainName', 'snaphappi.com']);  _gaq.push(['_trackPageview']);
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


<!-- NAVBAR -->
<?php $this->startIfEmpty('body_header'); 
		echo $this->element('navbar', array('useHash'=>true));
	    echo $this->element('notify');
 	$this->end(); 
?> 

    
<!-- FOOTER -->
<?php $this->startIfEmpty('body_footer'); ?>      
      <footer >
        <p><a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
      <div id="fb-root"></div>
<?php $this->end(); ?>

<!-- BODY CONTENT -->
<?php 
	echo $this->element('bg-slideshow');
	echo $this->fetch('content'); 
?>
