/*
Interaction Theme
Scripts for Program
Copyright (c) CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
Ylab, http://www.ylab.nl
*/
var ixdconfStartdate = new Date(2014, 1, 5);//February 5, 2014

(function($){
	jQuery.fn.datetime = function(){
		if(this.attr('datetime')){
			return new Date(this.attr('datetime'));
		}
	}
})(jQuery);

jQuery(document).ready(function($){
	//make whole column clickable
	$('.programoverview .col').click(function(event){
		location = $('h2 a', this)[0];
	});
	$('.program .timeslot a').click(function(event){
		event.stopPropagation();
	});

	//event handling for sessions teasers
	$('.program .timeslot').has('.teaser').not('.social,.misc,.break').addClass('closed').click(function(event){
		$(this).toggleClass('open');
		$('.teaser', this).slideToggle();
		$('time', this).removeAttr('title');
	});
	$('.program .timeslot.closed time').attr('title', 'Show teaser');

	if( (new Date()).valueOf() > (ixdconfStartdate).valueOf() ){
		$('.program time').each(function(){
			var $this = $(this), dNow = new Date();
			var dSession = $this.datetime();
			dNow.setSeconds(0,0);
			if(dNow.valueOf() > dSession.valueOf()){
				//session in past
				$this.css({textDecoration:'line-through'});
			}
		});
	}

	//keyboard support for next and previous
	// add hint to title of prev/next links
	$('article a[rel="prev"]').each(function(){
		this.title = this.title || 'Previous';
		this.title = 'Press [Arrow Left] for ' + this.title;
	});
	$('article a[rel="next"]').each(function(){
		this.title = this.title || 'Next';
		this.title = 'Press [Arrow Right] for ' + this.title;
	});
	//event handling
	$(document).keydown(function(event){
		var sHref;
		if( $('input:focus').length == 0 ){
			//read urls from links
			switch(event.which){
				case 37:
					sHref = $('article a[rel="prev"]:last').attr('href');
					break;
				case 39:
					sHref = $('article a[rel="next"]:last').attr('href');
					break;
			}
			if(sHref){
				location = sHref;
				//visual feedback for keyboard navigation
				$('article').fadeTo('slow', 0.2);
			}
		}
	});
});