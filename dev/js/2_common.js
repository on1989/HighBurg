jQuery(document).ready(function($){

	$('.dropdown p').click(function(){
		$(this).next().slideToggle();
		$(this).toggleClass('icon-up');
	});
	//*******START ADD TAGS*******//
	$('.tags').each(function(){
		$(this).parent().addClass('focus')
	});
	$('.add-tag').click(function(){
		$('#add-tag').focus();
		$(this).addClass('focus');
	});
	$('#add-tag').focusout(function(){
		if($('.tags').children().length == 0){
			$('.add-tag').removeClass('focus');
		}
	});
	$('#add-tag').change(function(){
		var tagText = $(this).val(),
			tagContent = '<li>' + tagText + '<i class="icon-close"></i>,</li>',
			tagWrapper = '<ul class="tags"></ul>';
		if($(this).parents('.add-tag').find('.tags').length == 0){
			$(this).parents('.add-tag').append(tagWrapper);
			$(this).parents('.add-tag').find('.tags').append(tagContent);
			$(this).parents('.add-tag').addClass('focus');
		}else{
			$(this).parent().find('.tags').append(tagContent)
		}

		$(this).val('');
		$('.add-tag .icon-close').click(function(){
			$(this).parent().remove();
		});
	});
	$('.add-tag .icon-clear').click(function(){
		$(this).parent().remove();
	});
	$('#add-tag').focus(function(){
		$(this).val('');
	});
	//*******END ADD TAGS*******//
	//*******START FILTER CHECKBOX*******//
	$('.checkbox input[type=checkbox]').on('click', function () {
		var group = $(this).parents('.dropdown');
		var input = group.find('.checkbox [type="checkbox"]');
		var inputTotal = input.length;
		var inputCheckTotal = group.find('.checkbox [type="checkbox"]:checked').length;
		if (inputTotal == inputCheckTotal) {
			$(this).parents('.dropdown').find('[id*="all-"]').prop("indeterminate", false)
			$(this).parents('.dropdown').find('[id*="all-"]').prop('checked', true);
		} else if (inputCheckTotal > 0) {
			$(this).parents('.dropdown').find('[id*="all-"]').prop("indeterminate", true)
		} else if (inputCheckTotal == 0) {
			$(this).parents('.dropdown').find('[id*="all-"]').prop("indeterminate", false)
			$(this).parents('.dropdown').find('[id*="all-"]').prop('checked', false);
		}

	});


	$('.checkbox [id*="all-"]').on('click', function () {
		if (this.checked) {
			$(this).parents('.dropdown').find('.checkbox [type="checkbox"]').each(function () {
				this.checked = true;
			});
		} else {
			$(this).parents('.dropdown').find('.checkbox [type="checkbox"]').each(function () {
				this.checked = false;
			});
		}
	});
	//*******END FILTER CHECKBOX*******//

	//*******START SHARE ICON CHECKBOX*******//
	$('.share .icon-share').click(function(){
		if($(this).next().hasClass('open')){
			$(this).next().removeClass('open');
		}else{
			$(this).next().addClass('open');
		}
	});
	//*******END SHARE ICON  CHECKBOX*******//
	$('.burger').click(function(){
		$(this).toggleClass('close');
		$(this).next().slideToggle();
		$('body').toggleClass('modal-open');
	});
	$('.icon-search').click(function(e){
		if($(this).parents('.search').hasClass('open')){
			$(this).parents('.search').removeClass('open');
		}else{
			e.preventDefault();
			$(this).parents('.search').addClass('open');
		}
	});
	$(document).mouseup(function (e)  {
		var folder = $('.search');
		if (!folder.is(e.target) && folder.has(e.target).length === 0) {
			folder.removeClass('open');
		}
		var menu = $('.burger, #quadmenu');
		if (!menu.is(e.target) && menu.has(e.target).length === 0) {
			$('body').removeClass('modal-open');
			$('.burger').removeClass('close');
			$('#quadmenu').slideUp();
		}
		var submenu = $('.user');
		if (!submenu.is(e.target) && submenu.has(e.target).length === 0) {
			submenu.find('.submenu').removeClass('open');
		}
	});
	$('.user .icon-user').click(function(){
		if($(this).next().hasClass('open')){
			$(this).next().removeClass('open');
		}else{
			$(this).next().addClass('open');
		}
	});
	if($('.strains').length){
		$('.strains .items').slick({
			slidesToShow: 2,
			centerMode: true,
			settings: "unslick",
			responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						variableWidth: true
					}
			}]
		});
		if($(window).width() > 767){
			$('.strains .items.slick-initialized').slick("unslick");

		}
	}
	if($('.strains-items').length){
		$('.strains-items').slick({
			slidesToShow: 2,
			centerMode: true,
			settings: "unslick",
			responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						variableWidth: true
					}
			}]
		});
		if($(window).width() > 767){
			$('.strains-items.slick-initialized').slick("unslick");

		}
	}
	if($('.posts .items').length){
		$('.posts .items').slick({
			centerMode: true,
			slidesToShow: 3,
			nextArrow:'.icon-right',
			prevArrow:'.icon-left',
			responsive: [{
					breakpoint: 1920,
					settings: {
						slidesToShow: 3,
					}
			},{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						centerMode: false,
						variableWidth: false,
						adaptiveHeight: true,
					}
			}]
		});
	}

	$('.ugc textarea, .ugc .input input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .form-report input, .form-report textarea, .comment-form-author input, .comment-form-email input, .sign-up-form input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .log-in input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .forgot-pass input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"])').focus(function(){
		$(this).parent().addClass('focus');
	});
	$('.ugc textarea,.ugc .input input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .form-report input, .form-report textarea, .comment-form-author input, .comment-form-email input, .sign-up-form input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .log-in input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .forgot-pass input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"])').blur(function(){
		if($(this).val() == 0){
			$(this).parent().removeClass('focus');
		}
	});
	$('.ugc textarea,.ugc .input input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .form-report input, .form-report textarea, .comment-form-author input, .comment-form-email input, .sign-up-form input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .log-in input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), .forgot-pass input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"])').each(function(){
		if($(this).val() < 1){
			$(this).parent().removeClass('focus');
		}else{
			$(this).parent().addClass('focus');
		}
	});
	$('.report').click(function(e){
		e.preventDefault()
		if($('.form-report').hasClass('open')){
			$('.form-report').slideUp();
			$('.form-report').removeClass('open')
		}else{
			$('.form-report').slideDown();
			$('.form-report').addClass('open')
		}
	});
	$('[href="#about"]').click(function (e) {
		e.preventDefault();
		setTimeout(function(){
			if($('.about-slider.slick-initialized').length == 0){
				$('.about-slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.about-slider-nav',
					responsive: [
					{
						breakpoint: 768,
						settings: {
							fade: false,
							focusOnSelect: true,
							centerMode: true,
							centerPadding: '50px',
						}
					}]
				});
				$('.about-slider-nav').slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.about-slider',
					dots: true,
					focusOnSelect: true,
					nextArrow:'<i class="icon-right"></i>',
					prevArrow:'<i class="icon-left"></i>',
					responsive: [
					{
						breakpoint: 767,
						settings: "unslick"
					}]
				});
			}
		},100)
	});
	if($('div.more, p.more').length){
		var ellipsestext = "...",
			moretext = "Read More",
			lesstext = "Show less";
		$('.more').each(function() {
			var showChar = $(this).data('more');
			var content = $(this).html();
			if(content.length > +showChar) {
				var c = content.substr(0, showChar);
				var h = content.substr(showChar, content.length - showChar);
				var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="#" class="read-more"> ' + moretext + '</a></span>';
				$(this).html(html);
				$(".read-more").click(function(e){
					e.preventDefault();
					if($(this).hasClass("less")) {
						$(this).removeClass("less");
						$(this).html(moretext);
						$(this).parents('.text').removeClass('show');
					} else {
						$(this).addClass("less");
						$(this).html(lesstext);
						$(this).parents('.text').addClass('show');
					}
					$(this).parent().prev().toggle();
					$(this).prev().toggle();
					return false;
				});
			}

		});
	}
	if($('.filters').length){
		$('[type="checkbox"]').click(function(){
			var idEl = $(this).attr('id'),
				nameEl = idEl.slice(0, idEl.indexOf('-'));
				if($(this).hasClass('checked')){
					$('[id*="'+ nameEl +'"]').prop('checked', false).removeClass('checked')
				}else{
					$('[id*="'+ nameEl +'"]').prop('checked', true).addClass('checked')
				}
		});
	}
//	if($(this).prop('checked') === true){
//		$('body').addClass('dark');
//		$(this).next().removeClass().addClass('icon-sun');
//		$('header .col-lg-12 > .logo > img').attr('src', 'img/logo-white.svg')
//	}else{
//		$('body').removeClass('dark');
//		$(this).next().removeClass().addClass('icon-moon');
//		$('header .col-lg-12 > .logo > img').attr('src', 'img/logo.svg')
//	}
//	$('#black-color').click(function(){
//		if($(this).prop('checked') === true){
//			$('body').addClass('dark');
//			$(this).next().removeClass().addClass('icon-sun');
//			$('header .col-lg-12 > .logo > img').attr('src', 'img/logo-white.svg')
//		}else{
//			$('body').removeClass('dark');
//			$(this).next().removeClass().addClass('icon-moon');
//			$('header .col-lg-12 > .logo > img').attr('src', 'img/logo.svg')
//		}
//	});
})
