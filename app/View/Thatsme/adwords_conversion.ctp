<!-- adwords conversion tracking for use within iframe -->
<?php 
	// values from Adwords > Tools & Tracking > Conversions
	$id = 987897603;
	$lang = "en";
	$format = "3";
	$color = "ffffff";
?>  
<html><body>
	<!-- Google Code for features Conversion Page -->
	<script type="text/javascript">
	/* <![CDATA[ */
	var google_conversion_id = <?php echo $id; ?>;
	var google_conversion_language = "<?php echo $lang; ?>";
	var google_conversion_format = "<?php echo $format; ?>";
	var google_conversion_color = "<?php echo $color; ?>";
	var google_conversion_label = "<?php echo $label; ?>";
	var google_conversion_value = <?php echo $value; ?>;
	/* ]]> */
	</script>
	<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js">
	</script>
	<noscript>
	<div style="display:inline;">
	<img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/<?php echo $id; ?>/?value=<?php echo $value; ?>&amp;label=<?php echo $label; ?>&amp;guid=ON&amp;script=0"/>
	</div>
	</noscript>
</body></html>