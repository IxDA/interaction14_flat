/*
Interaction Theme
Vertical carousel Homepage
Copyright (c) CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
Ylab, http://www.ylab.nl
*/
function coverCurrent(){
	var iCurrent=0;
	$('#covercontrol span').each(function(i){
		if($(this).hasClass('active')){
			iCurrent = i;
		}
	});
	return iCurrent;
}

function coverScroll(i, bAnimate){
	var $coverList = $('#coverimages');
	var $coverControl = $('#covercontrol');

	var n = $coverList.children().length;
	var iTotalHeight = $coverList.height();
	var iItemHeight = iTotalHeight/n;
	//go next if i is undefinied
	var iTop = i!==undefined ? -1 * iItemHeight * i : ($coverList.position().top) - iItemHeight;
	if( iTop == -1 * iTotalHeight ){
		//no next item, go to first
		iTop = 0;
	}
	if(bAnimate){
		$coverList.animate({top:iTop+'px'});
	}else{
		$coverList.css({top:iTop+'px'});
	}
	$('span:nth(' + i + ')', $coverControl).addClass('active').siblings().removeClass('active');
}

function coverResize(){
	var $coverFirstListItem = $('#coverimages li:first');
	var h = $coverFirstListItem.height();
	if(h < 99){
		//image not loaded yet, calc height based on fixed ratio to width
		h = $coverFirstListItem.width() / 2.7;
	}
	$('#cover').height(h);
	coverScroll(coverCurrent(), false);
}

function coverInit(sId, bRandomFirst){
	/* create a dom structure like this:
		#cover
			ul#coverimages
				li
				li
				li
			div#covercontrol
	*/
	var iFirstItem;
	var $coverList = $(sId).wrap('<div id="cover" />');
	var $coverFirstListItem = $('li:first', $coverList);
	var $coverControl = $('<div id="covercontrol" />').css({position:'absolute'});
	var $cover = $('#cover')
		.css({position:'relative',overflow:'hidden'})
		.append($coverControl);

	var n = $('li', $coverList).each(function(i){
		$coverControl.append(
			$('<span></span>')
				.css( {cursor:'pointer'} )
				.click(function(event){
					coverScroll(i, true);
				})
			);
	}).length;

	$('li', $coverList).css({display:'block'});
	$('img', $coverList).css({width:'100%', height:'auto'});
	$coverList.css({overflow:'visible', height:'auto', position:'relative'});

	coverResize();

	//iFirstItem = bRandomFirst ?  Math.floor( (Math.random() * n) ) : 0;
	//coverScroll(iFirstItem, false );
	$('img:first', $coverFirstListItem).load(coverResize);
	$(window).resize(coverResize);
}

function twitterInit(options){
	var twitterProps = {
		request: 'search',//'profile','timeline'
		userName: null,
		q: null,
		numTweets: 4,
		slideIn: false,
		showTimestamp: true,
		excludeAvatar: false,
		className: 'twitter', //use as reference in css
	};
	twitterProps = $.extend(true, twitterProps, options || {});
	if( (twitterProps.request == 'search' && twitterProps.q) || (twitterProps.request != 'search' && twitterProps.userName) ){
		if( $('#twitter').length ){
			$.getScript('/api/twitter/jquery.twitterapi.js', function(){
				$('#twitter').getTwitter(twitterProps);
			});
		}
	}
}

jQuery(document).ready(function($){
	coverInit('#coverimages', true);

	// twitterInit({userName: 'ixdconf', request: 'timeline', loaderText: '', excludeAvatar: true, ready:function(){
	// 	if( $('#twitter li').length > 0){
	// 		//success
	// 		$('#twitter').prepend('<h1>Latest tweets from <a href="https://twitter.com/ixdconf">@ixdconf</a></h1>');
	// 		$('.twitter li').each(function(i){
	// 			$(this).addClass('callout col col-' + String.fromCharCode(97+i)).wrapInner('<p />').prepend($('<hr />'));
	// 		});
	// 	}else{
	// 		$('#twitter').hide();
	// 	}
	// }});
});
