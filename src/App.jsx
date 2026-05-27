import React, { useState, useEffect } from 'react';

// ==========================================
// 1. CUSTOM HOOKS FOR SCROLL reveal & spy
// ==========================================

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

function useScrollSpy(sectionIds, setActiveSection) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for nav bar

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, setActiveSection]);
}

// ==========================================
// 2. NAVBAR COMPONENT
// ==========================================

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="logo" onClick={(e) => handleLinkClick(e, '#home')}>
        Mark<span>Portfolio</span>
      </div>
      
      <nav>
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>

        <ul className={mobileMenuOpen ? 'mobile-show' : ''}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={item.href}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// ==========================================
// 3. HERO COMPONENT
// ==========================================

function Hero() {
  const [imageFailed, setImageFailed] = useState(false);

  const handleCtaClick = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector('#certificates');
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero reveal">
      <div className="hero-text">
        <span className="hero-tag">&lt;welcome /&gt;</span>
        <h1>
          Hi, I'm <span>Marklaurence Lozada</span>
        </h1>
        <p>
          A passionate student and aspiring developer with a love for technology, programming, and creative problem-solving. Welcome to my digital portfolio!
        </p>
        <a href="#certificates" className="btn" onClick={handleCtaClick}>
          View My Credentials <i className="fas fa-award"></i>
        </a>
      </div>

      <div className="hero-image">
        <div className="profile-avatar">
          {!imageFailed ? (
            <img 
              src="/mark.jpg" 
              alt="Marklaurence Lozada" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '4.5rem', 
                fontWeight: 'bold',
              }}
            >
              M
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. ABOUT COMPONENT
// ==========================================

function About() {
  const frontendStack = [
    'React',
    'TypeScript',
    'HTML & CSS',
    'JavaScript',
  ];

  const backendStack = [
    'Java',
    'Python',
    'SQL',
    'Supabase',
  ];

  const softSkills = [
    'Troubleshooting',
    'Team Collaboration',
    'Time Management',
    'Web Development',
    'Problem Solving',
  ];

  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const eyeStyle = {
    height: isBlinking ? '4px' : '32px',
    top: isBlinking ? '54px' : '40px',
  };

  return (
    <section id="about" className="about reveal">
      <h2>About <span>Me</span></h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm <strong>Marklaurence G. Lozada</strong>, a student passionate about technology, programming, and problem-solving. Currently pursuing my education at Colegio de Montalban, I enjoy collaborating on projects, troubleshooting issues, and managing my time effectively to balance academics and personal growth.
          </p>
          <p>
            I have completed several certifications in web development technologies and continue to expand my skill set through hands-on projects and continuous learning.
          </p>
          
          <h4 style={{ color: 'var(--secondary)', marginTop: '2.5rem', marginBottom: '0.8rem', fontSize: '1.25rem', fontWeight: '600' }}>
            <i className="fas fa-laptop-code" style={{ marginRight: '0.5rem' }}></i> Frontend Stack
          </h4>
          <div className="about-skills" style={{ marginBottom: '1.5rem' }}>
            {frontendStack.map((tech, index) => (
              <div 
                key={index} 
                className="skill-tag" 
                style={{ 
                  borderColor: 'var(--secondary)', 
                  color: 'var(--light)',
                  boxShadow: '0 4px 10px rgba(77, 124, 255, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--secondary)';
                  e.currentTarget.style.color = 'var(--secondary)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(77, 124, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.color = 'var(--light)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <h4 style={{ color: 'var(--accent)', marginBottom: '0.8rem', fontSize: '1.25rem', fontWeight: '600' }}>
            <i className="fas fa-server" style={{ marginRight: '0.5rem' }}></i> Backend & Database
          </h4>
          <div className="about-skills" style={{ marginBottom: '1.5rem' }}>
            {backendStack.map((tech, index) => (
              <div 
                key={index} 
                className="skill-tag" 
                style={{ 
                  borderColor: 'var(--accent)', 
                  color: 'var(--light)',
                  boxShadow: '0 4px 10px rgba(255, 204, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 204, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.color = 'var(--light)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontSize: '1.25rem', fontWeight: '600' }}>
            <i className="fas fa-brain" style={{ marginRight: '0.5rem' }}></i> Skills & Competencies
          </h4>
          <div className="about-skills">
            {softSkills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="character-container">
          <div className="character">
            <div className="character-body">
              <div className="character-head">
                <div className="character-hair"></div>
                <div className="character-eye eye-left" style={eyeStyle}></div>
                <div className="character-eye eye-right" style={eyeStyle}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. TIMELINE COMPONENT
// ==========================================

function Timeline() {
  const milestones = [
    {
      title: 'Colegio de Montalban',
      period: '2024 - Present',
      description: 'Currently pursuing further education in technology and programming fields, focusing on software engineering principles and computer science fundamentals.',
    },
    {
      title: 'Cisco Networking Academy',
      period: '2025',
      description: 'Successfully completed several web development and computer engineering credential courses including HTML, CSS, and JavaScript Essentials 1.',
    },
    {
      title: 'Kasiglahan Village Senior High',
      period: '2022 - 2024',
      description: 'Completed my senior high school education with a focus on Information Communications Technology (ICT) and programming basics.',
    },
  ];

  return (
    <section id="education" className="education reveal">
      <h2>Education & <span>Experience</span></h2>
      <div className="timeline">
        {milestones.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-period">{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 6. CERTIFICATE MODAL
// ==========================================

function CertificateModal({ isOpen, onClose, certificate }) {
  const [activeTab, setActiveTab] = useState('image');

  useEffect(() => {
    setActiveTab('image');
  }, [certificate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const title = certificate.title;
    const mediaUrl = activeTab === 'image' ? certificate.image : certificate.pdf;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print - ${title}</title>
          <style>
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh;
              background-color: white;
            }
            img, embed, iframe {
              max-width: 100%;
              max-height: 95vh;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          ${
            activeTab === 'image' 
              ? `<img src="${mediaUrl}" alt="${title}">` 
              : `<embed src="${mediaUrl}" type="application/pdf" width="100%" height="100%">`
          }
          <script>
            window.onload = function() {
              window.focus();
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{certificate.title}</h3>
          
          <div className="modal-tabs">
            <button 
              className={`modal-tab-btn ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => setActiveTab('image')}
            >
              <i className="fas fa-image"></i> Image Preview
            </button>
            <button 
              className={`modal-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveTab('pdf')}
            >
              <i className="fas fa-file-pdf"></i> Official PDF
            </button>
          </div>

          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'image' ? (
            <img 
              className="modal-image" 
              src={certificate.image} 
              alt={certificate.title} 
            />
          ) : (
            <iframe 
              className="modal-iframe" 
              src={certificate.pdf} 
              title={`${certificate.title} PDF Document`}
            />
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-btn" onClick={handlePrint}>
            <i className="fas fa-print"></i> Print
          </button>
          
          <a 
            href={activeTab === 'image' ? certificate.image : certificate.pdf} 
            download={activeTab === 'image' ? `${certificate.id}.png` : `${certificate.id}.pdf`}
            className="modal-btn modal-btn-primary"
          >
            <i className="fas fa-download"></i> Download {activeTab === 'image' ? 'Image' : 'PDF'}
          </a>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. CERTIFICATES COMPONENT
// ==========================================

function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const certificatesData = [
    {
      id: 'html-essentials',
      title: 'HTML Essentials',
      provider: 'Cisco Networking Academy',
      program: 'Cisco Networking Academy',
      recipient: 'Marklaurence G Lozada',
      date: '05 Dec 2025',
      image: '/Screenshot 2025-12-13 162032.png',
      pdf: '/HTML_Essentials_certificate_lozadamarklaurence226-gmail-com_e0de8131-9398-4004-9280-7c364b895b4a.pdf',
      iconClass: 'fab fa-html5',
      skills: ['HTML5', 'Web Structure', 'Semantic HTML', 'Forms & Inputs', 'Web Standards'],
    },
    {
      id: 'javascript-essentials',
      title: 'JavaScript Essentials 1',
      provider: 'Cisco Networking Academy & OpenEDG JavaScript Institute',
      program: 'Student Level Credential',
      recipient: 'Marklaurence G Lozada',
      date: '05 Dec 2025',
      image: '/Screenshot 2025-12-13 162050.png',
      pdf: '/JavaScriptEssentials1Update20251203-32-n46mzc.pdf',
      iconClass: 'fab fa-js-square',
      skills: [
        'JavaScript Syntax',
        'Variables & Operators',
        'Data Types',
        'Flow Control',
        'Functions',
        'Algorithmic Thinking',
        'Error Handling',
        'Program Development',
      ],
    },
    {
      id: 'css-essentials',
      title: 'CSS Essentials',
      provider: 'Cisco Networking Academy',
      program: 'Cisco Networking Academy',
      recipient: 'Marklaurence G Lozada',
      date: '08 Dec 2025',
      image: '/Screenshot 2025-12-13 162042.png',
      pdf: '/CSS_Essentials_certificate_lozadamarklaurence226-gmail-com_5a615e9d-c7d6-4c57-94b3-2cca9ddeae0e.pdf',
      iconClass: 'fab fa-css3-alt',
      skills: ['CSS3', 'Styling', 'Layouts', 'Responsive Design', 'Flexbox/Grid', 'Animations'],
    },
  ];

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  return (
    <section id="certificates" className="certificates reveal">
      <h2>My <span>Certifications</span></h2>
      <p className="cert-subtitle">
        Click on certificate images to view credential details, read official PDF certificates, or download print files. All certificates were earned through the Cisco Networking Academy program.
      </p>

      <div className="certificates-container">
        {certificatesData.map((cert) => (
          <div key={cert.id} className="certificate-card">
            <div className="certificate-image-container">
              <img 
                src={cert.image} 
                alt={`${cert.title} Preview`}
                className="certificate-image"
                onClick={() => handleOpenModal(cert)}
              />
              <div className="certificate-overlay">
                <button 
                  className="certificate-overlay-btn"
                  onClick={() => handleOpenModal(cert)}
                >
                  <i className="fas fa-expand-alt"></i> View Certificate
                </button>
              </div>
            </div>

            <div className="certificate-content">
              <div className="certificate-header">
                <div className="certificate-icon">
                  <i className={cert.iconClass}></i>
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.provider}</p>
              </div>

              <div className="certificate-skills">
                <h4>Skills Acquired:</h4>
                <div className="skills-list">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="certificate-footer">
                <div className="date-badge">
                  <i className="fas fa-calendar-alt"></i> {cert.date}
                </div>
                <button 
                  className="view-certificate-btn"
                  onClick={() => handleOpenModal(cert)}
                >
                  <i className="fas fa-external-link-alt"></i> View details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CertificateModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        certificate={selectedCert}
      />
    </section>
  );
}

// ==========================================
// 8. PROJECTS COMPONENT
// ==========================================

function Projects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'JavaScript', 'Forms', 'Games', 'Web Apps'];

  const projectsData = [
    {
      title: 'ComLab Reservation System',
      description: 'A comprehensive computer laboratory reservation system featuring real-time schedule slot booking, seat mapping, and admin approval workflows.',
      liveUrl: 'https://comlabreservation.app',
      iconClass: 'fas fa-desktop',
      tags: ['React', 'Node.js', 'Booking', 'Reservation'],
      category: 'Web Apps',
    },
    {
      title: 'Syncrence',
      description: 'A real-time collaborative workspace and task management web application designed for synchronized team coordination, deployed on Vercel.',
      liveUrl: 'https://syncrence.vercel.app',
      iconClass: 'fas fa-sync',
      tags: ['React', 'Vercel', 'Collaboration', 'Real-time'],
      category: 'Web Apps',
    },
    {
      title: 'Registration Form with Validation',
      description: 'A responsive registration form with robust client-side validation logic and secure inputs, built using vanilla JavaScript and CSS.',
      liveUrl: 'https://zaitonic.github.io/Registration-form-with-validation-Magsumbol-Gargoles-and-Lozada/',
      iconClass: 'fas fa-file-signature',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Validation'],
      category: 'Forms',
    },
    {
      title: 'Quiz App with JQuery',
      description: 'An interactive multi-stage quiz application leveraging JQuery for asynchronous, dynamic content loading and real-time score tabulation.',
      liveUrl: 'https://zaitonic.github.io/Quiz-App-JQuery-Magsumbol-Gargoles-and-Lozada/',
      iconClass: 'fas fa-question-circle',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'JQuery'],
      category: 'JavaScript',
    },
    {
      title: 'JavaScript Games Collection',
      description: 'A collection of classic responsive arcade games built with vanilla JavaScript game loop mechanisms and local high score tracking.',
      liveUrl: 'https://zaitonic.github.io/JavaScript-games-Magsumbol.-Gargoles-and-Lozada/',
      iconClass: 'fas fa-gamepad',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Game Loop'],
      category: 'Games',
    },
    {
      title: 'Personal Website',
      description: 'A personal landing page hosted on InfinityFree hosting services, showcasing advanced styles and server redirection methods.',
      liveUrl: 'https://marklaurencelozada9.infinityfreeapp.com/?i=2',
      iconClass: 'fas fa-globe',
      tags: ['HTML5', 'CSS3', 'Web Hosting', 'InfinityFree'],
      category: 'Web Apps',
    },
  ];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => 
        project.category === filter || project.tags.includes(filter)
      );

  return (
    <section id="projects" className="projects reveal">
      <h2>My GitHub <span>Works</span></h2>
      <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', fontSize: '1.15rem' }}>
        Here are some of my projects that showcase my software creation, DOM manipulation, and dynamic API practices. Click to explore live previews!
      </p>

      <div className="projects-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <i className={project.iconClass}></i>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                >
                  <i className="fas fa-external-link-alt"></i> View Live Preview
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 9. CONTACT COMPONENT
// ==========================================

function Contact() {
  const [copiedItem, setCopiedItem] = useState(null);

  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: 'lozadamarklaurence226@gmail.com',
      copyValue: 'lozadamarklaurence226@gmail.com',
      iconClass: 'fas fa-envelope',
      link: 'mailto:lozadamarklaurence226@gmail.com',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: '@markrence_31',
      copyValue: 'markrence_31',
      iconClass: 'fab fa-instagram',
      link: 'https://www.instagram.com/markrence_31?igsh=MTJwbWVvMXhhNXBwcw==',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Marklaurence G. Lozada',
      copyValue: 'Marklaurence G. Lozada',
      iconClass: 'fab fa-linkedin',
      link: 'https://www.linkedin.com/in/marklaurence-g-lozada-39330729a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'zaitonic',
      copyValue: 'zaitonic',
      iconClass: 'fab fa-github',
      link: 'https://github.com/zaitonic',
    },
  ];

  const handleCopy = (id, text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(id);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    });
  };

  return (
    <section id="contact" className="contact reveal">
      <h2>Get In <span>Touch</span></h2>
      
      <div className="contact-container">
        <div className="contact-intro">
          <h3>Let's collaborate!</h3>
          <p>
            Whether you want to build a website, troubleshoot code components, collaborate on software design, or simply talk tech, feel free to reach out. I will get back to you as soon as possible!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', color: 'var(--accent)' }}>
              <i className="fas fa-check-circle"></i> Fast response times
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', color: 'var(--accent)' }}>
              <i className="fas fa-check-circle"></i> Clean coding practices
            </p>
          </div>
        </div>

        <div className="contact-grid">
          {contactItems.map((item) => (
            <div 
              key={item.id} 
              className="contact-item"
              onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <div className="contact-icon">
                <i className={item.iconClass}></i>
              </div>
              
              <div className="contact-details">
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>

              <button 
                className="copy-btn"
                onClick={(e) => handleCopy(item.id, item.copyValue, e)}
                title={`Copy ${item.label} to clipboard`}
                aria-label={`Copy ${item.label}`}
              >
                <i className={copiedItem === item.id ? 'fas fa-check' : 'fas fa-copy'}></i>
              </button>

              {copiedItem === item.id && (
                <span className="copy-feedback">
                  Copied!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. FOOTER COMPONENT
// ==========================================

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://github.com/zaitonic',
      iconClass: 'fab fa-github',
      label: 'GitHub',
    },
    {
      href: 'https://www.instagram.com/markrence_31?igsh=MTJwbWVvMXhhNXBwcw==',
      iconClass: 'fab fa-instagram',
      label: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/marklaurence-g-lozada-39330729a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      iconClass: 'fab fa-linkedin',
      label: 'LinkedIn',
    },
    {
      href: 'mailto:lozadamarklaurence226@gmail.com',
      iconClass: 'fas fa-envelope',
      label: 'Email',
    },
  ];

  return (
    <footer>
      <div className="social-links">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={social.label}
          >
            <i className={social.iconClass}></i>
          </a>
        ))}
      </div>
      <p className="copyright">
        &copy; {currentYear} Marklaurence Lozada. All rights reserved.
      </p>
    </footer>
  );
}

// ==========================================
// 11. MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = ['home', 'about', 'education', 'certificates', 'projects', 'contact'];

  // Track user scroll navigation states
  useScrollSpy(sections, setActiveSection);

  // Initialize fade-in on scroll animations
  useScrollReveal();

  return (
    <>
      {/* Background Particles */}
      <div className="bg-particle bg-p-1"></div>
      <div className="bg-particle bg-p-2"></div>
      <div className="bg-particle bg-p-3"></div>

      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Timeline />
        <Certificates />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
