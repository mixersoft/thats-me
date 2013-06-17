<?php
$title = "Snaphappi &middot; Preview";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
?>

<div id="signin" class="featurette preview track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>Welcome to the Snaphappi Preview</h1>
					</div>
					<div class="row">
						<form class="form-horizontal offset3 span6" onsubmit="return CFG['aaa'].submit(this);">
							<div class="control-group">
								<label class="control-label" for="inputEmail">Email</label>
								<div class="controls">
									<input type="text" id="inputEmail" placeholder="Email">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="inputPassword">Password</label>
								<div class="controls">
									<input type="password" id="inputPassword" placeholder="Password">
								</div>
							</div>
							<div class="control-group">
								<div class="controls">
									<label class="checkbox">
										<input type="checkbox">
										Remember me </label>
									<div class='form-inline'>
										<button type="submit" class="btn btn-awesome">
											Sign in
										</button>
										<button type="submit" class="btn btn-awesome guest">
											Sign in as Guest
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
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

