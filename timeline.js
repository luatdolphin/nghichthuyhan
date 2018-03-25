/*** Detect the browser's prefixes ***/ 
if(document.addEventListener){ // Only IE9+ support this ;)
  // http://davidwalsh.name/vendor-prefix
  // Can't use it in IE8- as it brakes the page...
  var isPrefixed = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();

  // Deals with prefixes
  var prefix = isPrefixed.css;

} else {
  var prefix = "";
}

/*** Slides ***/
var currentSlide = 0,
    totalSlides  = $(".tl-obj").length - 1;

// Creates the navigation
$(".timeline").after("<div class='tl-nav-wrapwid'><ul class='tl-nav'></ul></div><a href='#' class='tl-items-arrow-left'></a><a href='#' class='tl-items-arrow-right'></a>");
$( ".tl-copy" ).wrapInner( "<div class='tl-copy-inner'></div>");

// Cicle through objs and creates the nav
$(".tl-obj").each(function(i) {
  var year = $(".tl-obj:eq(" + i + ")" ).data("year");
  $(".tl-nav").append("<li><div>" + year + "</div></li>");
  
  // Click handlers
  $(".tl-nav li:eq(" + i + ")").click(function() {
    if(!$(".tl-obj:eq(" + i + ")" ).hasClass("tl-active")) {
      // Activates the obj
      $(".tl-obj").removeClass("tl-active");
      $(".tl-obj:eq(" + i + ")" ).addClass("tl-active");
      currentSlide = i;

      // Activates the obj nav
      $(".tl-nav li").removeClass("tl-active");
      $(".tl-nav li:eq(" + i + ")" ).addClass("tl-active");
    }
  });
});

// Activates the first slide
$(".tl-obj:first, .tl-nav li:first").addClass("tl-active");