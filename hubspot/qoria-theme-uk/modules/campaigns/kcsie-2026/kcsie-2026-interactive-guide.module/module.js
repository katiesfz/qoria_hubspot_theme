(function () {
  function domReady(cb) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') { cb(); }
    else { document.addEventListener('DOMContentLoaded', cb); }
  }
  function init(root) {
    var intro       = root.querySelector('[data-kcsie="intro"]');
    var content     = root.querySelector('[data-kcsie="content"]');
    var personaBtns = root.querySelectorAll('[data-kcsie-open]');
    var tabBtns     = root.querySelectorAll('[data-kcsie-tab]');
    var sections    = root.querySelectorAll('[data-kcsie-section]');
    var backBtn     = root.querySelector('[data-kcsie-back]');
    function scrollToTop() { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    function showTab(id) {
      sections.forEach(function (sec) { sec.classList.toggle('is-active', sec.id === id); });
      tabBtns.forEach(function (btn) { btn.classList.toggle('is-active', btn.getAttribute('data-kcsie-tab') === id); });
      var active = root.querySelector('#' + id);
      if (active) { void active.offsetWidth; }
      scrollToTop();
    }
    function openSection(id) {
      if (intro) { intro.hidden = true; }
      if (content) { content.hidden = false; }
      root.classList.add('is-content-active');
      showTab(id);
    }
    function goBack() {
      if (content) { content.hidden = true; }
      if (intro) { intro.hidden = false; }
      root.classList.remove('is-content-active');
      scrollToTop();
    }
    personaBtns.forEach(function (btn) { btn.addEventListener('click', function () { openSection(btn.getAttribute('data-kcsie-open')); }); });
    tabBtns.forEach(function (btn) { btn.addEventListener('click', function () { showTab(btn.getAttribute('data-kcsie-tab')); }); });
    if (backBtn) { backBtn.addEventListener('click', goBack); }
  }
  domReady(function () { document.querySelectorAll('.kcsie-guide').forEach(init); });
})();