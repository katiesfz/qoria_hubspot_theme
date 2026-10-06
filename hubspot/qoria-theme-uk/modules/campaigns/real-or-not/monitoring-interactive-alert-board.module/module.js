/* =============================================================================
   smw-monitoring-interactive-alert-board

   Cards open on hover and keyboard focus through CSS alone, and each button's
   text is shown by CSS too, so this file only handles what CSS can't:
   mirroring the checked radio onto a data attribute, pinning a card on tap
   (touch has no hover), Escape to dismiss, and the pause control.

   No text is injected and no geometry is measured — each card already holds all
   three tiers, CSS picks the live one, and placement comes from custom
   properties set in the template.

   Note on theme JS: domReady() in main.js is declared inside an IIFE and is NOT
   on the global scope, so module JS can't call it. The local ready() below is
   the same pattern.
   ============================================================================= */

(function () {
  'use strict';

  function ready(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function initInstance(root) {
    var radios = Array.prototype.slice.call(root.querySelectorAll('[data-qsf-state-input]'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-qsf-dot]'));
    var items = Array.prototype.slice.call(root.querySelectorAll('.qsf__item'));
    var pauseButton = root.querySelector('[data-qsf-motion]');

    if (!radios.length || !dots.length) {
      return;
    }

    // Below 992px the dots render as a plain list with every record visible, so
    // the content stands up without any of this. Above it, JS switches on the
    // positioned tiers.
    root.classList.add('qsf--enhanced');

    function unpinAll() {
      items.forEach(function (item) {
        // Also releases the frozen dot back into the drift.
        item.classList.remove('qsf__item--open');
      });
    }

    function undismiss() {
      root.classList.remove('qsf--dismissed');
    }

    dots.forEach(function (dot) {
      var item = dot.closest('.qsf__item');

      dot.addEventListener('click', function () {
        var isOpen = item && item.classList.contains('qsf__item--open');
        unpinAll();
        undismiss();
        if (item && !isOpen) {
          // Pins the card, which is the only way to open one on touch.
          item.classList.add('qsf__item--open');
        }
        dot.setAttribute('data-qsf-viewed', 'true');
      });

      // Hover and focus open the card in CSS; this only records that it has
      // been seen, so the dot keeps its lighter fill afterwards. It says
      // nothing about whether the alert mattered.
      dot.addEventListener('mouseenter', function () {
        dot.setAttribute('data-qsf-viewed', 'true');
        undismiss();
      });
      dot.addEventListener('focus', function () {
        dot.setAttribute('data-qsf-viewed', 'true');
        undismiss();
      });
    });

    // WCAG 1.4.13 — content shown on hover must be dismissible without moving
    // the pointer. The class clears as soon as the pointer or focus moves, so a
    // dismissed card comes back on the next hover.
    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        unpinAll();
        root.classList.add('qsf--dismissed');
      }
    });

    root.addEventListener('pointermove', undismiss);
    root.addEventListener('focusin', undismiss);

    function applyState(radio) {
      if (!radio) {
        return;
      }
      root.setAttribute('data-qsf-state', radio.value);
      // Each tier is its own read of the same week, so switching clears what
      // has been opened.
      unpinAll();
      undismiss();
      dots.forEach(function (dot) {
        dot.removeAttribute('data-qsf-viewed');
      });
    }

    radios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (radio.checked) {
          applyState(radio);
        }
      });
    });

    // Respect whatever the browser restored on a back/forward navigation.
    applyState(
      radios.filter(function (radio) {
        return radio.checked;
      })[0] || radios[0]
    );

    if (pauseButton) {
      // Guarded: if matchMedia is unavailable the control still works and only
      // the OS-preference sync is skipped — init must never throw here.
      var reduceMotion =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : null;

      pauseButton.hidden = false;

      // The control is icon only, so its name has to carry the state. The name
      // lives in aria-label rather than a hidden span: nothing to render, so a
      // missing stylesheet can't leave the words on the page. Swapping the name
      // rather than using aria-pressed keeps it unambiguous — it always says
      // what the next press will do.
      function setPaused(paused) {
        var label = pauseButton.getAttribute(
          paused ? 'data-qsf-resume-label' : 'data-qsf-pause-label'
        );
        root.classList.toggle('qsf--paused', paused);
        if (label) {
          pauseButton.setAttribute('aria-label', label);
          pauseButton.setAttribute('title', label);
        }
      }

      pauseButton.addEventListener('click', function () {
        setPaused(!root.classList.contains('qsf--paused'));
      });

      function syncReduceMotion() {
        if (reduceMotion && reduceMotion.matches) {
          setPaused(true);
        }
      }

      if (reduceMotion && typeof reduceMotion.addEventListener === 'function') {
        reduceMotion.addEventListener('change', syncReduceMotion);
      } else if (reduceMotion && typeof reduceMotion.addListener === 'function') {
        reduceMotion.addListener(syncReduceMotion);
      }

      syncReduceMotion();
    }
  }

  ready(function () {
    document.querySelectorAll('[data-qsf]').forEach(function (root) {
      initInstance(root);
    });
  });
})();