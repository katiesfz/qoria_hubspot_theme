/* Filter or monitor swipe game. Content is read from the JSON block the module template writes. */
(function () {
  var TICK = '<i class="fa fas fa-check"></i>';
  var CROSS = '<i class="fa fas fa-xmark"></i>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function initGame(root) {
    if (root.getAttribute('data-sg-ready')) return;
    var dataEl = root.querySelector('script.sg-data');
    if (!dataEl) return;
    var cfg;
    try { cfg = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var SCENARIOS = (cfg.scenarios || []).filter(function (s) { return s && s.t; });
    if (!SCENARIOS.length) return;
    root.setAttribute('data-sg-ready', '1');

    var card = root.querySelector('.sg-card');
    var bands = root.querySelectorAll('.sg-band');
    var glow = { stop: root.querySelector('.sg-side--stop .sg-band__glow'), see: root.querySelector('.sg-side--see .sg-band__glow') };
    var tallies = { stop: root.querySelector('[data-tally="stop"]'), see: root.querySelector('[data-tally="see"]') };
    var mq = window.matchMedia('(max-width: 767px)');
    var counts = { stop: 0, see: 0 };
    SCENARIOS.forEach(function (s) { s.a = s.a === 'see' ? 'see' : 'stop'; counts[s.a]++; });

    var st, busy = false, drag = null;
    function reset() { st = { idx: 0, phase: 'question', hits: { stop: 0, see: 0 }, correct: false }; }

    function resultHeadline(score, total) {
      if (score === total) return cfg.resultPerfect;
      if (score >= Math.round(total * 0.7)) return cfg.resultGood;
      return cfg.resultLow;
    }

    function renderTallies() {
      ['stop', 'see'].forEach(function (k) {
        var html = '';
        for (var i = 0; i < counts[k]; i++) html += '<li class="sg-dot' + (i < st.hits[k] ? ' is-on' : '') + '">' + TICK + '</li>';
        tallies[k].innerHTML = html;
        tallies[k].setAttribute('aria-label', st.hits[k] + ' of ' + counts[k] + ' correct');
      });
    }

    function cardHtml(phase, idx, correct, score) {
      var n = SCENARIOS.length, s = SCENARIOS[idx];
      var counter = esc(cfg.counterLabel || 'Scenario') + ' ' + (idx + 1) + ' of ' + n;
      var html;
      if (phase === 'question') {
        html = '<div class="sg-counter">' + counter + '</div>' +
          (s.img ? '<img class="sg-photo" src="' + esc(s.img) + '" alt="' + esc(s.alt) + '" draggable="false">' : '') +
          '<p class="sg-text">' + esc(s.t) + '</p>';
      } else if (phase === 'feedback') {
        var cls = correct ? 'is-correct' : 'is-wrong';
        html = '<div class="sg-counter sg-counter--small">' + counter + '</div>' +
          '<div class="sg-verdict-container"><span class="sg-verdict-icon ' + cls + '">' + (correct ? TICK : CROSS) + '</span>' +
          '<div class="sg-verdict h4 ' + cls + '">' + esc(correct ? cfg.correctLabel : cfg.incorrectLabel) + '</div>' +
          '<p class="sg-explain fs-6"><strong>' + esc(s.a === 'stop' ? cfg.leadStop : cfg.leadSee) + '</strong> ' + esc(correct ? s.ok : s.no) + '</p></div>' +
          '<button class="btn btn-primary" type="button" data-action="next">' + esc(idx >= n - 1 ? cfg.finishLabel : cfg.nextLabel) + '</button>';
      } else {
        html = '<div class="sg-counter sg-counter--small">' + esc(cfg.resultLabel) + '</div>' +
          '<div class="sg-score"><strong>' + score + '/' + n + '</strong></div>' +
          '<div><p class="sg-result h4">' + esc(resultHeadline(score, n)) + '</p>' +
          '<p class="sg-explain-old">' + esc(cfg.resultText) + '</p></div>' +
          '<div class="sg-actions">' +
            (cfg.learnMoreLabel ? '<a class="btn btn-primary" href="' + esc(cfg.learnMoreUrl || '#') + '">' + esc(cfg.learnMoreLabel) + '</a>' : '') +
            '<button class="btn btn-outline-primary" type="button" data-action="restart">' + esc(cfg.playAgainLabel) + '</button>' +
          '</div>';
      }
      return html;
    }

    function renderCard() {
      card.innerHTML = cardHtml(st.phase, st.idx, st.correct, st.hits.stop + st.hits.see);
      card.classList.toggle('is-draggable', st.phase === 'question');
      bands.forEach(function (b) { b.disabled = st.phase !== 'question'; });
    }

    // Set the card height from the tallest of every state it can show, so it never jumps between screens
    function sizeCard() {
      var n = SCENARIOS.length;
      var probe = document.createElement('div');
      probe.className = 'sg-card';
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;top:0;left:0;visibility:hidden;pointer-events:none;transition:none;min-height:0;width:' + card.offsetWidth + 'px';
      card.parentNode.appendChild(probe);
      var tallest = 0;
      function measure(html) {
        probe.innerHTML = html;
        tallest = Math.max(tallest, probe.offsetHeight);
      }
      SCENARIOS.forEach(function (_, i) {
        measure(cardHtml('question', i, false, 0));
        measure(cardHtml('feedback', i, true, 0));
        measure(cardHtml('feedback', i, false, 0));
      });
      [n, Math.round(n * 0.7), 0].forEach(function (score) { measure(cardHtml('done', 0, false, score)); });
      probe.parentNode.removeChild(probe);
      root.style.setProperty('--sg-card-h', tallest + 'px');
    }

    function enter(focusSel) {
      card.classList.add('is-instant');
      card.style.transform = '';
      card.style.opacity = '0';
      renderCard();
      void card.offsetWidth;
      card.classList.remove('is-instant');
      card.style.opacity = '1';
      var f = focusSel && card.querySelector(focusSel);
      try { (f || card).focus({ preventScroll: true }); } catch (e) { (f || card).focus(); }
    }

    function setGlow(pull) {
      glow.stop.style.opacity = pull < 0 ? String(-pull * 0.15) : '0';
      glow.see.style.opacity = pull > 0 ? String(pull * 0.15) : '0';
    }

    function threshold() { return Math.min(120, card.offsetWidth * 0.28); }

    function choose(side) {
      if (st.phase !== 'question' || busy) return;
      busy = true;
      st.correct = SCENARIOS[st.idx].a === side;
      if (st.correct) st.hits[side]++;
      var dist = (mq.matches ? window.innerWidth : 760) * (side === 'stop' ? -1 : 1);
      card.classList.remove('is-dragging');
      card.style.transform = 'translateX(' + dist + 'px) rotate(' + (dist / 18) + 'deg)';
      card.style.opacity = '0';
      setGlow(0);
      setTimeout(function () {
        st.phase = 'feedback';
        renderTallies();
        enter('.btn-primary');
        busy = false;
      }, 300);
    }

    // Button, arrow or key press: nudge the card like a drag, then fling it
    function swipe(side) {
      if (st.phase !== 'question' || busy) return;
      busy = true;
      bands.forEach(function (b) { b.disabled = true; });
      var nudge = threshold() * 0.9 * (side === 'stop' ? -1 : 1);
      card.classList.remove('is-dragging', 'is-instant');
      card.style.transform = 'translateX(' + nudge + 'px) rotate(' + (nudge / 18) + 'deg)';
      setGlow(side === 'stop' ? -1 : 1);
      setTimeout(function () { busy = false; choose(side); }, 180);
    }

    function next() {
      if (st.idx >= SCENARIOS.length - 1) st.phase = 'done';
      else { st.idx++; st.phase = 'question'; }
      enter(st.phase === 'done' ? '.btn-primary' : null);
    }

    /* drag / swipe */
    card.addEventListener('pointerdown', function (e) {
      if (st.phase !== 'question' || busy || e.button > 0) return;
      drag = { x: e.clientX, y: e.clientY, dx: 0, locked: false, id: e.pointerId };
    });
    card.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.locked) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // vertical: let the page scroll
        drag.locked = true;
        card.setPointerCapture(e.pointerId);
        card.classList.add('is-dragging');
      }
      drag.dx = dx;
      card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
      setGlow(Math.max(-1, Math.min(1, dx / threshold())));
    });
    function endDrag() {
      if (!drag) return;
      var d = drag.dx, locked = drag.locked;
      drag = null;
      if (!locked) return;
      if (Math.abs(d) > threshold()) { choose(d < 0 ? 'stop' : 'see'); return; }
      card.classList.remove('is-dragging');
      card.style.transform = '';
      setGlow(0);
    }
    card.addEventListener('pointerup', endDrag);
    card.addEventListener('pointercancel', endDrag);

    /* clicks & keys */
    bands.forEach(function (b) { b.addEventListener('click', function () { swipe(b.getAttribute('data-choice')); }); });
    card.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      if (btn.getAttribute('data-action') === 'next') next();
      else { reset(); renderTallies(); enter(); }
    });
    root.addEventListener('keydown', function (e) {
      if (st.phase !== 'question') return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); swipe('stop'); }
      if (e.key === 'ArrowRight') { e.preventDefault(); swipe('see'); }
    });

    reset(); renderTallies(); renderCard(); sizeCard();

    var resizeFrame;
    window.addEventListener('resize', function () {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(sizeCard);
    });
    window.addEventListener('load', sizeCard);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeCard);
  }

  function initAll() {
    var roots = document.querySelectorAll('.sg-game');
    for (var i = 0; i < roots.length; i++) initGame(roots[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();