```react
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, FileText, MapPin, Users, ScrollText, Landmark, Search, Menu, Twitter, Facebook, Link2, ExternalLink } from 'lucide-react';

// --- Custom Hooks ---
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isIntersecting];
};

// --- Components ---
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const getTranslate = () => {
    switch(direction) {
      case 'up': return 'translate-y-8';
      case 'down': return '-translate-y-8';
      case 'left': return 'translate-x-8';
      case 'right': return '-translate-x-8';
      default: return 'translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getTranslate()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const NavBar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#111010]/90 backdrop-blur-md border-b border-zinc-800 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-4">
          <Menu className="text-zinc-400 hover:text-[#E0A96D] cursor-pointer transition-colors" size={24} />
          <span className="font-serif text-xl tracking-widest text-white uppercase font-bold border-l border-zinc-700 pl-4">
            Desierto <span className="text-[#C8553D]">Digital</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Investigaciones</a>
          <a href="#" className="hover:text-white transition-colors">Feminicidios</a>
          <a href="#" className="hover:text-white transition-colors">Justicia</a>
          <button className="border border-[#E0A96D]/50 text-[#E0A96D] hover:bg-[#E0A96D] hover:text-[#111010] px-4 py-1.5 rounded-full transition-all">
            Apoya nuestro periodismo
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const GeographicSeparationMap = () => {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <div className="my-16 w-full max-w-5xl mx-auto">
      <div className="border-l-4 border-[#C8553D] pl-4 mb-6">
        <h3 className="text-2xl font-serif font-bold text-white">Geografía de los hallazgos</h3>
        <p className="text-zinc-400 font-sans text-sm mt-1">Carretera 36 Norte, Poblado Miguel Alemán. Ubicación de las víctimas según los reportes forenses.</p>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] bg-[#181616] overflow-hidden border border-zinc-800 rounded-lg group">
        {/* Abstract Map Grid & Terrain */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Highway SVG Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 10 90 Q 30 50, 50 50 T 90 10" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 10 90 Q 30 50, 50 50 T 90 10" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
        </svg>

        {/* Distance Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] pointer-events-none">
          <div className="border-t border-dashed border-[#E0A96D]/40 w-32 md:w-48 relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#E0A96D] text-xs font-bold tracking-widest bg-[#181616] px-2 rounded">7 KILÓMETROS</span>
          </div>
        </div>

        {/* Point A: Margarita */}
        <div className="absolute left-[20%] top-[70%] md:left-[25%] md:top-[65%] z-10 -translate-x-1/2 -translate-y-1/2">
          <button 
            onMouseEnter={() => setActivePoint('A')}
            onMouseLeave={() => setActivePoint(null)}
            className="relative group/btn flex flex-col items-center"
          >
            <div className={`w-6 h-6 bg-[#C8553D] rounded-full absolute opacity-40 transition-all duration-500 ${activePoint === 'A' ? 'scale-150' : 'animate-ping'}`}></div>
            <div className={`w-4 h-4 rounded-full relative z-10 border-2 transition-colors duration-300 ${activePoint === 'A' ? 'bg-[#C8553D] border-white' : 'bg-[#181616] border-[#C8553D]'}`}></div>
            <span className="text-xs text-zinc-400 mt-2 font-sans font-bold uppercase tracking-wider">Hallazgo 1</span>
          </button>

          {/* Tooltip A */}
          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#1c1a1a] border border-zinc-700 p-4 rounded shadow-2xl transition-all duration-300 pointer-events-none
            ${activePoint === 'A' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            <h4 className="text-[#C8553D] font-bold mb-1 text-sm tracking-wide uppercase">Cuerpo de Margarita (28 años)</h4>
            <p className="text-zinc-300 text-xs font-sans leading-relaxed">Localizada en una cuneta adyacente a la carretera con impactos de bala calibre 5.7 mm.</p>
          </div>
        </div>

        {/* Point B: The Girls */}
        <div className="absolute left-[80%] top-[30%] md:left-[75%] md:top-[35%] z-10 -translate-x-1/2 -translate-y-1/2">
          <button 
            onMouseEnter={() => setActivePoint('B')}
            onMouseLeave={() => setActivePoint(null)}
            className="relative group/btn flex flex-col items-center"
          >
            <div className={`w-6 h-6 bg-[#E0A96D] rounded-full absolute opacity-40 transition-all duration-500 ${activePoint === 'B' ? 'scale-150' : 'animate-ping'}`}></div>
            <div className={`w-4 h-4 rounded-full relative z-10 border-2 transition-colors duration-300 ${activePoint === 'B' ? 'bg-[#E0A96D] border-white' : 'bg-[#181616] border-[#E0A96D]'}`}></div>
            <span className="text-xs text-zinc-400 mt-2 font-sans font-bold uppercase tracking-wider">Hallazgo 2</span>
          </button>

          {/* Tooltip B */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#1c1a1a] border border-zinc-700 p-4 rounded shadow-2xl transition-all duration-300 pointer-events-none
            ${activePoint === 'B' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          >
            <h4 className="text-[#E0A96D] font-bold mb-1 text-sm tracking-wide uppercase">Meredith, Medelin y Karla</h4>
            <p className="text-zinc-300 text-xs font-sans leading-relaxed">Localizadas el 5 de julio de 2025 bajo un árbol de mezquite. Encontradas abrazadas entre sí, según reportes de las agrupaciones de búsqueda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsuranceLogicVisualizer = () => {
  return (
    <div className="bg-[#1c1a1a] rounded-xl p-6 md:p-10 border border-zinc-800 my-16 w-full max-w-4xl mx-auto shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">Línea de investigación: Móvil Económico</h3>
        <p className="text-zinc-400 font-sans text-sm md:text-base max-w-2xl mx-auto">
          Hipótesis central de la FGJES: El móvil del crimen se centra en el cobro de una póliza de seguro de vida en la que el imputado figuraba como beneficiario.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
        {/* Background connector line */}
        <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] bg-zinc-800 -translate-y-1/2 z-0"></div>

        {/* Step 1: The Policy */}
        <div className="bg-[#111010] border border-zinc-700 p-6 rounded-lg w-full md:w-1/3 relative z-10 text-center">
          <ScrollText className="mx-auto text-[#E0A96D] mb-3" size={32} />
          <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2">Póliza de Seguro</h4>
          <p className="text-xs text-zinc-400 font-sans mb-2">Instrumento financiero a nombre de la titular.</p>
          <div className="text-white font-bold text-lg font-sans border-t border-zinc-700 pt-2">$300,000 MXN</div>
        </div>

        {/* Step 2: The Obstacle (Target) */}
        <div className="bg-[#241715] border border-[#C8553D] p-6 rounded-lg w-full md:w-1/3 relative z-10 text-center shadow-[0_0_20px_rgba(200,85,61,0.1)]">
          <Users className="mx-auto text-[#C8553D] mb-3" size={32} />
          <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2">Línea Sucesoria</h4>
          <div className="text-xs text-zinc-300 font-sans space-y-1 mb-3">
            <p className="line-through decoration-[#C8553D] decoration-2">Margarita (Titular)</p>
            <p className="line-through decoration-[#C8553D] decoration-2">Meredith, Medelin, Karla</p>
          </div>
          <div className="bg-[#C8553D]/20 text-zinc-300 text-[10px] uppercase font-bold py-1 px-2 rounded">
            Condición para cobro
          </div>
        </div>

        {/* Step 3: The Beneficiary */}
        <div className="bg-[#111010] border border-zinc-700 p-6 rounded-lg w-full md:w-1/3 relative z-10 text-center">
          <Landmark className="mx-auto text-[#E0A96D] mb-3" size={32} />
          <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2">Beneficiario Único</h4>
          <p className="text-xs text-zinc-400 font-sans mb-3">Jesús Antonio "N"</p>
          <div className="bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold py-1 px-2 rounded">
            Designado por la titular
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-zinc-800 text-left md:text-center">
        <p className="text-zinc-400 text-sm font-sans">
          <strong>Testimoniales MP:</strong> Los testimonios recabados por el Ministerio Público indican que el imputado realizaba con frecuencia comentarios y "bromas sarcásticas" de manera pública sobre la posibilidad de privar de la vida a su pareja para cobrar el dinero.
        </p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-[#111010] min-h-screen text-[#e2ddd9] font-serif selection:bg-[#C8553D]/50 selection:text-white">
      <NavBar />
      
      {/* HEADER / HERO SECTION */}
      <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-zinc-800 text-center md:text-left">
        <FadeIn delay={100}>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
            <span className="text-[#C8553D] font-bold tracking-widest uppercase text-xs font-sans bg-[#C8553D]/10 px-3 py-1 rounded">Feminicidio</span>
            <span className="text-zinc-500 font-bold tracking-widest uppercase text-xs font-sans">Hermosillo, Sonora</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            El seguro de vida, línea de investigación central en el homicidio de una familia en Sonora
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="text-xl text-zinc-400 max-w-3xl font-light leading-relaxed border-l-2 border-zinc-700 pl-6 mb-12 mx-auto md:mx-0">
            El asesinato de Margarita, de 28 años, y de sus tres hijas menores de edad en el Poblado Miguel Alemán, Sonora, es investigado por las autoridades estatales bajo la premisa de que el móvil del crimen fue de carácter económico.
          </p>
        </FadeIn>

        {/* Byline / Metadata */}
        <FadeIn delay={400}>
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-zinc-800/50 mt-8 font-sans">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-[#181616] rounded-full flex items-center justify-center border border-zinc-700">
                <FileText className="text-[#E0A96D]" size={20} />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm tracking-wide">Redacción por Desierto Digital</p>
                <p className="text-zinc-500 text-xs mt-0.5">Abril 2026 • 8 min de lectura</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-zinc-500 uppercase tracking-widest mr-2">Compartir:</span>
              <button className="p-2 bg-[#181616] hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"><Twitter size={16} /></button>
              <button className="p-2 bg-[#181616] hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"><Facebook size={16} /></button>
              <button className="p-2 bg-[#181616] hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"><Link2 size={16} /></button>
            </div>
          </div>
        </FadeIn>
      </header>

      <main className="pb-32">
        
        {/* ARTICLE BODY - PART 1 */}
        <article className="max-w-2xl mx-auto px-6 mt-16 text-lg text-[#e2ddd9] leading-loose">
          <FadeIn>
            <p className="mb-8">
              <span className="float-left text-6xl md:text-7xl font-bold text-white pr-3 pt-2 leading-none">E</span>l asesinato de Margarita, de 28 años, y de sus tres hijas menores de edad en el Poblado Miguel Alemán, Sonora, es investigado por las autoridades estatales bajo la premisa de que el móvil del crimen fue de carácter económico. De acuerdo con la información integrada en la carpeta de investigación, el acto estaría directamente relacionado con el cobro de una póliza de seguro de vida.
            </p>
            <p className="mb-8">
              Las víctimas fueron identificadas oficialmente como Margarita y sus hijas: las gemelas Meredith y Medelin, ambas de 11 años, y la menor Karla, de 9 años de edad.
            </p>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h2 className="text-3xl font-bold text-white mt-12 mb-8">Reconstrucción de los hechos y hallazgo</h2>
            <p className="mb-8">
              Según las indagatorias, los hechos se originaron cuando la familia regresaba de un viaje a la playa en Bahía de Kino acompañados por Jesús Antonio "N", quien era la pareja sentimental de Margarita. Durante el trayecto de regreso, el vehículo se desvió hacia una zona despoblada y presuntamente controlada por grupos criminales, en las inmediaciones de la Carretera 36 Norte, en la zona rural poniente de Hermosillo.
            </p>
            <p className="mb-8">
              En dicho lugar, Margarita fue privada de la vida mediante disparos de arma de fuego. Los dictámenes periciales revelaron que la mujer y las menores fallecieron por impactos de bala calibre 5.7 milímetros, un tipo de munición clasificada por su capacidad para perforar chalecos blindados. El cuerpo de la madre fue localizado inicialmente en una cuneta adyacente a la carretera.
            </p>
          </FadeIn>
        </article>

        {/* MAP COMPONENT */}
        <FadeIn delay={100}>
          <GeographicSeparationMap />
        </FadeIn>

        <article className="max-w-2xl mx-auto px-6 mt-12 text-lg text-[#e2ddd9] leading-loose">
          <FadeIn>
            <p className="mb-8">
              Posteriormente, el 5 de julio de 2025, integrantes de la organización civil <em>Buscadoras por la Paz Sonora</em> informaron sobre la localización de las tres menores de edad. Las niñas fueron encontradas sin vida bajo un árbol de mezquite en un descampado, a una distancia aproximada de siete kilómetros al norte de donde se halló a su madre.
            </p>
            
            {/* Pull Quote */}
            <blockquote className="my-12 py-8 border-y border-zinc-800 relative bg-[#1c1a1a]/50 px-8 rounded-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-zinc-600"></div>
              <p className="text-xl md:text-2xl font-serif italic text-zinc-200 leading-relaxed text-center">
                "De acuerdo con los reportes de las agrupaciones de búsqueda y las fotografías documentadas en el sitio, las tres menores fueron encontradas abrazadas entre sí."
              </p>
            </blockquote>

            <h2 className="text-3xl font-bold text-white mt-16 mb-8">Proceso judicial y móvil económico</h2>
            <p className="mb-8">
              La Fiscalía General de Justicia del Estado de Sonora (FGJES) ejecutó la detención de Jesús Antonio "N", a quien se le señala como el probable responsable del multihomicidio. En audiencia, un juez del estado de Sonora dictó auto de vinculación a proceso en contra del imputado por los delitos de feminicidio agravado y homicidio infantil. Además, las autoridades detallaron que el detenido tiene vínculos con actividades de distribución de drogas a nivel local.
            </p>
            <p className="mb-8">
              La principal línea de investigación sobre el móvil del crimen se centra en una póliza de seguro de vida por la cantidad de 300 mil pesos. De acuerdo con la fiscalía, Margarita había dejado como único beneficiario de dicho instrumento financiero a Jesús Antonio "N".
            </p>
          </FadeIn>
        </article>

        {/* INSURANCE LOGIC VISUALIZER */}
        <FadeIn>
          <InsuranceLogicVisualizer />
        </FadeIn>

        <article className="max-w-2xl mx-auto px-6 mt-12 text-lg text-[#e2ddd9] leading-loose">
          <FadeIn>
             <h2 className="text-3xl font-bold text-white mt-8 mb-8">Contexto institucional</h2>
             <p className="mb-8">
               El caso ha reactivado el escrutinio sobre las políticas de prevención de la violencia en la entidad. El municipio de Hermosillo, al que pertenece la Comisaría de Miguel Alemán, cuenta con una Declaratoria de Alerta de Violencia de Género contra las Mujeres (AVGM) activada desde el año 2021.
             </p>
             <p className="mb-8">
               Documentos oficiales del Gobierno de Sonora, específicamente el Octavo Informe de Seguimiento de la AVGM, registran que semanas antes de los hechos, el 13 de mayo de 2025, el Instituto Sonorense de las Mujeres impartió pláticas preventivas denominadas <em>“Libre de Violencia”</em> en las instalaciones del Colegio de Estudios Científicos y Tecnológicos del Estado de Sonora (CECYTES) ubicado en el propio Poblado Miguel Alemán.
             </p>
             <p className="mb-8">
               Pese a estas intervenciones comunitarias focalizadas, los sistemas de alerta temprana no lograron identificar el riesgo letal existente al interior del entorno familiar de las víctimas.
             </p>

             <div className="my-12 p-8 bg-[#181616] border border-zinc-800 rounded-lg">
               <h3 className="text-zinc-400 font-bold font-sans text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Users size={16} />
                 Respuesta de la sociedad civil
               </h3>
               <p className="text-zinc-300 text-base leading-relaxed mb-4">
                 El domingo 13 de julio de 2025, familiares directos de las menores, acompañados por miembros de 14 distintos colectivos feministas y ciudadanos en general, realizaron una marcha en la ciudad de Hermosillo bajo la consigna "Por la justicia y la dignidad".
               </p>
               <p className="text-zinc-300 text-base leading-relaxed">
                 La movilización inició en las escalinatas de la Universidad de Sonora y concluyó frente al Palacio de Gobierno. En el recinto oficial, los asistentes colocaron un altar con flores blancas, veladoras y mensajes en memoria de las víctimas. Durante la protesta, la familia de las menores y las organizaciones civiles exigieron públicamente a las autoridades ministeriales y judiciales celeridad y rigor procesal para garantizar que el responsable enfrente el castigo máximo conforme a la ley.
               </p>
             </div>

             <p className="mb-8 border-t border-zinc-800 pt-8 italic text-zinc-500">
               El proceso penal continúa su curso legal, a la espera de que se agoten los plazos de la investigación complementaria y se proceda a la etapa de juicio oral, donde la autoridad jurisdiccional determinará la sentencia final.
             </p>
          </FadeIn>
        </article>
        
        {/* FUENTES Y BIBLIOGRAFÍA */}
        <div className="max-w-3xl mx-auto px-6 mt-24">
          <FadeIn>
            <div className="border-t border-zinc-800 pt-8">
              <h3 className="text-sm font-sans tracking-widest uppercase text-zinc-500 font-bold mb-6 flex items-center gap-2">
                <Search size={16} />
                Fuentes y Enlaces de Consulta Directa
              </h3>
              <p className="text-xs text-zinc-400 font-sans mb-6">Toda la información contenida en esta crónica interactiva ha sido extraída y corroborada a través de los siguientes reportes ministeriales y periodísticos:</p>
              
              <ul className="space-y-4 font-sans text-sm text-zinc-400">
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Detalles del arma, monto del seguro y vinculación:</strong> Reporte de Azteca Noticias. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace directo</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Investigación del móvil y declaraciones:</strong> Despacho de Infobae México. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace directo</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Dictamen judicial y confirmación de cargos:</strong> Cobertura de Milenio Noticias. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace directo</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Geografía del hallazgo y estado de los cuerpos:</strong> Crónica de El Demócrata. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace directo</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Intervención de colectivos de búsqueda:</strong> Registro de CIMAC Noticias. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace directo</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Acciones gubernamentales (AVGM):</strong> Octavo Informe de Seguimiento AVGM, Gobierno del Estado de Sonora. <a href="https://mujeres.sonora.gob.mx/media/attachments/2026/02/06/octavo-informe-avgm-octubre-2025-1.pdf" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white underline">PDF Oficial</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink size={14} className="text-zinc-500 shrink-0 mt-1" />
                  <span><strong>Documentación de las manifestaciones:</strong> Reporte de Imagen Noticias / Expreso. <a href="#" className="text-zinc-300 hover:text-white underline">Enlace 1</a> | <a href="#" className="text-zinc-300 hover:text-white underline">Enlace 2</a></span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0d0c0c] py-16 text-center text-zinc-500 text-sm font-sans border-t border-zinc-900 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl tracking-widest text-white uppercase font-bold mb-6">
            Desierto <span className="text-[#C8553D]">Digital</span>
          </h2>
          <p className="mb-4 max-w-md mx-auto">Periodismo de investigación independiente desde Sonora para el mundo.</p>
          <div className="flex justify-center gap-6 mb-8 text-xs uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Código de Ética</a>
            <a href="#" className="hover:text-white transition-colors">Directorio</a>
          </div>
          <p>© 2026 Desierto Digital. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}


```
