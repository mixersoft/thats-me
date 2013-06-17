<?php
$title = "Snaphappi &middot; Upload Photos";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');

$this -> append('HEAD_bottom');
echo '<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" type="text/css" />';
echo '<link rel="stylesheet" href="/js/plupload/jquery.ui.plupload/css/jquery.ui.plupload.css" type="text/css" />';
?>
<style type="text/css">
	#uploader_container {
		height: 640px;
		margin-bottom: 60px;
	}
	.plupload_droptext {
		line-height: 120px;
		position: relative;
	}
	.plupload_droptext .header > span {
		color: #666;
		font-size: 2em;
		font-weight: normal;
		line-height: 120px;
	}
	.plupload_droptext .header > span.strong {
		color: darkred;
		font-weight: bold;
	}
	.plupload_droptext div {
		line-height: 1;
	}
	.copy-paste {
		background-color: #EEEEEE;
		border: 1px dotted black;
		padding: 2px;
		text-align: center;
	}
	.dragover {
		-moz-box-shadow: inset 0 0 5px 5px #888;
		-webkit-box-shadow: inset 0 0 5px 5px #888;
		box-shadow: inset 0 0 5px 5px #888;
	}
	.plupload-help {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		background-color: white;
		height: 100%;
		padding-top: 1em;
		background-color: #FFF;
	}
	.plupload-help * {
		background-color: white;
	}
	.plupload-help .header > span {
		line-height: 60px;
	}

	.plupload-help .body {
		text-align: left;
	}
	.plupload-help .plupload_button:hover {
		background: url("images/ui-bg_glass_75_dadada_1x400.png") repeat-x scroll 50% 50% #DADADA;
		border: 1px solid #999999;
		color: #212121;
		font-weight: normal;
	}

	.plupload-help.confirm-not-chrome .header img, .plupload-help.confirm-prefer-browse .header img {
		height: 36px;
	}

	.plupload-help ul {
		margin: 0 auto;
	}
	.plupload-help ul li {
		list-style: disc inside none;
	}
	.plupload-help.confirm-not-chrome ul {
		width: 340px;
	}
	.plupload-help.confirm-prefer-browse ul {
		width: 420px;
	}

</style>
<?php
$this -> end();

$this -> append('javascript_Bottom');
?>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script type="text/javascript" src="/js/vendor/font-checker.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
<!-- production -->
<!-- <script type="text/javascript" src="/min/b=js/plupload&amp;f=jquery.cookie.js,moxie.js,plupload.js,jquery.ui.plupload/jquery.ui.plupload.js,snappi.js"></script> -->
<!--  debug -->

<script type="text/javascript" src="/js/plupload/jquery.cookie.js"></script>
<script type="text/javascript" src="/js/plupload/moxie.js"></script>
<script type="text/javascript" src="/js/plupload/plupload.js"></script>
<script type="text/javascript" src="/js/plupload/jquery.ui.plupload/jquery.ui.plupload.js"></script>
<script type="text/javascript" src="/js/plupload/snappi.js"></script>
<?php
$this -> end();
?>

<div id="uploader-wrap" class="featurette uploader track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>Upload Photos to Snaphappi</h1>
					</div>
					<div class="row">
						<section class="span12">
							<noscript>
								Javascript is required for this action
							</noscript>
							<form id="form" method="post" action="dump.php"  class='hide'>
								<div id="uploader">
									<p>
										Your browser doesn't have Flash, Silverlight or HTML5 support.
									</p>
								</div>
								<div class='fallback hide'>
									<br />
									<input type="submit" value="Submit" />
								</div>
							</form>
						</section>
				</div>
			</div>
		</div>
		<div class='fw-band footer alpha black a85'>
			<div class="container center">
				<a title='see our Facebook page' target='_social' href='http://www.facebook.com/Snaphappi'><i class="icon-facebook-sign"></i></a>
				&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
				&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
			</div>
		</div>
	</div>

	<div id="markup-uploader" class="hide">
		<div class="plupload-help is-chrome">
			<div class='header'>
				<span>Works better with </span>
				<img src='/img/providers/chrome_logo_2x.png'>
			</div>
			<div class='subhead'>
				<div>
					It's easy with Chrome &mdash; drag <u>folders</u> here and we'll find all the JPGs.
				</div>
			</div>
		</div>
		<div class="plupload-help not-chrome">
			<div class='header'>
				<span>Works better with</span>
				<a href="http://www.google.com/chrome" target="_blank" title="Don't have Chrome? Click here to get it."> <img src='/img/providers/chrome_logo_2x.png'> </a>
			</div>
			<div class='subhead'>
				<p>
					Only the Chrome browser allows you to drag folders into this box.
				</p>
				<br />
				<p>
					If you plan to upload 100s of photos, please open this page in Chrome
					<input type="text" size="32" value="<?php echo Router::url($this -> here, true); ?>" onclick="this.select();" class="copy-paste">
				</p>
			</div>
		</div>
		<div class="plupload-help confirm-not-chrome">
			<div class='header'>
				<span class='strong'>Are you sure you don't want to use</span>
				<a href="http://www.google.com/chrome" target="_blank" title="Don't have Chrome? Click here to get it."> <img src='/img/providers/chrome_logo_2x.png'> </a>
				<span>?</span>
				<label class="plupload_button ui-button ui-widget ui-state-default ui-button-text-only"
				role="button" aria-disabled="false" aria-pressed="true"> <span class="ui-button-text strong">I'm sure</span> </label>
			</div>
			<div class='body'>
				<ul>
					<p>
						Chrome gives you these key benefits:
					</p>
					<li>
						drag folders and we'll find the JPGs
					</li>
					<li>
						20x faster uploads with web-sized photos (640px)
					</li>
					<li>
						duplicate detection avoids uploading the same file twice
					</li>
				</ul>
			</div>
			<br />
			<p>
				Please open this page in Chrome
				<input type="text" size="32" value="<?php echo Router::url($this -> here, true); ?>" onclick="this.select();" class="copy-paste">
		</div>
		<div class="plupload-help confirm-prefer-browse">
			<div class='header'>
				<span class='strong'>Are you sure you don't want to drag folders?</span>
				<label class="plupload_button ui-button ui-widget ui-state-default ui-button-text-only"
				role="button" aria-disabled="false" aria-pressed="true"> <span class="ui-button-text strong">I'm sure</span> </label>
			</div>
			<div class='body'>
				<ul>
					<p>
						Snaphappi works better when you drop entire folders of JPGs here. We:
					</p>
					<li>
						automatically scan your folders for JPGs, and
					</li>
					<li>
						find duplicates better when you include folder names.
					</li>
				</ul>
			</div>
		</div>
	</div>
