<?php 
// TODO: how do we get snappi-dev auth user here?
// 		xxx - XHR GET /users/signin/.json
// 		yes - read cookie set from /users/signin
// $authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
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
<?php if ($authUser) {  ?>
              <ul class="nav">
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/home">Home</a></li>
                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome <span style='color:white;'><?php echo $authUser['username']; ?></span><b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right alpha rgba80b">
                    <li class='promote'><a href="/users/upload">Upload Photos</a></li>
                  </ul>
                </li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/users/signout" >Sign Out</a></li>
              </ul>
<?php } else {  ?>            
	          <ul class="nav">
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/home">Home</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/users/signin" >Sign In</a></li>
                <li data-toggle="collapse" data-target=".nav-collapse"><a href="/users/register" >Register</a></li>
              </ul>
<?php } ?> 
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->       