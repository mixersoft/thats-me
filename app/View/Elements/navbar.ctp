<?php $useHash = !empty($useHash) ? 'use-hash' : '';  ?>  
	    <div class="navbar navbar-inverse navbar-fixed-top <?php echo $useHash; ?> invisible alpha rgba80b">
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
<?php if (!empty($useHash)) { ?>             	
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
                    <li class='promote'><a href="#sharing">Chatter</a></li>
                    <li><a href="#see-the-movie">See the Movie Again</a></li>
                    <li><a href="/timeline/venice" target="_blank">See the Prototype</a></li>
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
                    <li class='promote'><a href="/sharing">Chatter</a></li>
                    <li><a href="/see-the-movie">See the Movie Again</a></li>
                    <li><a href="/timeline/venice" target="_blank">See the Prototype</a></li>
                    <li class='hide'><a href="#">Playground</a></li>
                  </ul>
                </li>
              </ul>
<?php } ?>	 
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->       