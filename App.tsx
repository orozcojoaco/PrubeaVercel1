/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BookOpen, Globe, Zap, Microscope, MapPin, Menu, X, Calendar, ChevronLeft, ChevronRight, GraduationCap, Award, PenTool } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import NewsCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { NewsItem, Career } from './types';

// Dummy Data for News (ex-Lineup) with NEW IMAGES
const NEWS_ITEMS: NewsItem[] = [
  { 
    id: '1', 
    title: 'Avance en Vacunas', 
    category: 'Medicina & Ciencia', 
    date: 'OCT 2025', 
    image: 'https://images.unsplash.com/photo-1584036561566-b45238f2e121?q=80&w=1000&auto=format&fit=crop',
    description: 'Investigadores de la Facultad de Medicina desarrollan un nuevo vector viral para inmunización rápida, reconocido internacionalmente por la OMS.'
  },
  { 
    id: '2', 
    title: 'Premio Pritzker Estudiantil', 
    category: 'FADU - Arquitectura', 
    date: 'SEP 2025', 
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000&auto=format&fit=crop',
    description: 'Estudiante de último año de la FADU recibe mención honorífica global por su diseño de viviendas sostenibles de bajo costo para zonas urbanas.'
  },
  { 
    id: '3', 
    title: 'Sátelite UBA-2', 
    category: 'Ingeniería', 
    date: 'AGO 2025', 
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1000&auto=format&fit=crop',
    description: 'El departamento de Ingeniería Aeroespacial lanza con éxito el segundo nanosatélite diseñado y construido íntegramente en los laboratorios de Paseo Colón.'
  },
  { 
    id: '4', 
    title: 'Litigio Internacional', 
    category: 'Derecho', 
    date: 'JUL 2025', 
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop',
    description: 'El equipo de la UBA se consagra campeón mundial en la competencia de alegatos de derechos humanos en Ginebra, superando a Harvard y Oxford.'
  },
  { 
    id: '5', 
    title: 'IA en Económicas', 
    category: 'Ciencias Económicas', 
    date: 'JUN 2025', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'Nuevo paper de investigación sobre modelos predictivos de inflación utilizando redes neuronales es publicado en el Quarterly Journal of Economics.'
  },
  { 
    id: '6', 
    title: 'Descubrimiento Paleontológico', 
    category: 'Exactas', 
    date: 'MAY 2025', 
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop',
    description: 'Expedición de Exactas halla restos de un nuevo titanosaurio en la Patagonia, reescribiendo la historia del Cretácico en la región.'
  },
];

// Data for Careers (ex-Tickets) with NEW IMAGES
const CAREERS: Career[] = [
  { 
    id: 'c1', 
    name: 'Medicina', 
    faculty: 'Facultad de Ciencias Médicas',
    duration: '6 Años + Residencia', 
    color: 'white', 
    description: 'Formación de excelencia en salud humana, con prácticas en los hospitales universitarios más importantes de la región. Un compromiso con la vida y la ciencia.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
    features: [
      { icon: Microscope, title: 'Investigación', desc: 'Acceso a laboratorios de punta.' },
      { icon: MapPin, title: 'Red Hospitalaria', desc: 'Prácticas en Hospital de Clínicas.' },
      { icon: Globe, title: 'Impacto Social', desc: 'Programas de salud comunitaria.' }
    ]
  },
  { 
    id: 'c2', 
    name: 'Arquitectura', 
    faculty: 'FADU',
    duration: '5 Años + CBC', 
    color: 'teal', 
    description: 'Donde la creatividad encuentra la técnica. Diseña el futuro de las ciudades en un entorno que fomenta la innovación proyectual y la sustentabilidad.',
    image: 'https://images.unsplash.com/photo-1565514020176-db7159f518fa?q=80&w=1000&auto=format&fit=crop',
    features: [
      { icon: PenTool, title: 'Taller Vertical', desc: 'Metodología única de enseñanza.' },
      { icon: Globe, title: 'Urbanismo', desc: 'Proyectos de escala real.' },
      { icon: Award, title: 'Prestigio', desc: 'Reconocimiento internacional.' }
    ]
  },
  { 
    id: 'c3', 
    name: 'Ingeniería', 
    faculty: 'FIUBA',
    duration: '5 Años + CBC', 
    color: 'periwinkle', 
    description: 'Desarrolla soluciones tecnológicas para problemas complejos. Desde ingeniería civil hasta informática y aeroespacial, construye el motor productivo del país.',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1000&auto=format&fit=crop',
    features: [
      { icon: Zap, title: 'Innovación', desc: 'Proyectos con industria.' },
      { icon: Microscope, title: 'Tecnología', desc: 'Laboratorios de robótica e IA.' },
      { icon: Globe, title: 'Conexión Global', desc: 'Intercambios con el mundo.' }
    ]
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // State for selected career (replaces purchase logic)
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);

  const selectedCareerData = CAREERS.find(c => c.id === selectedCareerId);

  // Handle keyboard navigation for news modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedNews) return;
      if (e.key === 'ArrowLeft') navigateNews('prev');
      if (e.key === 'ArrowRight') navigateNews('next');
      if (e.key === 'Escape') setSelectedNews(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNews]);

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareerId(careerId);
    // Smooth scroll to the summary section (formerly Experience)
    setTimeout(() => {
        scrollToSection('summary');
    }, 100);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateNews = (direction: 'next' | 'prev') => {
    if (!selectedNews) return;
    const currentIndex = NEWS_ITEMS.findIndex(a => a.id === selectedNews.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % NEWS_ITEMS.length;
    } else {
      nextIndex = (currentIndex - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length;
    }
    setSelectedNews(NEWS_ITEMS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#fbbf24] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">UBA</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Destacados', 'Carreras', 'Información'].map((item) => {
            const sectionId = item === 'Destacados' ? 'news' : item === 'Carreras' ? 'careers' : 'summary';
            return (
                <button 
                key={item} 
                onClick={() => scrollToSection(sectionId)}
                className="hover:text-[#fbbf24] transition-colors text-white cursor-pointer bg-transparent border-none"
                data-hover="true"
                >
                {item}
                </button>
            )
          })}
        </div>
        <button 
          onClick={() => window.open('https://www.uba.ar', '_blank')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Sitio Oficial
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#075985]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { label: 'Destacados', id: 'news' },
              { label: 'Carreras', id: 'careers' },
              { label: 'Información', id: 'summary' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-bold text-white hover:text-[#fbbf24] transition-colors uppercase bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => window.open('https://www.uba.ar', '_blank')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Sitio Oficial
            </button>
            
            <div className="absolute bottom-10 flex gap-6">
               <a href="#" className="text-white/50 hover:text-white transition-colors">Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Date / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#fbbf24] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Buenos Aires</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#38bdf8] rounded-full animate-pulse"/>
            <span>Est 1821</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="UBA" 
              as="h1" 
              className="text-[20vw] md:text-[20vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            {/* Optimized Orb */}
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Excelencia Académica . Investigación . Futuro
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-[#fbbf24] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    ORGULLO UBA <span className="text-[#fbbf24] text-2xl md:text-4xl">●</span> 
                    CIENCIA Y TÉCNICA <span className="text-[#fbbf24] text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* NEWS SECTION (Ex-Lineup) */}
      <section id="news" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Novedades <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">Destacadas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {NEWS_ITEMS.map((item) => (
              <NewsCard key={item.id} item={item} onClick={() => setSelectedNews(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS SECTION (Ex-Tickets, moved up) */}
      <section id="careers" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#0c4a6e]/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white">
               ACADEMIA
             </h2>
             <p className="text-[#fbbf24] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Elegí tu camino
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAREERS.map((career, i) => {
              const isSelected = selectedCareerId === career.id;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  onClick={() => handleCareerSelect(career.id)}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[450px] md:min-h-[550px] transition-all duration-300 cursor-pointer group bg-gradient-to-b from-white/5 to-transparent hover:border-[#fbbf24]/50 will-change-transform ${isSelected ? 'border-[#fbbf24] bg-white/5' : ''}`}
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#fbbf24]/50 transition-colors" />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white group-hover:text-[#fbbf24] transition-colors">{career.name}</h3>
                    <div className="text-sm font-mono text-gray-400 mb-8 border-b border-white/10 pb-4">
                      {career.faculty}
                    </div>
                    
                    <ul className="space-y-4 md:space-y-6 text-sm text-gray-300">
                       <li className="flex items-center gap-3"><GraduationCap className="w-5 h-5 text-[#fbbf24]" /> Grado Universitario</li>
                       <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-gray-400" /> {career.duration}</li>
                       <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-gray-400" /> Ciudad Universitaria</li>
                    </ul>
                  </div>
                  
                  <button 
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isSelected 
                        ? 'bg-[#fbbf24] text-black border-[#fbbf24]' 
                        : 'text-white hover:bg-white hover:text-black'
                      }`}
                  >
                    <span className="relative z-10">
                      {isSelected ? 'Seleccionada' : 'Ver Información'}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUMMARY / EXPERIENCE SECTION (Ex-Experience, content dynamic based on selection) */}
      <section id="summary" className="relative z-10 py-20 md:py-32 bg-[#0c4a6e]/40 backdrop-blur-sm border-t border-white/10 overflow-hidden min-h-[800px] flex items-center">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#38bdf8]/20 rounded-full blur-[60px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative w-full">
          <AnimatePresence mode="wait">
            {selectedCareerData ? (
              <motion.div 
                key={selectedCareerData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center"
              >
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-[#fbbf24] rounded-full"></span>
                    <span className="text-[#fbbf24] font-mono tracking-widest text-sm uppercase">Resumen de Carrera</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{selectedCareerData.name}</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md border-l-2 border-[#fbbf24] pl-6">
                    {selectedCareerData.description}
                  </p>
                  
                  <div className="space-y-6 md:space-y-8">
                    {selectedCareerData.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-6">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                          <feature.icon className="w-6 h-6 text-[#38bdf8]" />
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                          <p className="text-sm text-gray-300">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 relative h-[400px] md:h-[600px] w-full order-1 lg:order-2">
                   <motion.img 
                      src={selectedCareerData.image}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/80 via-transparent to-transparent rounded-3xl pointer-events-none" />
                   <div className="absolute bottom-8 left-8">
                      <p className="text-white/80 font-mono text-sm uppercase tracking-widest mb-2">Duración Estimada</p>
                      <p className="text-4xl md:text-5xl font-heading font-bold text-white">{selectedCareerData.duration}</p>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                 <BookOpen className="w-20 h-20 text-[#fbbf24] mx-auto mb-8 opacity-50" />
                 <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-gray-300">Seleccioná una carrera</h2>
                 <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                   Explorá nuestra oferta académica en la sección anterior para ver los detalles, planes de estudio y oportunidades de cada facultad.
                 </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-[#082f49]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">UBA</div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>Universidad de Buenos Aires</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://www.uba.ar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Sitio Web
            </a>
            <a href="#" className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0c4a6e] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#fbbf24]/5 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateNews('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous News"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateNews('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next News"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedNews.id}
                    src={selectedNews.image} 
                    alt={selectedNews.title} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedNews.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#fbbf24] mb-4">
                     <Calendar className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedNews.date}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedNews.title}
                  </h3>
                  
                  <p className="text-lg text-[#38bdf8] font-medium tracking-widest uppercase mb-6">
                    {selectedNews.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedNews.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;