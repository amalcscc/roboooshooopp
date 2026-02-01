/**
 * Robo Shop - Frontend behavior
 * Navbar scroll, alerts, smooth interactions
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ----- Navbar: add shadow on scroll -----
    var nav = document.getElementById('mainNav');
    if (nav) {
      function onScroll() {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // ----- Alerts: fade out and remove after delay -----
    var alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
      alert.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      setTimeout(function () {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-8px)';
        setTimeout(function () {
          if (alert.parentNode) alert.remove();
        }, 400);
      }, 4200);
    });

    // ----- Smooth scroll for anchor links (optional) -----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ----- Product card add button: brief feedback -----
    document.querySelectorAll('.robo-card-add button[type="submit"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var el = this;
        var text = el.textContent;
        el.textContent = 'Adding…';
        el.disabled = true;
        setTimeout(function () {
          el.textContent = text;
          el.disabled = false;
        }, 1200);
      });
    });
  });
})();
