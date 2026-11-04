import {test,expect} from '@playwright/test';
for(const width of [360,768,1440]){
 test(`layout and navigation at ${width}px`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.setViewportSize({width,height:900});await page.goto('/');await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('h1')).toContainText('Angelo');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('data-motion',/on|off/);
  await expect.poll(()=>page.locator('[data-letter]').evaluateAll(elements=>elements.every(el=>Number(getComputedStyle(el).opacity)===1))).toBe(true);
  await page.screenshot({path:`test-results/hero-${width}.png`,animations:'disabled'});
  if(width<801){await page.getByRole('button',{name:'Open menu'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.getByRole('button',{name:'Open menu'})).toBeFocused();await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('dialog').getByRole('link',{name:'Work'}).click();}
  else await page.getByRole('navigation').getByRole('link',{name:'Work',exact:true}).click();
  await expect(page).toHaveURL(/#work$/);await page.getByRole('link',{name:'Português brasileiro',exact:true}).click();
  await expect(page).toHaveURL(/\/pt#work$/);await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');await expect(page.locator('#work h2')).toHaveText('Engenharia na prática.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('#about').scrollIntoViewIfNeeded();
  const sectionScreenshotStyle='.header,.scroll-progress,.skip-link,nextjs-portal{visibility:hidden!important}';
  await page.locator('#about').screenshot({path:`test-results/about-${width}.png`,animations:'disabled',style:sectionScreenshotStyle});
  await page.locator('#work').screenshot({path:`test-results/work-${width}.png`,animations:'disabled',style:sectionScreenshotStyle});
  if(width===1440){await expect(page.getByRole('navigation').getByRole('link',{name:'Projetos',exact:true})).toHaveAttribute('aria-current','location');}
  expect(errors).toEqual([]);
 });
}
test('clipboard and localized PDF downloads',async({page,context,request})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/en');await page.getByRole('button',{name:'Copy email',exact:true}).click();await expect(page.getByRole('button',{name:'Email copied',exact:true})).toBeVisible();expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('angelobielmoreira@hotmail.com');
 for(const locale of ['en','pt']){await page.goto(`/${locale}`);const resume=page.locator(`a[href="/resume/angelo-costa-${locale}.pdf"]`).first();await expect(resume).toHaveAttribute('download','');const response=await request.get(`/resume/angelo-costa-${locale}.pdf`);expect(response.status()).toBe(200);expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');}
});
test('technology cards, expandable experience and motion controls',async({page})=>{
 await page.goto('/en');
 await expect(page.locator('.primary-tech-card')).toHaveCount(8);
 await expect(page.locator('.primary-tech-card .tech-icon svg')).toHaveCount(8);
 await expect(page.locator('.career-card')).toHaveCount(2);
 const details=page.locator('.career-details').first();
 const collapsedHeight=await details.evaluate(el=>el.getBoundingClientRect().height);
 await details.locator('summary').focus();await page.keyboard.press('Enter');
 const heights=await details.evaluate(el=>new Promise<number[]>(resolve=>{
  const values:number[]=[];const start=performance.now();
  const sample=()=>{values.push(el.getBoundingClientRect().height);if(performance.now()-start<220)requestAnimationFrame(sample);else resolve(values);};requestAnimationFrame(sample);
 }));
 expect(new Set(heights.map(Math.round)).size).toBeGreaterThan(2);
 expect(heights.at(-1)!).toBeGreaterThan(collapsedHeight);
 await expect(details).toHaveAttribute('open','');
 await expect(details.getByText('APIs that connect the product',{exact:true})).toBeVisible();
 await details.locator('summary').press('Enter');
 await expect(details).not.toHaveAttribute('open');
 await expect.poll(()=>details.evaluate(el=>el.getBoundingClientRect().height)).toBeCloseTo(collapsedHeight,0);
 await page.getByRole('button',{name:'Pause technology ribbon'}).click();
 await expect(page.getByRole('button',{name:'Play technology ribbon'})).toBeVisible();
 expect(await page.locator('.ribbon-track').evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused');
 expect(await page.locator('.ribbon-track-back').evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect.poll(()=>page.locator('.ribbon-track').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.getByRole('button',{name:'Enable animations',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect.poll(()=>page.locator('.interface-node').evaluate(el=>getComputedStyle(el).animationName)).toBe('float');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect.poll(()=>page.locator('.interface-node').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});
test('reduced motion and metadata',async({page,request})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/pt');await expect(page.locator('html')).toHaveAttribute('data-motion','on');await page.locator('.motion-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-motion','off');await expect(page.locator('h1')).toBeVisible();expect(await page.locator('.interface-node').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/\/pt$/);await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href',/\/en$/);expect((await request.get('/sitemap.xml')).status()).toBe(200);expect((await request.get('/robots.txt')).status()).toBe(200);expect((await request.get('/fr')).status()).toBe(404);
});
test('explicit motion preference survives reloads and locale changes',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en');
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await expect.poll(()=>page.locator('.interface-node').evaluate(el=>getComputedStyle(el).animationName)).toBe('float');
 await page.getByRole('link',{name:'Português brasileiro',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.getByRole('button',{name:'Ativar animações',exact:true}).click();
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 await expect.poll(()=>page.locator('.interface-node').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect(errors).toEqual([]);
});
test('card hover stays smooth after explicit motion opt-in',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en#stack');
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 const card=page.locator('.primary-tech-card').first();
 expect(await card.evaluate(el=>getComputedStyle(el).transitionDuration.split(',').every(value=>parseFloat(value)>0))).toBe(true);
 await card.hover();
 await expect.poll(()=>card.locator('.spotlight-glow').evaluate(el=>Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.5);
 await page.getByRole('link',{name:'Stack',exact:true}).hover();
 await expect.poll(()=>card.locator('.spotlight-glow').evaluate(el=>Number(getComputedStyle(el).opacity))).toBeLessThan(0.05);
 await page.getByRole('link',{name:'About',exact:true}).click();
 await expect(page.locator('.bento-bio')).toContainText('At Docato and DD Solutions');
 await expect.poll(()=>page.locator('.bento-bio').evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(1);
 await page.locator('.bento-bio').screenshot({path:'test-results/about-card.png'});
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 expect(await card.evaluate(el=>getComputedStyle(el).transform)).toBe('none');
 expect(await card.evaluate(el=>getComputedStyle(el).transitionProperty)).toBe('border-color, background-color');
});
test('cards retain hover feedback with reduced motion and keyboard focus',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en');
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 for(const selector of ['.bento-bio','.bento-location','.career-card','.case','.primary-tech-card','.secondary-tech-card']){
  const card=page.locator(selector).first();
  await page.getByRole('link',{name:'Angelo Costa',exact:true}).hover();
  const initialBorder=await card.evaluate(el=>getComputedStyle(el).borderTopColor);
  await card.hover();
  await expect.poll(()=>card.evaluate(el=>getComputedStyle(el).borderTopColor)).toBe('rgb(155, 120, 202)');
  expect(initialBorder).not.toBe('rgb(155, 120, 202)');
  expect(await card.evaluate(el=>{const transform=getComputedStyle(el).transform;return transform==='none'||new DOMMatrixReadOnly(transform).isIdentity;})).toBe(true);
  expect(await card.evaluate(el=>getComputedStyle(el).translate)).toBe('none');
 }
 await page.getByRole('link',{name:'Angelo Costa',exact:true}).hover();
 await page.locator('.bento-bio').getByRole('link',{name:'GitHub'}).focus();
 await expect.poll(()=>page.locator('.bento-bio').evaluate(el=>getComputedStyle(el).borderTopColor)).toBe('rgb(155, 120, 202)');
 await page.locator('.bento-bio').screenshot({path:'test-results/hover-reduced-motion.png',animations:'disabled'});
});
test('anchor navigation is gradual, aligned, interruptible and supports history',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:1440,height:900});await page.goto('/en');
 await expect(page.locator('html')).toHaveAttribute('data-motion','on');
 await page.getByRole('navigation').getByRole('link',{name:'Work',exact:true}).click();
 await expect(page).toHaveURL(/#work$/);
 await expect(page.getByRole('navigation').getByRole('link',{name:'Work',exact:true})).toHaveAttribute('aria-current','location');
 const samples=await page.evaluate(()=>new Promise<number[]>(resolve=>{
  const values:number[]=[];const start=performance.now();
  const sample=()=>{values.push(scrollY);if(performance.now()-start<300)requestAnimationFrame(sample);else resolve(values);};requestAnimationFrame(sample);
 }));
 expect(new Set(samples).size).toBeGreaterThan(3);
 expect(samples.at(-1)!).toBeGreaterThan(samples[0]);
 await expect(page.locator('html')).not.toHaveAttribute('data-scrolling-to');
 await expect(page.locator('#work')).toBeFocused();
 expect(await page.locator('#work').evaluate(el=>Math.abs(el.getBoundingClientRect().top-(document.querySelector('header')!.getBoundingClientRect().height+20)))).toBeLessThan(3);
 await page.getByRole('navigation').getByRole('link',{name:'About',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-scrolling-to','about');
 await page.mouse.wheel(0,-200);
 await expect(page.locator('html')).not.toHaveAttribute('data-scrolling-to');
 await page.goBack();await expect(page).toHaveURL(/#work$/);
 await page.getByRole('button',{name:'Enable animations',exact:true}).click();
 await page.getByRole('navigation').getByRole('link',{name:'About',exact:true}).press('Enter');
 await expect(page.locator('#about')).toBeFocused();
 await expect(page.locator('html')).not.toHaveAttribute('data-scrolling-to');
});
