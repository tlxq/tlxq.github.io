import React, { useEffect } from "react";
import {
  FaAt,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaUser,
  FaCog,
  FaTerminal,
  FaLanguage,
  FaGraduationCap,
  FaSuitcase,
  FaUsers,
} from "react-icons/fa";

/**
 * CV.jsx
 *
 * A self-contained React component for your CV page.
 *
 * Usage:
 *  - Place this file in your project, e.g. src/components/CV.jsx
 *  - Ensure you have react-icons installed: `npm install react-icons`
 *  - Provide images at the paths below or override by passing props:
 *      <CV profileSrc="/cv/assets/profile.png" qrSrc="/cv/assets/qr.png" />
 *
 * The component injects its own styles on mount so you don't need a separate CSS file.
 * It renders a sidebar, a main content area and a simple SVG radar/spider chart.
 */

function injectStyles() {
  if (document.getElementById("cv-component-styles")) return;
  const css = `
:root{
  --color-textmain: #212121;
  --color-textside: #ffffff;
  --color-highlight: #5682B1;
  --side-width: 320px;
  --gap: 18px;
  font-family: "Fira Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.cv-root{display:flex;min-height:100vh;background:#fff;color:var(--color-textmain)}
.sidebar{width:var(--side-width);background:var(--color-highlight);color:var(--color-textside);padding:24px;display:flex;flex-direction:column;gap:14px;align-items:center}
.profile-frame{width:140px;height:140px;border-radius:12px;border:4px solid var(--color-textside);overflow:hidden;flex:0 0 auto}
.profile-img{width:100%;height:100%;object-fit:cover;display:block}
.sidebar-section{width:100%}
.section-title{font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.labels{display:flex;flex-direction:column;gap:6px}
.label{background:rgba(255,255,255,0.12);padding:6px;border-radius:6px}
.skills-list{padding-left:16px;margin:0}
.spider-container{display:flex;justify-content:center;align-items:center;padding:8px}
.qr{margin-top:auto}
.main-column{flex:1;padding:24px;display:flex;flex-direction:column;gap:12px}
.topbar{border-bottom:2px solid rgba(0,0,0,0.06);padding-bottom:12px}
.name-block{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.name-highlight{color:var(--color-highlight);margin:0;font-size:28px}
.profession{color:#666;margin-top:2px}
.contact-list{list-style:none;padding:0;margin:0}
.contact-list li{margin:4px 0}
.interests{margin-top:12px}
.triples{display:flex;gap:12px}
.mainpart{display:flex;flex-direction:column;gap:12px;padding-top:8px}
.card{background:#fff;border:1px solid rgba(0,0,0,0.06);padding:14px;border-radius:6px}
.card-header h3{margin:0;color:var(--color-highlight)}
.skill-row{display:flex;align-items:center;gap:8px;margin:6px 0}
.skill-label{width:90px;font-size:14px;color:var(--color-textside)}
.skill-track{flex:1;background:rgba(0,0,0,0.12);height:10px;border-radius:6px;overflow:hidden}
.skill-fill{height:100%;background:var(--color-textside);border-radius:6px}
@media (max-width:900px){
  .cv-root{flex-direction:column}
  .sidebar{width:100%;flex-direction:row;overflow:auto;padding:12px;align-items:flex-start}
  .profile-frame{margin-right:12px}
  .main-column{padding:12px}
}
`;
  const style = document.createElement("style");
  style.id = "cv-component-styles";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

/* Small reusable SkillBar */
function SkillBar({ label, value = 3, max = 5 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="skill-row" aria-hidden="true">
      <div className="skill-label" style={{ color: "rgba(255,255,255,0.95)" }}>{label}</div>
      <div className="skill-track" aria-hidden="true">
        <div className="skill-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* Radar (spider) chart implemented in SVG */
function RadarChart({ data = [], max = 5, size = 200 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const n = data.length || 1;

  // helper to compute polar coordinate
  const polar = (i, r) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return [x, y];
  };

  // concentric rings
  const rings = Array.from({ length: max }, (_, lev) => {
    const r = ((lev + 1) / max) * radius;
    const points = Array.from({ length: n })
      .map((_, i) => polar(i, r).join(","))
      .join(" ");
    return { key: lev, points };
  });

  // axes + labels
  const axes = Array.from({ length: n }).map((_, i) => {
    const [x, y] = polar(i, radius);
    const [lx, ly] = polar(i, radius + 18);
    return { x, y, lx, ly, name: data[i].name };
  });

  // data polygon points
  const dataPoints = data
    .map((d, i) => {
      const r = (d.value / max) * radius;
      const [x, y] = polar(i, r);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Kompetensdiagram">
      {rings.map((r) => (
        <polygon key={r.key} points={r.points} fill="none" stroke="rgba(255,255,255,0.12)" />
      ))}

      {axes.map((a, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={a.x} y2={a.y} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <text x={a.lx} y={a.ly} fontSize="10" fill="#ffffff" textAnchor="middle">
            {a.name}
          </text>
        </g>
      ))}

      <polygon points={dataPoints} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

/* Main CV component */
export default function CV({
  profileSrc = "/cv/assets/profile.png", // default relative path; change as needed
  qrSrc = "/cv/assets/qr.png",
  spiderData = [
    { name: "JavaScript", value: 5 },
    { name: "React", value: 4 },
    { name: "TypeScript", value: 3 },
    { name: "Git", value: 5 },
    { name: "Terminal", value: 4 },
    { name: "Linux", value: 3 },
  ],
}) {
  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div className="cv-root">
      <aside className="sidebar" aria-label="Sidofält">
        <div className="profile-frame" role="img" aria-label="Profilbild">
          <img src={profileSrc} alt="profile" className="profile-img" onError={(e) => { e.currentTarget.style.opacity = 0.35 }} />
        </div>

        <div className="sidebar-section" aria-label="Egenskaper">
          <div className="section-title"><FaUser /> <span style={{marginLeft:8}}>Egenskaper</span></div>
          <div className="labels">
            <span className="label">Kreativitet</span>
            <span className="label">Samarbete</span>
            <span className="label">Anpassningsförmåga</span>
            <span className="label">Kommunikation</span>
            <span className="label">Noggrann</span>
          </div>
        </div>

        <div className="sidebar-section" aria-label="Färdigheter">
          <div className="section-title"><FaCog /> <span style={{marginLeft:8}}>Färdigheter</span></div>
          <ul className="skills-list" style={{color:"rgba(255,255,255,0.95)"}}>
            <li>HTML, CSS, JS, TS</li>
            <li>React</li>
            <li>Tailwind CSS, SCSS, Bootstrap</li>
            <li>Git, GitHub, Vite, Webpack</li>
            <li>Material UI, API-integration</li>
            <li>Docker, Linux, Windows</li>
          </ul>
        </div>

        <div className="sidebar-section" aria-label="Styrkor">
          <div className="section-title"><FaTerminal /> <span style={{marginLeft:8}}>Styrkor</span></div>
          <div className="spider-container" aria-hidden="true">
            <RadarChart data={spiderData} max={5} size={200} />
          </div>
        </div>

        <div className="sidebar-section" aria-label="Språk">
          <div className="section-title"><FaLanguage /> <span style={{marginLeft:8}}>Språk</span></div>
          <SkillBar label="Svenska" value={5} max={5} />
          <SkillBar label="Engelska" value={4} max={5} />
        </div>

        <div className="qr" aria-hidden="true">
          <img src={qrSrc} alt="QR" style={{ width: 84, borderRadius: 4 }} onError={(e) => { e.currentTarget.style.opacity = 0.35 }} />
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar" aria-label="Topbar">
          <div className="name-block">
            <div>
              <h1 className="name-highlight">Tom Larsson</h1>
              <div className="profession">Utvecklare</div>
            </div>

            <div style={{ minWidth: 220 }}>
              <div className="section-title small">Kontakt</div>
              <ul className="contact-list">
                <li><FaAt /> <a href="mailto:tmlsn@hotmail.com" style={{marginLeft:8}}>tmlsn@hotmail.com</a></li>
                <li><FaMobileAlt /> <span style={{marginLeft:8}}>072 212 13 01</span></li>
                <li><FaMapMarkerAlt /> <span style={{marginLeft:8}}>Strängnäs</span></li>
                <li><FaGlobe /> <a href="https://tlxq.dev" style={{marginLeft:8}}>tlxq.dev</a></li>
                <li><FaGithub /> <a href="https://github.com/tlxq" style={{marginLeft:8}}>tlxq</a></li>
                <li><FaLinkedin /> <a href="https://www.linkedin.com/in/tlxq" style={{marginLeft:8}}>Tom Larsson</a></li>
              </ul>
            </div>
          </div>

          <div className="interests" style={{marginTop:12}}>
            <div className="section-title small">Intressen</div>
            <div className="triples">Träning · Teknik · Fotboll</div>
          </div>
        </header>

        <main className="mainpart" aria-label="Huvuddel">
          <section className="card" aria-labelledby="profil-heading">
            <div className="card-header"><h3 id="profil-heading"><FaUsers style={{marginRight:8}} />Profil</h3></div>
            <div className="card-body">
              Jag söker nya utmaningar som utvecklare efter ett karriärbyte. Detta är ett stort intresse för mig så valet blev självklart. Privat engagerar jag mig i systemoptimering och programmering på Linuxplattformar. Mitt mål är att kontinuerligt utvecklas i rollen.
            </div>
          </section>

          <section className="card" aria-labelledby="utbildning-heading">
            <div className="card-header"><h3 id="utbildning-heading"><FaGraduationCap style={{marginRight:8}} />Utbildning</h3></div>
            <div className="card-body">
              <h4>Frontendutvecklare React</h4>
              <em>Yrkeshögskolan i Borås — 2025-2026</em>
              <ul>
                <li>Webbprogrammering med JavaScript</li>
                <li>JavaScript-ramverk (React)</li>
                <li>UX och interaktionsdesign</li>
                <li>Apputveckling</li>
                <li>Backend-utveckling med Node.js</li>
                <li>Databasteknik</li>
                <li>Agil projektmetodik</li>
              </ul>
            </div>
          </section>

          <section className="card" aria-labelledby="erfarenheter-heading">
            <div className="card-header"><h3 id="erfarenheter-heading"><FaSuitcase style={{marginRight:8}} />Arbetslivserfarenheter</h3></div>
            <div className="card-body">
              <h4>Operatör — Idemia, Strängnäs (2022-2024)</h4>
              <p>Arbetade med uppgifter som krävde struktur, precision och effektivt arbetsflöde. Utvecklade förmågan att identifiera problem, analysera orsaker och lösa fel systematiskt.</p>

              <h4>Säljare — OKQ8 (2021-2024)</h4>
              <p>Kundnära roll med tekniska arbetsmoment, problemlösning och multitasking. Utvecklade förmågan att kommunicera tydligt, hantera stress och se helheten.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}