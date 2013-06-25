<?php 
// 		XHR GET snappi-dev/users/checkauth to verify authUser
?>  
	    <div class="navbar navbar-inverse navbar-fixed-top invisible alpha black a80">
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
            <div class="nav-collapse collapse pull-right" >
              <ul class="nav auth <?php if (!$authUser) echo ' hide '?>">
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/home">Home</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome <span class='display-name' style='color:white;'><?php echo $authUser ? $authUser['username'] : ''; ?></span><b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha rgba80b">
                  	<li class='promote <?php if ($action=='upload') echo 'active';  ?>'><a href="/users/upload">Upload</a></li>
                    <li class='promote <?php if ($action=='snaps') echo 'active';  ?>'><a href="/users/snaps">Photos</a></li>
                    <li class='promote <?php if ($action=='snaps') echo 'active';  ?>'><a href="/users/reset">Reset Account</a></li>
                  </ul>
                </li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/users/signout" >Sign Out</a></li>
              </ul>
	          <ul class="nav no-auth <?php if ($authUser) echo ' hide '?>">
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/home">Home</a></li>
                <li class='<?php if ($action=='signin') echo 'active';  ?>' data-toggle="collapse" data-target=".nav-collapse"><a href="/users/signin" >Sign In</a></li>
                <li class='<?php if ($action=='register') echo 'active';  ?>' data-toggle="collapse" data-target=".nav-collapse"><a href="/users/register" >Register</a></li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->  
