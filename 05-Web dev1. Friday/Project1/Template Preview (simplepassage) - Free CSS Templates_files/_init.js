function fct_gp() { var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = 'https://apis.google.com/js/plusone.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); }
function fct_fb(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s); js.id = id;js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs); }
jQuery(function($) {
var _window = $(window);
// social
fct_gp();
fct_fb(document, 'script', 'facebook-jssdk');
// dialog
$.getCookie = function(name) {var x = document.cookie.split(';'), y;for (s in x) {y = x[s].split('=');if ($.trim(y[0]) == name)return unescape(y[1]);}return null;}
$.setCookie = function(name, value, duration) {if (!duration) duration = 31536000;var date = new Date();date.setTime(date.getTime() + (duration * 1000));var expires = date.toGMTString();document.cookie = name + '=' + value + '; expires=' + expires + '; path=/';}
var dialog_id, dialog = $('<div id="dialog-download"><div class="box"><div class="inner"><h2>Downloading!</h2><p>But while you wait ... if you find our work useful, please show your support!</p><div class="actions"><div class="one"><h3>Tell your friends!</h3><div class="share"><ul><li><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.freecsstemplates.org/" data-text="630+ Awesome Free CSS Website Templates:" data-count="horizontal" data-via="freecsstemplate">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script></li><li><div class="g-plusone" data-size="medium" data-href="http://www.freecsstemplates.org/"></div></li><li><div class="fb-like" data-href="http://www.freecsstemplates.org/" data-send="false" data-layout="button_count" data-width="50" data-show-faces="false"></div></li></ul><br class="clear" /></div></div><div class="two"><h3>Follow us on Twitter!</h3><a href="http://twitter.com/freecsstemplate" target="_blank">@freecsstemplate</a> &nbsp;<a href="http://twitter.com/n33co" target="_blank">@n33co</a></div></div><br class="clear" /><a href="#" class="bigButton">Close</a><a href="#" class="closer">&times;</a></div></div></div>');
dialog.fct_show = function(u) { if ($.getCookie('freecsstemplates_ds') != 'ok' || true) { dialog_id = window.setTimeout(function() { window.location.href = u; }, 2000); dialog.fadeIn('fast', function() { FB.XFBML.parse(); } ); return true; } return false; }
dialog.fct_hide = function() { window.clearTimeout(dialog_id); dialog.fadeOut('fast'); $.setCookie('freecsstemplates_ds', 'ok', 86400); }
dialog.find('.box').click(function(e) { e.stopPropagation(); });
dialog.find('.bigButton').click(function(e) { dialog.fct_hide(); return false; });
dialog.find('.closer').click(function(e) { dialog.fct_hide(); return false; });
dialog.click(function(e) { dialog.fct_hide(); return false; });
_window.keydown(function(e) { if (e.keyCode == 27 && dialog.is(':visible')) dialog.fct_hide();});
dialog.appendTo($('body')).hide();
$('.button-download').click(function() { if (dialog.fct_show($(this).attr('href'))) return false; });
// iframe
var x = $('#demoframe'); if (x.length > 0) _window.resize(function() { x.height(_window.height() - 113); }).trigger('resize');
});