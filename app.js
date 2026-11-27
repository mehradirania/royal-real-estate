const KEY='royal_real_estate_v4';
const defaults={
 phone:'09109499986',
 activity:'شهریار، فردوسیه و حومه',
 contactText:'برای دریافت مشاوره و راهنمایی خرید، فروش و اجاره ملک با ما در ارتباط باشید.',
 channel:'https://whatsapp.com/channel/0029VbB6L095kg6wnPC4Fn1v',
 posts:[
  {id:'villa-royal',title:'ویلا لاکچری چسب بافت',location:'یوسف‌آباد',area:'۱۰۰۰ متر عرصه / ۳۰۰ متر بنا',rooms:'—',price:'استعلام قیمت',description:'ویلای لاکچری چسب بافت در موقعیت یوسف‌آباد. عرصه ۱۰۰۰ متر، ۳۰۰ متر بنا و ۳۰ متر سرایداری. دارای انشعاب آب و گاز مصرفی و برق با کنتور در اقدام. وکالت از سند مادر.',images:['assets/villa.jpg'],featured:true},
  {id:'karasteh-131',title:'فروش فوری، واحد ۱۳۱ متری در کرشته شهریار',location:'کرشته، شهریار',area:'۱۳۱ متر',rooms:'—',price:'استعلام قیمت',description:'فروش فوری! فرصتی استثنایی در کرشته شهریار! واحد ۱۳۱ متری، سنددار، تازه ساخت و کلید‌نخورده. ساختمان ۱۶ واحدی با تراکم بسیار کم، فقط ۴ واحد در هر طبقه. این واحد به صورت خام آماده فروش است.',images:['assets/apartment-building.jpg','assets/apartment-raw.jpg'],featured:true},
  {id:'apt-100',title:'آپارتمان ۱۰۰ متری فول امکانات',location:'شهریار و حومه',area:'۱۰۰ متر',rooms:'—',price:'استعلام قیمت',description:'۱۰۰ متر قولنامه، پارکینگ اختصاصی، فول امکانات، روبه نما، کف و نما و پله‌ها سنگ، آسانسور و انباری.',images:['assets/apartment-kitchen.jpg'],featured:true}
 ]
};
function load(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(defaults)}catch(e){return structuredClone(defaults)}}
function save(data){localStorage.setItem(KEY,JSON.stringify(data))}
function normalize(){const d=load();if(!d.phone)d.phone=defaults.phone;if(!d.channel)d.channel=defaults.channel;if(!d.activity)d.activity=defaults.activity;if(!Array.isArray(d.posts))d.posts=defaults.posts;return d}
function wa(phone){const digits=(phone||'').replace(/\D/g,'');return `https://wa.me/98${digits.replace(/^0/,'')}`}
function tel(phone){return `tel:${(phone||'').replace(/\s/g,'')}`}
function render(){const d=normalize();
 document.getElementById('headerPhone').href=tel(d.phone);document.getElementById('headerWhatsapp').href=wa(d.phone);document.getElementById('mobileWhatsapp').href=wa(d.phone);
 document.getElementById('footerPhone').href=tel(d.phone);document.getElementById('footerPhone').textContent=d.phone;document.getElementById('footerWhatsapp').href=wa(d.phone);
 document.getElementById('contactText').textContent=d.contactText;document.getElementById('activityArea').textContent=d.activity;
 document.getElementById('socialWhatsapp').href=wa(d.phone);document.getElementById('socialWhatsappText').textContent=d.phone;
 document.getElementById('channelLink').href=d.channel;document.getElementById('socialChannel').href=d.channel;
 const grid=document.getElementById('propertyGrid');grid.innerHTML='';const posts=d.posts.filter(p=>p.featured!==false);
 posts.forEach(p=>grid.appendChild(card(p)));
 if(!posts.length)grid.innerHTML='<div class="empty">فعلاً آگهی ویژه‌ای ثبت نشده است.</div>';
}
function card(p){const el=document.createElement('article');el.className='property-card';const img=(p.images&&p.images[0])||'assets/header.png';el.innerHTML=`<div class="property-image-wrap"><img class="property-image" src="${img}" alt="${esc(p.title)}"><span class="badge">پیشنهاد رویال</span><button class="share" onclick="sharePost('${p.id}')">↗</button></div><div class="property-body"><h3 class="property-title">${esc(p.title)}</h3><div class="property-meta"><span class="meta">📍 ${esc(p.location||'')}</span><span class="meta">▣ ${esc(p.area||'')}</span>${p.rooms&&p.rooms!=='—'?`<span class="meta">⌂ ${esc(p.rooms)} خواب</span>`:''}<span class="meta">${(p.images||[]).length} تصویر</span></div><div class="price">قیمت: ${esc(p.price||'استعلام قیمت')}</div><div class="property-actions"><a class="call" href="${tel(normalize().phone)}">تماس</a><a class="outline-btn" href="javascript:openPost('${p.id}')">جزئیات</a></div></div>`;return el}
function openPost(id){const d=normalize(),p=d.posts.find(x=>x.id===id);if(!p)return;const text=`${p.title}\n${p.location||''}\n${p.area||''}\n${p.description||''}`;alert(text)}
async function sharePost(id){const d=normalize(),p=d.posts.find(x=>x.id===id);if(!p)return;const data={title:p.title,text:p.description||p.title};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{navigator.clipboard?.writeText(data.text);alert('متن آگهی کپی شد.')}}
function scrollToProperties(){document.getElementById('properties').scrollIntoView({behavior:'smooth'})}
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
render();
