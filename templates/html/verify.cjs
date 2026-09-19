#!/usr/bin/env node
// Requires Playwright, installed Chrome, and pdfjs-dist; install nothing at runtime.
// NODE_PATH may point to the Codex bundled Node dependencies.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const output = path.resolve(process.env.HTML_QA_OUTPUT || '/tmp/html-starter-qa');
const supported = ['ceo-presentation','functional-spec','ceo-tech-presentation','architecture-technical-spec','implementation-technical-spec'];
const kinds = process.env.HTML_QA_TYPES ? process.env.HTML_QA_TYPES.split(',') : supported;
assert.ok(kinds.length && kinds.every(kind => supported.includes(kind)), 'Unknown HTML_QA_TYPES');
fs.mkdirSync(output,{recursive:true});
const report = [];
const check = (condition, message) => assert.ok(condition, message);
(async()=> {
 const {getDocument} = await import(pathToFileURL(require.resolve('pdfjs-dist/legacy/build/pdf.mjs')).href);
 const browser = await chromium.launch({channel:process.env.HTML_QA_BROWSER || 'chrome',headless:true});
 try {
 for (const kind of kinds) {
  const file = path.join(__dirname,'starters',kind+'.html'), url=pathToFileURL(file).href;
  const row = {kind,checks:[], requests:[]}; report.push(row);
  const context=await browser.newContext({viewport:{width:1365,height:1000},acceptDownloads:true});
  const page=await context.newPage();
  page.on('request',r=>{if(r.url().startsWith('http'))row.requests.push(r.url());});
  await page.addInitScript(()=>{window.__printCalls=0;window.print=()=>window.__printCalls++;});
  await page.goto(url,{waitUntil:'domcontentloaded'});
  const earlyPrint = kind === 'ceo-presentation' && await page.getAttribute('body','data-render-state') === 'pending';
  if (earlyPrint) { await page.locator('#print-document').click(); check(await page.locator('#print-document').isDisabled(), 'Print must wait for rendering'); check(await page.evaluate(()=>window.__printCalls)===0, 'Print fired before diagrams'); }
  await page.waitForFunction(()=>['ready','failed'].includes(document.body.dataset.renderState),{},{timeout:180000});
  check(await page.getAttribute('body','data-render-state')==='ready',kind+': diagrams fail: '+await page.locator('#render-status').innerText()+' '+(await page.locator('[data-role=diagram-render]').allTextContents()).join(' '));
  const sources=await page.locator('script[data-role="diagram-source"]').allTextContents();
  check(sources.length>0 && sources.every(s=>s.includes('@startuml')),kind+': missing editable source');
  check(await page.locator('figure [data-role="diagram-render"] svg').count()===sources.length,kind+': missing SVG');
  check(row.requests.length===2 && row.requests.every(u=>['https://cdn.jsdelivr.net/npm/@plantuml/core@1.2026.8/viz-global.js','https://cdn.jsdelivr.net/npm/@plantuml/core@1.2026.8/plantuml.js'].includes(u)),kind+': unexpected network: '+row.requests.join(', '));
  row.checks.push('direct file opening, actual SVG diagrams, two pinned JS CDN requests');
  const sections=page.locator('#document-content > section'); const sectionCount=await sections.count();
  const headings=await sections.locator('h2').allTextContents(); row.sectionCount=sectionCount;
  const presentation=await page.locator('body').evaluate(el=>el.classList.contains('presentation'));
  if(presentation) {
   await page.locator('#next').click(); check(await sections.nth(1).isVisible(),kind+': next');
   await page.locator('#document-content > section.active h2').click(); await page.keyboard.press('ArrowLeft'); check(await sections.first().isVisible(),kind+': left key');
   await page.keyboard.press('End'); check(await sections.last().isVisible(),kind+': End key');
   await page.keyboard.press('Home'); check(await sections.first().isVisible(),kind+': Home key');
   row.checks.push('slide buttons and keyboard');
  }
  await page.locator('#print-document').click();
  check(await page.evaluate(()=>window.__printCalls)===(earlyPrint?2:1),kind+': ready print unavailable');
  await page.setViewportSize({width:390,height:844});
  for(let n=0;n<(presentation?sectionCount:1);n++) {
   if(presentation && n) await page.locator('#next').click();
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
   check(dimensions.scroll<=dimensions.width+1,kind+': mobile overflow '+JSON.stringify(dimensions));
  }
  await page.screenshot({path:path.join(output,kind+'-mobile.png'),fullPage:true});
  row.checks.push('390px mobile document overflow');
  await page.setViewportSize({width:1365,height:1000});
  await page.emulateMedia({media:'print'});
  for(let n=0;n<sectionCount;n++) check(await sections.nth(n).isVisible(),kind+': print hides section');
  const pdfFile=path.join(output,kind+'.pdf');
  await page.pdf({path:pdfFile,preferCSSPageSize:true,printBackground:true});
  const doc=await getDocument({data:new Uint8Array(fs.readFileSync(pdfFile)),useSystemFonts:true}).promise;
  const pages=[];
  for(let n=1;n<=doc.numPages;n++) {
   const pdfPage=await doc.getPage(n),content=await pdfPage.getTextContent(),view=pdfPage.view;
   check((view[2]>view[3])===presentation,kind+': wrong PDF orientation');
   const outside=content.items.filter(i=>i.str?.trim()&&(i.transform[4]<0||i.transform[5]<0||i.transform[4]+i.width>view[2]+2||i.transform[5]>view[3]+2));
   check(!outside.length,kind+': PDF text outside page '+outside.map(i=>i.str).join(', '));
   pages.push({page:n,text:content.items.map(i=>i.str).join(' '),width:view[2],height:view[3]});
  }
  const pdfText=pages.map(p=>p.text).join(' ').replace(/\s+/g,' ');
  for(const heading of headings) check(pdfText.includes(heading.replace(/\s+/g,' ')),kind+': missing PDF heading '+heading);
  if(presentation) check(doc.numPages===sectionCount,kind+': '+doc.numPages+' pages for '+sectionCount+' slides');
  row.pdfPages=pages; row.checks.push('PDF orientation, text bounds, all section headings'+(presentation?', one page per slide':''));
  await context.close();
  const plain=await browser.newContext({javaScriptEnabled:false}); const plainPage=await plain.newPage(); await plainPage.goto(url,{waitUntil:'domcontentloaded'});
  check(await plainPage.locator('#document-content').count()===1,kind+': authoritative article missing');
  check(await plainPage.locator('script[data-role="diagram-source"]').count()===sources.length,kind+': source missing without JS');
  for(let n=0;n<sectionCount;n++) check(await plainPage.locator('#document-content > section').nth(n).isVisible(),kind+': no-JS section hidden');
  row.extracted=await plainPage.locator('#document-content').evaluate(el=>({headings:[...el.querySelectorAll('h1,h2,h3')].map(x=>x.textContent),tables:el.querySelectorAll('table').length,metadata:el.querySelector('[data-role=document-metadata]')?.textContent,sources:[...el.querySelectorAll('script[data-role=diagram-source]')].map(x=>x.textContent)}));
  check(row.extracted.metadata,kind+': metadata missing');
  for (let n=0;n<sources.length;n++) check(await plainPage.locator('script[data-role=diagram-source]').nth(n).isVisible(),kind+': no-JS source not readable'); await plain.close(); row.checks.push('no-JS text/metadata/section/source extraction');
  const blocked=await browser.newContext(); await blocked.route('**/*', route => /^https?:/.test(route.request().url()) ? route.abort('failed') : route.continue());
  const blockedPage=await blocked.newPage(); await blockedPage.addInitScript(()=>{window.__printCalls=0;window.print=()=>window.__printCalls++;});
  await blockedPage.goto(url,{waitUntil:'domcontentloaded'}); await blockedPage.waitForFunction(()=>document.body.dataset.renderState==='failed',{},{timeout:60000});
  check((await blockedPage.locator('#document-content').innerText()).length>200,kind+': lost text on failure');
  await blockedPage.locator('#print-document').click(); check(await blockedPage.evaluate(()=>window.__printCalls)===0,kind+': print allows failure');
  check(await blockedPage.locator('script[data-role="diagram-source"]').count()===sources.length,kind+': fallback source not exposed');
  await blocked.close(); row.checks.push('blocked CDN retains text/source and blocks premature print');
  console.log('PASS '+kind);
 }
 } finally {await browser.close();fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});
