document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // scroll reveal
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // terminal typing sequence (data comes from window.terminalLines, set in baseof.html
  // from the hero.terminal_lines front matter array)
  var termBody = document.getElementById('termBody');
  if (termBody && window.terminalLines && window.terminalLines.length) {
    typeLines();
  }

  function typeLines() {
    termBody.innerHTML = '';
    var i = 0;
    function next() {
      if (i >= window.terminalLines.length) {
        if (!reduceMotion) setTimeout(typeLines, 3500);
        return;
      }
      var item = window.terminalLines[i];
      var div = document.createElement('div');
      div.className = 'line t-' + (item.type || 'text');
      div.textContent = item.text;
      termBody.appendChild(div);
      i++;
      setTimeout(next, reduceMotion ? 0 : 420);
    }
    next();
  }
});
