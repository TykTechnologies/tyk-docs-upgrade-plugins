/**
 * Building TOC
 */

var buildTableOfContents = function () {
    var ToCContainer = $(".documentation-table-of-contents-container"),
        ToC = $(".documentation-table-of-contents"),
        ToContent = $(".toc__content"),
        ToClbl = $('<span class="toc__label">On this page</span>'),
        contentTitles = $("h2, h3", "#main-content");

    if (!ToC[0]) {
        return;
    }

    if (contentTitles.length < 3) {
        // Remove ToC if there are not enough links
        ToCContainer.remove();
        $('.page-content__main').addClass('no-toc');
        return;
    }

    ToContent.html("");
    var accordionGroup = $('<div class="accordion-group"></div>');

    contentTitles.each(function () {
        ToC.prepend(ToClbl);
        var title = $(this).text();

        if ($(this).is('h2')) {
            var h2 = $(this).text().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            var accordionItem = $('<div class="accordion-item"></div>');
            var accordionHeader = $(`<a href="#${$(this).attr("id")}" class="toc__item">${title}</a>`);
            accordionHeader.click(function () {
                $(this).toggleClass('accordion-up');
                // Toggle visibility of H3 elements under this H2
                $(this).siblings('.accordion-content').toggle();
            });
            accordionItem.append(accordionHeader);
            accordionGroup.append(accordionItem);
        }

        if ($(this).is('h3')) {
            var link = $(`<a href="#${$(this).attr("id")}" class="sub_toc__item ${h2}">${title}</a>`);
            var accordionContent = $('<div class="accordion-content"></div>').append(link);
            if (accordionGroup.find('.accordion-item:last').length) {
                accordionGroup.find('.accordion-item:last').append(accordionContent);
            } else {
                ToContent.append(accordionContent);
            }
        }
    });

    ToContent.append(accordionGroup);

    activeTocToggle();

    var pageContent = $('.page-content');
    pageContent.on("scroll", highlightAnchor);

    $('.accordion-item').each(function () {
        var accordionContent = $(this).find('.accordion-content');
        if (accordionContent.length) {
            // Do something if there is accordion content
        } else {
            $(this).find('a.toc__item').addClass('accordionHolder');
        }
    });
};

// Call the function to build the table of contents with accordion functionality
$(document).ready(buildTableOfContents);
$(document).on("turbolinks:load", buildTableOfContents);

/**
 * Toggle TOC for small devices
 */

function activeTocToggle() {
	var tocLabel = $('.toc__label');
	var tocItems = $('.toc__item');
	var pageContent = $('.page-content__container, .header');
	
	tocLabel.on('click', function(e) {
		if (window.innerWidth < 1024) {
			$(e.currentTarget).toggleClass('js-open');
		} else {
			$(e.currentTarget).removeClass('js-open');
		}
	});
	
	/* tocItems.on('click', function(e) {
		if (window.innerWidth < 1024) {
			tocLabel.removeClass('js-open');
		}
	}); */

	pageContent.on('click', function() {
		if ( tocLabel.hasClass('js-open') ) {
			tocLabel.removeClass('js-open');
		}
	});
}

// function throttle(fn, wait) {
// 	// Avoiding excesive amount of checks per scroll
// 	var time = Date.now();
// 	return function() {
// 	  if ((time + wait - Date.now()) < 0) {
// 		fn();
// 		time = Date.now();
// 	  }
// 	}
// }


function highlightAnchor() {
	var contentTitles = $("h2, h3", "#main-content");
	var currentSectionId;
	var sectionPosition = 0;
	
	contentTitles.each(function () {
		sectionPosition = $(this).offset().top;
		currentSectionId = $(this).attr("id");
		
		if (sectionPosition > 120  && sectionPosition < (120 + ($(this).outerHeight() * 2) )) {	
			$('.toc__item,.sub_toc__item').removeClass("js-active");
			$('.toc__item[href*="#' + currentSectionId + '"],.sub_toc__item[href*="#' + currentSectionId + '"]').addClass("js-active");

			return;
		}
	});
}


/**
 * Functionality to make TOC sidebar sticky
 */
// var $window = $(window);
// var $stickySidebar = $(".documentation-table-of-contents-container");
// var $stickySidebarInner = $stickySidebar.find(".documentation-table-of-contents");
// var stickyClass = "js-sticky";
// var stickyBottomClass = "js-sticky--bottom";
// var $anchored_sections, $currentSection;
// var sidebarTop, windowScrolled, sidebarEnd, sidebarOverflow;

// function stuckSidebar() {
//   $stickySidebar.removeClass(stickyBottomClass);
//   $stickySidebar.addClass(stickyClass);
// }

// function stuckToBottomSidebar() {
//   $stickySidebar.addClass(stickyBottomClass);
// }

// function releaseSidebar() {
//   $stickySidebar.removeClass(stickyClass);
//   $stickySidebar.removeClass(stickyBottomClass);
// }

// function checkScrollStatus() {
// 	sidebarEnd =
// 		$stickySidebar.height() + sidebarTop - $stickySidebarInner.height();

// 	if (windowScrolled > sidebarTop && windowScrolled > sidebarEnd) {
// 		stuckToBottomSidebar();
// 	} else if (windowScrolled > sidebarTop && windowScrolled < sidebarEnd) {
// 		stuckSidebar();
// 	} else {
// 		releaseSidebar();
// 	}
// }

// function highlightAnchor() {
// 	$anchored_sections.each(function () {
// 		var sectionPosition = $(this).offset().top;

// 		if (sectionPosition < windowScrolled) {
// 			$currentSection = $(this);
// 		}

// 		var id = $currentSection.attr("id");

// 		$(".sticky__inner a").removeClass("js-active");
// 		$('.sticky__inner a[href*="#' + id + '"]').addClass("js-active");
// 	});
// }

// if ($stickySidebar.length) {
// 	sidebarTop = $stickySidebar.offset().top;

// 	$anchored_sections = $(".content__col1 [id]");
// 	$currentSection = $($anchored_sections[0]);

// 	$window.on("scroll", function () {
// 		windowScrolled = $window.scrollTop() + 120;

// 		checkScrollStatus();
// 		highlightAnchor();
// 	});
// }
