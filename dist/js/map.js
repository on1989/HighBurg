/*MAP*/
CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
	this.setValues(opts);
};
CustomMarker.prototype.draw = function () {

	var self = this,
		div = this.div;
	if (!div) {
		div = this.div = $('' + '<div class="marker-map ' + self.markerClass + '">' + '<div class="shadow"></div>' + '<div class="pulse" ></div>' + '<div class="pin-wrap">' + '<div class="pin"></div>' + '</div>' + '</div>' + '')[0];
		this.pinWrap = this.div.getElementsByClassName('pin-wrap');
		this.pin = this.div.getElementsByClassName('pin');
		this.pinShadow = this.div.getElementsByClassName('shadow');
		div.style.position = 'absolute';
		div.style.cursor = 'pointer';
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
		//		google.maps.event.addDomListener(div, "click", function (event) {
		//			google.maps.event.trigger(self, "click", event);
		//		});
	};
	var point = this.getProjection().fromLatLngToDivPixel(this.position);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}
};
CustomMarker.prototype.animateDrop = function () {
	dynamics.stop(this.pinWrap);
	dynamics.css(this.pinWrap, {
		'transform': 'scaleY(2) translateY(-' + $('#map').outerHeight() + 'px)',
		'opacity': '1'
	});
	dynamics.animate(this.pinWrap, {
		translateY: 0,
		scaleY: 1.0
	}, {
		type: dynamics.gravity,
		duration: 1800
	});
	dynamics.stop(this.pin);
	dynamics.css(this.pin, {
		'transform': 'none'
	});
	dynamics.animate(this.pin, {
		scaleY: 0.8
	}, {
		type: dynamics.bounce,
		duration: 1800,
		bounciness: 600
	});
	dynamics.stop(this.pinShadow);
	dynamics.css(this.pinShadow, {
		'transform': 'scale(0,0)'
	});
	dynamics.animate(this.pinShadow, {
		scale: 1
	}, {
		type: dynamics.gravity,
		duration: 1800
	});
};
CustomMarker.prototype.animateBounce = function () {
	dynamics.stop(this.pinWrap);
	dynamics.css(this.pinWrap, {
		'transform': 'none'
	});
	dynamics.animate(this.pinWrap, {
		translateY: -30
	}, {
		type: dynamics.forceWithGravity,
		bounciness: 0,
		duration: 500,
		delay: 150
	});
	dynamics.stop(this.pin);
	dynamics.css(this.pin, {
		'transform': 'none'
	});
	dynamics.animate(this.pin, {
		scaleY: 0.8
	}, {
		type: dynamics.bounce,
		duration: 800,
		bounciness: 0
	});
	dynamics.animate(this.pin, {
		scaleY: 0.8
	}, {
		type: dynamics.bounce,
		duration: 800,
		bounciness: 600,
		delay: 650
	});
	dynamics.stop(this.pinShadow);
	dynamics.css(this.pinShadow, {
		'transform': 'none'
	});
	dynamics.animate(this.pinShadow, {
		scale: 0.6
	}, {
		type: dynamics.forceWithGravity,
		bounciness: 0,
		duration: 500,
		delay: 150
	});
};
CustomMarker.prototype.animateWobble = function () {
	dynamics.stop(this.pinWrap);
	dynamics.css(this.pinWrap, {
		'transform': 'none'
	});
	dynamics.animate(this.pinWrap, {
		rotateZ: -45
	}, {
		type: dynamics.bounce,
		duration: 1800
	});
	dynamics.stop(this.pin);
	dynamics.css(this.pin, {
		'transform': 'none'
	});
	dynamics.animate(this.pin, {
		scaleX: 0.8
	}, {
		type: dynamics.bounce,
		duration: 800,
		bounciness: 1800
	});
};
$(function () {
	var mapLat = $('#map').data('lat'),
		mapLng = $('#map').data('lng');
	var pos = new google.maps.LatLng(mapLat, mapLng);
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: pos,
	});
	var markers = [];
	allMarkers()
	function allMarkers(){
		$('.results-body .item, .dispensary .item').each(function () {
			var mapLat = $(this).data('lat'),
				mapLng = $(this).data('lng'),
				mapType = $(this).data('type');
			markers.push({
				position: new google.maps.LatLng(mapLat, mapLng),
				map: map,
				markerClass: mapType,
			});
		});
	}
	markersEl();
	function markersEl(){
		markers.forEach(function (el, i) {
			var marker = new CustomMarker(el);
		});

	}
	$('.results-body .item').click(function (el, i) {
		$(this).parents('.results-block').hide();
		$(this).parents('.results').find('.results-dispensaries').show();
		$('.marker-map').remove();
		markers = [];
		mapLat = $(this).data('lat');
		mapLng = $(this).data('lng');
		var mapType = $(this).data('type');
		map.setCenter({lat:+mapLat,lng:+mapLng});
		map.setZoom(15);
		markers.push({
			position: new google.maps.LatLng(mapLat, mapLng),
			map: map,
			markerClass: mapType,
		});
		markersEl()
	});
	$('.results-block .results-head').click(function(){
		$(this).parents('.results').toggleClass('open')
	})
	$('.results .back').click(function(e){
		e.preventDefault()
		markers = [];
		$('.marker-map').remove();
		$(this).parents('.results-dispensaries').hide();
		$(this).parents('.results').find('.results-block').show();;
		allMarkers()
		markersEl()
	});


	$(document).mouseup(function (e)  {
		var folder = $('.select');
		if (!folder.is(e.target) && folder.has(e.target).length === 0) {
			folder.find('.select-options').slideUp();
		}
	});
	$('.sort-filter > a').click(function(){
		$(this).parent().toggleClass('open')
		$(this).next().slideToggle();
	})
	if($(window).width() < 992){
		if($('.results').length){
			$('body').css('margin-bottom', '58px');
		}
	}
	if($(window).width() < 768){
		$('.select p').click(function(){
			$(this).parent().find('.mobile').slideToggle();
		})
	}else{
		$('.select p').click(function(){
			$(this).next().slideToggle();
		});
	}
});
