document.addEventListener('DOMContentLoaded',()=>{
const $=(s,e=document)=>[...e.querySelectorAll(s)],page=location.pathname.split('/').pop()||'index.html';
const nav=$('nav')[0];

/* toast */
const toast=document.body.appendChild(Object.assign(document.createElement('div'),{className:'toast'}));
let tt;const say=m=>{toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200)};

/* mobile menu */
const mb=Object.assign(document.createElement('button'),{className:'menu-btn',textContent:'☰',ariaLabel:'Menu'});
nav.appendChild(mb);mb.onclick=()=>{nav.classList.toggle('open');mb.textContent=nav.classList.contains('open')?'✕':'☰'};

/* hearts (saved in the browser) */
const store=JSON.parse(localStorage.getItem('likes')||'{}');
$('.heart').forEach((h,i)=>{const k=page+i,card=h.closest('.card');
 const name=card?card.querySelector('h3')?.textContent:'this game';
 h.classList.toggle('liked',!!store[k]);h.textContent=h.classList.contains('liked')?'♥':'♡';
 h.onclick=e=>{e.preventDefault();const on=h.classList.toggle('liked');h.textContent=on?'♥':'♡';
  on?store[k]=1:delete store[k];localStorage.setItem('likes',JSON.stringify(store));
  say(on?`💖 Added ${name} to favorites`:`💔 Removed ${name}`)}});

/* search + filter chips */
let q='',cat='All';
const items=$('[data-g], .grid .card');
const apply=()=>items.forEach(c=>{const t=(c.querySelector('h3')?.textContent||'').toLowerCase();
 const ok=t.includes(q)&&(cat=='All'||!c.dataset.g||c.dataset.g==cat);c.classList.toggle('hide',!ok)});
$('nav input')[0].oninput=e=>{q=e.target.value.trim().toLowerCase();apply()};
$('.chip').forEach(c=>c.onclick=()=>{$('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');cat=c.dataset.f;apply()});

/* buttons that do something */
$('.btn').forEach(b=>{if(b.textContent.includes('Download'))b.onclick=e=>{e.preventDefault();say('💾 Download started!')}});
$('.btn.ghost').forEach(b=>{if(b.textContent.trim()=='Download')b.onclick=()=>{b.textContent='✓ Downloading...';setTimeout(()=>b.textContent='Downloaded',1800)}});

/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$('section,.hero,.card').forEach(el=>{el.classList.add('reveal');io.observe(el)});

/* animated XP bar + stat counters */
$('.bar i').forEach(i=>{const w=i.style.width;i.style.width='0';setTimeout(()=>i.style.width=w,300)});
$('.stat b').forEach(b=>{const m=b.textContent.match(/^([\d,.]+)(.*)$/);if(!m)return;
 const end=parseFloat(m[1].replace(/,/g,'')),dec=m[1].includes('.')?1:0,t0=performance.now();
 const step=t=>{const p=Math.min((t-t0)/1200,1),v=end*p;b.textContent=(dec?v.toFixed(1):Math.round(v).toLocaleString())+m[2];if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)});

/* live viewer counts on streams */
const views=$('.who small').filter(s=>s.textContent.includes('👀')).map(s=>({s,n:parseFloat(s.textContent.match(/[\d.]+/)[0])}));
if(views.length)setInterval(()=>views.forEach(v=>{v.n=Math.max(.1,v.n+(Math.random()-.4)*.2);v.s.textContent=`👀 ${v.n.toFixed(1)}K watching`}),2500);

/* back to top */
const up=Object.assign(document.body.appendChild(document.createElement('button')),{className:'top-btn',textContent:'↑'});
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>up.classList.toggle('show',scrollY>400));

/* sparkles on click */
addEventListener('click',e=>{const s=document.createElement('span');s.className='spark';s.textContent=['✨','💖','⭐','🌸'][Math.random()*4|0];
 s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),800)});
});
