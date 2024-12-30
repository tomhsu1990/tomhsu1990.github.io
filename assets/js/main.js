/*
       Editorial by HTML5 UP
       html5up.net | @ajlkn
       Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

	Updated: Ching-Hsiang Hsu 2024/12/29
	Notes: moduleration

       updated: Ching-Hsiang Hsu 2024/12/28
       notes: section folder folded/unfolded functionality
*/
(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');
	// Header.
		document.addEventListener("DOMContentLoaded", function () {
		    const headerHTML = `
		        <header id="header">
		            <ul class="icons">
		                <li><a href="mailto:chhsu@nyu.edu" class="icon brands fa-envelope-o"><span class="label">E-mail</span></a></li>
		                <li><a href="https://www.linkedin.com/in/ching-hsiang-hsu/" class="icon brands fa-linkedin"><span class="label">LinkedIn</span></a></li>
		                <li><a href="https://github.com/tomhsu1990" class="icon brands fa-github"><span class="label">Github</span></a></li>
		                <li><a href="https://www.youtube.com/channel/UCsyHPAJxPqzgiJW0HllRzHA" class="icon brands fa-youtube"><span></span></a></li>
					<!-- 
					<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
					<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
					<li><a href="#" class="icon fa-snapchat-ghost"><span class="label">Snapchat</span></a></li>
					<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
					<li><a href="#" class="icon fa-medium"><span class="label">Medium</span></a></li>
					<li><a href="#" class="icon fa-tumblr"><span class="label">Tumblr</span></a></li>
					<li><a href="#" class="icon fa-rss"><span>RSS</span></a></li>
					<li><a href="#" class="icon fa-foursquare"><span>Foursquare</span></a></li>
					<li><a href="#" class="icon fa-skype"><span>Skype</span></a></li>
					<li><a href="#" class="icon fa-soundcloud"><span>Soundcloud</span></a></li>
					<li><a href="#" class="icon fa-blogger"><span>Blogger</span></a></li>
					<li><a href="#" class="icon fa-flickr"><span>Flickr</span></a></li>
					<li><a href="#" class="icon fa-vimeo"><span>Vimeo</span></a></li>
					-->
		            </ul>
		        </header>
		    `;
		    document.getElementById("header-placeholder").innerHTML = headerHTML;
		});


	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.
			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		document.addEventListener("DOMContentLoaded", function () {
			// Get the full path of the current page
			const currentPath = window.location.pathname;

			// Process the path to stop at "tomhsu1990.github.io"
			const rootFolderName = "tomhsu1990.github.io";
			let basePath = currentPath;

			// Check if the rootFolderName exists in the currentPath
			if (currentPath.includes(rootFolderName)) {
			    // Find the position of the rootFolderName and slice the path
			    const indexOfRoot = currentPath.indexOf(rootFolderName) + rootFolderName.length;
			    basePath = currentPath.substring(0, indexOfRoot)+'/';
			}

			// Dynamically generate the menu
			const menuHTML = `
			<nav id="menu">
				<header class="major">
				<h2>Menu</h2>
				</header>
					<ul>
						<li><a href="${basePath}index.html">Homepage</a></li>
						<li><a href="${basePath}work.html">Work Experience</a></li>
						<li><a href="${basePath}background.html">Academic Background</a></li>
						<li>
							<span class="opener">Research and Publication</span>
							<ul>
								<li><a href="${basePath}research/SSS.html">Soft Subdivision Search</a></li>
								<li><a href="${basePath}research/MotSeg.html">Motion and Semantic Segmentation</a></li>
								<li><a href="${basePath}research/ActionRecog.html">Egocentric Action Recognition</a></li>
							</ul>
						</li>
						<li>
							<span class="opener">Projects</span>
							<ul>
								<li><a href="${basePath}project/Navigation_SLAM.html">Navigation, Localization and Mapping</a></li>
								<li><a href="${basePath}project/RoboCup.html">RoboCup Standard Platform League</a></li>
								<li><a href="${basePath}project/LEGO_arm.html">LEGO Robot Arm System</a></li>
								<li><a href="${basePath}project/Restaurant_Rating.html">Restaurant Rating System</a></li>
								<li><a href="${basePath}project/3D_pop-up.html">3D Pop-up Book</a></li>
							</ul>
						</li>
						<li><a href="${basePath}oj_records.html">Online Judge Record</a></li>
					</ul>
			</nav>
			`;

			document.getElementById("menu-placeholder").innerHTML = menuHTML;
		});

		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function () {
			    var $this = $(this);

			    $this.on('click', function (event) {
			        // Prevent default.
			        event.preventDefault();

			        // Toggle the clicked opener.
			        $this.toggleClass('active');

			        // Ensure only clicked section remains open, unless it is clicked again.
			        $menu_openers.not($this).removeClass('active').next('ul').slideUp();
			        if ($this.hasClass('active')) {
			            $this.next('ul').slideDown();
			        } else {
			            $this.next('ul').slideUp();
			        }

			        // Trigger resize (sidebar lock).
			        $window.triggerHandler('resize.sidebar-lock');
			    });
			});

			// Ensure the active link's parent opener remains expanded after page reload.
			$(document).ready(function () {
			    // Get the current page file name
			    const currentPath = window.location.pathname.split('/').pop();
			    const $menu = $('#menu');

			    // Iterate through all openers to check if they contain the current page
			    $menu.find('.opener').each(function () {
			        const $opener = $(this);
			        const $submenu = $opener.next('ul'); // The associated submenu

			        // Check if the current page link exists in this submenu
			        const $currentLink = $submenu.find(`a[href*="${currentPath}"]`);
			        if ($currentLink.length) {
			            // Expand this section and highlight the link
			            $opener.addClass('active');
			            $submenu.show();
			            $currentLink.addClass('current'); // Add a class to highlight the link
			        } else {
			            // Collapse this section if no match
			            $opener.removeClass('active');
			            $submenu.hide();
			        }
			    });

			    // Add click behavior for openers to toggle open/close
			    $menu.find('.opener').on('click', function (event) {
			        event.preventDefault();
			        const $this = $(this);
			        $this.toggleClass('active');
			        $this.next('ul').slideToggle();
			    });
			});

	// Contact.
		document.addEventListener("DOMContentLoaded", function () {
		    const contactHTML = `
		        <section>
		            <header class="major">
		                <h2>Get in touch</h2>
		            </header>
		            <p>
		                If you would like to reach me, please use the following e-mail address. Feel free to ask me questions.
		            </p>
		            <ul class="contact">
		                <li class="solid fa-envelope"><a href="mailto:chhsu@nyu.edu">chhsu@nyu.edu</a></li>
		                <!--
		                <li class="fa-phone">(929) 000-0000</li>
		                <li class="fa-home">1234 Somewhere Road #8254<br />
		                Nashville, TN 00000-0000</li>
		                -->
		            </ul>
		        </section>
		    `;
		    document.getElementById("contact-placeholder").innerHTML = contactHTML;
		});

	// Footer.
		document.addEventListener("DOMContentLoaded", function () {
		    const footerHTML = `
		        <footer id="footer">
		            <center>
		                <a href="http://www.clustrmaps.com/map/tomhsu1990.github.io" class="image;">
		                    <img src="http://www.clustrmaps.com/map_v2.png?d=HdRL3B8U_bQrQ6rtiscSKW7VoqU0spUiYcT3uaQWB8c" 
		                         title="Visit tracker for tomhsu1990.github.io" 
		                         alt="" 
		                         style="width: 80%; height: 80%; margin:auto;" />
		                </a>
		            </center>
		            <p class="copyright">
		                <br> &copy; Ching-Hsiang Hsu. All rights reserved. Design: 
		                <a href="https://html5up.net">HTML5 UP</a>.
		            </p>
		        </footer>
		    `;
		    document.getElementById("footer-placeholder").innerHTML = footerHTML;
		});

})(jQuery);