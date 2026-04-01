"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "es" | "en";

interface Translations {
  nav: {
    home: string;
    services: string;
    spaces: string;
    team: string;
    works: string;
    contact: string;
  };
  home: {
    title: string;
  };
  services: {
    title: string;
    subtitle: string;
    encryption: string;
    encryptionDesc: string;
    items: {
      workflow: { title: string; desc: string };
      color: { title: string; desc: string };
      qc: { title: string; desc: string };
      editing: { title: string; desc: string };
      grading: { title: string; desc: string };
      online: { title: string; desc: string };
      remote: { title: string; desc: string };
      mastering: { title: string; desc: string };
    };
  };
  spaces: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      colorRooms: string;
      projection: string;
      hub: string;
      workspaces: string;
      exterior: string;
      tech: string;
    };
    items: {
      facade: string;
      color1: string;
      color2: string;
      color3: string;
      projection: string;
      hub: string;
      hallway: string;
      lounge: string;
      editing: string;
      workspace: string;
      servers: string;
    };
  };
  team: {
    title: string;
    subtitle: string;
    cta: string;
    ctaButton: string;
  };
  works: {
    title: string;
    subtitle: string;
    cta: string;
    ctaButton: string;
    director: string;
    dop: string;
  };
  contact: {
    title: string;
    subtitle: string;
    info: string;
    infoDesc: string;
    email: string;
    phone: string;
    location: string;
    form: {
      title: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      sent: string;
    };
  };
  footer: {
    contact: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: "Home",
      services: "Servicios",
      spaces: "Espacios",
      team: "Equipo",
      works: "Trabajos",
      contact: "Contacto",
    },
    home: {
      title: "Cube Post",
    },
    services: {
      title: "Servicios",
      subtitle: "Ofrecemos soluciones completas de postproducción de imagen con los más altos estándares de calidad",
      encryption: "Encriptación AES de 256 bits",
      encryptionDesc: "Además, aseguramos la máxima protección de contenido con",
      items: {
        workflow: {
          title: "Diseño de Workflow",
          desc: "Diseño del workflow desde la pre de rodaje con el fin de optimizar y mantener una consistencia del color durante todos los procesos de la postproducción de la imagen.",
        },
        color: {
          title: "Ingeniería del color",
          desc: "Colorimetría y creación de LUTs técnicas y creativas. Servicio de calibración de proyecciones y monitores HDR/SDR con espectrorradiómetro.",
        },
        qc: {
          title: "QC y Backup de rodaje",
          desc: "Control de calidad de los brutos de rodaje (OCF) en su formato óptimo (HDR/SDR) y backup a cinta LTO9 o el soporte requerido.",
        },
        editing: {
          title: "Salas de montaje",
          desc: "Disponemos de salas de edición offline equipadas con Avid o Premiere, con sistema de almacenaje en red. Posibilidad de edición remota.",
        },
        grading: {
          title: "Grading (Cine, HDR/SDR)",
          desc: "Disponemos de tres salas de etalonaje con proyector Christie láser y monitorización Sony BVM-HX3110. Nuestros coloristas suman más de 300 proyectos.",
        },
        online: {
          title: "Conformado online",
          desc: "Edición Online en cualquier resolución y exportación de pulls para VFX. Realización de efectos editoriales como retimes y estabilizados.",
        },
        remote: {
          title: "Grading Remoto",
          desc: "Servicio de Remote Grading con Colorfront, permitiendo sesiones de corrección de color en tiempo real con máxima fidelidad visual.",
        },
        mastering: {
          title: "Mastering y Deliveries",
          desc: "Generación de masters DCP (IOP, SMPTE), IMFs Dolby Vision o cualquier otro delivery requerido por plataformas y TV.",
        },
      },
    },
    spaces: {
      title: "Espacios",
      subtitle: "Descubre nuestras instalaciones de postproducción en Barcelona",
      categories: {
        all: "Todos",
        colorRooms: "Salas de Color",
        projection: "Proyección",
        hub: "The Hub",
        workspaces: "Zonas de Trabajo",
        exterior: "Exterior",
        tech: "Tecnología",
      },
      items: {
        facade: "Fachada Cube Post",
        color1: "Sala Color 1",
        color2: "Sala Color 2",
        color3: "Sala Color 3",
        projection: "Sala de Proyección",
        hub: "The Hub - Zona Común",
        hallway: "Pasillos",
        lounge: "Lounge",
        editing: "Sala de Edición",
        workspace: "Área de Trabajo",
        servers: "Infraestructura Técnica",
      },
    },
    team: {
      title: "Equipo",
      subtitle: "Profesionales con amplia experiencia en la industria audiovisual",
      cta: "¿Quieres trabajar con nosotros?",
      ctaButton: "Contáctanos",
    },
    works: {
      title: "Trabajos",
      subtitle: "Una selección de proyectos en los que hemos participado",
      cta: "¿Quieres ver más de nuestro trabajo?",
      ctaButton: "Contacta con nosotros",
      director: "Director",
      dop: "DOP",
    },
    contact: {
      title: "Contacto",
      subtitle: "Cuéntanos tu proyecto y te ayudamos a hacerlo realidad",
      info: "Información de contacto",
      infoDesc: "Estamos en Barcelona, listos para ayudarte con tu proyecto de postproducción.",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      form: {
        title: "Enviar mensaje",
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Email",
        emailPlaceholder: "tu@email.com",
        subject: "Asunto",
        subjectPlaceholder: "¿De qué quieres hablarnos?",
        message: "Mensaje",
        messagePlaceholder: "Cuéntanos sobre tu proyecto...",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        sent: "¡Mensaje enviado!",
      },
    },
    footer: {
      contact: "Contacto",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Condiciones generales de venta",
      copyright: "Cube Post. Postproducción de imagen en Barcelona.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      spaces: "Spaces",
      team: "Team",
      works: "Works",
      contact: "Contact",
    },
    home: {
      title: "Cube Post",
    },
    services: {
      title: "Services",
      subtitle: "We offer complete image post-production solutions with the highest quality standards",
      encryption: "AES 256-bit encryption",
      encryptionDesc: "Additionally, we ensure maximum content protection with",
      items: {
        workflow: {
          title: "Workflow Design",
          desc: "Workflow design from pre-production to optimize and maintain color consistency throughout all image post-production processes.",
        },
        color: {
          title: "Color Engineering",
          desc: "Colorimetry and creation of technical and creative LUTs. HDR/SDR projection and monitor calibration service with spectroradiometer.",
        },
        qc: {
          title: "QC and Shooting Backup",
          desc: "Quality control of raw footage (OCF) in its optimal format (HDR/SDR) and backup to LTO9 tape or required media.",
        },
        editing: {
          title: "Editing Rooms",
          desc: "We have offline editing rooms equipped with Avid or Premiere, with network storage system. Remote editing available.",
        },
        grading: {
          title: "Grading (Cinema, HDR/SDR)",
          desc: "We have three grading rooms with Christie laser projector and Sony BVM-HX3110 monitoring. Our colorists have over 300 projects.",
        },
        online: {
          title: "Online Conform",
          desc: "Online editing at any resolution and VFX pulls export. Editorial effects such as retimes and stabilization.",
        },
        remote: {
          title: "Remote Grading",
          desc: "Remote Grading service with Colorfront, enabling real-time color correction sessions with maximum visual fidelity.",
        },
        mastering: {
          title: "Mastering & Deliveries",
          desc: "Generation of DCP masters (IOP, SMPTE), Dolby Vision IMFs or any other delivery required by platforms and TV.",
        },
      },
    },
    spaces: {
      title: "Spaces",
      subtitle: "Discover our post-production facilities in Barcelona",
      categories: {
        all: "All",
        colorRooms: "Color Rooms",
        projection: "Projection",
        hub: "The Hub",
        workspaces: "Workspaces",
        exterior: "Exterior",
        tech: "Technology",
      },
      items: {
        facade: "Cube Post Facade",
        color1: "Color Room 1",
        color2: "Color Room 2",
        color3: "Color Room 3",
        projection: "Projection Room",
        hub: "The Hub - Common Area",
        hallway: "Hallways",
        lounge: "Lounge",
        editing: "Editing Room",
        workspace: "Work Area",
        servers: "Technical Infrastructure",
      },
    },
    team: {
      title: "Team",
      subtitle: "Professionals with extensive experience in the audiovisual industry",
      cta: "Want to work with us?",
      ctaButton: "Contact us",
    },
    works: {
      title: "Works",
      subtitle: "A selection of projects we have participated in",
      cta: "Want to see more of our work?",
      ctaButton: "Contact us",
      director: "Director",
      dop: "DOP",
    },
    contact: {
      title: "Contact",
      subtitle: "Tell us about your project and we'll help make it happen",
      info: "Contact information",
      infoDesc: "We're in Barcelona, ready to help you with your post-production project.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      form: {
        title: "Send message",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        subject: "Subject",
        subjectPlaceholder: "What do you want to talk about?",
        message: "Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send message",
        sending: "Sending...",
        sent: "Message sent!",
      },
    },
    footer: {
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      copyright: "Cube Post. Image post-production in Barcelona.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("cube-post-lang") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("cube-post-lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
