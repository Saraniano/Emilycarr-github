(function ($) {
  Drupal.behaviors.Drupalorg = {
    attach: function (context) {
      var delta = 0,
        $aside = $('#aside'),
        $main = $('#main');

      // Move right column out of the way of wide tables used on API.drupal.org
      // and forums.
      if ($('.one-sidebar #main').length === 1) {
        // Find largest table width, excluding sticky headers (skews results).
        $main.find('table:not(.sticky-header)').each(function () {
          delta = Math.max(delta, $(this).width());
        });
        if (delta > $main.width()) {
          // Convert % to px, so values stay stable as the page gets wider.
          $aside.width($aside.width());
          $main.css('marginRight', $main.css('marginRight'));
          // Make the main area wider.
          $main.width(delta);
          // Make the container wide enough for main plus sidebar plus margins.
          $('#page-inner').width($main.outerWidth(true) + $aside.width());
        }
      }
    }
  };
})(jQuery);
;
