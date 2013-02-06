<?php 
	if ($isTouch) {
		$this->Html->css(array('fonts', 'beachfront.css', 'touch', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));
	} else $this->Html->css(array('fonts', 'beachfront.css', 'responsive-tablet', 'responsive-mobile'), null, array('inline' => false));
?>
<a name='FAQ'></a>
<div id='FAQ' class="featurette FAQ track-page-view">
	<div class='bg'></div>
	<div class="container">
		<div class="wrap alpha70b center">
			<h1 class="featurette-heading">Frequently Asked Questions</h1>
		</div>
		<?php echo $this->element('faq'); ?>
		<div class='padding'></div>
		<div class='fw-band footer'>
			<div class="container ">
				<div class="pull-right">
					<a href='#call-to-action'>I Want It</a>
				</div>
			</div>
		</div>
	</div>
</div>
