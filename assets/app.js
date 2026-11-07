(function () {
  // Mobile menu
  var h = document.querySelector('header.site'), b = h && h.querySelector('.burger');
  if (b) b.addEventListener('click', function () {
    var open = h.classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Footer groups: open on wide screens, folded on small ones
  var groups = [].slice.call(document.querySelectorAll('.fgroup'));
  var mq = window.matchMedia('(max-width:1023px)');
  function sync() { groups.forEach(function (g) { g.open = !mq.matches; }); }
  sync();
  if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync);

  // System tabs in the download section
  var tabs = [].slice.call(document.querySelectorAll('.tabs [role=tab]'));
  function pick(t) {
    tabs.forEach(function (o) {
      var on = o === t;
      o.setAttribute('aria-selected', on ? 'true' : 'false');
      o.tabIndex = on ? 0 : -1;
      var p = document.getElementById(o.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
    });
  });

  // Cookie notice
  var c = document.getElementById('cookie'), ok = document.getElementById('cookie-ok');
  var seen = false;
  try { seen = localStorage.getItem('csh-cookie') === '1'; } catch (e) {}
  if (c && !seen) c.hidden = false;
  if (ok) ok.addEventListener('click', function () {
    c.hidden = true;
    try { localStorage.setItem('csh-cookie', '1'); } catch (e) {}
  });
})();

(function () {
  // Pricing: monthly / yearly switch
  var sw = document.querySelector('.switch');
  if (!sw) return;
  sw.addEventListener('click', function () {
    var yearly = sw.getAttribute('aria-checked') !== 'true';
    sw.setAttribute('aria-checked', yearly ? 'true' : 'false');
    sw.setAttribute('aria-label', yearly ? 'Show monthly prices' : 'Show yearly prices');
    [].forEach.call(document.querySelectorAll('.pcard [data-m]'), function (el) {
      el.textContent = el.getAttribute(yearly ? 'data-y' : 'data-m');
    });
  });
})();
