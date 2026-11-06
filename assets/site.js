(function(){
  var w=[].slice.call(document.querySelectorAll('.tagline span'));
  if(!w.length)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){w.forEach(function(s){s.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=w.indexOf(e.target);setTimeout(function(){e.target.classList.add('on')},i*40);io.unobserve(e.target)}})},{rootMargin:'0px 0px -20% 0px'});
  w.forEach(function(s){io.observe(s)});
})();

(function(){
  var EVT="cta_click";
  function send(info){
    try{if(window.gtag){gtag('event',EVT,{offer:info.offer,place:info.place,page_path:location.pathname,transport_type:'beacon'})}
        else if(window.dataLayer){dataLayer.push({event:EVT,offer:info.offer,place:info.place,page_path:location.pathname})}}catch(e){}
    try{if(window.zbClick)window.zbClick(info)}catch(e){}
  }
  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[data-track]');
    if(!a)return;
    send({event:EVT,offer:a.getAttribute('data-offer')||'',place:a.getAttribute('data-place')||'',page:location.pathname,href:a.getAttribute('href')||''});
  },true);
})();