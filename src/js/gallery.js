
(function(){
  const wrap = document.getElementById('gallery');
  if(!wrap) return;
  const track = wrap.querySelector('.gal-track');
  const slides = Array.from(wrap.querySelectorAll('.gal-slide'));
  const prev = wrap.querySelector('.gal-prev');
  const next = wrap.querySelector('.gal-next');

  let index = 0;
  let timer = null;
  const slideTo = (i)=>{
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const start = ()=>{
    stop();
    timer = setInterval(()=> slideTo(index + 1), 4000);
  };
  const stop = ()=>{ if(timer){ clearInterval(timer); timer = null; } };

  next.addEventListener('click', ()=>{ slideTo(index + 1); start(); });
  prev.addEventListener('click', ()=>{ slideTo(index - 1); start(); });

  // Pause on hover / focus for accessibility
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);
  wrap.addEventListener('focusin', stop);
  wrap.addEventListener('focusout', start);

  // Resize handler to keep alignment
  window.addEventListener('resize', ()=> slideTo(index));
  // Kick off
  start();
})();
