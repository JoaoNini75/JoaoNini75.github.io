import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    title: 'Campus Management Application',
    kind: "Bachelor's Final Project",
    summary: 'A full-stack campus application built by a five-person team, with a strong focus on backend design and resilience.',
    tech: ['Java', 'Flutter', 'Google Cloud Platform'],
    details: [
      'Worked in a team of five on a full-stack campus application.',
      'Focused on back-end design, database definition, and server implementation.',
      'The server was the most resilient out of 14 teams during load testing.'
    ]
  },
  {
    title: 'PicastloSocial',
    kind: 'University Group Project',
    summary: 'A layered, microservices-based social network connecting a Kotlin/Spring backend with a React frontend.',
    tech: ['Spring', 'Kotlin', 'H2', 'React', 'Redux', 'TypeScript', 'OpenAPI 3.0'],
    details: [
      'Contributed to a layered, microservices-based social network.',
      'Worked across backend and frontend integration.',
      'The system included OpenAPI 3.0 documentation and full-stack integration.'
    ]
  },
  {
    title: 'Formal Verification of Programs Equivalence',
    kind: "Master's Thesis",
    summary: 'A transpiler and analysis tool exploring program equivalence through AST-level transformations.',
    tech: ['OCaml', 'Python', 'JavaScript', 'HTML', 'CSS', 'ASTs'],
    details: [
      'Developed bip2ml, a transpiler that transforms BipLang into OCaml.',
      'Applied AST-level transformations to support equivalence-based program proofs.',
      'Built a local web app to visualize input and output ASTs and analyze the transformation pipeline.'
    ]
  }
]

const experience = [
  {
    company: 'Opensoft',
    role: 'Software Engineer',
    dates: 'January 2026 – Present',
    logo: 'https://opensoft.pt/favicon.ico',
    summary: 'Working on modernizing and maintaining enterprise applications across backend and frontend technologies.',
    details: [
      'Migrated legacy applications to modern technologies including React, Kotlin and Java.',
      'Maintained multiple Spring and Java projects, resolving production and development issues.',
      'Increased automatic test coverage of a 50k+ LoC project by 5% using JUnit and Mockito.'
    ]
  },
  {
    company: 'Fidelidade',
    role: 'Software Engineer (Summer Intern)',
    dates: 'July 2024 – August 2024',
    logo: 'https://www.fidelidade.pt/favicon.ico',
    summary: 'Worked on OutSystems applications and performance analysis.',
    details: [
      'Completed OutSystems training and resolved application issues.',
      'Designed and began developing a new version of an existing OutSystems application.',
      'Created and presented a performance analysis report covering several websites and webpages using Dynatrace.'
    ]
  }
]

const skills = {
  Backend: ['Java', 'Spring Framework', 'Kotlin', 'REST APIs', 'JUnit', 'Mockito'],
  Frontend: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  Data: ['Oracle Database', 'H2'],
  Other: ['Python', 'OCaml', 'OpenAPI 3.0']
}

const certifications = [
  ['Critical Thinking & Problem Solving', 'Santander Open Academy · June 2025'],
  ['Negotiation', 'Santander Open Academy · June 2025'],
  ['Escola das Finanças', 'Magma Studio · March 2025'],
  ['Public Speaking Skills Workshop', 'Magma Studio · November 2025']
]

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.3S18 0 15 2a13 13 0 0 0-6 0C6 0 4.8.3 4.8.3A5 5 0 0 0 4.7 4a5.4 5.4 0 0 0-1.5 3.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.5 2-5-2-7-2"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/>
  }
  return <svg {...common}>{paths[name]}</svg>
}

function App() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [open, setOpen] = useState({ about: false, experience: null, projects: null, skills: false })
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to homepage">
            <span className="brand-mark">JN</span>
            <span>João Nini</span>
          </button>

          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {['about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item === 'skills' ? 'Skills & Education' : item[0].toUpperCase() + item.slice(1)}</button>
            ))}
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}>
              <Icon name={dark ? 'sun' : 'moon'} size={17} />
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer · Lisbon, Portugal</p>
            <h1>João Nini</h1>
            <p className="hero-lead">Full-stack software engineer with a focus on backend systems, APIs and reliable software.</p>
            <p className="hero-secondary">Currently working at Opensoft, building and modernizing applications with Java, Kotlin, Spring and React.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo('projects')}>View my work <Icon name="arrow" size={16} /></button>
              <a className="button secondary" href="./CV-JoaoNini.pdf" download>Download CV <Icon name="download" size={16} /></a>
            </div>
            <div className="social-row">
              <a href="https://github.com/JoaoNini75" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
              <a href="https://www.linkedin.com/in/joao-nini-8941b1234" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
              <a href="mailto:nini7500@gmail.com"><Icon name="mail" /> Email</a>
            </div>
          </div>
          <div className="hero-side" aria-hidden="true">
            <div className="hero-monogram">JN</div>
            <div className="hero-line"></div>
            <p>Full-stack<br/>Backend-focused</p>
          </div>
        </section>

        <section id="about" className="section content-section">
          <SectionHeading number="01" title="About Me" />
          <div className="section-body narrow">
            <p className="lead">I'm a software engineer based in Lisbon with a background in Computer Science and experience building full-stack applications, with a particular interest in backend development.</p>
            {open.about && (
              <div className="expanded-copy">
                <p>I enjoy working across the stack, from designing APIs and backend systems to building the interfaces that consume them. My experience includes production software, university projects and a master's thesis that explored program equivalence through transpilation and AST transformations.</p>
                <p>Outside software, I enjoy gaming, cars and motorsport, and music.</p>
              </div>
            )}
            <ExpandButton open={open.about} onClick={() => setOpen({ ...open, about: !open.about })} />
          </div>
        </section>

        <section id="experience" className="section content-section">
          <SectionHeading number="02" title="Experience" />
          <div className="section-body">
            <div className="timeline">
              {experience.map((item, index) => (
                <article className={`experience-item ${open.experience === index ? 'expanded' : ''}`} key={item.company}>
                  <div className="timeline-dot"></div>
                  <div className="experience-card">
                    <div className="org-row">
                      <div className="logo-wrap"><img src={item.logo} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('logo-fallback') }} /><span>{item.company.slice(0, 1)}</span></div>
                      <div className="org-copy"><h3>{item.company}</h3><p>{item.role}</p></div>
                      <time>{item.dates}</time>
                    </div>
                    <p className="summary">{item.summary}</p>
                    {open.experience === index && <ul className="detail-list">{item.details.map((d) => <li key={d}>{d}</li>)}</ul>}
                    <ExpandButton open={open.experience === index} onClick={() => setOpen({ ...open, experience: open.experience === index ? null : index })} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section content-section">
          <SectionHeading number="03" title="Projects" />
          <div className="section-body">
            <p className="section-intro">A selection of academic and technical work. The collection is intentionally easy to extend as new projects are added.</p>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project-card ${open.projects === index ? 'expanded' : ''}`} key={project.title}>
                  <div className="project-topline"><span>{project.kind}</span><span>0{index + 1}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tags">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
                  {open.projects === index && <div className="project-details"><h4>What I worked on</h4><ul>{project.details.map((d) => <li key={d}>{d}</li>)}</ul></div>}
                  <ExpandButton open={open.projects === index} label={open.projects === index ? 'Show less' : 'Explore project'} onClick={() => setOpen({ ...open, projects: open.projects === index ? null : index })} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section content-section">
          <SectionHeading number="04" title="Skills & Education" />
          <div className="section-body skills-grid">
            <div className="education-panel">
              <div className="org-row education-row">
                <div className="logo-wrap nova-logo"><img src="https://www.unl.pt/favicon.ico" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('logo-fallback') }} /><span>N</span></div>
                <div className="org-copy"><h3>Faculdade de Ciências e Tecnologia, Universidade Nova de Lisboa</h3><p>Integrated MSc in Computer Science</p></div>
              </div>
              <div className="education-meta"><span>Completed December 2025</span><span>BSc: 14/20 · MSc: 15/20</span></div>
              <div className="thesis"><strong>Master's thesis</strong><span>Formal Verification of Programs Equivalence · 18/20</span></div>
            </div>

            <div className="skills-panel">
              <div className="skill-groups">
                {Object.entries(skills).map(([group, values]) => (
                  <div className="skill-group" key={group}><h3>{group}</h3><div className="tags">{values.map((v) => <span key={v}>{v}</span>)}</div></div>
                ))}
              </div>

              <div className="language-group"><h3>Languages</h3><div className="language-list"><span>Portuguese <b>Native</b></span><span>English <b>C1</b></span><span>Spanish <b>A2</b></span></div></div>

              <div className="certifications">
                <div className="cert-header"><h3>Certifications & Courses</h3><button onClick={() => setOpen({ ...open, skills: !open.skills })}>{open.skills ? 'Show less' : 'View all'} <Icon name="chevron" size={15} /></button></div>
                <div className={`cert-list ${open.skills ? 'show-all' : ''}`}>
                  {(open.skills ? certifications : certifications.slice(0, 2)).map(([title, meta]) => <div className="cert" key={title}><strong>{title}</strong><span>{meta}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section content-section contact-section">
          <SectionHeading number="05" title="Contact" />
          <div className="contact-body">
            <div>
              <p className="lead">Interested in working together or just want to talk software?</p>
              <p className="contact-copy">The easiest way to reach me is by email. You can also find me on GitHub and LinkedIn.</p>
            </div>
            <div className="contact-actions">
              <a className="button primary" href="mailto:nini7500@gmail.com"><Icon name="mail" size={16} /> Get in touch</a>
              <a className="button secondary" href="./CV-JoaoNini.pdf" download><Icon name="download" size={16} /> Download CV</a>
            </div>
            <div className="contact-links">
              <a href="https://github.com/JoaoNini75" target="_blank" rel="noreferrer">GitHub <Icon name="arrow" size={15} /></a>
              <a href="https://www.linkedin.com/in/joao-nini-8941b1234" target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" size={15} /></a>
              <a href="mailto:nini7500@gmail.com">nini7500@gmail.com <Icon name="arrow" size={15} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} João Nini</span><span>Built with React</span></footer>
    </div>
  )
}

function SectionHeading({ number, title }) {
  return <div className="section-heading"><span>{number}</span><h2>{title}</h2></div>
}

function ExpandButton({ open, onClick, label }) {
  return <button className="expand-button" onClick={onClick} aria-expanded={open}>{label || (open ? 'Show less' : 'Read more')} <Icon name="chevron" size={14} /></button>
}

createRoot(document.getElementById('root')).render(<App />)
