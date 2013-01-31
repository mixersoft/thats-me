<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>iScroll demo: Carousel</title>

<script type="text/javascript" src="http://snappi.snaphappi.com/svc/lib/cubiq-iscroll-d31d6e6/src/iscroll.js"></script>

<script type="text/javascript">
var myScroll;

function loaded() {
	myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	 });
}

document.addEventListener('DOMContentLoaded', loaded, false);
</script>

<style type="text/css" media="all">
body,ul,li {
	padding:10px;
	margin:0;
}

body {
	font-size:12px;
	-webkit-user-select:none;
    -webkit-text-size-adjust:none;
	font-family:helvetica;
}
   	.vcenter-wrap {
   		display: table; 
   		overflow: hidden;
   		width:100%;
   		
   		height: 400px;
   		min-height: 550px; 
   	}
   	html.lt-ie8 .vcenter-wrap {
   		position: relative; 
   	}
	.vcenter-wrap > .vcenter-padding {
		display: table-cell; 
		vertical-align: middle;
	}
	html.lt-ie8 .vcenter-padding {
		position: absolute; 
		top: 50%;
	}
	.vcenter-wrap > .vcenter-padding > .vcenter-body {
		position: relative; 
	}
	html.lt-ie8 .vcenter-body {
		top: -50%;
	}
	
#wrapper {
	width:300px;
	height:160px;

	float:left;
	position:relative;	/* On older OS versions "position" and "z-index" must be defined, */
	z-index:1;			/* it seems that recent webkit is less picky and works anyway. */
	overflow:hidden;

	background:#aaa;
	-webkit-border-radius:10px;
	-moz-border-radius:10px;
	-o-border-radius:10px;
	border-radius:10px;
	background:#e3e3e3;
}

#scroller {
	width:2100px;
	height:100%;
	float:left;
	padding:0;
}

#scroller ul {
	list-style:none;
	display:block;
	float:left;
	width:100%;
	height:100%;
	padding:0;
	margin:0;
	text-align:left;
}

#scroller li {
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	-o-box-sizing:border-box;
	box-sizing:border-box;
	display:block; float:left;
	width:300px; 
	height:160px;
	text-align:center;
	font-family:georgia;
	font-size:18px;
	line-height:140%;
}

/* adjustments */
	#scroller {
		width: 5400px;		/*pages * li width*/
	} 
	#wrapper, #scroller li {
		width: 900px;
	}	
	
	
	
#nav {
	width:300px;
}

#prev, #next {
	float:left;
	font-weight:bold;
	font-size:14px;
	padding:5px 0;
	width:80px;
	cursor: pointer;
}

#next {
	float:right;
	text-align:right;
}

#indicator, #indicator > li {
	display:block; float:left;
	list-style:none;
	padding:0; margin:0;
}

#indicator {
	width:110px;
	padding:12px 0 0 30px;
}

#indicator > li {
	text-indent:-9999em;
	width:8px; height:8px;
	-webkit-border-radius:4px;
	-moz-border-radius:4px;
	-o-border-radius:4px;
	border-radius:4px;
	background:#ddd;
	overflow:hidden;
	margin-right:4px;
}

#indicator > li.active {
	background:#888;
}

#indicator > li:last-child {
	margin:0;
}

</style>
</head>
<body>
<div class="vcenter-wrap">	
	<div class="vcenter-padding">
		<div class="vcenter-body">
<div id="wrapper">
	<div id="scroller">
		<ul id="thelist">
			<li><strong>1.</strong> <em>A robot may not injure a human being or, through inaction, allow a human being to come to harm.</em></li>
			<li><strong>2.</strong> <em>A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.</em></li>
			<li><strong>3.</strong> <em>A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.</em></li>
			<li><strong>Zeroth Law:</strong> <em>A robot may not harm humanity, or, by inaction, allow humanity to come to harm.</em></li>
			<li><strong>Lyuben Dilov's Forth law:</strong> <em>A robot must establish its identity as a robot in all cases.</em></li>
			<li><strong>Harry Harrison's Forth law:</strong> <em>A robot must reproduce. As long as such reproduction does not interfere with the First or Second or Third Law.</em></li>
			<li><strong>Nikola Kesarovski's Fifth law:</strong> <em>A robot must know it is a robot.</em></li>
		</ul>
	</div>
</div>
</div></div></div>
<div id="nav">
	<div id="prev" onclick="myScroll.scrollToPage('prev', 0);return false">&larr; prev</div>
	<ul id="indicator">
		<li class="active">1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
		<li>6</li>
		<li>7</li>
	</ul>
	<div id="next" onclick="myScroll.scrollToPage('next', 0);return false">next &rarr;</div>
</div>
</body>
</html>