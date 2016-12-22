/*
Interaction Theme
Google maps
Copyright (c) CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
Ylab, http://www.ylab.nl
*/
function ixdconf_map_symbol(sColor, iSize){
	iSize = iSize || 10;
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillOpacity: 1,
		strokeWeight: 1,
		scale: iSize,
		fillColor: sColor,
		strokeColor: '#515e66'
	 };
}

function ixdconf_initializeMap(el) {
	var $map = $(el);
	var oIcons = {hotel: ixdconf_map_symbol('#55c4c4'), venue: ixdconf_map_symbol('#f26639'), busstop: ixdconf_map_symbol('#ffe168', 8), neighboorhood: ixdconf_map_symbol('#689494'), misc: ixdconf_map_symbol('#687e95', 8)};
	var latlngAmster = new google.maps.LatLng(52.37800, 4.88500);
	var latlngHilver = new google.maps.LatLng(52.22369, 5.17638);

	var latlngDamrak = new google.maps.LatLng(52.37549, 4.89586);
	var latlngInntel = new google.maps.LatLng(52.37622, 4.894468);
	var latlngDouble = new google.maps.LatLng(52.37673, 4.90447);
	var latlngRennai = new google.maps.LatLng(52.37810, 4.89426);
	var latlngWGFgas = new google.maps.LatLng(52.38641, 4.86970);
	var latlngHKUhil = new google.maps.LatLng(52.21905, 5.19083);
	var latlngBusPHK = new google.maps.LatLng(52.37817, 4.89792);
	var latlngBusVHS = new google.maps.LatLng(52.38538, 4.86864);
	var latlngBusLVS = new google.maps.LatLng(52.38417, 4.86990);

	var mapOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		panControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		}
	};

	if( $map.hasClass('hku') ){
		mapOptions.center = latlngHilver;
		mapOptions.zoom = 14;
	}else if( $map.hasClass('ams') ){
		mapOptions.center = new google.maps.LatLng(52.3716, 4.88500);
		mapOptions.zoom = 14;
	}else if( $map.hasClass('soc') ){
		mapOptions.center = latlngBusPHK;
		mapOptions.zoom = 13;
	}else{
		mapOptions.center = latlngAmster;
		mapOptions.zoom = 13;
	}

	$map.map = new google.maps.Map(el, mapOptions);

	var oMarkers = {
		wgfgas: new google.maps.Marker({
			position: latlngWGFgas,
			map: $map.map,
			title: 'Westergasfabriek Amsterdam',
			address: 'Klönneplein 1, 1014 BE Amsterdam',
			icon: oIcons.venue
		}),
		hkuhil: new google.maps.Marker({
			position: latlngHKUhil,
			map: $map.map,
			title: 'HKU University of the Arts Utrecht',
			address: 'Oude Amersfoortseweg 131, 1212 AA Hilversum',
			icon: oIcons.venue
		}),
		inntel: new google.maps.Marker({
			position: latlngInntel,
			map: $map.map,
			title: 'Inntel Hotel',
			address: 'Nieuwezijds Kolk 19, 1012 PV Amsterdam',
			phone: '+31205301818',
			icon: oIcons.hotel
		}),
		double: new google.maps.Marker({
			position: latlngDouble,
			map: $map.map,
			title: 'DoubleTree Hotel',
			address: 'Oosterdoksstraat 4, 1011 DK Amsterdam',
			phone: '+31205300800',
			icon: oIcons.hotel
		}),
		rennai: new google.maps.Marker({
			position: latlngRennai,
			map: $map.map,
			title: 'Renaissance Hotel',
			address: 'Kattengat 1, 1012 SZ Amsterdam',
			phone: '+31206212223',
			icon: oIcons.hotel
		})/*,
		wildeman: new google.maps.Marker({
			position: new google.maps.LatLng(52.37619, 4.89509),
			map: $map.map,
			title: 'In de Wildeman - Interaction14 Meeting point',
			address: 'Kolksteeg 3, Amsterdam',
			icon: oIcons.misc
		})*/
	};
	if( $map.hasClass('wgf') ){
		oMarkers.busphk = new google.maps.Marker({
			position: latlngBusPHK,
			map: $map.map,
			title: 'Bus 21 stop CS Prins Hendrikplantsoen, Amsterdam',
			icon: oIcons.busstop
		}),
		oMarkers.busvhs = new google.maps.Marker({
			position: latlngBusVHS,
			map: $map.map,
			title: 'Bus 21 stop Van Hallstraat (Haarlemmerweg)',
			icon: oIcons.busstop
		}),
		oMarkers.buslvs = new google.maps.Marker({
			position: latlngBusLVS,
			map: $map.map,
			title: 'Tram 10 stop Van Hallstraat',
			icon: oIcons.busstop
		})
	}
	if( $map.hasClass('ams') ){
		oMarkers.jordaan = new google.maps.Marker({
			position: new google.maps.LatLng(52.38041, 4.88423),
			map: $map.map,
			title: 'Jordaan, Amsterdam',
			icon: oIcons.neighboorhood
		});
		oMarkers.hrlmmrstr = new google.maps.Marker({
			position: new google.maps.LatLng(52.38134, 4.88958),
			map: $map.map,
			title: 'Haarlemmerstraat, Amsterdam',
			icon: oIcons.neighboorhood
		});
		oMarkers.utrchtsstr = new google.maps.Marker({
			position: new google.maps.LatLng(52.36341, 4.89846),
			map: $map.map,
			title: 'Utrechtsestraat, Amsterdam',
			icon: oIcons.neighboorhood
		});
		oMarkers.wtrlpln = new google.maps.Marker({
			position: new google.maps.LatLng(52.36794, 4.90269),
			map: $map.map,
			title: 'Waterlooplein, Amsterdam',
			icon: oIcons.neighboorhood
		});
		oMarkers.albrtcp = new google.maps.Marker({
			position: new google.maps.LatLng(52.35555, 4.89335),
			map: $map.map,
			title: 'Albert Cuyp Markt, Amsterdam',
			icon: oIcons.neighboorhood
		});
		oMarkers.dpprmrkt = new google.maps.Marker({
			position: new google.maps.LatLng(52.36161, 4.92846),
			map: $map.map,
			title: 'Dappermarkt, Amsterdam',
			icon: oIcons.neighboorhood
		});
	}

	if( $map.hasClass('soc') ){
		oMarkers.soc1 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37722, 4.8875),
			map: $map.map,
			title: 'De Rode Hoed - SapientNitro UX Debate / Coroflot Connects',
			address: 'Keizersgracht 102, 1015 CV Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc2 = new google.maps.Marker({
			position: new google.maps.LatLng(52.36431, 4.89226),
			map: $map.map,
			title: 'De Bazel - Welcome Party',
			address: 'Vijzelstraat 32, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc3 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37154, 4.90039),
			map: $map.map,
			title: 'info.nl - Behavior Design AMS',
			address: 'Sint Antoniebreestraat 16, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc4 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37154, 4.90039),
			map: $map.map,
			title: 'Osudio - Amsterdam UX Cocktail Hours',
			address: 'De Ruyterkade 6h, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc5 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37109, 4.89357),
			map: $map.map,
			title: 'De Brakke Grond - This Happened NL',
			address: 'Nes 45, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc6 = new google.maps.Marker({
			position: new google.maps.LatLng(52.36148, 4.90149),
			map: $map.map,
			title: 'STEIM- Chi Cafe',
			address: 'Achtergracht 19, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc7 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37537, 4.92967),
			map: $map.map,
			title: 'Q42- Making Progress Screening',
			address: 'Oostelijke Handelskade 749, Amsterdam',
			icon: oIcons.misc
		});
		oMarkers.soc8 = new google.maps.Marker({
			position: new google.maps.LatLng(52.37154, 4.9149),
			map: $map.map,
			title: 'Scheepvaartmuseum - Interaction Awards Celebration',
			address: 'Kattenburgerplein 1, Amsterdam',
			icon: oIcons.misc
		});
	}

	$.each(oMarkers, function(key, oMarker){
		var nLines = 1;
		var sContent = oMarker.title;
		if(oMarker.address){
			nLines++;
			sContent += '<br />' + oMarker.address.replace(/\d{4} ?[A-Z]{2}/ig, '<span>$&</span>');
		}
		if(oMarker.phone){
			nLines++;
			sContent += '<br />Phone: <a href="tel:' + oMarker.phone + '">' + oMarker.phone + '</a>';
		}
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="infowindow lines' + nLines + '">' + sContent + '</div>'
		});
		google.maps.event.addListener(oMarker, 'click', function(){
			if($map.infowindow){
				$map.infowindow.close();
			}
			infowindow.open($map.map, oMarker);
			if(oMarker.icon != oIcons.venue){
				$map.infowindow = infowindow;
			}
		});
	});
}



jQuery(function($){
	google.maps.visualRefresh = true;
	//define height and width of container
	$('.map-canvas').css({width:'100%'}).each(function(){
		$map = $(this);
		$map.height($map.width()/1.61);
		ixdconf_initializeMap(this);
	});
	//add inset to hku map
	$('.map-canvas.hku').append($('<div></div>').css({
		width:'152px', height:'152px', position:'absolute', left: 0, bottom:0, zIndex: 99, background:'url(/img/map-hilversum.png)'
	}));
	if( $('.map-canvas').hasClass('hku') ){
		$('.map-canvas').after($('<div class="map-symbols"><span class="symbol venue">workshop and education summit venue</span></div>'));
	}else{
		$('.map-canvas').after($('<div class="map-symbols"><span class="symbol venue">conference venue</span><span class="symbol hotel">hotel</span></div>'));
	}
	if( $('.map-canvas').hasClass('wgf') ){
		$('.map-symbols').append($('<span class="symbol busstop">busstop</span>'));
	}
	if( $('.map-canvas').hasClass('ams') ){
		$('.map-symbols').append($('<span class="symbol neighboorhood">neighboorhood</span>'));
	}
	if( $('.map-canvas').hasClass('soc') ){
		$('.map-symbols').append($('<span class="symbol misc">social event</span>'));
	}
});
