(() => {
  const data = window.PORTFOLIO_DATA || { profile: {}, certificates: [], projects: [] };
  const grid = document.querySelector('#certificate-grid');
  const dialog = document.querySelector('#certificate-dialog');
  const viewer = document.querySelector('#dialog-viewer');
  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const renderCertificates = filter => {
    const items = data.certificates.filter(c => filter === 'all' || c.category === filter);
    document.querySelector('#certificate-count').textContent = data.certificates.length;
    grid.innerHTML = items.map((c, i) => `<button class="certificate-card" data-index="${data.certificates.indexOf(c)}" aria-label="View ${esc(c.title)} certificate"><span class="certificate-thumb">${/\.(jpe?g|png)$/i.test(c.file) ? `<img src="${esc(c.file)}" alt="Preview of ${esc(c.title)}" loading="lazy">` : '<span class="pdf-cover"><span>PDF</span></span>'}</span><span class="certificate-info"><span class="certificate-category">${esc(c.category)}</span><span class="certificate-info-inner"><h3>${esc(c.title)}</h3><span class="certificate-meta">${esc(c.organization || 'Issuer not specified')}${c.date ? `<span>${esc(c.date)}</span>` : ''}</span></span></span></button>`).join('') || '<p class="empty-note">No certificates in this category yet.</p>';
    grid.querySelectorAll('.certificate-card').forEach(card => card.addEventListener('click', () => openCertificate(data.certificates[Number(card.dataset.index)])));
  };
  function openCertificate(c) {
    document.querySelector('#dialog-title').textContent = c.title;
    document.querySelector('#dialog-meta').textContent = [c.organization || 'Issuer not specified', c.date].filter(Boolean).join(' · ');
    document.querySelector('#dialog-open').href = c.file;
    viewer.innerHTML = /\.(jpe?g|png)$/i.test(c.file) ? `<img src="${esc(c.file)}" alt="${esc(c.title)}">` : `<iframe src="${esc(c.file)}" title="${esc(c.title)} PDF" loading="lazy"></iframe>`;
    dialog.showModal();
  }
  renderCertificates('all');
  const projectGrid = document.querySelector('#project-grid');
  if (data.projects.length) {
    projectGrid.innerHTML = data.projects.map(p => `<article class="project-card"><div class="project-art">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : `<span aria-hidden="true">${esc(p.mark || '✳')}</span>`}</div><div class="project-content"><h3>${esc(p.title)}</h3><p>${esc(p.description || '')}</p><div class="skill-tags">${(p.technologies || []).map(t => `<span>${esc(t)}</span>`).join('')}</div><div class="project-links">${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live project ↗</a>` : ''}</div></div></article>`).join('');
    document.querySelector('.empty-note').hidden = true;
  }
  document.querySelectorAll('.filter-chip').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter-chip.active')?.classList.remove('active'); button.classList.add('active'); renderCertificates(button.dataset.filter); }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { viewer.innerHTML = ''; });
  const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('#primary-nav');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation'); }));
  const profile = data.profile;
  if (profile.photo) {
    const placeholder = document.querySelector('.portrait-placeholder');
    placeholder.innerHTML = `<img src="${esc(profile.photo)}" alt="Portrait of ${esc(profile.name || 'Conrad Taguinod')}">`;
    placeholder.classList.add('has-photo');
  }
  if (profile.email) { const link=document.querySelector('#email-link'); link.href=`mailto:${profile.email}`; link.textContent=`${profile.email} ↗`; }
  if (profile.resume) { const link=document.querySelector('#resume-download'); link.href=profile.resume; link.download=''; link.innerHTML='Download resume <span aria-hidden="true">↓</span>'; }
  const socials = [['Phone', profile.phone ? `tel:${profile.phone}` : '', profile.phone], ['GitHub',profile.github,'Visit profile'],['LinkedIn',profile.linkedin,'Visit profile']].filter(x=>x[1]);
  document.querySelector('#social-links').innerHTML = socials.length ? socials.map(([n,u,label])=>`<a class="social-item" href="${esc(u)}" ${u.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}><span>${esc(n)}</span><span>${esc(label)} ↗</span></a>`).join('') : '<p class="muted">Social profiles can be added in <code>js/data.js</code>.</p>';
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
