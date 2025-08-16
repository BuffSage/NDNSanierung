
/* Common JS: theme toggle, active nav */
(function(){
  const THEME_KEY = 'ndn-theme';
  const html = document.documentElement;
  function applyTheme(t){
    html.setAttribute('data-theme', t);
  }
  function setTheme(t){
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    const btnLight = document.getElementById('btn-light');
    const btnDark  = document.getElementById('btn-dark');
    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark)  btnDark.addEventListener('click',  () => setTheme('dark'));

    // Active nav
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const current = path === 'index.html' ? 'start' : path.replace('.html','');
    document.querySelectorAll('.nav a[data-nav]').forEach(a => {
      if (a.dataset.nav === current) a.classList.add('active');
    });
  });
})();
