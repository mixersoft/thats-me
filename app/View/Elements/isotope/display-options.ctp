<section id="iso-menu" class="span12 clearfix" >
	<div class='section-heading'>
		<h2>Display Options</h2>
		<button data-action='show-all' data-parent='#iso-menu' class='pull-right btn btn-awesome btn-small show-all'>
			show all
		</button>
	</div>
	<div class="accordion" id="">
		<div class="accordion-group">
			<div class="accordion-heading hide">
				<a class="accordion-toggle collapsed " data-toggle="collapse" data-parent="" data-target="#iso-option-0"> 
					Filters </a>
			</div>
			<div id="iso-option-0" class="accordion-body collapse">
				<div class="accordion-inner ">
					<ul data-option-key="filter" class="inline option-set clearfix" id="filters">
						<li class="btn btn-awesome btn-small active">
							<a class="selected" data-option-value="*" href="#filter">show all</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".metal" href="#filter">metal</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".transition" href="#filter">transition</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".post-transition" href="#filter">post-transition</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".nonmetal" href="#filter">nonmetal</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".inner-transition" href="#filter">inner-transition</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".alkali, .alkaline-earth" href="#filter">alkali and alkaline-earth</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=":not(.transition)" href="#filter">not transition</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value=".metal:not(.transition)" href="#filter">metal but not transition</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="accordion" id="">
		<div class="accordion-group">
			<div class="accordion-heading">
				<a class="accordion-toggle collapsed " data-toggle="collapse" data-parent="" data-target="#iso-option-1"> 
					Sort </a>
			</div>
			<div id="iso-option-1" class="accordion-body collapse">
				<div class="accordion-inner ">
					<ul data-option-key="sortBy" class="inline option-set clearfix" id="sort-by">
						<li class="btn btn-awesome btn-small ">
							<a data class="" data-option-value="original-order" href="#sortBy=original-order">original-order</a>
						</li>
						<li class="btn btn-awesome btn-small active">
							<a class="selected" data-option-value="score" href="#sortBy=name">score</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value="caption" href="#sortBy=symbol">caption</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value="random" href="#sortBy=random">random</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="accordion" id="">
		<div class="accordion-group">
			<div class="accordion-heading">
				<a class="accordion-toggle collapsed " data-toggle="collapse" data-parent="" data-target="#iso-option-2"> 
					Sort Direction </a>
			</div>
			<div id="iso-option-2" class="accordion-body collapse">
				<div class="accordion-inner ">
					<ul data-option-key="sortAscending" class="inline option-set clearfix" id="sort-direction">
						<li class="btn btn-awesome btn-small active">
							<a class="selected" data-option-value="true" href="#sortAscending=true">sort ascending</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value="false" href="#sortAscending=false">sort descending</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="accordion" id="">
		<div class="accordion-group">
			<div class="accordion-heading">
				<a class="accordion-toggle collapsed " data-toggle="collapse" data-parent="" data-target="#iso-option-3"> 
					Layout </a>
			</div>
			<div id="iso-option-3" class="accordion-body collapse in">
				<div class="accordion-inner ">
					<ul data-option-key="layoutMode" class="inline option-set clearfix" id="layouts">
						<li class="btn btn-awesome btn-small ">
							<a class="selected" data-option-value="masonry" href="#masonry">masonry</a>
						</li>
						<li class="btn btn-awesome btn-small active">
							<a data-option-value="fitRows" href="#fitRows">fitRows</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value="cellsByRow" href="#cellsByRow">cellsByRow</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a data-option-value="straightDown" href="#straightDown">straightDown</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a class="horizontal" data-option-value="masonryHorizontal" href="#masonryHorizontal">masonryHorizontal</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a class="horizontal" data-option-value="fitColumns" href="#fitColumns">fitColumns</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a class="horizontal" data-option-value="cellsByColumn" href="#cellsByColumn">cellsByColumn</a>
						</li>
						<li class="btn btn-awesome btn-small">
							<a class="horizontal" data-option-value="straightAcross" href="#straightAcross">straightAcross</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="accordion" id="">
		<div class="accordion-group hide">
			<div class="accordion-heading">
				<a class="accordion-toggle collapsed " data-toggle="collapse" data-parent="" data-target="#iso-option-4"> 
					Other </a>
			</div>
			<div id="iso-option-4" class="accordion-body collapse">
				<div class="accordion-inner ">
					<ul class="clearfix inline" id="etc" >
						<li class="btn btn-awesome btn-small" id="toggle-sizes">
							<a href="#toggle-sizes">Toggle variable sizes</a>
						</li>
						<li class="btn btn-awesome btn-small" id="insert">
							<a href="#insert">Insert new elements</a>
						</li>
						<li class="btn btn-awesome btn-small" id="append">
							<a href="#append">Append new elements</a>
						</li>
						<li class="btn btn-awesome btn-small" id="shuffle">
							<a href="#shuffle">Shuffle</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
