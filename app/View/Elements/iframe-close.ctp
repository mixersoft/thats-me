<?php $useHash = !empty($useHash) ? 'use-hash' : '';  ?>  
	    <div class="navbar navbar-inverse navbar-fixed-top <?php echo $useHash; ?> invisible alpha rgba80b">
          <div class="navbar-inner container">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/i-need-this" onclick='return false;'>
            	<div class='logo'>snap<span class='cursive'>happi</span></div>
<!--             	<img src='/img/beachfront/snaphappi-logo-v2.png'> -->
            </a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse pull-right collapsed-alpha rgba80b" >
              <ul class="nav">
                <li class='iframe-close' data-toggle="collapse" data-target=".nav-collapse"><a href="#" >Close Demo <icon class='icon-remove-sign'></a></li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->       