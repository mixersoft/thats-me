<?php 
/*
 * $hash = true, use hash to scroll to target within doc, for /i-need-this or /home
 * $hash = 'append', nav to referrer, if within domain, then use hash to scroll to target withing referrer doc
 * 		typically used for standard analytic pageView tracking after returning from demo
 * $hash = false, use links to individual section pages
 */
if (!isset($hash)) $hash = false;
if ($hash === 'append') {
	$referer = env('HTTP_REFERER');	
	if (strpos($referer, 'thats-me') || strpos($referer, 'snaphappi.com')) {
		// referer from internal page, ok
	} else {	
		$hash = $referer = false;	// some other domain, don't use hash
	}
} 
$hashClass = $hash ? 'use-hash' : '';  
?>  
	    <div class="navbar navbar-inverse navbar-fixed-top <?php echo $hashClass; ?> invisible alpha rgba80b">
          <div class="navbar-inner container">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/i-need-this">
            	<div class='logo'>snap<span class='cursive'>happi</span></div>
<!--             	<img src='/img/beachfront/snaphappi-logo-v2.png'> -->
            </a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse pull-right collapsed-alpha rgba80b" >
<?php if ($hash==='append' && $referer ) { // nav to referer and use hash to scroll to target ?>        
	 
	     	
              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="<?php echo $referer; ?>#home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="<?php echo $referer; ?>#features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="<?php echo $referer; ?>#how-it-works" >How It Works</a></li>
                <li class='promote' data-toggle="collapse" data-target=".nav-collapse"><a href="<?php echo $referer; ?>#call-to-action" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha rgba80b">
                    <li class='promote'><a href="<?php echo $referer; ?>#about">About</a></li>
                    <li class='promote'><a href="<?php echo $referer; ?>#FAQ">FAQ</a></li>
                    <li class='promote'><a href="<?php echo $referer; ?>#social">Social</a></li>
                    <li><a href="<?php echo $referer; ?>#see-the-movie">See the Movie Again</a></li>
                    <li><a href="/timeline/venice" onclick='return CFG["util"].load_demo();'  target="snappi-demo">See the Demo</a></li>
                    <li class='hide'><a href="#">Playground</a></li>
                  </ul>
                </li>
              </ul>	
<?php } else if ($hash) { 				// use hash to scroll to target within doc  ?>             	

              <ul class="nav">
                <li class="active" data-toggle="collapse" data-target=".nav-collapse"><a href="#home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="#how-it-works" >How It Works</a></li>
                <li class='promote' data-toggle="collapse" data-target=".nav-collapse"><a href="#call-to-action" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha rgba80b">
                    <li class='promote'><a href="#about">About</a></li>
                    <li class='promote'><a href="#FAQ">FAQ</a></li>
                    <li class='promote'><a href="#social">Social</a></li>
                    <li><a href="#see-the-movie">See the Movie Again</a></li>
                    <li><a href="/timeline/venice" onclick='return CFG["util"].load_demo();'  target="snappi-demo">See the Demo</a></li>
                    <li class='hide'><a href="#">Playground</a></li>
                  </ul>
                </li>
              </ul>
<?php } else { ?>
              <ul class="nav">
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/features" >Features</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/how-it-works" >How It Works</a></li>
                <li class='promote' data-toggle="collapse" data-target=".nav-collapse"><a href="/i-want-it" >I Want It</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha rgba80b">
                    <li class='promote'><a href="/about">About</a></li>
                    <li class='promote'><a href="/faq">FAQ</a></li>
                    <li class='promote'><a href="/sharing">Social</a></li>
                    <li><a href="/see-the-movie">See the Movie Again</a></li>
                    <li><a href="/timeline/venice"  onclick='return CFG["util"].load_demo();'  target="snappi-demo">See the Demo</a></li>
                    <li class='hide'><a href="#">Playground</a></li>
                  </ul>
                </li>
              </ul>
<?php } ?>	 
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->       