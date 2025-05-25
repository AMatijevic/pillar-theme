// Loads cv-data.json and populates the HTML template
async function loadCV() {
  const response = await fetch('cv-data.json');
  const data = await response.json();

  // Personal Info
  document.querySelector('.name').textContent = data.personalInfo.name;
  document.querySelector('.title').textContent = data.personalInfo.title;
  document.querySelector('.primary-info ul').innerHTML = `
    <li class="mb-2"><a href="mailto:${data.personalInfo.contact.email}"><i class="far fa-envelope fa-fw mr-2"></i>${data.personalInfo.contact.email}</a></li>
    <li><a href="tel:${data.personalInfo.contact.phone}"><i class="fas fa-mobile-alt fa-fw mr-2"></i>${data.personalInfo.contact.phone}</a></li>
  `;
  document.querySelector('.resume-social').innerHTML = data.personalInfo.social.map(s =>
    `<li class="mb-3"><a href="${s.link}"><span class="fa-container text-center mr-2"><i class="${s.icon}"></i></span>${s.text}</a></li>`
  ).join('');

  // Career Summary
  document.querySelector('.summary-section .resume-section-content p').innerHTML = data.careerSummary.replace(/\n/g, '<br>');

  // Skills
  const skillCats = ['backend', 'frontend', 'tools'];
  skillCats.forEach((cat, i) => {
    const container = document.querySelectorAll('.resume-skill-item')[i];
    container.querySelector('ul').innerHTML = data.skills[cat].map(skill =>
      `<li class="mb-2">
        <div class="resume-skill-name">${skill.name}</div>
        <div class="progress resume-progress">
          <div class="progress-bar theme-progress-bar-dark" role="progressbar" style="width: ${skill.level}%" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </li>`
    ).join('');
  });
  // Others
  document.querySelector('.resume-skill-item:last-child ul').innerHTML = data.skills.others.map(o => `<li class="list-inline-item"><span class="badge badge-light">${o}</span></li>`).join('');

  // Certifications
  const certCols = document.querySelectorAll('.certification-section .resume-skill-item ul');
  certCols[0].innerHTML = data.certifications.slice(0,4).map(c =>
    `<li class="mb-2">
      <div class="resume-degree font-weight-bold">${c.title}</div>
      <div class="resume-degree-org">${c.organization}</div>
      <div class="resume-degree-time">${c.period}</div>
    </li>`
  ).join('');
  certCols[1].innerHTML = data.certifications.slice(4).map(c =>
    `<li class="mb-2">
      <div class="resume-degree font-weight-bold">${c.title}</div>
      <div class="resume-degree-org">${c.organization}</div>
      <div class="resume-degree-time">${c.period}</div>
    </li>`
  ).join('');

  // Work Experience
  document.querySelector('.experience-section .resume-timeline').innerHTML = data.workExperience.map(exp =>
    `<article class="resume-timeline-item position-relative pb-5">
      <div class="resume-timeline-item-header mb-2">
        <div class="d-flex flex-column flex-md-row">
          <h3 class="resume-position-title font-weight-bold mb-1">${exp.position}</h3>
          <div class="resume-company-name ml-auto">${exp.company}</div>
        </div>
        <div class="resume-position-time">${exp.period}</div>
      </div>
      <div class="resume-timeline-item-desc">
        <p>${exp.description}</p>
        ${exp.achievements && exp.achievements.length ? `<h4 class="resume-timeline-item-desc-heading font-weight-bold">Achievements:</h4><ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
        ${exp.technologies && exp.technologies.length ? `<h4 class="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4><ul class="list-inline">${exp.technologies.map(t => `<li class="list-inline-item"><span class="badge badge-primary badge-pill">${t}</span></li>`).join('')}</ul>` : ''}
      </div>
    </article>`
  ).join('');

  // Personal Projects
  document.querySelectorAll('.experience-section .resume-timeline')[1].innerHTML = data.personalProjects.map(proj =>
    `<article class="resume-timeline-item position-relative pb-5">
      <div class="resume-timeline-item-header mb-2">
        <div class="d-flex flex-column flex-md-row">
          <h3 class="resume-position-title font-weight-bold mb-1">${proj.position}</h3>
          <div class="resume-company-name ml-auto">${proj.company}</div>
        </div>
        <div class="resume-position-time">${proj.period}</div>
      </div>
      <div class="resume-timeline-item-desc">
        <p>${proj.description}</p>
        ${proj.technologies && proj.technologies.length ? `<h4 class="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4><ul class="list-inline">${proj.technologies.map(t => `<li class="list-inline-item"><span class="badge badge-primary badge-pill">${t}</span></li>`).join('')}</ul>` : ''}
      </div>
    </article>`
  ).join('');

  // Education
  document.querySelector('.education-section .resume-section-content ul').innerHTML = data.education.map(e =>
    `<li class="mb-2">
      <div class="resume-degree font-weight-bold">${e.degree}</div>
      ${e.org ? `<div class="resume-degree-org">${e.org}</div>` : ''}
      <div class="resume-degree-org">${e.school}</div>
      <div class="resume-degree-time">${e.period}</div>
    </li>`
  ).join('');

  // Languages
  document.querySelector('.language-section .resume-lang-list').innerHTML = data.languages.map(l =>
    `<li class="mb-2"><span class="resume-lang-name font-weight-bold">${l.name}</span> <small class="text-muted font-weight-normal">(${l.level})</small></li>`
  ).join('');

  // Interests
  document.querySelector('.interests-section .resume-section-content ul').innerHTML = data.interests.map(i => `<li class="mb-1">${i}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', loadCV);
