// Mobile navigation, header shadow, scroll reveal and gallery lightbox.
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function () {
      setOpen(false);
    });
  }

  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var box = document.querySelector('.lightbox');
  if (box) {
    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    var closeBtn = box.querySelector('.lightbox-close');
    var lastFocus = null;
    var close = function () {
      box.hidden = true;
      img.removeAttribute('src');
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('.zoom').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lastFocus = btn;
        img.src = btn.dataset.full;
        img.alt = btn.dataset.caption || '';
        cap.textContent = btn.dataset.caption || '';
        box.hidden = false;
        closeBtn.focus();
      });
    });
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
  }
})();
