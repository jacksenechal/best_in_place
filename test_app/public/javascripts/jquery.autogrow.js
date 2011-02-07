/* 
 * Auto Expanding Text Area (1.2.2)
 * by Chrys Bader (www.chrysbader.com)
 * chrysb@gmail.com
 *
 * Version 1.2.3 update
 * by Richard Vallee
 * richardvallee@gmail.com
 *
 * Special thanks to:
 * Jake Chapa - jake@hybridstudio.com
 * John Resig - jeresig@gmail.com
 *
 * Copyright (c) 2008 Chrys Bader (www.chrysbader.com)
 * Licensed under the GPL (GPL-LICENSE.txt) license. 
 *
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 *
 */
 
(function(jQuery) {

  jQuery.fn.autogrow = function(o)
  {  
    return this.each(function() {
      new jQuery.autogrow(this, o);
    });
  };

  /**
   * The autogrow object.
   *
   * @constructor
   * @name jQuery.autogrow
   * @param Object e The textarea to create the autogrow for.
   * @param Hash o A set of key/value pairs to set as configuration properties.
   * @cat Plugins/autogrow
   */
  jQuery.autogrow = function (e, o)
  {
    this.options    = o || {};
    this.dummy      = null;
    this.interval   = null;
    this.min_height = this.options.minHeight || parseInt(jQuery(e).css('min-height'));
    this.max_height = this.options.maxHeight || parseInt(jQuery(e).css('max-height'));;
    this.textarea   = jQuery(e);
    
    // Only one textarea activated at a time, the one being used
    this.init();
  };
  
  jQuery.autogrow.fn = jQuery.autogrow.prototype = {
    autogrow: '1.2.3'
  };
	
  jQuery.autogrow.fn.extend = jQuery.autogrow.extend = jQuery.extend;
  
  jQuery.autogrow.fn.extend({
    init: function() {      
      this.textarea.css({overflow: 'hidden', display: 'block'});
      this.textarea.bind('keyup keydown keypress', {editor: this}, this.keyupHandler);
      this.checkExpand();
    },
    
    keyupHandler: function(event) {
      event.data.editor.checkExpand();
    },

    checkExpand: function() {
      if (this.dummy == null) {
        this.dummy = jQuery('<div></div>');
        this.dummy.css({
          'font-size'  : this.textarea.css('font-size'),
          'font-family': this.textarea.css('font-family'),
          'width'      : this.textarea.css('width'),
          'padding'    : this.textarea.css('padding'),
          'position'   : 'absolute',
          'line-height': 'normal',
          'visibility' : 'hidden'
          }).appendTo('body');
      }
      
      // Strip HTML tags
      var html = this.textarea.val().replace(/(<|>)/g, '');
      
      // IE is different, as per usual
      if (jQuery.browser.msie) {
        html = html.replace(/\n/g, '<BR/>');
      }
      else {
        html = html.replace(/\n/g, '<br/>');
      }
      
      html += "...";

      if (this.dummy.html() != html) {
        this.dummy.html(html);
        if ((this.max_height > 0) && (this.dummy.height() > this.max_height)) {
          this.textarea.css('overflow-y', 'auto');
          if (this.textarea.height() < this.max_height) {
            this.textarea.css('height', this.max_height + 'px');  
          }
        }
        else {
          this.textarea.css('overflow-y', 'hidden');
          if (this.dummy.height() < this.min_height) {
            this.textarea.css('height', this.min_height + 'px');  
          } else {
            this.textarea.css('height', this.dummy.height() + 'px');  
          }
        }
      }
    }
   });
})(jQuery);
