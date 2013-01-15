<style>
body {
	padding: 0;
}
.blue {
	background: #e8f6fd; /* Old browsers */
	background: -moz-linear-gradient(top,  #e8f6fd 0%, #c5e8fa 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e8f6fd), color-stop(100%,#c5e8fa)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #e8f6fd 0%,#c5e8fa 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #e8f6fd 0%,#c5e8fa 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #e8f6fd 0%,#c5e8fa 100%); /* IE10+ */
	background: linear-gradient(top,  #e8f6fd 0%,#c5e8fa 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e8f6fd', endColorstr='#c5e8fa',GradientType=0 ); /* IE6-9 */
	border: 1px solid #8fb9d0;
	-webkit-box-shadow: 0px 0px 7px #fff inset;
	-moz-box-shadow: 0px 0px 7px #fff inset;	
}
.orange {
	background: #f9c667 !important; /* Old browsers */	
	background: -moz-linear-gradient(top, #f9c667 0%, #f79621 100%) !important; /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f9c667), color-stop(100%,#f79621)) !important; /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top, #f9c667 0%,#f79621 100%) !important; /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top, #f9c667 0%,#f79621 100%) !important; /* Opera 11.10+ */
	background: -ms-linear-gradient(top, #f9c667 0%,#f79621 100%) !important; /* IE10+ */
	background: linear-gradient(top, #f9c667 0%,#f79621 100%) !important; /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f9c667', endColorstr='#f79621',GradientType=0 ) !important; /* IE6-9 */
	border: 1px solid #f79621 !important;
	color: #000 !important;
}
.hide {
	display:none;
}
.navbar {
	background-color:#000000;
	width:342px;
	margin: 0;
}
.logo {
	background: url("/img/logo-150x100.jpg") no-repeat scroll 0 -20px transparent;
	height:45px;
	width:342px;
}
.chooser {
	display: inline-block;
	padding: 40px 40px 5px 40px;
	
}
.btn-warning , .btn-warning:hover {
	color: #000;
}
.alert-wrapper {
/*	same width as .btn-large */
	width: 260px;		
}
.alert {
	font-size: 10px;
	line-height: 1;
	margin: 20px 0 0 0 ;
	padding-right: 8px;
}
.alert-error {
	font-size: 10px;
	line-height: 1;
	margin-top : 10px;
	font-family: arial;
	
}
.toolbar {
	margin-top : 10px;
}
#footer {
	font-size: 0.8em;
}
.alert {
	cursor:text;
}
/* use .chooser:hover to simulate .drop-target */
.drop-target , .chooser:hover { 
 	background: #f9c667 !important; /* Old browsers */	
	border: 1px solid #f79621 !important;
	color: #000 !important;
	cursor: crosshair
}
.icon-wrench {
	cursor: pointer;
}
</style>
<?php $this->Layout->blockStart('header'); ?>
<div class="navbar navbar-inverse">
	<div class='logo'>&nbsp;</div>
</div>
<?php $this->Layout->blockEnd(); ?>
<div class="wrap">
	<div class='chooser blue' title="when drag-over a folder, add class .drop-target to chooser">
		<a class="btn btn-large btn-warning btn-chooser" onclick="return false;" title="Click here to choose a folder">Choose a Folder to Import...</a>
		<div class="alert-wrapper " >
			<div class='alert alert-success notify hide'>
				<div class='message'>importing folder: 'C:\temp\some folder\some other folder\and this is a really long path'</div>
			</div>
		</div>
		<div class="alert-wrapper " >
			<div class='alert alert-error debug hide'>
				<div class='message'>
					<div class='sid'>sid: 4865d1a0-217e-49d5-bd21-8558e4c8e294</div>
					<div class='token'>token: 4865d1a0-217e-49d5-bd21-8558e4c8e294</div>
				</div>
			</div>
		</div>
		<div class="toolbar pull-right"><i class="icon-wrench" title="Click here to see debug information"></i></div>
	</div>
</div>


<?php $this->Layout->blockStart('javascript'); ?>
<script type="text/javascript">
$(document).ready(
		function(){
			var notify = [
				'C:\\temp\\some folder\\some other folder\\and this is a really long path',
				'W:\\temp\some folder\\some other folder\\another long folder path',
				'U:\\temp\\a short folder path',
			]
			$('.icon-wrench').on('click', function(e){
				$('.debug').toggleClass('hide');
			});
			$('.btn-chooser').on('click', function(e){
				$('.notify').html(notify[Math.floor((Math.random()*3))]).toggleClass('hide');
			});
		}
	)	
</script>
<?php $this->Layout->blockEnd(); ?>