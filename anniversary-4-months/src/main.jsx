import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Sparkles, LockKeyhole, ChevronDown, Stars, Volume2, VolumeX, Play } from 'lucide-react';
import './styles.css';

const photos = Array.from({length:14}, (_,i) => `/images/memory-${i+1}.jpeg`);

const memories=[
 {month:'01',title:'The beginning',text:'Somehow, among all the people in this world, our paths crossed. And that little beginning became my favourite part of every day.'},
 {month:'02',title:'Getting closer',text:'Two months in, and you were no longer just someone I loved. You were becoming my comfort, my person, my safe place.'},
 {month:'03',title:'A little more us',text:'Three months taught me that love is not only the big moments. It is the random conversations, silly fights, laughter, and simply being there.'},
 {month:'04',title:'Today',text:'Four months. Four beautiful chapters. And somehow, I still feel like our story is only beginning.'}
];

function App(){
 const [open,setOpen]=useState(false);
 const [secret,setSecret]=useState(false);
 const [muted,setMuted]=useState(false);
 const [hearts,setHearts]=useState([]);
 const audioRef=useRef(null);

 useEffect(()=>{
   const id=setInterval(()=>setHearts(h=>[...h,{id:Date.now()+Math.random(),left:Math.random()*100,size:10+Math.random()*18}].slice(-18)),650);
   return()=>clearInterval(id)
 },[]);

 const celebrate=()=>{
   setOpen(true);
   setSecret(false);
   if(audioRef.current){
     audioRef.current.volume=.45;
     audioRef.current.play().catch(()=>{});
   }
   window.scrollTo({top:0,behavior:'smooth'});
 };

 const toggleMusic=()=>{
   if(!audioRef.current)return;
   if(audioRef.current.paused) audioRef.current.play().catch(()=>{});
   else audioRef.current.pause();
   setMuted(audioRef.current.paused);
 };

 return <div className="app">
   <audio ref={audioRef} src="/neelothi.mp3" loop preload="auto"/>
   <div className="grain"/>
   <div className="floating-hearts">{hearts.map(h=><span key={h.id} style={{left:`${h.left}%`,fontSize:h.size}} className="float">♥</span>)}</div>

   {open && <button className="music" onClick={toggleMusic} aria-label="Toggle music">
     {muted ? <VolumeX size={17}/> : <Volume2 size={17}/>} <span>{muted?'Play':'Neelothi'}</span>
   </button>}

   <section className="hero">
     <div className="orb orb1"/><div className="orb orb2"/>
     <div className="hero-photo"><img src={photos[0]} alt="Us"/></div>
     <div className="hero-inner">
       <div className="eyebrow"><Sparkles size={14}/> A little website made with a lot of love</div>
       <div className="big-heart"><Heart fill="currentColor"/></div>
       <p className="tiny">05 · 10 · 2026</p>
       <h1>Four months.<br/><em>One us.</em></h1>
       <p className="subtitle">Four months of little moments that somehow became a very big part of my heart.</p>
       <button className="primary" onClick={celebrate}>Open our little world <Heart size={17} fill="currentColor"/></button>
       <div className="scroll"><ChevronDown size={17}/> keep going</div>
     </div>
   </section>

   <main className={open?'revealed':''}>
    <section className="letter section">
      <div className="section-tag">A letter I really mean</div>
      <h2>Four months may sound small.<br/><span>But what I feel isn't.</span></h2>
      <div className="paper">
        <div className="paper-line"/>
        <p>My love,</p>
        <p>Four months ago, I didn't know that one person could slowly become such a beautiful part of my everyday life.</p>
        <p>Some days have been perfect. Some have been messy. We've laughed, we've argued, we've missed each other, we've understood each other — and through all of it, I have kept finding one simple thought:</p>
        <p className="highlight">“I'm really glad it's you.”</p>
        <p>Thank you for every conversation, every little effort, every moment you stayed, every time you made an ordinary day feel special.</p>
        <p>I don't want to promise you a perfect story. I want to promise you something better — that I'll keep choosing us, keep learning you, and keep making room for more memories.</p>
        <p className="sign">Happy 4th month anniversary, my love.<br/><span>Here's to everything we haven't lived yet. ❤️</span></p>
      </div>
    </section>

    <section className="gallery section">
      <div className="section-tag">Us, in little frames</div>
      <h2>The moments I would<br/><span>never want to forget.</span></h2>
      <div className="photo-grid">
        {photos.map((src,i)=><figure key={src} className={`photo p${i+1}`}>
          <img src={src} alt={`Our memory ${i+1}`} loading={i<4?'eager':'lazy'}/>
          <figcaption>{['the look','just us','our silly smiles','my favourite view','two hands, one heart','days with you','still choosing you','another little memory','you + me','ordinary days','the smiles I keep','wherever we are','home feels like this','and still… us'][i]}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="timeline section">
      <div className="section-tag">Our little timeline</div><h2>Four months.<br/><span>Four pieces of us.</span></h2>
      <div className="cards">{memories.map((m,i)=><article className="memory" key={m.month}><div className="num">{m.month}</div><div><h3>{m.title}</h3><p>{m.text}</p></div></article>)}</div>
    </section>

    <section className="promise section">
      <div className="promise-card"><Stars className="stars" size={22}/><p className="small">If I could pause time tonight...</p><h2>I wouldn't go back.</h2><p>I'd stay right here — with you, in this exact chapter — and then turn the page with you when we're ready.</p><div className="forever">4 months down <span>•</span> forever to discover</div></div>
    </section>

    <section className="secret section">
      {!secret ? <button className="secret-button" onClick={()=>setSecret(true)}><LockKeyhole size={19}/><span><small>ONE LAST THING</small>There is a secret waiting for you</span><span className="arrow">→</span></button>:
      <div className="secret-open"><div className="burst">♥</div><p className="small">THE SECRET</p><h2>You're my favourite<br/><em>chapter.</em></h2><p>And if this is only month four… I can't wait to see what our story looks like when we reach the pages we haven't written yet.</p><div className="signature">— always yours ❤️</div></div>}
    </section>
   </main>
   <footer>Made for one person who makes the world feel a little softer. <Heart size={13} fill="currentColor"/></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
