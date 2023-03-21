// https://github.com/dallaslu/bootstrap-5-multi-level-dropdown

//(function($bs) {
//    const CLASS_NAME = 'has-child-dropdown-show';
//    $bs.Dropdown.prototype.toggle = function(_orginal) {
//        return function() {
//            document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
//                e.classList.remove(CLASS_NAME);
//            });
//            let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
//            for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
//                dd.classList.add(CLASS_NAME);
//            }
//            return _orginal.call(this);
//        }
//    }($bs.Dropdown.prototype.toggle);
//
//    document.querySelectorAll('.dropdown').forEach(function(dd) {
//        dd.addEventListener('hide.bs.dropdown', function(e) {
//            if (this.classList.contains(CLASS_NAME)) {
//                this.classList.remove(CLASS_NAME);
//                e.preventDefault();
//            }
//            e.stopPropagation(); // do not need pop in multi level mode
//        });
//    });
//
//    // for hover
//    document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function(dd) {
//        dd.addEventListener('mouseenter', function(e) {
//            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
//            if (!toggle.classList.contains('show')) {
//                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
//                dd.classList.add(CLASS_NAME);
//                $bs.Dropdown.clearMenus();
//            }
//        });
//        dd.addEventListener('mouseleave', function(e) {
//            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
//            if (toggle.classList.contains('show')) {
//                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
//            }
//        });
//    });
//})(bootstrap);
//

// Set all carousel items to the same height
function normaliseSlideHeights() {
    $('.carousel-normalise').each(function(){
      var items = $('.carousel-item', this);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    })
  }
  
  // Set all selected items to the same height
  function normaliseHeights(classString) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
  }
  
  // responsive equal heights
  var mediaXs = window.matchMedia("(max-width: 575px)");
  var mediaSm = window.matchMedia("(min-width: 576px)");
  var mediaMd = window.matchMedia("(min-width: 768px)");
  var mediaLg = window.matchMedia("(min-width: 992px)");
  var mediaXl = window.matchMedia("(min-width: 1200px)");
  var mediaXxl = window.matchMedia("(min-width: 1400px)");
  
  function normaliseHeightsXs(classString) {
    if (mediaXs.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsSm(classString) {
    if (mediaSm.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsMd(classString) {
    if (mediaMd.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsLg(classString) {
    if (mediaLg.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsXl(classString) {
    if (mediaXl.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsXxl(classString) {
    if (mediaXxl.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  
  // play video
  function playVideo(videoId) {
    document.getElementById(videoId).play();
    document.getElementById(videoId).controls = "controls";
    document.getElementById(videoId).parentNode.getElementsByClassName("play-button")[0].remove();
  };