// CSS3 animated & responsive dropdown menu
// http://www.red-team-design.com/css3-animated-dropdown-menu
(function(){
		/* Mobile */
		$('#menu-wrap').prepend('<div id="menu-trigger">Menu</div>');		
		$("#menu-trigger").on("click", function(){
			$("#menu").slideToggle();
		});

		// iPad
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
		if (isiPad) $('#menu ul').addClass('no-transition');      
})();        

$('#toggle-login').click(function(){
  $('#login').toggle();
});
