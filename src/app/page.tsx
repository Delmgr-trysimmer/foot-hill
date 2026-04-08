'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, ChevronDown, Menu, X, Star, Play, ChevronRight, ChevronLeft, ArrowRight, CheckCircle } from 'lucide-react';

// ─── Motion helpers (lightweight fade-in on scroll) ──────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Services', 'Team', 'Blog', 'FAQ', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#12223a]/90 shadow-2xl py-3 border-b border-white/5 backdrop-blur-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center">
        {/* Logo - Left */}
        <div className="flex-1 flex items-center">
          <a href="#" className="flex items-center group">
            <div className="w-44 h-14 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all group-hover:bg-white/10 p-1">
              <img src="/image/logo.jpeg" alt="Foothill Dentistry Logo" className="w-full h-full object-contain" 
                   onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x200/F68B1E/white?text=FOOTHILL+DENTISTRY`; }} />
            </div>
          </a>
        </div>

        {/* Desktop nav - Center */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest transition-all hover:text-[#F68B1E] text-white">
              {link}
            </a>
          ))}
        </nav>

        {/* Action Group - Right */}
        <div className="flex-1 hidden lg:flex items-center justify-end gap-8">
          <a href="tel:+14032895567" className="flex items-center gap-3 text-sm font-bold text-white transition-all hover:text-[#F68B1E]">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Phone size={16} className="text-[#F68B1E]" />
            </div>
            <span>(403) 289-5567</span>
          </a>
          <a href="#contact"
            className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_10px_30px_-5px_#F68B1E]"
            style={{ backgroundColor: '#F68B1E' }}>
            Book now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#12223a] shadow-2xl px-5 pb-8 pt-4 border-b border-white/5 animate-slide-down">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
              className="block py-4 text-white font-bold uppercase tracking-widest border-b border-white/5 hover:text-[#F68B1E] text-sm">
              {link}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-4">
            <a href="tel:+14032895567" className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 text-white font-bold uppercase text-xs tracking-widest">
               <Phone size={14} /> Call us
            </a>
            <a href="#contact" className="block text-center px-5 py-4 rounded-xl font-black uppercase tracking-widest text-white text-xs shadow-lg"
              style={{ backgroundColor: '#F68B1E' }}>
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.45)' }}
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12223a]/60 via-transparent to-[#12223a]/90" />

      <div className="relative z-10 text-center px-4 max-w-[90rem] mx-auto flex flex-col items-center">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00AEEF] animate-pulse shadow-[0_0_10px_#00AEEF]" />
            <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">Now Accepting New Patients</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h1 className="text-5xl md:text-[8.5rem] font-black text-white mb-6 leading-[0.9] tracking-tighter" style={{ fontFamily: 'Sen, sans-serif' }}>
            A Bright New <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F68B1E] to-[#ffb800]">Smile Today.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="text-lg md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Full-service dental excellence tailored to your smile goals. Experience modern dental care in Calgary, AB. 
          </p>
        </FadeIn>

        <FadeIn delay={0.7} className="flex flex-col items-center gap-10">
          <a href="#contact"
            className="px-14 py-6 rounded-2xl font-black text-white text-base uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_20px_50px_-10px_#F68B1E]"
            style={{ backgroundColor: '#F68B1E' }}>
            Book Appointment
          </a>
          
          {/* Grouped Ratings below CTA */}
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              </div>
              <div className="text-left">
                 <div className="flex gap-1 mb-0.5">
                   {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="#F68B1E" stroke="none" />)}
                 </div>
                 <div className="text-white text-[10px] font-black tracking-widest uppercase opacity-60">4.9/5 Google Review</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <div className="w-5 h-5 bg-[#d32323] rounded-sm flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">Y</span>
                </div>
              </div>
              <div className="text-left">
                 <div className="flex gap-1 mb-0.5">
                   {[1,2,3,4].map(s => <Star key={s} size={11} fill="#F68B1E" stroke="none" />)}
                   <Star size={11} fill="#F68B1E" stroke="none" className="opacity-30" />
                 </div>
                 <div className="text-white text-[10px] font-black tracking-widest uppercase opacity-60">4.5/5 Yelp Rating</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#12223a]">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#00AEEF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] border border-white/10 p-2 bg-white/5 backdrop-blur-sm">
                <img 
                   src="/image/about-image.jpeg" 
                   alt="Foothill Dentistry" 
                   className="w-full h-[550px] object-cover rounded-[2.1rem]" 
                   onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x1200/1A365D/white?text=Our+Office`; }}
                />
              </div>
              {/* Floating review badge */}
              <div className="absolute -bottom-8 -left-8 bg-[#1a3050] rounded-3xl shadow-2xl p-7 border border-white/10 backdrop-blur-lg">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="#F68B1E" stroke="none" />)}
                </div>
                <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Sen, sans-serif' }}>Trusted by 2k+</div>
                <div className="text-xs text-gray-400 font-medium">Patients in Calgary, AB</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="space-y-8">
              <div>
                <p className="text-[#F68B1E] font-black uppercase tracking-[0.25em] text-xs mb-4">Welcome to Foothill Dentistry</p>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1]" style={{ fontFamily: 'Sen, sans-serif' }}>
                  Your Home for <br />
                  <span className="text-[#00AEEF]">Dental Care.</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300 text-xl leading-relaxed font-medium bg-white/5 p-6 rounded-3xl border-l-4 border-[#00AEEF]">
                  Welcome to Foothills Dentistry: Your Home for Dental Care in Calgary, AB. We offer patient-focused general dental care for children and adults with an emphasis on disease prevention.
                </p>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Dr. Shruti Chahal and our team emphasize patient education and open communication. Every treatment plan is tailored to achieve optimal, lasting smiles while ensuring a comfortable experience for patients of all ages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4">
                {[
                  { t: 'Advanced Technology', i: 'cpu' },
                  { t: 'Laser Dentistry', i: 'zap' },
                  { t: 'Flexible Payments', i: 'credit-card' },
                  { t: 'Emergency Support', i: 'shield' }
                ].map(f => (
                  <div key={f.t} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#00AEEF]/20 flex items-center justify-center">
                       <CheckCircle size={18} className="text-[#00AEEF]" />
                    </div>
                    <span className="text-white font-bold text-sm">{f.t}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a href="#services" className="px-8 py-4 rounded-2xl font-bold bg-[#1A365D] text-white transition-all hover:bg-[#1a3050] hover:shadow-2xl border border-white/10">
                  Our Services
                </a>
                <a href="tel:4032895567" className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-[#F68B1E] hover:underline">
                  <Phone size={18} /> Schedule Call
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Google Reviews ───────────────────────────────────────────────────────────
const reviews = [
  { name: 'Sarah M.', rating: 5, text: 'Dr. Chahal is absolutely wonderful! She explained everything clearly and made me feel at ease. Best dental experience I have ever had in Calgary.', date: '2 weeks ago' },
  { name: 'James T.', rating: 5, text: 'Incredible team! The office is modern and clean. My Invisalign treatment is going great and I can already see results.', date: '1 month ago' },
  { name: 'Priya K.', rating: 5, text: 'I was terrified of dentists but Dr. Chahal and her team changed that completely. So gentle and professional!', date: '3 weeks ago' },
  { name: 'Mike R.', rating: 5, text: 'Got my dental implants done here. The process was smooth and the results are amazing. Highly recommend!', date: '2 months ago' },
  { name: 'Linda W.', rating: 5, text: 'Excellent care, very thorough checkup. Staff is friendly and the office is state of the art. 5 stars!', date: '1 week ago' },
  { name: 'Chris B.', rating: 5, text: 'Quick, efficient and painless! They were able to fit me in for an emergency appointment same day.', date: '3 months ago' },
];

function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationFrameId: number;
    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scrollSide = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Double the reviews for seamless loop
  const totalReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-28 relative bg-[#12223a] overflow-hidden">
       {/* Background gradient */}
      <div className="absolute inset-0 gradient-navy opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 mb-16">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight" style={{ fontFamily: 'Sen, sans-serif' }}>Community <br/> Feedback.</h2>
              <div className="flex items-center gap-2 mt-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={24} fill="#F68B1E" stroke="none" />)}
                <span className="text-[#F68B1E] ml-2 text-xl font-black italic">4.9 Overall Rating</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => scrollSide('left')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F68B1E] hover:border-[#F68B1E] transition-all text-white group">
                <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
              </button>
              <button onClick={() => scrollSide('right')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F68B1E] hover:border-[#F68B1E] transition-all text-white group">
                <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-8 overflow-hidden whitespace-nowrap px-4 py-4 cursor-grab active:cursor-grabbing select-none"
      >
        {totalReviews.map((r, i) => (
          <div key={i} className="inline-block min-w-[350px] md:min-w-[450px] bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 hover:border-[#00AEEF]/30 transition-all duration-500 shadow-2xl vertical-top whitespace-normal">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="#F68B1E" stroke="none" />)}
              </div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2.5">
                <img src="/google-icon.svg" alt="Google" className="w-full h-full" />
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg italic mb-10">"{r.text}"</p>
            <div className="flex items-center gap-5 pt-8 border-t border-white/5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg"
                style={{ backgroundColor: '#F68B1E' }}>
                {r.name[0]}
              </div>
              <div>
                <div className="text-white font-black text-lg">{r.name}</div>
                <div className="text-[#00AEEF] text-xs font-black tracking-widest uppercase mt-1">{r.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  { title: 'Dental Implants', img: '/image/service-implants.jpg', desc: 'Permanent tooth replacement with natural-looking results.' },
  { title: 'Botox & Facial', img: '/image/service-botox.jpg', desc: 'Smooth fine lines and relieve TMJ disorders.' },
  { title: 'Laser Dentistry', img: '/image/service-laser.jpg', desc: 'Minimally invasive treatments for faster recovery.' },
  { title: 'Dental Bridges', img: '/image/service-bridges.jpg', desc: 'Restore your smile with custom-fitted bridges.' },
  { title: 'General Dentistry', img: '/image/service-general.jpg', desc: 'Comprehensive exams, cleanings and preventive care.' },
  { title: 'Teeth Whitening', img: '/image/service-whitening.jpg', desc: 'Professional whitening for a brighter, confident smile.' },
  { title: 'Root Canals', img: '/image/service-rootcanal.jpg', desc: 'Gentle, pain-free root canal therapy.' },
  { title: 'Family Dentistry', img: '/image/service-family.jpg', desc: 'Dental care for every member of your family.' },
  { title: 'Emergency Care', img: '/image/service-emergency.jpg', desc: 'Same-day emergency dental appointments available.' },
  { title: 'Invisalign', img: '/image/service-invisalign.jpg', desc: 'Clear aligners for a straighter smile without braces.' },
  { title: 'Crooked Teeth', img: '/image/service-ortho.jpg', desc: 'Orthodontic solutions for misaligned teeth.' },
  { title: 'Bleeding Gums', img: '/image/service-gums.jpg', desc: 'Periodontal treatment to restore gum health.' },
];

function Services() {
  return (
    <section id="services" className="py-28 relative bg-[#12223a]">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: 'Sen, sans-serif' }}>Superior Treatments</h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg font-medium">Full-service dental excellence tailored to your smile goals.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-[2rem] h-64 cursor-pointer shadow-2xl border border-white/5">
                <img src={s.img} alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x500/1A365D/white?text=${encodeURIComponent(s.title)}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12223a] via-[#12223a]/20 to-transparent group-hover:from-[#F68B1E]/90 transition-all duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-white font-black text-lg group-hover:tracking-[0.1em] transition-all duration-500" style={{ fontFamily: 'Sen, sans-serif' }}>
                    {s.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 leading-relaxed font-bold">
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Orthodontics Feature ─────────────────────────────────────────────────────
function OrthoSection() {
  return (
    <section id="ortho" className="py-28 bg-[#1a3050]/50 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn delay={0.2} className="lg:order-2">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
              <img src="/image/orthodontics-hero.jpg" alt="Invisalign Clear Aligners"
                className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/00AEEF/white?text=Invisalign+Technology'; }} />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1A365D]/40 to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="lg:order-1">
            <div className="space-y-8">
              <div>
                <p className="text-[#F68B1E] font-black uppercase tracking-[0.25em] text-xs mb-4">Straighten Your Smile</p>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-tight" style={{ fontFamily: 'Sen, sans-serif' }}>
                  Invisalign & <br /> Braces.
                </h2>
              </div>
              <p className="text-gray-300 text-xl leading-relaxed font-medium">
                Foothills Dentistry provides a full range of orthodontic treatments for children, teens, and adults. Our Calgary dentists offer Invisalign clear aligners, traditional metal braces, and cosmetic alternatives.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {['Invisalign', 'Metal Braces', 'Cosmetic Braces'].map(b => (
                  <a key={b} href="#contact"
                    className="px-8 py-4 rounded-2xl border-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-[#F68B1E] hover:border-[#F68B1E] hover:text-white"
                    style={{ borderColor: '#F68B1E', color: '#F68B1E' }}>
                    {b}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
const team = [
  {
    name: 'Dr. Shruti Chahal',
    role: 'Lead Dentist & Clinical Director',
    img: '/image/dr-shruti.jpg',
    bio: 'Dr. Shruti Chahal is passionate about enhancing smiles through modern dental treatments. With a keen eye for aesthetics and dedication to advanced education, she provides comprehensive, patient-centered care.',
    credentials: ['University of Alberta', 'Invisalign Expert', 'Laser Dentistry Specialist'],
  },
  {
    name: 'Clinical Team',
    role: 'Support & Hygiene',
    img: '/image/team.jpg',
    bio: 'Our experienced staff is dedicated to making every visit comfortable. From routine cleanings to specialist support, we are here for your health.',
    credentials: ['RDH Certified', 'Surgical Assistants', 'Pediatric Patient Care'],
  },
];

function Team() {
  return (
    <section id="team" className="py-28 relative bg-[#12223a]">
       <div className="absolute top-0 right-0 w-1/4 h-full gradient-navy opacity-20 -z-0" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white" style={{ fontFamily: 'Sen, sans-serif' }}>Meet the Experts</h2>
            <p className="text-[#00AEEF] mt-4 font-black tracking-widest uppercase text-sm">Professional care in Calgary, AB</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((doc, i) => (
            <FadeIn key={doc.name} delay={i * 0.2}>
              <div className="bg-white/5 rounded-[3rem] overflow-hidden border border-white/5 hover:border-[#F68B1E]/30 transition-all duration-500 group shadow-2xl">
                <div className="relative overflow-hidden h-96">
                  <img src={doc.img} alt={doc.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x800/1A365D/white?text=${encodeURIComponent(doc.name)}`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12223a] via-transparent to-transparent" />
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black text-white" style={{ fontFamily: 'Sen, sans-serif' }}>{doc.name}</h3>
                  <p className="text-[#F68B1E] font-black tracking-widest uppercase text-xs mt-2 mb-6">{doc.role}</p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 italic">"{doc.bio}"</p>
                  <div className="space-y-3">
                    {doc.credentials.map(c => (
                      <div key={c} className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <CheckCircle size={14} className="text-[#00AEEF]" />
                        <span className="text-xs text-white font-bold">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video Testimonials ───────────────────────────────────────────────────────
const videoTestimonials = [
  { name: 'Sarah Johnson', treatment: 'Implant Patient', thumbnail: '/vid-thumb-1.jpg' },
  { name: 'Mark Davis', treatment: 'Invisalign Case', thumbnail: '/vid-thumb-2.jpg' },
  { name: 'Emily Chen', treatment: 'Smile Restoration', thumbnail: '/vid-thumb-3.jpg' },
];

function VideoTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationFrameId: number;
    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += 0.8;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scrollSide = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -500 : 500;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const totalVideos = [...videoTestimonials, ...videoTestimonials, ...videoTestimonials];

  return (
    <section className="py-28 bg-[#1a3050] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <FadeIn>
          <div className="flex items-end justify-between">
            <h2 className="text-5xl md:text-7xl font-black text-white" style={{ fontFamily: 'Sen, sans-serif' }}>Patient Stories.</h2>
            <div className="flex gap-4">
              <button onClick={() => scrollSide('left')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all text-white group">
                <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
              </button>
              <button onClick={() => scrollSide('right')} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all text-white group">
                <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-8 overflow-hidden whitespace-nowrap px-4 py-8 cursor-grab active:cursor-grabbing select-none"
      >
        {totalVideos.map((v, i) => (
          <div key={i} className="inline-block min-w-[320px] md:min-w-[480px] group relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 cursor-pointer h-[400px] whitespace-normal">
            <img src={v.thumbnail} alt={v.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x800/12223a/white?text=${encodeURIComponent(v.name)}`; }} />
            <div className="absolute inset-0 bg-[#12223a]/60 group-hover:bg-[#12223a]/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#F68B1E] flex items-center justify-center group-hover:scale-125 transition-all shadow-[0_0_50px_-10px_#F68B1E]">
                <Play size={36} fill="white" className="text-white ml-2" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#12223a] to-transparent">
              <div className="text-white text-2xl font-black mb-1">{v.name}</div>
              <div className="text-[#00AEEF] font-black uppercase tracking-[0.2em] text-[11px]">{v.treatment}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blogs = [
  { title: 'Adult Invisalign in Calgary', snippet: 'Which orthodontic treatment is right for you? Orthodontics for adults is more comfortable than ever.', img: '/image/blog-1.jpg', date: 'March 2026', category: 'ORTHODONTICS' },
  { title: 'Cosmetic Financing', snippet: 'Dream smiles made affordable. Explore our flexible payment plans for implants and aesthetics.', img: '/image/blog-2.jpg', date: 'Feb 2026', category: 'FINANCING' },
  { title: 'Stop Bleeding Gums', snippet: 'Bleeding gums can indicate periodontal disease. Learn the steps to restore your gum health today.', img: '/image/blog-3.jpg', date: 'Feb 2026', category: 'GUM HEALTH' },
];

function Blog() {
  return (
    <section id="blog" className="py-28 relative bg-[#12223a]">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white" style={{ fontFamily: 'Sen, sans-serif' }}>The Patient Guide</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.1}>
              <article className="bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#F68B1E]/40 transition-all duration-500 group shadow-2xl">
                <div className="overflow-hidden h-60">
                  <img src={b.img} alt={b.title}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a3050/white?text=${encodeURIComponent(b.category)}`; }} />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-[10px] font-black tracking-[0.25em] text-[#00AEEF] uppercase">{b.category}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{b.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#F68B1E] transition-colors" style={{ fontFamily: 'Sen, sans-serif' }}>{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{b.snippet}</p>
                  <a href="#blog" className="inline-flex items-center gap-3 text-[#F68B1E] font-black text-[11px] uppercase tracking-widest hover:gap-5 transition-all">
                    Read Journal <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'What to do for crooked teeth?', a: 'We offer advanced orthodontic treatments like Invisalign and traditional metal braces to align your smile perfectly.' },
  { q: 'Solutions for missing teeth?', a: 'We feature high-quality full-service dental implants and bridges that mimic the look and function of natural teeth.' },
  { q: 'What to do for bleeding gums?', a: 'Bleeding gums are a symptom of periodontal disease. We provide specialized cleanings and treatments to restore your gum health.' },
  { q: 'Do you accept dental insurance?', a: 'Yes, we work with most dental insurance providers and offer direct billing options for your convenience.' },
  { q: 'Is financing available?', a: 'Absolutely. We believe dental care should be accessible. We offer flexible financing plans through third-party partners.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#1a3050]/30 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Sen, sans-serif' }}>Your Concerns, <br />Answered.</h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="bg-[#12223a] rounded-[1.5rem] overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-7 text-left"
                >
                  <span className="font-black text-white text-lg md:text-xl" style={{ fontFamily: 'Sen, sans-serif' }}>{f.q}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-[#F68B1E] border-[#F68B1E] rotate-180' : ''}`}>
                     <ChevronDown size={18} className="text-white" />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${open === i ? 'max-h-60 py-8 opacity-100' : 'max-h-0 py-0 opacity-0'} px-8 border-t border-white/5`}>
                  <p className="text-gray-400 text-lg leading-relaxed">{f.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-28 relative bg-[#12223a]">
       {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-[#F68B1E]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
            <p className="text-[#00AEEF] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Appointments</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight" style={{ fontFamily: 'Sen, sans-serif' }}>Join Foothill.</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-10">
              {[
                { icon: MapPin, label: 'Visit Our Practice', val: '123 Foothill Drive NW, Calgary, AB' },
                { icon: Phone, label: 'Direct Hotline', val: '(403) 289-5567' },
                { icon: Clock, label: 'Office Hours', val: 'Mon–Fri: 8:00 AM – 5:00 PM' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-8 group">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F68B1E]/10 transition-colors border border-white/5">
                    <item.icon size={26} className="text-[#F68B1E]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-1">{item.label}</div>
                    <div className="text-white text-2xl font-black" style={{ fontFamily: 'Sen, sans-serif' }}>{item.val}</div>
                  </div>
                </div>
              ))}

              <div className="rounded-[2.5rem] overflow-hidden h-72 border border-white/10 shadow-2xl relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2509.4!2d-114.0!3d51.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalgary+AB!5e0!3m2!1sen!2sca!4v1"
                  width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} loading="lazy" title="Office Location" />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-[#12223a]/50" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <form className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 shadow-2xl space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Name</label>
                   <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F68B1E] transition-all" />
                </div>
                <div className="col-span-2 md:col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Email</label>
                   <input type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F68B1E] transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Service Requested</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/40 focus:outline-none focus:border-[#F68B1E] transition-all">
                    <option value="">Select treatment...</option>
                    {services.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Your Message</label>
                <textarea rows={4} placeholder="Describe your dental concern..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F68B1E] transition-all resize-none" />
              </div>
              <button type="button"
                className="w-full py-6 rounded-2xl font-black text-white text-base uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_#F68B1E]"
                style={{ backgroundColor: '#F68B1E' }}>
                Request Consultation
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f1c2e] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00AEEF]/5 blur-[150px] -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-xl transition-transform hover:rotate-12">
                 <img src="/image/logo.jpeg" alt="Foothill Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-2xl leading-tight block" style={{ fontFamily: 'Sen, sans-serif' }}>Foothill <br/>Dentistry</span>
              </div>
            </div>
            <p className="text-gray-450 leading-relaxed max-w-xs text-sm">Patient-focused high-end dental care for the families of Calgary, AB. Your satisfaction is our priority.</p>
            <div className="flex gap-4 mt-10">
              {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#F68B1E] transition-all duration-300 hover:-translate-y-1">
                  <span className="text-[10px] font-black uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F68B1E] mb-10" style={{ fontFamily: 'Sen, sans-serif' }}>Directory</h4>
            <ul className="space-y-5">
              {['About Foothill', 'Our Services', 'Meet Dr. Chahal', 'Patient Portal', 'Latest News', 'Privacy Policy'].map(l => (
                <li key={l}><a href="#" className="text-gray-400 text-sm font-bold hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F68B1E] mb-10" style={{ fontFamily: 'Sen, sans-serif' }}>Treatments</h4>
            <ul className="space-y-5">
              {['Invisalign Clear Aligners', 'Laser Gum Therapy', 'Dental Implant Surgery', 'Aesthetic Botox', 'Root Canal Precision', 'Pediatric Checkups'].map(l => (
                <li key={l}><a href="#services" className="text-gray-400 text-sm font-bold hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F68B1E] mb-10" style={{ fontFamily: 'Sen, sans-serif' }}>Business Info</h4>
            <div className="space-y-6 text-sm text-gray-400 font-bold">
              <p className="flex gap-4"><MapPin size={16} className="text-[#00AEEF] flex-shrink-0" /> 123 Foothill Drive NW, <br/>Calgary, AB T1K 2M3</p>
              <p className="flex gap-4"><Phone size={16} className="text-[#00AEEF] flex-shrink-0" /> (403) 289-5567</p>
              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Monday - Friday</span>
                  <span className="text-white text-xs">8 AM – 5 PM</span>
                </div>
                <div className="flex justify-between items-center opacity-40">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Saturday - Sunday</span>
                  <span className="text-white text-xs">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:row justify-between items-center gap-6">
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
             © 2026 Foothill Dentistry. Designed with Excellence.
           </div>
           <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.1em] text-gray-500">
             <a href="#" className="hover:text-[#F68B1E]">Terms</a>
             <a href="#" className="hover:text-[#F68B1E]">Direct Billing</a>
             <a href="#" className="hover:text-[#F68B1E]">Accessibility</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <OrthoSection />
      <Reviews />
      <VideoTestimonials />
      <Team />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
