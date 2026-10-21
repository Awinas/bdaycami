
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function burst(x=innerWidth/2,y=innerHeight/2,count=28){const symbols=['♡','✦','✿','✨','♥','🌷'];for(let i=0;i<count;i++){const e=document.createElement('span');e.className='sparkle';e.textContent=symbols[Math.floor(Math.random()*symbols.length)];e.style.left=x+'px';e.style.top=y+'px';e.style.color=['#d85d91','#b77be1','#e6a8bd','#bd8dd8'][i%4];e.style.setProperty('--dx',(Math.random()-.5)*320+'px');e.style.setProperty('--dy',(Math.random()-.7)*280+'px');document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}}
$$('[data-burst]').forEach(el=>el.addEventListener('click',e=>burst(e.clientX||innerWidth/2,e.clientY||innerHeight/2,32)));
/* ================= MUSIC =================
   Put your mp3 files in the "music" folder, then list them here (in play order).
   Leave the list empty to use the built-in tiny tune instead. */
const SONGS=[
  // 'music/song1.mp3',
  // 'music/song2.mp3',
];
const MUSIC_KEY='bdayMusic';
let audioCtx=null,musicOn=false,musicTimer=null,player=null,track=0,synthOn=false;
const musicBtn=$('#musicBtn');
function setBtn(label,on){if(!musicBtn)return;musicBtn.textContent=label;musicBtn.setAttribute('aria-pressed',on?'true':'false')}
function saveMusic(){try{localStorage.setItem(MUSIC_KEY,JSON.stringify({on:musicOn,i:track,t:player?player.currentTime:0}))}catch(e){}}
function makePlayer(){
  if(player)return player;
  player=new Audio();player.preload='auto';player.volume=.65;
  player.addEventListener('ended',()=>{track=(track+1)%SONGS.length;player.src=SONGS[track];if(musicOn)player.play().catch(()=>{})});
  player.addEventListener('error',()=>{ /* file missing or unsupported → fall back to the tiny tune */ player=null;if(musicOn)startSynth()});
  player.src=SONGS[track];return player;
}
async function startSynth(){
  try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();await audioCtx.resume();synthOn=true;setBtn('♫ Pause music',true);playTune()}
  catch(e){musicOn=false;setBtn('♫ Music unavailable',false)}
}
async function startMusic(resume){
  musicOn=true;
  if(!SONGS.length){await startSynth();saveMusic();return}
  const p=makePlayer();
  try{await p.play();setBtn('♫ Pause music',true);saveMusic()}
  catch(e){ if(resume){setBtn('♫ Tap to resume',false);const go=()=>{document.removeEventListener('pointerdown',go);if(musicOn)startMusic(false)};document.addEventListener('pointerdown',go,{once:true})} else {musicOn=false;setBtn('♫ Play music',false)} }
}
function stopMusic(){
  musicOn=false;if(player)player.pause();
  synthOn=false;clearTimeout(musicTimer);
  setBtn('♫ Play music',false);saveMusic();
}
if(musicBtn){
  setBtn('♫ Play music',false);
  musicBtn.addEventListener('click',()=>{musicOn?stopMusic():startMusic(false)});
  // keep the music going when she moves to another page
  try{
    const saved=JSON.parse(localStorage.getItem(MUSIC_KEY)||'null');
    if(saved&&saved.on){
      track=SONGS.length?Math.min(saved.i||0,SONGS.length-1):0;
      if(SONGS.length){const p=makePlayer();p.addEventListener('loadedmetadata',()=>{if(saved.t&&saved.t<p.duration)p.currentTime=saved.t},{once:true})}
      startMusic(true);
    }
  }catch(e){}
  setInterval(()=>{if(musicOn&&player)saveMusic()},1000);
  addEventListener('pagehide',saveMusic);
}
function playTune(){const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,783.99];let i=0;function next(){if(!musicOn||!synthOn)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=notes[i++%notes.length];g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.035,audioCtx.currentTime+.04);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.38);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.4);musicTimer=setTimeout(next,450)}next()}
const countdown=$('#countdown');
if(countdown&&!document.documentElement.classList.contains('locked')){function tick(){let d=Math.max(0,(window.BDAY_TARGET||0)-Date.now());const over=d===0;const days=Math.floor(d/86400000);d%=86400000;const hours=Math.floor(d/3600000);d%=3600000;const mins=Math.floor(d/60000);const secs=Math.floor(d%60000/1000);[['days',days],['hours',hours],['mins',mins],['secs',secs]].forEach(([id,v])=>{const el=$('#'+id);if(el)el.textContent=id==='days'?v:String(v).padStart(2,'0')});const note=$('#countNote');if(note)note.textContent=over?'It’s your day, birthday girl! 🎂':'Counting down to October 23rd ✨'}tick();setInterval(tick,1000)}
const letterBtn=$('#letterBtn');if(letterBtn)letterBtn.addEventListener('click',()=>{const hidden=$('#secretLetter');const on=hidden.classList.toggle('show');letterBtn.textContent=on?'A little more love, unlocked ♡':'Unlock the secret note 💌';if(on)burst(innerWidth/2,innerHeight/2,24)});
const wishBtn=$('#wishBtn');if(wishBtn)wishBtn.addEventListener('click',()=>{const wishes=['May your days be full of tiny joys and giant dreams. 🌷','May every cat you meet decide you are their favourite human. 🐈','May every book take you somewhere wonderful. 📚','May love find you in ordinary little moments. 💗','May this year surprise you in the loveliest ways. ✨','May your heart always feel at home somewhere. ☁️'];$('#wishOutput').textContent=wishes[Math.floor(Math.random()*wishes.length)];burst(innerWidth/2,innerHeight/2,36)});
$$('[data-cat]').forEach(el=>el.addEventListener('click',()=>{const messages=['This cat has chosen you. You are legally required to accept the purrs. 🐾','Meow means “you deserve a lovely birthday.”','A tiny cat has delivered one (1) invisible tulip. 🌷','Cat verdict: 10/10 human. Would nap beside again.','Your lap has been added to the premium cat lounge.'];const status=$('#catStatus');if(status)status.textContent=messages[Math.floor(Math.random()*messages.length)];burst(innerWidth/2,innerHeight*.65,12)}));
$$('[data-flower]').forEach(el=>el.addEventListener('click',()=>{el.classList.toggle('picked');el.querySelector('.flower-emoji').textContent=el.classList.contains('picked')?'💐':'🌷';const picked=$$('.flower.picked').length;const status=$('#gardenStatus');if(status)status.textContent=picked===8?'Your tulip garden is in full bloom! You did that. 🌷':`${picked} of 8 tulips picked. Keep growing your little garden!`;burst(innerWidth/2,innerHeight*.55,8)}));
$$('[data-answer]').forEach(el=>el.addEventListener('click',()=>{const answer=$('#quizAnswer');$$('[data-answer]').forEach(b=>b.classList.remove('chosen'));el.classList.add('chosen');const messages={tulips:'Correct energy. A tulip bouquet has entered the chat. 🌷',cats:'Excellent choice. The cat council approves. 🐈',books:'A bookworm knows a good answer when they see one. 📚'};answer.textContent=messages[el.dataset.answer]||'A perfect answer! ♡';burst(innerWidth/2,innerHeight*.55,15)}));

$$('[data-mood]').forEach(el=>el.addEventListener('click',()=>{const m={cozy:'Plan: blanket burrito, warm drink, soft playlist. Do absolutely nothing else. ☕',rainy:'Perfect. Listen to the rain, wear fuzzy socks, and let the world wait. 🌧️',late:'Dim lights, sleepy cat, one last comfort snack. You’ve earned it. 🌙',happy:'Then today deserves a little celebration. Dance a bit, smile a lot. 🌷'};$$('[data-mood]').forEach(b=>b.classList.remove('chosen'));el.classList.add('chosen');$('#moodOutput').textContent=m[el.dataset.mood];burst(innerWidth/2,innerHeight*.5,14)}));
$$('[data-cozy]').forEach(el=>el.addEventListener('click',()=>{el.classList.toggle('chosen');const all=$$('[data-cozy]'),n=all.filter(b=>b.classList.contains('chosen')).length,pct=Math.round(n/all.length*100);$('#cozyBar').style.width=pct+'%';$('#cozyMsg').textContent=pct===100?'Cozy meter: 100%. Maximum comfort unlocked! 🏆':`Cozy meter: ${pct}%. ${n?'Getting comfy…':'Tap something to start. 🌱'}`;if(pct===100)burst(innerWidth/2,innerHeight*.6,30)}));
const readBtn=$('#readBtn');if(readBtn)readBtn.addEventListener('click',()=>{const v=['Something sweet and fluffy that makes you smile. 🍰','A cozy mystery with lots of tea and one suspicious cat. 🐈','A dreamy love story that makes you sigh. 💗','A gentle adventure in a faraway little town. 🌿','Something funny you’ll read with a big grin. 😄','A comfort re-read. Old favourites are the best. 🧸'];$('#readOutput').textContent=v[Math.floor(Math.random()*v.length)];burst(innerWidth/2,innerHeight*.6,22)});
