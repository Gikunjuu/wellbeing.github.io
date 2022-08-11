(function ($) {

"use strict";


function adjustStickyFooter() {
	var footerHeight = $('.footer-wrapper').outerHeight();
	$('body').css('margin-bottom', footerHeight + 'px');
	$('#footer').css('height', footerHeight + 'px');
}


function adjustHtmlMinHeight() {
	if($('body').hasClass('admin-bar')) {
		$('html').css('min-height', $(window).height() - $('#wpadminbar').height() + 'px');
	}
}


function adjustAdminBarPositioning() {
	if ($(window).width() <= 600) {
		$('#wpadminbar').css('position','fixed');
	}
}


function searchPopupController() {
	$('.search-popup-opener').on('click', function(e) {
		e.preventDefault();
		$('.search-popup').addClass('shown');
		$('.mauer-guild-to-blur, #footer').addClass('mauer-guild-blur-filter');
		setTimeout(function(){
			$('.search-popup #s').focus();
		}, 200); // needs to be greater than the animation duration
	});

	$('.search-popup-closer').on('click', function(e) {
		e.preventDefault();
		$('.search-popup').removeClass('shown');
		$('.mauer-guild-to-blur, #footer').removeClass('mauer-guild-blur-filter');
	});

	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$('.search-popup').removeClass('shown');
			$('.mauer-guild-to-blur, #footer').removeClass('mauer-guild-blur-filter');
		}
	});
}


function adjustSearchPopupOffset() {
	if($('body').hasClass('admin-bar')) {
		$('.search-popup').css('top', $('#wpadminbar').height() + 'px');
	}
}


function commentFormHighlightNextBorder() {

	$('.comment-respond p.comment-form-author input')
		.mouseenter(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (!urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.addClass(('mouse-in-the-preceding-input'));}
		})
		.mouseleave(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.removeClass(('mouse-in-the-preceding-input'));}
		})
		.focus(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (!urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.addClass(('focus-on-the-preceding-input'));}
		})
		.focusout(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.removeClass(('focus-on-the-preceding-input'));}
		});

	$('.comment-respond p.comment-form-email input')
		.mouseenter(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (!urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.addClass(('mouse-in-the-preceding-input'));}
		})
		.mouseleave(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.removeClass(('mouse-in-the-preceding-input'));}
		})
		.focus(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (!urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.addClass(('focus-on-the-preceding-input'));}
		})
		.focusout(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.removeClass(('focus-on-the-preceding-input'));}
		});

}


function adjustEmbeddediFrameDimensions() {
	// preserve aspect ratio of all iframes that have width and height attributes set.
	$("iframe").each(function(i){
		if ( $.isNumeric($(this).attr("width")) && $.isNumeric($(this).attr("height")) ) {
			var aspectRatio = $(this).attr("width") / $(this).attr("height");
			$(this).height( $(this).width() / aspectRatio );
		}
	});
}


function detectMenuStripeWrap() {
	var widthOfLeftPartElems = $('#menu-partition-left').outerWidth() + $('.mauer-guild-header-leftmost-part').outerWidth();
	var widthOfRightPartElems = $('#menu-partition-right').outerWidth() + $('.mauer-guild-header-rightmost-part').outerWidth();
	var lateralPartWidth = Math.max(widthOfLeftPartElems, widthOfRightPartElems);
	var centralPartWidth = $('.site-logo').outerWidth();

	if ( lateralPartWidth * 2 + centralPartWidth > $('.mauer-guild-header-wrapper').width() && $(window).width() >= 992 ) {
		$('.mauer-guild-header-wrapper').addClass('content-would-not-fit-in-one-line');
	} else {
		$('.mauer-guild-header-wrapper').removeClass('content-would-not-fit-in-one-line');
	}
}


function adjustWidths() {
	if ($('.alignwide-width-reference').length) {
		$('.entry-full .alignwide, .entry-full .mauer-guild-pswp-gallery, .entry-full .mauer-guild-wp-embed-wrapper').each(function(){

			var targetElement = $(this);

			if ($(this).hasClass('mauer-guild-wp-embed-wrapper') && $(this).closest('.wp-block-embed').length) {
				targetElement = $(this).closest('.wp-block-embed'); // This means we're dealing with a Gutenberg embed
			}

			var sideMargin = ($('.standard-width-reference').width() - $('.alignwide-width-reference').width()) / 4;
			targetElement.css('margin-left', sideMargin + 'px').css('margin-right', sideMargin + 'px');

		});
		if (typeof adjustImagesInGalleries === 'function') {
			adjustImagesInGalleries();
		}
		adjustEmbeddediFrameDimensions();
	}
}


function registerWcWidgetContentHeight() {
	$('.mauer-guild-woocommerce-widget-content-wrapper').each(function(){
		$(this).height($(this).prop('scrollHeight'));
	});
}


function toggleWcWidgetContentClass() {
	$('.mauer-guild-woocommerce-widget-title-wrapper').on('click', function(){
		if ($(window).width() < 992) {
			$(this).closest('.mauer-guild-woocommerce-widget').siblings('.mauer-guild-woocommerce-widget').addClass('mauer-guild-woocommerce-widget-collapsed-on-mobile');
			$(this).closest('.mauer-guild-woocommerce-widget').toggleClass('mauer-guild-woocommerce-widget-collapsed-on-mobile');
		}
	});
}


// Inspired by Justin Hileman's snippet, http://justinhileman.info/article/a-jquery-widont-snippet/
function noOrphans() {
	var run = function(selector) {
		$(selector).each(function() {
			$(this).html($(this).html().replace(/\s([^\s<]{0,8})\s*$/,'<span class="hide-below-500"> </span><span class="show-above-500">&nbsp;</span>$1'));
		});
	}
	// running these separately as intersecting selectors like 'h1, h1 a' would not work on a single run.
	run('h1:not(.text-logo), h2, h3, h4, h5, h6');
	run('.entry-title a');
	run('.entry-excerpt p');
}




function initiateLoadingOfLazyImages() {
	$('img.mauer-lazy-img').each(function(i,el){
		$(el).attr('src', $(el).data('mauerSrc'));
		$(el).attr('srcset', $(el).data('mauerSrcset'));
		$(el).attr('sizes', $(el).data('mauerSizes'));
		setTimeout(function(){
			$(el).imagesLoaded( function() {
				if ($(el).hasClass('mauer-lazy-img')) {
					$(el).addClass('mauer-lazy-img-loaded');
				}
			});
		}, 68);
	});
}






$('body').on('DOMSubtreeModified', '.mauer-guild-woocommerce-widget-content-wrapper', function(){
	registerWcWidgetContentHeight();
});


$(document).ready(function() {
	adjustHtmlMinHeight();
	adjustSearchPopupOffset();
	searchPopupController();
	setTimeout(adjustStickyFooter, 100);
	commentFormHighlightNextBorder();
	adjustAdminBarPositioning();
	adjustWidths();
	autosize($('textarea'));
	toggleWcWidgetContentClass();
	noOrphans();
});


var lastRecordedWidth = $(window).width();

$(window).resize(function(){
	if ($(window).width()!=lastRecordedWidth) {
		detectMenuStripeWrap();
		adjustWidths();
		registerWcWidgetContentHeight();
		lastRecordedWidth = $(window).width();
	}
	adjustHtmlMinHeight();
	adjustEmbeddediFrameDimensions();
	setTimeout(adjustStickyFooter, 100);
	adjustSearchPopupOffset();
	adjustAdminBarPositioning();
});

$(window).load(function(){
	initiateLoadingOfLazyImages();
	registerWcWidgetContentHeight();
	adjustEmbeddediFrameDimensions();
	adjustStickyFooter();
	detectMenuStripeWrap();
	$(".mauer-guild-preloader").addClass("mauer-guild-preloader-hidden");
});


})(jQuery);
