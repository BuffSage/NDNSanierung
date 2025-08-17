
/* Simple auto-rotating slider for Leistungen */
(function(){
  function init(root){
    const slides = Array.from(root.querySelectorAll('.slide'));
    const dots   = Array.from(root.querySelectorAll('.dot'));
    if (!slides.length) return;
    let idx = 0, timer = null;

    function show(i){
      idx = i % slides.length;
      slides.forEach((el,k)=> el.classList.toggle('active', k===idx));
      dots.forEach((el,k)=> el.classList.toggle('active', k===idx));
    }
    function start(){
      stop();
      timer = setInterval(()=> show((idx+1)%slides.length), 5000);
    }
    function stop(){ if (timer) clearInterval(timer); timer = null; }

    dots.forEach((d,i)=> d.addEventListener('click', ()=>{ show(i); start(); }));

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    show(0); start();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach(init);
  });
})();
