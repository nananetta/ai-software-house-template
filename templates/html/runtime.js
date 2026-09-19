/* Shared enhancement only: all authoritative prose and PlantUML already exist in HTML. */
(() => {
  'use strict';
  const article = document.getElementById('document-content');
  const sections = [...article.children].filter(el => el.tagName === 'SECTION');
  const status = document.getElementById('render-status');
  const figures = [...article.querySelectorAll('figure')].filter(el => el.querySelector('[data-role="diagram-source"]'));
  const cdn = 'https://cdn.jsdelivr.net/npm/@plantuml/core@1.2026.8/';
  let index = 0;
  const isDeck = document.body.classList.contains('presentation');
  function show(next) {
    index = Math.max(0, Math.min(sections.length - 1, next));
    sections.forEach((section, i) => section.classList.toggle('active', i === index));
    document.getElementById('slide-count').textContent = `${index + 1} / ${sections.length}`;
    document.getElementById('previous').disabled = index === 0;
    document.getElementById('next').disabled = index === sections.length - 1;
  }
  if (isDeck) {
    document.body.classList.add('enhanced');
    show(0);
    document.getElementById('previous').onclick = () => show(index - 1);
    document.getElementById('next').onclick = () => show(index + 1);
    document.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.tagName) || event.target.isContentEditable) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); show(index + 1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); show(index - 1); }
      if (event.key === 'Home') show(0);
      if (event.key === 'End') show(sections.length - 1);
    });
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.getElementById(link.getAttribute('href').slice(1));
      const slide = sections.findIndex(section => section.contains(target));
      if (slide >= 0) show(slide);
    });
  } else {
    const list = document.querySelector('#toc ol');
    sections.forEach(section => {
      const heading = section.querySelector('h2');
      if (!heading || !section.id) return;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + section.id;
      link.textContent = heading.textContent;
      li.append(link); list.append(li);
    });
  }
  function timeout(promise, milliseconds, message) {
    let timer;
    return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), milliseconds); })]).finally(() => clearTimeout(timer));
  }
  function loadClassic(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error('CDN JavaScript could not load. Connect to the internet and reload.'));
      document.head.append(script);
    });
  }
  function fail(figure, message) {
    figure.dataset.renderState = 'failed';
    figure.querySelector('[data-role="diagram-render"]').textContent = 'Diagram unavailable: ' + message + ' Editable source is shown below.';
  }
  // Prevent remote source includes/assets and preserve the standalone-file contract.
  function checkSource(source) {
    if (/!include|!import|!theme|%load_json|%load_yaml|%getenv|<img\b|https?:\/\//i.test(source)) {
      throw new Error('Keep diagrams self-contained: external includes, themes, and images are unsupported.');
    }
  }
  function safeSvg(text) {
    const parsed = new DOMParser().parseFromString(text, 'image/svg+xml');
    if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') throw new Error('Renderer did not return valid SVG.');
    const svg = parsed.documentElement;
    if (/Syntax Error|An error has occurr?ed/i.test(svg.textContent)) throw new Error('PlantUML syntax error; review the source.');
    svg.querySelectorAll('script,foreignObject').forEach(node => node.remove());
    [svg, ...svg.querySelectorAll('*')].forEach(node => {
      [...node.attributes].forEach(attr => {
        if (/^on/i.test(attr.name) || ((attr.localName === 'href' || attr.name === 'src') && !attr.value.startsWith('#')) || /url\(\s*["']?(?:https?:|\/\/)/i.test(attr.value)) node.removeAttribute(attr.name);
      });
    });
    svg.setAttribute('role', 'img');
    return document.importNode(svg, true);
  }
  figures.forEach(figure => { figure.dataset.renderState = 'pending'; });
  window.documentReady = (async () => {
    try {
      if (figures.length) {
        await timeout(loadClassic(cdn + 'viz-global.js'), 45000, 'Diagram library download timed out; reload to retry.');
        const { renderToString } = await timeout(import(cdn + 'plantuml.js'), 45000, 'Diagram library download timed out; reload to retry.');
        // The TeaVM engine has shared state: serialize every callback-based render.
        for (const figure of figures) {
          const source = figure.querySelector('[data-role="diagram-source"]').textContent.trim();
          try {
            checkSource(source);
            const svgText = await timeout(new Promise((resolve, reject) => renderToString(source.split(/\r?\n/), resolve, message => reject(new Error(String(message))))), 45000, 'Diagram rendering timed out; reload to retry.');
            const svg = safeSvg(svgText);
            const caption = figure.querySelector('figcaption');
            if (caption) svg.setAttribute('aria-label', caption.textContent);
            figure.querySelector('[data-role="diagram-render"]').replaceChildren(svg);
            figure.dataset.renderState = 'ready';
          } catch (error) {
            fail(figure, error.message);
            // A timed-out worker may still finish: never start a concurrent render.
            if (/timed out/.test(error.message)) throw error;
          }
        }
      }
    } catch (error) {
      figures.filter(figure => figure.dataset.renderState === 'pending').forEach(figure => fail(figure, error.message));
    }
    const failures = figures.filter(figure => figure.dataset.renderState !== 'ready').length;
    document.body.dataset.renderState = failures ? 'failed' : 'ready';
    status.textContent = failures ? `${failures} diagram(s) unavailable. Source remains readable. Resolve errors and reload before Print / PDF.` : `Ready · ${figures.length} diagram(s) rendered locally`;
    return { ready: !failures, diagrams: figures.length, failures };
  })();
  document.getElementById('print-document').onclick = async () => {
    const button = document.getElementById('print-document');
    button.disabled = true;
    const result = await window.documentReady;
    button.disabled = false;
    if (!result.ready) { status.textContent = 'Print paused: resolve the diagram errors and reload first. Source remains available below.'; return; }
    await document.fonts.ready;
    window.print();
  };
})();
