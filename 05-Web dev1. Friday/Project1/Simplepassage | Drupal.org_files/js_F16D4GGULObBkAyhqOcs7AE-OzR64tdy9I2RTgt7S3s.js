(function ($) {

  /**
   * A placeholder to save the currently focused input between AJAX requests.
   */
  Drupal.projectIssueFocusedInput = false;

  /**
   * Persistent input focus (retains the proper focus after AJAX replacements).
   */
  Drupal.behaviors.projectIssueFocusedInput = {
    attach: function (context) {
      var $context = $(context);
      var inputs = ':input:not([type="hidden"],:submit)';
      // Only bind a top level click event once to remove the stored focus if
      // element is not an input.
      $('body').once('project-issue-focused-input', function () {
        $(this).bind('mousedown', function (e) {
          if (!$(e.target).is(inputs)) {
            Drupal.projectIssueFocusedInput = false;
          }
        });
      });
      if (Drupal.projectIssueFocusedInput) {
        // Do not use $context here, focused input could not be part of it.
        $(':input[name="' + Drupal.projectIssueFocusedInput + '"]').focus();
      }
      // Bind various events on input elements to ensure we save the
      // proper currently focused element.
      var $inputs = $context.find(inputs)
        .bind({
          'keydown': function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            // Detect tab keystroke.
            if (code === 9) {
              // Obtain the name of the next input element in the DOM
              // structure.
              Drupal.projectIssueFocusedInput = $inputs.eq(parseInt($inputs.index($(this)), 10) + 1).attr('name');
            }
          },
          'mousedown': function () {
            Drupal.projectIssueFocusedInput = $(this).attr('name');
          },
          'focus': function () {
            Drupal.projectIssueFocusedInput = $(this).attr('name');
          }
        });
    }
  };

  /**
   * Persistent issue fieldsets (keeps them open/closed between HTTP requests).
   */
  Drupal.behaviors.projectIssuePersistentFieldsets = {
    attach: function () {
      // Only continue if localStorage is supported in the browser.
      if ('localStorage' in window && typeof window.localStorage !== 'undefined' && window['localStorage'] !== null) {
        // Only bind once.
        $('#project-issue-ajax-form').once('issue-form', function () {
          var prefix = $(this).parents('[id]').attr('id');
          $('fieldset.collapsible', this).each(function() {
            var $fieldset = $(this);
            var id = prefix + '.' + $fieldset.attr('id');
            // If the ID of the fieldset is present in localStorage, change open status.
            if (typeof window.localStorage[id] !== 'undefined') {
              if (window.localStorage[id] == 'true') { // localStorage casts to string.
                $fieldset.removeClass('collapsed');
              }
              else {
                $fieldset.addClass('collapsed');
              }
            }
            // Bind the "collapsed" event to change the localStorage value.
            $fieldset.bind('collapsed', function(e) {
              window.localStorage[id] = !e.value;
            });
          });
        });
      }
    }
  };

})(jQuery);
;
(function ($) {
  Drupal.behaviors.drupalorgSearch = {
    attach: function (context, settings) {
      $('body.page-search #content-top-region form:not(.drupalorgSearch-processed)', context).addClass('drupalorgSearch-processed').each(function () {
        var $this = $(this);
        $this.find('select').change(function () {
          $this.submit();
        });
      });
    }
  };

  Drupal.behaviors.drupalorgCompany = {
    attach: function () {
      var $map = $('#organization-map');
      $map.find('>.drupalorg-map-pin').each(function () {
        $(this).css({
          left: '' + Drupal.longitudeToPx($('>.longitude', this).text(), -168, $map.width()) + 'px',
          bottom: '' + Drupal.latitudeToPx($('>.latitude', this).text(), 75, -57, $map.height()) + 'px'
        });
      });
    }
  };

  /**
   * Marketplace listing pages.
   */
  Drupal.behaviors.drupalorgMarketplace = {
    attach: function () {
      $('.view-drupalorg-organizations:not(.drupalorgMarketplace-processed)').addClass('drupalorgMarketplace-processed')
        .find('ul').each(function () {
          var $showMore = $('.show-more', this).hide(),
            $showLink = $('.show-link', this),
            $hideLink = $('.hide-link', this);

          $showLink.show().click(function (e) {
            $showMore.show();
            $showLink.hide();
            $hideLink.show();
            e.preventDefault();
          });
          $hideLink.click(function (e) {
            $showMore.hide();
            $showLink.show();
            $hideLink.hide();
            e.preventDefault();
          });
        });
    }
  };

  /**
   * Randomize children, used on Hosting PaaS and Enterprise pages.
   */
  Drupal.behaviors.drupalorgRandom = {
    attach: function (context) {
      $('.drupalorg-random:not(.drupalorg-random-processed)', context).addClass('drupalorg-random-processed').each(function () {
        var $this = $(this),
          elements = $this.children().get();
        for (var j, x, i = elements.length; i; j = Math.floor(Math.random() * i), x = elements[--i], elements[i] = elements[j], elements[j] = x);
        $this.html(elements);
      });
    }
  };

  /**
   * Load block content from other sites.
   */
  Drupal.behaviors.drupalorgBlockLoad = {
    attach: function () {
      var $block = $('#drupalorg-security-issues-placeholder');
      if ($block.length > 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://security.drupal.org/dofeed', true);
        xhr.withCredentials = true;
        xhr.onload = function () {
          $block.parent().html(this.responseText);
        };
        xhr.send();
      }
    }
  };
})(jQuery);
;
