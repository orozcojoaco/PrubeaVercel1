/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, ChevronLeft, ChevronRight, GraduationCap, MapPin, ArrowRight, BookOpen, ArrowUpRight } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import NewsCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { NewsItem, Faculty } from './types';

// --- DATA ---

const NEWS_ITEMS: NewsItem[] = [
  { 
    id: '1', 
    title: 'Avance en Vacunas', 
    category: 'Medicina & Ciencia', 
    date: 'OCT 2025', 
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000&auto=format&fit=crop',
    description: 'Investigadores de la Facultad de Medicina desarrollan un nuevo vector viral para inmunización rápida, reconocido internacionalmente por la OMS.'
  },
  { 
    id: '2', 
    title: 'Premio Pritzker Estudiantil', 
    category: 'FADU - Arquitectura', 
    date: 'SEP 2025', 
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    description: 'Estudiante de último año de la FADU recibe mención honorífica global por su diseño de viviendas sostenibles de bajo costo para zonas urbanas.'
  },
  { 
    id: '3', 
    title: 'Sátelite UBA-2', 
    category: 'Ingeniería', 
    date: 'AGO 2025', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    description: 'El departamento de Ingeniería Aeroespacial lanza con éxito el segundo nanosatélite diseñado y construido íntegramente en los laboratorios de Paseo Colón.'
  },
  { 
    id: '4', 
    title: 'Litigio Internacional', 
    category: 'Derecho', 
    date: 'JUL 2025', 
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    description: 'El equipo de la UBA se consagra campeón mundial en la competencia de alegatos de derechos humanos en Ginebra, superando a Harvard y Oxford.'
  },
  { 
    id: '5', 
    title: 'IA en Económicas', 
    category: 'Ciencias Económicas', 
    date: 'JUN 2025', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    description: 'Nuevo paper de investigación sobre modelos predictivos de inflación utilizando redes neuronales es publicado en el Quarterly Journal of Economics.'
  },
  { 
    id: '6', 
    title: 'Descubrimiento Paleontológico', 
    category: 'Exactas', 
    date: 'MAY 2025', 
    image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?q=80&w=1000&auto=format&fit=crop',
    description: 'Expedición de Exactas halla restos de un nuevo titanosaurio en la Patagonia, reescribiendo la historia del Cretácico en la región.'
  },
];

const FACULTIES: Faculty[] = [
  {
    id: 'agronomia',
    name: 'Facultad de Agronomía',
    shortName: 'FAUBA',
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop',
    description: 'Ciencia y tecnología para la producción agropecuaria sostenible.',
    careers: [
      {
        id: 'ing-agronimica',
        name: 'Ingeniería Agronómica',
        description: 'Gestión integral de sistemas de producción agropecuaria.',
        differential: 'Enfoque único en sustentabilidad y biotecnología aplicada al campo argentino.',
        image: 'https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'ambientales',
        name: 'Lic. en Ciencias Ambientales',
        description: 'Gestión y conservación de recursos naturales.',
        differential: 'Mirada interdisciplinaria para resolver crisis ecológicas.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'econ-agraria',
        name: 'Lic. en Economía y Adm. Agrarias',
        description: 'Negocios y políticas del sector agroindustrial.',
        differential: 'Liderazgo en el sector más dinámico de la economía nacional.',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'agroalimentos',
        name: 'Lic. en Gestión de Agroalimentos',
        description: 'Calidad e inocuidad en la cadena alimentaria.',
        differential: 'Conexión directa con la industria exportadora de alimentos.',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'paisaje',
        name: 'Lic. en Diseño del Paisaje',
        description: 'Planificación de espacios verdes urbanos y rurales.',
        differential: 'Combina conocimientos biológicos profundos con diseño arquitectónico.',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      }
    ]
  },
  {
    id: 'fadu',
    name: 'Facultad de Arquitectura, Diseño y Urbanismo',
    shortName: 'FADU',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1000&auto=format&fit=crop',
    description: 'El centro de diseño más importante de Latinoamérica.',
    careers: [
      {
        id: 'arquitectura',
        name: 'Arquitectura',
        description: 'Proyección y construcción de espacios habitables.',
        differential: 'Formación proyectual intensiva en talleres verticales con diversidad de cátedras.',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'dg',
        name: 'Diseño Gráfico',
        description: 'Comunicación visual estratégica.',
        differential: 'Fuerte énfasis en la tipografía y la función social del diseño.',
        image: 'https://images.unsplash.com/photo-1626785774573-4b7993143d2d?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'industrial',
        name: 'Diseño Industrial',
        description: 'Creación de productos y objetos.',
        differential: 'Innovación tecnológica aplicada a la producción en serie.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'di',
        name: 'Diseño de Indumentaria',
        description: 'Creación de moda y textiles.',
        differential: 'Perspectiva conceptual y artística que va más allá de la tendencia comercial.',
        image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'textil',
        name: 'Diseño Textil',
        description: 'Desarrollo de superficies y tejidos.',
        differential: 'Manejo técnico avanzado de materiales y procesos industriales.',
        image: 'https://images.unsplash.com/photo-1598300056393-8dd1a561138b?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'imagen-sonido',
        name: 'Diseño de Imagen y Sonido',
        description: 'Realización audiovisual y medios.',
        differential: 'Narrativa cinematográfica combinada con nuevas tecnologías.',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      }
    ]
  },
  {
    id: 'economicas',
    name: 'Facultad de Ciencias Económicas',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    description: 'Liderazgo en gestión, economía y sistemas de información.',
    careers: [
      {
        id: 'contador',
        name: 'Contador Público',
        description: 'Expertos en sistemas contables y tributarios.',
        differential: 'Formación jurídica y técnica superior reconocida en todo el Mercosur.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'administracion',
        name: 'Lic. en Administración',
        description: 'Gestión y dirección de organizaciones.',
        differential: 'Enfoque estratégico integral para liderar tanto PyMES como multinacionales.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'economia',
        name: 'Lic. en Economía',
        description: 'Análisis de mercados y políticas públicas.',
        differential: 'Prestigiosa formación teórica y cuantitativa.',
        image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'sistemas-econ',
        name: 'Lic. en Sistemas de Información',
        description: 'Tecnología aplicada a los negocios.',
        differential: 'Puente único entre la informática y la gestión empresarial.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'actuario',
        name: 'Actuario',
        description: 'Evaluación de riesgos financieros y seguros.',
        differential: 'Profesión de altísima demanda y rigor matemático.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'exactas',
    name: 'Facultad de Ciencias Exactas y Naturales',
    shortName: 'Exactas',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop',
    description: 'La cuna de la ciencia argentina.',
    careers: [
      {
        id: 'biologia',
        name: 'Lic. en Ciencias Biológicas',
        description: 'Estudio de la vida en todas sus escalas.',
        differential: 'Acceso directo a institutos de investigación del CONICET desde el grado.',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'datos',
        name: 'Lic. en Ciencias de Datos',
        description: 'Análisis masivo de información y Big Data.',
        differential: 'Carrera moderna creada por departamentos líderes en computación y matemáticas.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'computacion',
        name: 'Lic. en Cs. de la Computación',
        description: 'Fundamentos teóricos y desarrollo de software.',
        differential: 'Profundidad matemática y algorítmica superior a ingenierías tradicionales.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'fisica',
        name: 'Lic. en Ciencias Físicas',
        description: 'Leyes fundamentales del universo.',
        differential: 'Laboratorios experimentales de nivel mundial en Ciudad Universitaria.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'geologia',
        name: 'Lic. en Ciencias Geológicas',
        description: 'Estudio de la Tierra y recursos naturales.',
        differential: 'Viajes de campaña frecuentes a todas las regiones del país.',
        image: 'https://images.unsplash.com/photo-1629196914168-3a95e5d0824c?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'matematica',
        name: 'Lic. en Ciencias Matemáticas',
        description: 'Pensamiento abstracto y modelado.',
        differential: 'Reconocida como el centro matemático más importante de la región.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'quimica',
        name: 'Lic. en Ciencias Químicas',
        description: 'Transformación de la materia.',
        differential: 'Investigación de punta en nuevos materiales y síntesis.',
        image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'alimentos-exactas',
        name: 'Lic. en Ciencia y Tec. de Alimentos',
        description: 'Desarrollo e innovación alimentaria.',
        differential: 'Dictada en conjunto con FFyB, combinando química básica y aplicada.',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'sociales',
    name: 'Facultad de Ciencias Sociales',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop',
    description: 'Análisis crítico de la sociedad contemporánea.',
    careers: [
      {
        id: 'sociologia',
        name: 'Sociología',
        description: 'Estudio de los fenómenos colectivos.',
        differential: 'Tradición de pensamiento crítico reconocida mundialmente.',
        image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'trabajo-social',
        name: 'Trabajo Social',
        description: 'Intervención en problemáticas sociales.',
        differential: 'Fuerte compromiso territorial y políticas públicas.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'rrtt',
        name: 'Relaciones del Trabajo',
        description: 'Mundo laboral y sindical.',
        differential: 'Visión integral entre recursos humanos y derechos laborales.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'comunicacion',
        name: 'Ciencias de la Comunicación',
        description: 'Medios, cultura y procesos de sentido.',
        differential: 'Abordaje transdisciplinario que une política, cultura y tecnología.',
        image: 'https://images.unsplash.com/photo-1534274988754-874fa03565a9?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'politica',
        name: 'Ciencia Política',
        description: 'Poder, estado y administración.',
        differential: 'Análisis profundo de las instituciones y la política argentina.',
        image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'veterinarias',
    name: 'Facultad de Ciencias Veterinarias',
    image: 'https://images.unsplash.com/photo-1629835336041-3b429184511d?q=80&w=1000&auto=format&fit=crop',
    description: 'Salud animal y salud pública.',
    careers: [
      {
        id: 'veterinaria',
        name: 'Medicina Veterinaria',
        description: 'Medicina preventiva y curativa de animales.',
        differential: 'Hospital escuela propio con atención de alta complejidad las 24hs.',
        image: 'https://images.unsplash.com/photo-1605218427368-35b81a3dd36c?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      }
    ]
  },
  {
    id: 'derecho',
    name: 'Facultad de Derecho',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1000&auto=format&fit=crop',
    description: 'Formación jurídica de excelencia en un edificio histórico.',
    careers: [
      {
        id: 'abogacia',
        name: 'Abogacía',
        description: 'Defensa de derechos y asesoramiento legal.',
        differential: 'Orientaciones especializadas únicas y práctica profesional supervisada intensiva.',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'traductorado',
        name: 'Traductor Público',
        description: 'Traducción legal y técnica.',
        differential: 'Única carrera universitaria que habilita para la firma de documentos públicos.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'caligrafo',
        name: 'Calígrafo Público',
        description: 'Peritaje de escritura y documentos.',
        differential: 'Profesión clave para la justicia en la verificación de autenticidad.',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop',
        duration: '3 años'
      }
    ]
  },
  {
    id: 'farmacia',
    name: 'Facultad de Farmacia y Bioquímica',
    shortName: 'FFyB',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
    description: 'Ciencia aplicada a la salud y la industria.',
    careers: [
      {
        id: 'bioquimica',
        name: 'Bioquímica',
        description: 'Análisis clínicos y bromatológicos.',
        differential: 'Rol central en el equipo de salud con incumbencias exclusivas.',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'farmacia-carrera',
        name: 'Farmacia',
        description: 'Diseño, producción y dispensa de medicamentos.',
        differential: 'Fuerte base industrial y hospitalaria, no solo comercial.',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'alimentos-ffyb',
        name: 'Lic. en Ciencia y Tec. de Alimentos',
        description: 'Tecnología alimentaria y seguridad.',
        differential: 'Título compartido con la Facultad de Ciencias Exactas.',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'filo',
    name: 'Facultad de Filosofía y Letras',
    shortName: 'Filo',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop',
    description: 'Humanidades, artes y pensamiento.',
    careers: [
      {
        id: 'artes',
        name: 'Lic. en Artes',
        description: 'Historia y teoría del arte, cine y teatro.',
        differential: 'Enfoque crítico e histórico de las manifestaciones culturales.',
        image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'antropologia',
        name: 'Lic. en Ciencias Antropológicas',
        description: 'Estudio del ser humano y la cultura.',
        differential: 'Trabajo de campo arqueológico y etnográfico único.',
        image: 'https://images.unsplash.com/photo-1560964645-5296b5092323?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'educacion',
        name: 'Lic. en Ciencias de la Educación',
        description: 'Pedagogía y sistemas educativos.',
        differential: 'Formación de líderes para la transformación del sistema educativo.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'filosofia',
        name: 'Lic. en Filosofía',
        description: 'Pensamiento, lógica y ética.',
        differential: 'Diálogo constante con los grandes textos de la historia del pensamiento.',
        image: 'https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'geografia',
        name: 'Lic. en Geografía',
        description: 'Espacio, territorio y sociedad.',
        differential: 'Análisis de procesos territoriales complejos y GIS.',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'historia',
        name: 'Lic. en Historia',
        description: 'Investigación y docencia del pasado.',
        differential: 'Foco en historia argentina y latinoamericana con perspectiva revisionista.',
        image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'letras',
        name: 'Lic. en Letras',
        description: 'Literatura, lingüística y filología.',
        differential: 'Formación teórica rigurosa con grandes maestros de la crítica literaria.',
        image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'ingenieria',
    name: 'Facultad de Ingeniería',
    shortName: 'FIUBA',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    description: 'Ingeniería al servicio del desarrollo nacional.',
    careers: [
      {
        id: 'civil',
        name: 'Ingeniería Civil',
        description: 'Infraestructura, puentes y edificios.',
        differential: 'Tradición centenaria en las obras más importantes del país.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'alimentos-ing',
        name: 'Ingeniería en Alimentos',
        description: 'Procesamiento industrial de alimentos.',
        differential: 'Ingeniería de procesos aplicada a la industria alimenticia.',
        image: 'https://images.unsplash.com/photo-1581093458791-9f302295e8cd?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'electricista',
        name: 'Ingeniería Electricista',
        description: 'Generación y distribución de energía.',
        differential: 'Clave para el desarrollo energético nacional.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'electronica',
        name: 'Ingeniería Electrónica',
        description: 'Circuitos, telecomunicaciones y control.',
        differential: 'Alta especialización en sistemas embebidos y comunicaciones.',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'agrimensura',
        name: 'Ingeniería en Agrimensura',
        description: 'Medición y gestión del territorio.',
        differential: 'Profesionales indispensables para el ordenamiento territorial y catastro.',
        image: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'informatica',
        name: 'Ingeniería en Informática',
        description: 'Sistemas complejos y software.',
        differential: 'Perfil gerencial y técnico, preparado para dirigir proyectos de gran escala.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'industrial',
        name: 'Ingeniería Industrial',
        description: 'Optimización de procesos y gestión.',
        differential: 'Visión integral de la empresa, desde la producción hasta las finanzas.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'mecanica',
        name: 'Ingeniería Mecánica',
        description: 'Diseño de máquinas y sistemas térmicos.',
        differential: 'Formación sólida en termodinámica y mecánica de fluidos.',
        image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'naval',
        name: 'Ingeniería Naval y Mecánica',
        description: 'Diseño de buques y estructuras marinas.',
        differential: 'Única en la región con canal de experiencias hidrodinámicas propio.',
        image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'quimica-ing',
        name: 'Ingeniería Química',
        description: 'Procesos físico-químicos industriales.',
        differential: 'Expertos en el diseño de plantas industriales y reactores.',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'analisis-sistemas',
        name: 'Lic. en Análisis de Sistemas',
        description: 'Desarrollo y gestión de software.',
        differential: 'Enfoque práctico y dinámico orientado al mercado IT.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        duration: '4.5 años'
      }
    ]
  },
  {
    id: 'medicina',
    name: 'Facultad de Ciencias Médicas',
    shortName: 'FMed',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
    description: 'Excelencia médica y hospitalaria.',
    careers: [
      {
        id: 'med',
        name: 'Medicina',
        description: 'Ciencia y arte de curar.',
        differential: 'Prácticas en la red hospitalaria universitaria más grande de la región.',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop',
        duration: '6 años'
      },
      {
        id: 'enfermeria',
        name: 'Lic. en Enfermería',
        description: 'Cuidado integral de la salud.',
        differential: 'Jerarquización académica de la profesión con prácticas intensivas.',
        image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'nutricion',
        name: 'Lic. en Nutrición',
        description: 'Alimentación y salud humana.',
        differential: 'Formación clínica y comunitaria basada en la evidencia científica.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'obstetricia',
        name: 'Lic. en Obstetricia',
        description: 'Salud reproductiva y materno-infantil.',
        differential: 'Rol esencial en la atención primaria y hospitalaria.',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      },
      {
        id: 'fonoaudiologia',
        name: 'Lic. en Fonoaudiología',
        description: 'Comunicación humana y audición.',
        differential: 'Abordaje terapéutico integral del lenguaje y la voz.',
        image: 'https://images.unsplash.com/photo-1516585427167-18e431cb694f?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'kinesio',
        name: 'Lic. en Kinesiología y Fisiatría',
        description: 'Rehabilitación física.',
        differential: 'Formación integral en terapia intensiva, deportiva y neurológica.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'odontologia',
    name: 'Facultad de Odontología',
    shortName: 'FOUBA',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1000&auto=format&fit=crop',
    description: 'Tecnología de vanguardia en salud bucal.',
    careers: [
      {
        id: 'odonto',
        name: 'Odontología',
        description: 'Prevención, diagnóstico y tratamiento bucal.',
        differential: 'Prácticas clínicas intensivas desde los primeros años con equipamiento de última generación.',
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      }
    ]
  },
  {
    id: 'psicologia',
    name: 'Facultad de Psicología',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
    description: 'Referente mundial en psicoanálisis y salud mental.',
    careers: [
      {
        id: 'psico',
        name: 'Lic. en Psicología',
        description: 'Salud mental, clínica y comunitaria.',
        differential: 'Capital mundial del psicoanálisis, con una formación clínica incomparable.',
        image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1000&auto=format&fit=crop',
        duration: '5 años'
      },
      {
        id: 'musico',
        name: 'Musicoterapia',
        description: 'Uso clínico de la música.',
        differential: 'Pionera en Latinoamérica en el abordaje terapéutico a través del arte.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop',
        duration: '4 años'
      }
    ]
  }
];

// --- APP COMPONENT ---

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // State for Faculty Overlay (The "New Window")
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  // Handle keyboard navigation for news modal & faculty overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedNews) {
        if (e.key === 'ArrowLeft') navigateNews('prev');
        if (e.key === 'ArrowRight') navigateNews('next');
        if (e.key === 'Escape') setSelectedNews(null);
      }
      if (selectedFaculty) {
        if (e.key === 'Escape') setSelectedFaculty(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNews, selectedFaculty]);

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
  
  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedFaculty || selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedFaculty, selectedNews]);

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
          {['Destacados', 'Academia'].map((item) => {
            const sectionId = item === 'Destacados' ? 'news' : 'faculties';
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
              { label: 'Academia', id: 'faculties' },
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

      {/* FACULTIES SECTION */}
      <section id="faculties" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#0c4a6e]/30 backdrop-blur-lg border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white">
               ACADEMIA
             </h2>
             <p className="text-[#fbbf24] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Facultades y Carreras
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {FACULTIES.map((faculty) => (
              <motion.div
                key={faculty.id}
                layoutId={`faculty-card-${faculty.id}`}
                onClick={() => setSelectedFaculty(faculty)}
                whileHover={{ y: -5 }}
                className="relative h-[300px] cursor-pointer group overflow-hidden border border-white/10 bg-black/40 hover:border-[#fbbf24]/50 transition-colors"
                data-hover="true"
              >
                {/* Image */}
                <img 
                  src={faculty.image} 
                  alt={faculty.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full" />
                    <span className="text-xs font-mono text-[#fbbf24] uppercase tracking-wider">{faculty.shortName || 'UBA'}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold leading-tight text-white group-hover:text-[#38bdf8] transition-colors">
                    {faculty.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 text-gray-300">
                    Ver Carreras <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY DETAIL OVERLAY ("NEW WINDOW") */}
      <AnimatePresence>
        {selectedFaculty && (
          <motion.div
            layoutId={`faculty-overlay-${selectedFaculty.id}`}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#0c4a6e] overflow-y-auto"
          >
            {/* Header / Nav inside Overlay */}
            <div className="fixed top-0 left-0 right-0 z-[101] flex justify-between items-center p-6 md:p-8 bg-[#0c4a6e]/90 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedFaculty(null)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#fbbf24] transition-colors"
                  data-hover="true"
                >
                  <ChevronLeft className="w-5 h-5" /> Volver
                </button>
                <div className="h-6 w-px bg-white/20 hidden md:block" />
                <span className="hidden md:block font-heading font-bold text-white/80">{selectedFaculty.name}</span>
              </div>
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Hero of the Faculty */}
            <div className="relative h-[50vh] min-h-[400px]">
              <img 
                src={selectedFaculty.image} 
                alt={selectedFaculty.name}
                className="w-full h-full object-cover grayscale opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e] to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-5xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 mb-4 border border-[#fbbf24] text-[#fbbf24] text-xs font-mono tracking-widest uppercase rounded-full"
                >
                  Facultad
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-7xl font-heading font-bold mb-4 leading-tight"
                >
                  {selectedFaculty.name}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 max-w-2xl font-light"
                >
                  {selectedFaculty.description}
                </motion.p>
              </div>
            </div>

            {/* Careers List */}
            <div className="max-w-7xl mx-auto px-6 py-20">
               <div className="flex items-center gap-4 mb-12">
                 <GraduationCap className="w-8 h-8 text-[#fbbf24]" />
                 <h3 className="text-3xl font-heading font-bold">Oferta Académica</h3>
               </div>

               <div className="grid grid-cols-1 gap-12">
                 {selectedFaculty.careers.map((career, idx) => (
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     key={career.id}
                     className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group"
                   >
                     {/* Career Image */}
                     <div className="w-full md:w-1/3 h-64 md:h-auto relative rounded-xl overflow-hidden shrink-0">
                       <img 
                         src={career.image} 
                         alt={career.name} 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                       />
                       <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#fbbf24] border border-[#fbbf24]/30">
                         {career.duration}
                       </div>
                     </div>

                     {/* Career Info */}
                     <div className="flex-1 flex flex-col justify-center">
                       <h4 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white group-hover:text-[#38bdf8] transition-colors">
                         {career.name}
                       </h4>
                       <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                         {career.description}
                       </p>
                       
                       <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 p-5 rounded-xl">
                         <div className="flex items-start gap-3">
                           <BookOpen className="w-5 h-5 text-[#fbbf24] mt-1 shrink-0" />
                           <div>
                             <h5 className="text-[#fbbf24] font-bold text-sm uppercase tracking-wider mb-1">Diferencial UBA</h5>
                             <p className="text-sm text-gray-200 italic">"{career.differential}"</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
            
            {/* Footer inside modal */}
            <div className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
              <p>Universidad de Buenos Aires - {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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