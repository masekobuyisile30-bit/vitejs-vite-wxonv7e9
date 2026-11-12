import { useState, useEffect, useCallback, useRef } from 'react'
import { Globe, Zap, Shield, Bot, TrendingUp, MessageCircle, Clock, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Menu, X, Mail, Phone, Quote, Sparkles, Layers, Rocket, Star } from 'lucide-react'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  const [heroWord, setHeroWord] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const heroWords = ['Websites', 'Automation', 'AI Agents', 'Growth']

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setHeroWord((p) => (p + 1) % heroWords.length), 2500)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      quote: "I was losing bookings because people couldn't find me online. Now the website does the work while I'm with clients. I've had to hire an assistant just to keep up.",
      author: 'Naledi Mokoena',
      role: "Owner, Naledi's Hair Studio, Soweto",
      metric: '3x more bookings',
      initial: 'N',
    },
    {
      quote: "I run a small cleaning company. Dovlix built me a booking system that sends confirmations automatically. I used to spend 2 hours a day on WhatsApp. Now it's zero.",
      author: 'Sipho Dlamini',
      role: 'Founder, SparkleClean Services, Durban',
      metric: '10hrs/week saved',
      initial: 'S',
    },
    {
      quote: "My old website was a template my nephew made. It looked cheap. Clients judged me before they even called. Now I look like a real business — and I get treated like one.",
      author: 'Riaan van der Merwe',
      role: 'Owner, Van der Merwe Plumbing, Pretoria',
      metric: 'Professional presence',
      initial: 'R',
    },
    {
      quote: "I was scared of the monthly fee. But one new client covers it. I got three in the first month.",
      author: 'Zanele Khumalo',
      role: "Owner, Zee's Catering, Johannesburg",
      metric: '3 new clients in month 1',
      initial: 'Z',
    },
    {
      quote: "The free audit alone was worth it. He told me exactly what was wrong and how to fix it — even the stuff I could do myself for free. That's when I knew I could trust him.",
      author: 'Fatima Patel',
      role: "Owner, Fatima's Fabric & Tailoring, Cape Town",
      metric: 'Trust built instantly',
      initial: 'F',
    },
  ]

  const nextTestimonial = useCallback(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), [testimonials.length])
  const prevTestimonial = useCallback(() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length])

  useEffect(() => {
    const t = setInterval(nextTestimonial, 6000)
    return () => clearInterval(t)
  }, [nextTestimonial])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragOffset(clientX - dragStartX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    if (dragOffset < -50) nextTestimonial()
    else if (dragOffset > 50) prevTestimonial()
    setIsDragging(false)
    setDragOffset(0)
  }

  const tm = testimonials[currentTestimonial]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    const formPayload = new FormData()
    formPayload.append('access_key', 'd7491172-e669-4746-8755-8ed0e4eb5c61')
    formPayload.append('name', formData.name)
    formPayload.append('email', formData.email)
    formPayload.append('message', formData.message)
    formPayload.append('subject', 'New Dovlix Enquiry')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formPayload })
      const data = await response.json()
      if (data.success) {
        setFormStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('idle')
      }
    } catch {
      setFormStatus('idle')
    }
  }

  const services = [
    { icon: <Globe size={22} />, title: 'Professional Websites', desc: 'High-performance business websites built to convert visitors into paying customers.' },
    { icon: <Zap size={22} />, title: 'Business Automation', desc: 'Bookings, follow-ups, invoicing — running silently while you focus on growth.' },
    { icon: <Bot size={22} />, title: 'AI Agents & Chatbots', desc: 'WhatsApp bots and web assistants that capture leads and book appointments 24/7.' },
    { icon: <TrendingUp size={22} />, title: 'SEO & Growth Intelligence', desc: 'Get found on Google. Organic search traffic turned into predictable revenue.' },
    { icon: <Layers size={22} />, title: 'Marketing Asset Production', desc: 'Branded content that makes your business look world-class.' },
    { icon: <Star size={22} />, title: 'Content Creation', desc: 'Social graphics, short-form video editing, email newsletters, and blog posts that build your brand.' },
    { icon: <Shield size={22} />, title: 'Security & Maintenance', desc: 'SSL certificates, DDoS protection, daily backups, and ongoing updates — your site stays safe and fast.' },
    { icon: <Rocket size={22} />, title: 'Digital Strategy', desc: 'Not sure where to start? We map your goals, audience, and budget into a clear roadmap.' },
  ]

  const tiers = [
    {
      name: 'Launch',
      tagline: 'For businesses that need to look professional online — fast.',
      price: '3,500',
      monthly: '350',
      features: ['3-page custom website', 'Mobile responsive design', 'Contact form → your email', 'Basic SEO setup', 'Domain setup and hosting', '1 revision round', 'Monthly hosting + security updates', 'Email support (48hr response)'],
      popular: false,
      icon: <Rocket size={20} />,
    },
    {
      name: 'Grow',
      tagline: 'For businesses ready to capture leads and automate the busy work.',
      price: '7,500',
      monthly: '650',
      features: ['Everything in Launch', '5-7 page custom website', 'Booking system or lead capture', 'WhatsApp integration', '3 professional email addresses', 'Google Business Profile setup', '2 revision rounds', 'Monthly performance report', 'Priority support (24hr response)'],
      popular: true,
      icon: <TrendingUp size={20} />,
    },
    {
      name: 'Elevate',
      tagline: 'For businesses that want a system running 24/7 — not just a website.',
      price: '14,000',
      monthly: '1,100',
      features: ['Everything in Grow', 'Unlimited pages (within reason)', 'Custom AI chatbot (WhatsApp + Web)', 'Advanced workflow automation', 'Client portal or admin dashboard', 'Analytics dashboard', 'Unlimited revisions during build', 'Same-day WhatsApp support', 'Monthly strategy call'],
      popular: false,
      icon: <Sparkles size={20} />,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900" style={{fontFamily: 'Inter, system-ui, sans-serif', scrollBehavior: 'smooth'}}>

      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DOV<span className="text-blue-800">LIX</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm text-slate-600">
            <a href="#services" className="hover:text-blue-800 transition-colors">Services</a>
            <a href="#pricing" className="hover:text-blue-800 transition-colors">Pricing</a>
            <a href="#process" className="hover:text-blue-800 transition-colors">Process</a>
            <a href="#testimonials" className="hover:text-blue-800 transition-colors">Results</a>
            <a href="#contact" className="hover:text-blue-800 transition-colors">Contact</a>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">Get Started <ArrowRight size={14} /></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-900 p-2">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-6 flex flex-col gap-5">
            <a href="#services" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-blue-800 text-sm">Services</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-blue-800 text-sm">Pricing</a>
            <a href="#process" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-blue-800 text-sm">Process</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-blue-800 text-sm">Results</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-blue-800 text-white px-5 py-3 rounded-lg text-center text-sm font-medium">Get Started</a>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-xs text-blue-800 mb-10">
            <Shield size={12} /> Digital transformation for businesses ready to grow
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight mb-8">
            We build the <span className="text-blue-800 font-normal">digital engine</span><br />behind your business.
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl text-slate-500 mb-12 h-8 font-light">
            <span>We deliver</span>
            <span className="text-blue-800 font-medium transition-all duration-500 min-w-[140px] text-left">{heroWords[heroWord]}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-7 py-3.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-200">Start Your Project <ArrowRight size={16} /></a>
            <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 px-7 py-3.5 rounded-lg text-sm font-medium transition-all"><MessageCircle size={16} /> WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-5">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
          <span>Websites</span><span className="text-slate-300">·</span>
          <span>Automation</span><span className="text-slate-300">·</span>
          <span>AI & Chatbots</span><span className="text-slate-300">·</span>
          <span>SEO</span><span className="text-slate-300">·</span>
          <span>Content Creation</span><span className="text-slate-300">·</span>
          <span>Marketing</span><span className="text-slate-300">·</span>
          <span>Security</span><span className="text-slate-300">·</span>
          <span>Strategy</span>
        </div>
      </section>

      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">What We Build For You</h2>
            <p className="text-slate-500 text-base font-light max-w-xl">Every solution engineered to save you time, bring in clients, and run without constant attention.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="group bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 mb-5 group-hover:bg-blue-800 group-hover:text-white transition-all duration-300">{s.icon}</div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Investment</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Transparent Pricing</h2>
            <p className="text-slate-500 text-base font-light max-w-xl mx-auto">Every business is different. These tiers give you a starting point — we'll tailor the final proposal to your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <div key={i} className={`relative bg-white border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${tier.popular ? 'border-blue-400 shadow-xl shadow-blue-100 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-200 hover:shadow-lg'}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-800 text-white px-4 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800">{tier.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6 font-light">{tier.tagline}</p>
                <div className="mb-6">
                  <span className="text-4xl font-light text-slate-900">R{tier.price}</span>
                  <span className="text-slate-500 text-sm"> once-off</span>
                </div>
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-lg font-medium text-blue-800">R{tier.monthly}</span>
                  <span className="text-slate-500 text-sm"> /month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-3 rounded-lg font-medium text-sm transition-all ${tier.popular ? 'bg-blue-800 text-white hover:bg-blue-900 shadow-lg shadow-blue-200' : 'border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-800'}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-10 font-light">All tiers include 50% deposit to begin, 50% on completion. Custom builds from R2,200 for standalone projects.</p>
        </div>
      </section>

      <section id="process" className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Process</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">How We Work</h2>
            <p className="text-slate-500 text-base font-light">From first message to live system. A 50% deposit initiates work upon agreement.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <MessageCircle size={22} />, step: '01', title: 'Discovery', desc: 'Real conversation about your goals. No jargon.' },
              { icon: <Clock size={22} />, step: '02', title: 'Roadmap', desc: 'Detailed proposal delivered within 24 hours.' },
              { icon: <Zap size={22} />, step: '03', title: 'Development', desc: 'Work begins after 50% deposit is received.' },
              { icon: <CheckCircle size={22} />, step: '04', title: 'Handover', desc: 'We deliver and walk you through everything.' },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-white border border-slate-200 group-hover:border-blue-300 rounded-xl flex items-center justify-center text-blue-800 mb-5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-100">{step.icon}</div>
                <p className="text-[10px] font-semibold text-blue-800 tracking-widest mb-2">STEP {step.step}</p>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">The Feeling of Transformation</h2>
            <p className="text-slate-500 text-base font-light">Our clients don't just see results — they feel the difference.</p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div
              ref={testimonialRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm cursor-grab active:cursor-grabbing select-none"
              style={{ transform: `translateX(${dragOffset * 0.3}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
            >
              <Quote className="text-blue-200 mb-6" size={32} />
              <p className="text-lg md:text-xl font-light leading-relaxed text-slate-700 mb-8 italic">"{tm.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-800 font-medium text-base">{tm.initial}</div>
                <div><p className="text-sm font-medium text-slate-900">{tm.author}</p><p className="text-xs text-slate-500 font-light">{tm.role}</p></div>
                <div className="ml-auto bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-medium text-blue-800">{tm.metric}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-1.5">{testimonials.map((_, i) => (<button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-blue-800' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} />))}</div>
              <div className="flex gap-1.5">
                <button onClick={prevTestimonial} className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-800 transition-colors"><ChevronLeft size={16} /></button>
                <button onClick={nextTestimonial} className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-800 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 font-light">Swipe or drag to navigate</p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-10 md:p-14">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-3 py-1.5 text-xs text-blue-800 mb-8 font-medium"><Sparkles size={12} /> Complimentary</div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">Not sure where to start?</h2>
            <p className="text-slate-500 text-base font-light mb-8 max-w-xl mx-auto leading-relaxed">Book a <span className="text-slate-900 font-medium">free 15-minute digital audit</span>. We'll assess your current online presence and tell you exactly what your business needs — no obligation, no pressure.</p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-7 py-3.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-200">Book Your Free Audit <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-32 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Let's Build Something</h2>
            <p className="text-slate-500 text-base font-light">One conversation. No obligation. Just clarity.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Send us a message</h3>
              {formStatus === 'sent' ? (
                <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-sm">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={28} className="text-green-600" /></div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Your enquiry has been submitted</h4>
                  <p className="text-slate-500 text-sm font-light">We will contact you shortly. Expect a response within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors font-light" />
                  <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors font-light" />
                  <textarea placeholder="Tell us about your business..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors resize-none font-light" />
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full py-3.5 rounded-lg text-sm font-medium bg-blue-800 hover:bg-blue-900 text-white transition-all shadow-lg shadow-blue-200 disabled:opacity-50">{formStatus === 'sending' ? 'Submitting...' : 'Send Message'}</button>
                </form>
              )}
            </div>
            <div className="flex flex-col justify-center gap-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Or reach us directly</h3>
              <a href="tel:0662135026" className="flex items-center gap-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><Phone size={18} /></div>
                <div><p className="text-sm font-medium text-slate-900">Call Us</p><p className="text-xs text-slate-500 font-light">066 213 5026</p></div>
              </a>
              <a href="mailto:info@dovlix.com" className="flex items-center gap-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><Mail size={18} /></div>
                <div><p className="text-sm font-medium text-slate-900">Email Us</p><p className="text-xs text-slate-500 font-light">info@dovlix.com</p></div>
              </a>
              <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all group">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all"><MessageCircle size={18} /></div>
                <div><p className="text-sm font-medium text-slate-900">WhatsApp</p><p className="text-xs text-slate-500 font-light">066 213 5026</p></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:flex md:items-center md:justify-between">
          <span className="text-lg font-bold tracking-tight mb-6 md:mb-0 text-slate-900">DOV<span className="text-blue-800">LIX</span></span>
          <div className="flex flex-wrap gap-8 text-xs text-slate-500 font-light">
            <a href="#services" className="hover:text-blue-800 transition-colors">Services</a>
            <a href="#pricing" className="hover:text-blue-800 transition-colors">Pricing</a>
            <a href="#process" className="hover:text-blue-800 transition-colors">Process</a>
            <a href="#contact" className="hover:text-blue-800 transition-colors">Contact</a>
          </div>
          <div className="mt-6 md:mt-0 text-xs text-slate-500 font-light">
            <a href="mailto:info@dovlix.com" className="hover:text-blue-800 transition-colors">info@dovlix.com</a>
          </div>
        </div>
        <div className="border-t border-slate-100 py-5 text-center text-[10px] text-slate-400 font-light">© 2026 Dovlix Solutions. Engineered in South Africa.</div>
      </footer>

      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a href="#contact" className="flex items-center justify-center gap-2 bg-blue-800 text-white py-3.5 rounded-lg text-sm font-medium shadow-lg">Start Your Project <ArrowRight size={14} /></a>
      </div>
    </div>
  )
}