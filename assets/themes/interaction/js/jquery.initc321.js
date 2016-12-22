/*
Interaction Theme
Resizing, interaction, animations
Copyright (c) CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
Ylab, http://www.ylab.nl
*/

//Query Cookie Plugin v1.3.1, https://github.com/carhartl/jquery-cookie
//Copyright 2013 Klaus Hartl, released under the MIT license
(function(d){"function"===typeof define&&define.amd?define(["jquery"],d):d(jQuery)})(function(d){function m(a){return a}function n(a){return decodeURIComponent(a.replace(j," "))}function k(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e.json?JSON.parse(a):a}catch(c){}}var j=/\+/g,e=d.cookie=function(a,c,b){if(void 0!==c){b=d.extend({},e.defaults,b);if("number"===typeof b.expires){var g=b.expires,f=b.expires=new Date;f.setDate(f.getDate()+g)}c=e.json?
JSON.stringify(c):String(c);return document.cookie=[e.raw?a:encodeURIComponent(a),"=",e.raw?c:encodeURIComponent(c),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}c=e.raw?m:n;b=document.cookie.split("; ");for(var g=a?void 0:{},f=0,j=b.length;f<j;f++){var h=b[f].split("="),l=c(h.shift()),h=c(h.join("="));if(a&&a===l){g=k(h);break}a||(g[l]=k(h))}return g};e.defaults={};d.removeCookie=function(a,c){return void 0!==
d.cookie(a)?(d.cookie(a,"",d.extend({},c,{expires:-1})),!0):!1}});

//countdown plugin
(function(f){jQuery.fn.countdown=function(){var e=function(b,a,c,d){return b?'<span class="'+d+'"><b>'+a+"</b> "+(1==a?c:d)+"</span>":""};this.each(function(){$this=f(this);var b=new Date($this.attr("datetime")),a=new Date,a=(b.getTime()-a.getTime())/864E5;if(0<a){var b=Math.floor(a),c=24*(a-b),a=Math.floor(c),d=60*(c-a),c=Math.floor(d),d=Math.floor(60*(d-c));$this.html(e(0<b,b,"day","days")+e(0<b||0<a,a,"hour","hours")+e(0<b||0<a||0<c,c,"minute","minutes")+e(0<b||0<a||0<c||0<d,d,"second","seconds"))}});
return this}})(jQuery);

var aMonthsFull = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function convertTime(sTimeAttr){
	if(sTimeAttr){
		var aTimeAttr = /(\d{4})-([01]\d)-([0-3]\d)T?([0-2]\d)?:?([0-5]\d)?([+-][0-2]\d:[0-5]\d|Z)?/.exec(sTimeAttr);
		//aTimeAttr[3] = dd
		//aTimeAttr[4] = HH
		var dLocalTime = new Date(sTimeAttr);
		if(dLocalTime && aTimeAttr){
			var sConverted = '';
			var sLocalTime = dLocalTime.toTimeString();
			var aLocalTime = /(\d{2}:\d{2}):\d{2}\s?(.+)?/.exec(sLocalTime);
			//aLocalTime[1] = HH:mm
			//aLocalTime[2] = Time zone

			if(aLocalTime && aLocalTime.length == 3 && dLocalTime.getHours() != aTimeAttr[4]){
				//there's a time difference
				if(dLocalTime.getDate() != aTimeAttr[3]){
					//local time implies different day
					sConverted = aMonthsFull[dLocalTime.getMonth()] + ' ' + dLocalTime.getDate() + ', ';
				}
				//local time plus time zone offset
				sConverted += aLocalTime[1] + ' ' + aLocalTime[2];
			}
			return sConverted;
		}
	}
	return false;
}

function numberWithCommas(x){
	//format number with thousand seperator
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function ragadjust(s, method){
	//adjust the rag
	// based on https://github.com/nathanford/ragadjust
	if( document.querySelectorAll ){
		var eles = document.querySelectorAll(s),
				elescount = eles.length;

		while(elescount-- > 0){
			var preps = /(\s|^|>)((aboard|about|above|across|after|against|along|amid|among|anti|around|as|at|before|behind|below|beneath|beside|besides|between|beyond|but|by|concerning|considering|despite|down|during|except|excepting|excluding|following|for|from|in|inside|into|like|minus|near|of|off|on|onto|opposite|outside|over|past|per|plus|regarding|round|save|since|than|through|to|toward|towards|under|underneath|unlike|until|up|upon|versus|via|with|within|without|-|–|—|&mdash;|&ndash)?\s)+/gi,
					smallwords = /(\s|^)(([a-zA-Z-_(]{1,2}('|’)*[a-zA-Z-_,;]?\s)+)/gi, // words with 3 or less characters
					emphasis = /(<(strong|em|b|i)>)(([^\s]+\s*){2,3})?(<\/(strong|em|b|i)>)/gi,
					ele = eles[elescount],
					elehtml = ele.innerHTML;

			if( /\bsmall-words\b|\ball\b/i.test(method) )
				// replace small words
				elehtml = elehtml.replace(smallwords, function(contents, p1, p2){
					return p1 + p2.replace(/\s/g, '&nbsp;');
				});

			if( /\bprepositions\b|\ball\b/i.test(method) )
				// replace prepositions (greater than 3 characters)
				elehtml = elehtml.replace(preps, function(contents, p1, p2){
					return p1 + p2.replace(/\s/gi, '&nbsp;');
				});

			if( /\bemphasis\b|\ball\b/i.test(method) )
				// emphasized text
				elehtml = elehtml.replace(emphasis, function(contents, p1, p2, p3, p4, p5){
					return p1 + p3.replace(/\s/gi, '&nbsp;') + p5;
				});

			ele.innerHTML = elehtml;
		}
	}
}

jQuery(function($){
	var iCanvasS = 480;/*in px, equals media query min-width:480px*/
	var iCanvasM = 700;/*in px, equals media query min-width:700px*/
	var sMargin = '198px';//22%
	var $colgroupWithSubmenu = $('.colgroup:has(.secondary)');
	var iAvgMenuWidth=0, nMenus = 0;
	var iCanvasWith;

	function toggleMainMenu(event){
		if( $('.primary li').css('display') != 'inline-block' ){
			//drop down
			$parent = $(this).parent();
			//if(this.pathname == location.pathname.substring(location.pathname.length - this.pathname.length)){
			if( $parent.hasClass('current_page_item') ||  $parent.hasClass('current-page-ancestor') || $parent.hasClass('current-menu-item') ){
				//current menu
				event.preventDefault();
				$('.primary li').not($parent).slideToggle();
			}
		}
	}

	function toggleSubMenu(event){
		if($(this).hasClass('interactive')){
			var t = 400;
			if($(this).hasClass('open')){
				$colgroupWithSubmenu.animate({marginLeft:0,marginRight:0}, t);
			}else{
				if($('html').width() <= iCanvasM){
					$colgroupWithSubmenu.animate({marginLeft:sMargin,marginRight:'-'+sMargin}, t);
				}
			}
			$(this).toggleClass('open');
		}
	}

	function sumMenuWidth(){
		var iAvgMenuWidth = 0;
		$('.primary li a').each(function(){
			iAvgMenuWidth += parseInt( $(this).css('width') );
		})
		return iAvgMenuWidth;
	}

	//bike animation
	function bike($bike){
		var sStartPos = $bike.css('right');
		var iWidth = parseInt( $bike.parent().width() );
		var t = 8 * iWidth;
		var f = parseInt( sStartPos ) / iWidth;
		//ltr : rtl
		var sTargetPos = f > 0.5 ? '-60px' : (iWidth+32) + 'px';
		var sResetPos  = f > 0.5 ? (iWidth+32) + 'px' : '-32px';

		$bike.not(':animated').animate({right:sTargetPos,opacity:0.1}, Math.max(f, 1 - f) * t , function(){
			$bike.css({right:sResetPos}).animate({right:sStartPos,opacity:1}, Math.min(f, 1 - f) * t);
		});
	}

	$(window).load(function() {
		$(window).resize();
	});

	//fix, WP doesn't add ancestor class for custom menu items
	$('.blog a[href="/blog/"], .ixdconf-program a[href="/program/"]').parent().addClass('current-page-ancestor');
	if( $('.primary li.current-menu-item,.primary li.current_page_item,.primary li.current-page-ancestor').length == 0){
		//no active main menu item, make first one active
		$('.primary li:first').addClass('current-menu-item');
	}

	//prepare resize videos, maintaing aspect ratio
	var $videos = $("iframe[src*='vimeo'], iframe[src*='youtu'], object, embed").each(function(){
		$(this)
			.attr('data-aspectRatio', this.height / this.width)
			.height(Math.min(646, $this.width()) * this.height / this.width)
			.removeAttr('height')
			.removeAttr('width')
			.css({width:'100%'})
			;
	});


	//assign events
	$('.primary a').on('click', toggleMainMenu);
	$('.secondary h2').on('click', toggleSubMenu);
	//increase click area
	$('article h1').on('click', function(){
		$('.secondary h2').click();
	});

	//adjustments after resizing window -----------------------------------
	$(window).resize(function(){
		var iFontSize, iPadding;
		iCanvasWith = $('html').width();

		//adapt padding to available width
		if(iCanvasWith > iCanvasS){
			iFontSize = parseInt( $('.primary li').css('fontSize') );
			nMenus = nMenus || $('.primary li a').length;
			iAvgMenuWidth = iAvgMenuWidth || (sumMenuWidth() / iFontSize);

			iPadding = Math.floor( ($('.primary ul').width() - (iAvgMenuWidth * iFontSize) ) / nMenus / 2) - 1;
			if(iPadding < 5){
				iPadding = 20;
			}
			$('.primary li a').css({paddingLeft: iPadding+'px', paddingRight: iPadding+'px'});
			$('.primary li a:last').css({paddingRight: 0});
		}

		//sub menu
		if($('.secondary h2').hasClass('open')){
			if(iCanvasWith <= iCanvasM){
				$colgroupWithSubmenu.css({marginLeft:sMargin,marginRight:'-'+sMargin});
			}
		}
		if(iCanvasWith <= iCanvasM){
			$('.secondary h2').addClass('interactive');
			$('header div.colgroup').height( Math.floor($('h1.site-title').width()/432*96 + 140) );
		}else{
			$('header div.colgroup').height(236);
			$('.secondary h2').removeClass('open interactive');
			$colgroupWithSubmenu.css({marginLeft:'auto',marginRight:'auto'});
		}

		//resize videos, maintain aspect ratio
		$videos.each(function(){
			var $this = $(this);
			$this.height($this.width() * $this.attr('data-aspectRatio'));
		});

		$('.keynote').css({minHeight: 0, height:'auto'});
		if(iCanvasWith > iCanvasS){
			//two column layout
			//make keynotes the same height
			var tmpH=0;
			$('.keynote').each(function(i){
				tmpH = Math.max($(this).height(), tmpH);
			});
			$('.keynote').css({minHeight: tmpH + 'px', height: tmpH + 'px'});
		}

		if(iCanvasWith > iCanvasS && iCanvasWith <= iCanvasM){
			//two column layout
			//make even callouts the same height as its predecessor
			$('.callout:even').each(function(i){
				var $this = $(this);
				var $next = $this.next();
				$next.css({minHeight: $this.css('height')});
			});
		}else{
			$('.callout:odd').css({minHeight: 0});
		}

		//make footer stick to bottom if the page is too short
		var $footer = $('footer');
		var iHeightSlack = Math.max(24, $(window).height() - document.body.scrollHeight + parseInt($footer.css('marginTop')));
		$footer.css({marginTop: iHeightSlack + 'px'});

	});//END RESIZE

	$(window).scroll(function(){
		//start animation when bottom of document has been reached
		if($(window).scrollTop() == 0){
			bike($('header .bike'));
		}
		if($(window).scrollTop() == $(document).height()-$(window).height()){
			bike($('footer .bike'));
		}
	});

	//table with contact details
	var hAdresses = 120;
	//copy list to header
	$('.service .col-cd').load('/api/addresses.inc.html', function(){
		hAdresses = $('.service .addresses').hide().height();
	});

	//toggle contact panel
	$('#contact').click(function(event){
		var h = $(this).hasClass('down') ? 4 : 24 +hAdresses;
		event.preventDefault();
		$('.service .addresses').fadeToggle('slow');
		$('.service').animate({height:h}, 'fast', function(){
			$('#contact').toggleClass('down');
		});
	});

	//validate newsletter subscription form
	$('#mcsubscribe').submit(function(event){
		var rTest = new RegExp('^[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+$');

		if( !rTest.test(this.EMAIL.value) ){
			event.preventDefault();
			alert('Please enter a valid email address.');
			this.EMAIL.focus();
		}
	});

	//validate search form
	$('.searchform,.search-form').submit(function(event){
		if( !this.s.value ){
			event.preventDefault();
			$(this.s).focus();
		}
	});

	//times
	//<time datetime="2013-09-01T23:59-07:00" class="convert">
	$('time[datetime].convert').each(function(){
		var sTimeAttr, sTimeConverted, $this = $(this);
		if(sTimeAttr = $this.attr('datetime')){
			if(sTimeConverted = convertTime(sTimeAttr)){
				$this.html($this.html() + ' <span>(' + sTimeConverted + ')</span>')
			}
		}
	});

	if( $('time[datetime].countdown').length ){
		window.setInterval("$('time[datetime].countdown').countdown();", 1000);
	}

	//prices
	function displayRates(){
		var rRate, sCur = this.value, r = /[.\d]+/;
		if(sCur && oRates[sCur]){
			//a currency has been selected
			//make variables available in $.each
			rRate = oRates[sCur];
			//loop through rows
			$cellEuros.each(function(){
				var iPrice, $this = $(this);
				var aMatches = r.exec($this.html());//remove non digits
				if(aMatches != null) {
					//calculate price in reference currency, round on 10
					iPrice = 10 * Math.round( aMatches[0] * rRate / 10 );
					//update cell content
					$this.next().html('&plusmn; ' + numberWithCommas(iPrice) + ' <small>' + sCur + '</small>');
				}
			});
		}else{
			//reset
			$('td:nth-of-type(3)', $('tr', $aPriceTables)).html('');
		}
		//store in cookie
		$.cookie('ref_currency', sCur, {path: '/'});
		$('.currency').val(sCur);
	}

	var oRates = {}, $cellEuros;
	var $aPriceTables = $('table.prices');
	if($aPriceTables.length){
		$.getJSON('/api/xchange/', function(data){
			var oCurrencies = {AUD: 'Australian dollar', BRL: 'Brasilian real', CAD: 'Canadian dollar', CHF: 'Swiss franc', DKK: 'Danish krone', EUR: 'Euro', GBP: 'Pound sterling', NOK: 'Norwegian krone', SEK: 'Swedish krona', USD: 'US dollar'};
			var sRefCurrency = $.cookie('ref_currency');
			$aPriceTables.each(function(i){
				$tablePrices = $(this);
				//add column
				$('td:last', $('tr', $tablePrices)).before('<td class="converted"></td>');
				//make response available outside this function
				oRates = data;
				var $select = $('<select class="currency" id="currency-' + i + '"><option /></select>');
				$.each(data, function(sKey, rVal){
					$select.append($('<option value="' + sKey + '">' + (oCurrencies[sKey] || sKey) + '</option>'));
				});
				//attach event
				$select.change(displayRates);
				//add control
				var $div = $('<div class="currency-converter"></div>').append( $('<label for="currency-' + i + '">Reference currency</label>') ).append('&nbsp;').append($select);
				$tablePrices.before($div);
			});
			$cellEuros = $('td:nth(1)', $('tr', $aPriceTables));
			//preselect currency from cookie
			if(sRefCurrency && oCurrencies[sRefCurrency]){
				$('#currency-0').val(sRefCurrency).change();
			}
		});
	}

	//soldout
	$pSoldout = $('p.soldout').has('img');
	if($pSoldout.length){
		$pSoldout.append('<img src="/assets/themes/interaction/img/soldout.png" width="96" height="56" alt="Sold out" class="soldoutbadge" />');
	}

	//emphasize category in submenu
	$('body.single .secondary li').each(function(){
		var aMatches = this.className.match(/cat-item-\d+/ig);
		if( aMatches.length && $('body').hasClass(aMatches[0]) ){
			$(this).addClass('current-cat');
		}
	});

	ragadjust('.blog article p, .blog article li', 'small-words,prepositions');
});
