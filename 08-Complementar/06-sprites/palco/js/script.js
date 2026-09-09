(function(){
  "use strict";

  // ---------------- CONSTANTS & SETUP ----------------
  const STAGE_W = 900, STAGE_H = 500;
  const GROUND_Y = 400;
  const MARGIN = 50;

  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');

  // Suporte a Monitores HiDPI / Retina
  const dpr = window.devicePixelRatio || 1;
  canvas.width = STAGE_W * dpr;
  canvas.height = STAGE_H * dpr;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;

  // Cache de elementos do DOM
  const DOM = {
    hud: document.getElementById('hud'),
    previewBanner: document.getElementById('previewBanner'),
    coreAnimList: document.getElementById('coreAnimList'),
    customAnimList: document.getElementById('customAnimList'),
    frameW: document.getElementById('frameW'),
    frameH: document.getElementById('frameH'),
    valFrameW: document.getElementById('valFrameW'),
    valFrameH: document.getElementById('valFrameH'),
    gridInfo: document.getElementById('gridInfo'),
    scale: document.getElementById('scale'),
    valScale: document.getElementById('valScale'),
    anchorX: document.getElementById('anchorX'),
    anchorY: document.getElementById('anchorY'),
    valAnchorX: document.getElementById('valAnchorX'),
    valAnchorY: document.getElementById('valAnchorY'),
    flipBase: document.getElementById('flipBase')
  };

  // ---------------- STATE ----------------
  const sheet = {
    img: null, frameW: 64, frameH: 64, scale: 3,
    anchorX: 0.5, anchorY: 1, flipBase: false, isDemo: true
  };

  const coreAnims = {
    idle:   { start:0,  count:4, fps:6,  loop:true  },
    walk:   { start:4,  count:6, fps:10, loop:true  },
    run:    { start:10, count:4, fps:14, loop:true  },
    jump:   { start:14, count:2, fps:6,  loop:false },
    attack: { start:16, count:4, fps:12, loop:false }
  };

  let customAnims = [];
  let customUid = 1;

  const player = {
    x: STAGE_W/2, y: GROUND_Y, vx: 0, vy: 0, facing: 1, grounded: true,
    speed: 190, runSpeed: 340, jumpVel: 560, gravity: 1500
  };

  const input = { left:false, right:false, run:false, jumpQueued:false };
  let attackLock = false;
  let previewMode = null;
  const anim = { name:'idle', frame:0, timer:0, finished:false };

  // ---------------- PALETA DE CORES DO MANEQUIM ----------------
  const PALETTE = {
    head:       '#0b0b0f', // Preto
    neck:       '#84898b', // Cinza
    chest:      '#e85d75', // Rosa / Magenta
    pelvis:     '#ab2e2e', // Vermelho Escuro
    frontArm:   '#9ae630', // Verde Limão
    backArm:    '#3d6028', // Verde Oliva Escuro
    frontLeg:   '#f7c28c', // Pêssego Claro
    backLeg:    '#de994a', // Caramelo / Bronze
    weapon:     '#f2a154'  // Lâmina de teste
  };

  // ---------------- DESENHO DOS MEMBROS DO MANEQUIM ----------------
  const P = 2; // Tamanho do pixel base (grid)

  function drawLimbLeg(c, color) {
    c.fillStyle = color;
    // Coxa
    c.fillRect(-1.5 * P, 0, 3 * P, 6 * P);
    // Canela
    c.fillRect(-1.5 * P, 6 * P, 2.5 * P, 5 * P);
    // Pé em formato L apontado para a frente (Corrigido para a direita: de -1*P até +4*P)
    c.fillRect(-1 * P, 11 * P, 5 * P, 2 * P);
  }

  function drawLimbArm(c, color, hasWeapon, weaponProgress) {
    c.fillStyle = color;
    // Braço superior
    c.fillRect(-1 * P, 0, 2 * P, 5 * P);
    // Antebraço e mão
    c.fillRect(-1 * P, 5 * P, 2 * P, 5 * P);
    // Mão apontada para a frente (Corrigida para a direita)
    c.fillRect(-0.5 * P, 9 * P, 2.5 * P, 2 * P);

    // Efeito de arma durante o ataque
    if (hasWeapon && weaponProgress > 0) {
      c.save();
      c.translate(0, 9 * P);
      c.fillStyle = PALETTE.weapon;
      c.fillRect(0, -1 * P, (6 + weaponProgress * 10) * P, 2 * P);
      c.fillStyle = '#ffffff';
      c.fillRect((6 + weaponProgress * 10) * P, -1 * P, 2 * P, 2 * P);
      c.restore();
    }
  }

  function drawTorsoAndHead(c) {
    // Cabeça
    c.fillStyle = PALETTE.head;
    c.fillRect(-3.5 * P, -16 * P, 7 * P, 6 * P);
    
    // Pescoço
    c.fillStyle = PALETTE.neck;
    c.fillRect(-2 * P, -10 * P, 4 * P, 2 * P);

    // Peito (Rosa)
    c.fillStyle = PALETTE.chest;
    c.fillRect(-3 * P, -8 * P, 6 * P, 4 * P);
    // Detalhe frontal do peito (Corrigido para o lado direito: X = 3*P)
    c.fillRect(3 * P, -7 * P, 1 * P, 3 * P);

    // Quadril (Vermelho)
    c.fillStyle = PALETTE.pelvis;
    c.fillRect(-3 * P, -4 * P, 6 * P, 5 * P);
    c.fillRect(-2 * P, 1 * P, 4 * P, 1 * P);
  }

  // ---------------- GERADOR DA SPRITESHEET DEMO ----------------
  function drawDemoFrame(c, ox, oy, fw, fh, i){
    c.save();
    c.translate(ox + fw / 2, oy + fh - 8); // Apoio nos pés

    let bobY = 0;
    let leanAngle = 0;
    let legFrontRot = 0, legBackRot = 0;
    let armFrontRot = 0, armBackRot = 0;
    let weaponProg = 0;

    // --- IDLE (0..3) ---
    if (i < 4) {
      const t = (i / 4) * Math.PI * 2;
      bobY = Math.sin(t) * 1.5;
      armFrontRot = 0.05 + Math.sin(t) * 0.05;
      armBackRot = -0.05 - Math.sin(t) * 0.05;
    }
    // --- WALK (4..9) ---
    else if (i < 10) {
      const t = ((i - 4) / 6) * Math.PI * 2;
      legFrontRot = Math.sin(t) * 0.6;
      legBackRot = -Math.sin(t) * 0.6;
      armFrontRot = -Math.sin(t) * 0.5;
      armBackRot = Math.sin(t) * 0.5;
      bobY = Math.abs(Math.sin(t)) * 2;
    }
    // --- RUN (10..13) ---
    else if (i < 14) {
      const t = ((i - 10) / 4) * Math.PI * 2;
      leanAngle = 0.2;
      legFrontRot = Math.sin(t) * 1.0;
      legBackRot = -Math.sin(t) * 1.0;
      armFrontRot = -Math.sin(t) * 0.9;
      armBackRot = Math.sin(t) * 0.9;
      bobY = Math.abs(Math.sin(t)) * 3;
    }
    // --- JUMP (14..15) ---
    else if (i < 16) {
      if (i === 14) { // Subindo
        legFrontRot = -0.4; legBackRot = 0.3;
        armFrontRot = -1.2; armBackRot = -1.0;
        bobY = -4;
      } else { // Caindo
        legFrontRot = 0.3; legBackRot = -0.2;
        armFrontRot = -0.4; armBackRot = -0.3;
        bobY = 2;
      }
    }
    // --- ATTACK (16..19) ---
    else {
      const t = (i - 16) / 3;
      leanAngle = 0.1;
      if (i === 16) { // Preparo
        armFrontRot = 0.6;
        armBackRot = -0.6;
      } else if (i === 17) { // Golpe
        armFrontRot = -1.5;
        armBackRot = 0.5;
        weaponProg = 1.0;
      } else if (i === 18) { // Manter golpe
        armFrontRot = -1.3;
        armBackRot = 0.3;
        weaponProg = 0.8;
      } else { // Recuperação
        armFrontRot = -0.4;
        armBackRot = 0.0;
        weaponProg = 0.2;
      }
    }

    const hipY = -14 * P + bobY;
    const shoulderY = hipY - 7 * P;

    // 1. CAMADA DE TRÁS: Braço Traseiro (Verde Escuro)
    c.save();
    c.translate(2 * P, shoulderY);
    c.rotate(armBackRot);
    drawLimbArm(c, PALETTE.backArm, false, 0);
    c.restore();

    // 2. CAMADA DE TRÁS: Perna Traseira (Caramelo)
    c.save();
    c.translate(1.5 * P, hipY + 1 * P);
    c.rotate(legBackRot);
    drawLimbLeg(c, PALETTE.backLeg);
    c.restore();

    // 3. CAMADA DO MEIO: Tronco e Cabeça (com inclinação de corrida)
    c.save();
    c.translate(0, hipY);
    c.rotate(leanAngle);
    drawTorsoAndHead(c);
    c.restore();

    // 4. CAMADA DA FRENTE: Perna Frontal (Pêssego)
    c.save();
    c.translate(-1.5 * P, hipY + 1 * P);
    c.rotate(legFrontRot);
    drawLimbLeg(c, PALETTE.frontLeg);
    c.restore();

    // 5. CAMADA DA FRENTE: Braço Frontal (Verde Limão) + Arma
    c.save();
    c.translate(-2 * P, shoulderY);
    c.rotate(armFrontRot);
    drawLimbArm(c, PALETTE.frontArm, true, weaponProg);
    c.restore();

    c.restore();
  }

  function buildDemoSheet(){
    const fw = 64, fh = 64, cols = 10, rows = 2, total = 20;
    const off = document.createElement('canvas');
    off.width = fw * cols; off.height = fh * rows;
    const c = off.getContext('2d');
    c.imageSmoothingEnabled = false;

    for(let i = 0; i < total; i++){
      const col = i % cols, row = Math.floor(i / cols);
      drawDemoFrame(c, col * fw, row * fh, fw, fh, i);
    }
    return off;
  }

  function loadDemoSprite(){
    sheet.img = buildDemoSheet();
    sheet.frameW = 64; sheet.frameH = 64; sheet.scale = 3;
    sheet.anchorX = 0.5; sheet.anchorY = 1; sheet.flipBase = false; sheet.isDemo = true;
    coreAnims.idle   = { start:0,  count:4, fps:6,  loop:true  };
    coreAnims.walk   = { start:4,  count:6, fps:10, loop:true  };
    coreAnims.run    = { start:10, count:4, fps:14, loop:true  };
    coreAnims.jump   = { start:14, count:2, fps:6,  loop:false };
    coreAnims.attack = { start:16, count:4, fps:12, loop:false };
    customAnims = [];
    syncSpriteFields();
    renderCoreAnimList();
    renderCustomAnimList();
  }

  // ---------------- ANIMATION LOGIC ----------------
  function getAnimDef(name){ return coreAnims[name] || customAnims.find(a => a.name === name); }

  function setAnim(name){
    if(anim.name === name) return;
    anim.name = name; anim.frame = 0; anim.timer = 0; anim.finished = false;
  }

  function restartAnim(name){
    anim.name = name; anim.frame = 0; anim.timer = 0; anim.finished = false;
  }

  // Delta time step anim
  function stepAnimation(dt){
    const def = getAnimDef(anim.name);
    if(!def || def.count <= 0) return;
    anim.timer += dt;
    const frameDur = 1 / Math.max(1, def.fps);
    let maxSteps = def.count + 1;
    while(anim.timer >= frameDur && maxSteps-- > 0){
      anim.timer -= frameDur;
      anim.frame++;
      if(anim.frame >= def.count){
        if(def.loop) anim.frame = 0;
        else { anim.frame = def.count - 1; anim.finished = true; }
      }
    }
  }

  function triggerAttack(){
    if(previewMode || attackLock) return;
    attackLock = true;
    restartAnim('attack');
  }

  function computeDesiredState(){
    if(previewMode) return previewMode;
    if(attackLock) return 'attack';
    if(!player.grounded) return 'jump';
    if(player.vx !== 0) return input.run ? 'run' : 'walk';
    return 'idle';
  }

  // ---------------- PHYSICS ----------------
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function updatePhysics(dt){
    let vx = 0;
    if(!attackLock){
      if(input.left){ vx -= (input.run ? player.runSpeed : player.speed); player.facing = -1; }
      if(input.right){ vx += (input.run ? player.runSpeed : player.speed); player.facing = 1; }
    }
    player.vx = vx;
    player.x = clamp(player.x + vx*dt, MARGIN, STAGE_W - MARGIN);

    if(input.jumpQueued){
      if(player.grounded && !attackLock){
        player.vy = -player.jumpVel;
        player.grounded = false;
      }
      input.jumpQueued = false;
    }

    player.vy += player.gravity * dt;
    player.y += player.vy * dt;
    if(player.y >= GROUND_Y){
      player.y = GROUND_Y; player.vy = 0; player.grounded = true;
    }
  }

  // ---------------- RENDER ----------------
  let floorGrad;
  function createFloorGradient() {
    floorGrad = ctx.createLinearGradient(0, GROUND_Y - 60, 0, STAGE_H);
    floorGrad.addColorStop(0, 'rgba(95,227,200,0.05)');
    floorGrad.addColorStop(1, 'rgba(95,227,200,0.0)');
  }
  createFloorGradient();

  function drawFloor(){
    ctx.fillStyle = '#0b0c14';
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, GROUND_Y - 60, STAGE_W, STAGE_H - (GROUND_Y - 60));

    ctx.strokeStyle = 'rgba(140,145,180,0.18)';
    ctx.lineWidth = 1;
    for(let x = 0; x <= STAGE_W; x += 45){
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y);
      ctx.lineTo(x - 25, STAGE_H);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(95,227,200,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(STAGE_W, GROUND_Y);
    ctx.stroke();
  }

  function drawSprite(){
    if(!sheet.img) return;
    const def = getAnimDef(anim.name);
    if(!def) return;

    const cols = Math.max(1, Math.floor(sheet.img.width / sheet.frameW));
    const frameIndex = def.start + anim.frame;
    const col = frameIndex % cols;
    const row = Math.floor(frameIndex / cols);
    const sx = col * sheet.frameW;
    const sy = row * sheet.frameH;

    const drawX = previewMode ? STAGE_W/2 : player.x;
    const drawY = previewMode ? GROUND_Y : player.y;

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.scale(sheet.scale, sheet.scale);

    const shouldFlip = sheet.flipBase ? (player.facing === 1) : (player.facing === -1);
    if(!previewMode && shouldFlip) ctx.scale(-1, 1);

    ctx.drawImage(
      sheet.img, sx, sy, sheet.frameW, sheet.frameH,
      -sheet.frameW * sheet.anchorX, -sheet.frameH * sheet.anchorY, sheet.frameW, sheet.frameH
    );
    ctx.restore();
  }

  function updateHUD(){
    const def = getAnimDef(anim.name);
    const total = def ? def.count : 0;
    DOM.hud.innerHTML =
      `estado: <b>${anim.name}</b> · frame ${anim.frame+1}/${Math.max(1,total)}<br>` +
      `x: ${Math.round(player.x)} · dir: ${player.facing === 1 ? 'dir' : 'esq'}` +
      (player.grounded ? '' : ' · no ar');
  }

  // ---------------- MAIN LOOP ----------------
  let lastTime = performance.now();
  function loop(now){
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if(!previewMode){
      updatePhysics(dt);
      const desired = computeDesiredState();
      if(desired !== anim.name) setAnim(desired);
      stepAnimation(dt);
      if(attackLock && anim.name === 'attack' && anim.finished) attackLock = false;
    } else {
      stepAnimation(dt);
    }

    drawFloor();
    drawSprite();
    updateHUD();
    requestAnimationFrame(loop);
  }

  // ---------------- INPUT ----------------
  window.addEventListener('keydown', (e) => {
    if(previewMode) return;
    switch(e.code){
      case 'ArrowLeft': case 'KeyA': input.left = true; break;
      case 'ArrowRight': case 'KeyD': input.right = true; break;
      case 'ShiftLeft': case 'ShiftRight': input.run = true; break;
      case 'ArrowUp': case 'KeyW': case 'Space':
        input.jumpQueued = true; e.preventDefault(); break;
      case 'KeyJ': case 'ControlLeft': case 'ControlRight':
        triggerAttack(); break;
    }
  });
  window.addEventListener('keyup', (e) => {
    switch(e.code){
      case 'ArrowLeft': case 'KeyA': input.left = false; break;
      case 'ArrowRight': case 'KeyD': input.right = false; break;
      case 'ShiftLeft': case 'ShiftRight': input.run = false; break;
    }
  });

  function bindHold(el, onDown, onUp){
    const start = (e) => { e.preventDefault(); onDown(); el.classList.add('pressed'); };
    const end = () => { onUp(); el.classList.remove('pressed'); };
    el.addEventListener('pointerdown', start);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointerleave', end);
    el.addEventListener('pointercancel', end);
  }

  bindHold(document.getElementById('btnLeft'), () => { if(!previewMode) input.left = true; }, () => input.left = false);
  bindHold(document.getElementById('btnRight'), () => { if(!previewMode) input.right = true; }, () => input.right = false);

  document.getElementById('btnRun').addEventListener('click', (e) => {
    input.run = !input.run;
    e.target.classList.toggle('toggle-on', input.run);
    e.target.setAttribute('aria-pressed', input.run);
  });

  document.getElementById('btnJump').addEventListener('click', () => { if(!previewMode) input.jumpQueued = true; });
  document.getElementById('btnAttack').addEventListener('click', triggerAttack);
  document.getElementById('btnStop').addEventListener('click', () => { input.left = false; input.right = false; });

  // ---------------- TABS ----------------
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // ---------------- SPRITE PANEL WIRING ----------------
  function syncSpriteFields(){
    DOM.frameW.value = sheet.frameW;
    DOM.frameH.value = sheet.frameH;
    DOM.valFrameW.textContent = sheet.frameW + 'px';
    DOM.valFrameH.textContent = sheet.frameH + 'px';
    DOM.scale.value = sheet.scale;
    DOM.valScale.textContent = sheet.scale.toFixed(1) + 'x';
    DOM.anchorX.value = sheet.anchorX;
    DOM.valAnchorX.textContent = sheet.anchorX.toFixed(2);
    DOM.anchorY.value = sheet.anchorY;
    DOM.valAnchorY.textContent = sheet.anchorY.toFixed(2);
    DOM.flipBase.checked = sheet.flipBase;
    updateGridInfo();
  }

  function updateGridInfo(){
    if(!sheet.img){ DOM.gridInfo.value = '—'; return; }
    const cols = Math.max(1, Math.floor(sheet.img.width / sheet.frameW));
    const rows = Math.max(1, Math.floor(sheet.img.height / sheet.frameH));
    DOM.gridInfo.value = `${cols} col × ${rows} lin (${cols*rows} frames)`;
  }

  DOM.frameW.addEventListener('input', () => { sheet.frameW = Math.max(4, parseInt(DOM.frameW.value) || 4); DOM.valFrameW.textContent = sheet.frameW+'px'; updateGridInfo(); });
  DOM.frameH.addEventListener('input', () => { sheet.frameH = Math.max(4, parseInt(DOM.frameH.value) || 4); DOM.valFrameH.textContent = sheet.frameH+'px'; updateGridInfo(); });
  DOM.scale.addEventListener('input', () => { sheet.scale = parseFloat(DOM.scale.value); DOM.valScale.textContent = sheet.scale.toFixed(1)+'x'; });
  DOM.anchorX.addEventListener('input', () => { sheet.anchorX = parseFloat(DOM.anchorX.value); DOM.valAnchorX.textContent = sheet.anchorX.toFixed(2); });
  DOM.anchorY.addEventListener('input', () => { sheet.anchorY = parseFloat(DOM.anchorY.value); DOM.valAnchorY.textContent = sheet.anchorY.toFixed(2); });
  DOM.flipBase.addEventListener('change', () => { sheet.flipBase = DOM.flipBase.checked; });

  document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => { sheet.img = img; sheet.isDemo = false; updateGridInfo(); };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('resetDemoBtn').addEventListener('click', loadDemoSprite);

  // ---------------- ANIMATION PANEL WIRING ----------------
  const coreLabels = { idle:'parado', walk:'andar', run:'correr', jump:'pular', attack:'atacar' };

  function renderCoreAnimList(){
    DOM.coreAnimList.innerHTML = '';
    Object.keys(coreAnims).forEach(key => {
      const def = coreAnims[key];
      const card = document.createElement('div');
      card.className = 'anim-card';
      card.innerHTML =
        `<div class="head"><span class="name ${key}">${coreLabels[key]}</span><button class="tiny-btn play-btn">testar</button></div>` +
        `<div class="anim-grid">` +
          `<div class="mini"><span>início</span><input type="number" min="0" class="f-start" value="${def.start}"></div>` +
          `<div class="mini"><span>qtd</span><input type="number" min="1" class="f-count" value="${def.count}"></div>` +
          `<div class="mini"><span>fps</span><input type="number" min="1" class="f-fps" value="${def.fps}"></div>` +
          `<div class="mini"><span>loop</span><input type="checkbox" class="f-loop" ${def.loop ? 'checked' : ''} style="margin-top:8px;accent-color:var(--cyan);"></div>` +
        `</div>`;

      card.querySelector('.f-start').addEventListener('input', (e) => def.start = parseInt(e.target.value) || 0);
      card.querySelector('.f-count').addEventListener('input', (e) => def.count = Math.max(1, parseInt(e.target.value) || 1));
      card.querySelector('.f-fps').addEventListener('input', (e) => def.fps = Math.max(1, parseInt(e.target.value) || 1));
      card.querySelector('.f-loop').addEventListener('change', (e) => def.loop = e.target.checked);
      card.querySelector('.play-btn').addEventListener('click', () => {
        previewMode = key; restartAnim(key); DOM.previewBanner.classList.add('active');
      });
      DOM.coreAnimList.appendChild(card);
    });
  }

  function renderCustomAnimList(){
    DOM.customAnimList.innerHTML = '';
    if(customAnims.length === 0){
      DOM.customAnimList.innerHTML = `<p style="font-size:0.76rem;color:var(--muted);margin:0;">nenhuma animação extra ainda.</p>`;
      return;
    }
    customAnims.forEach(def => {
      const card = document.createElement('div');
      card.className = 'anim-card';
      card.innerHTML =
        `<input type="text" class="custom-name-input c-name" value="${def.name}" placeholder="nome">` +
        `<div class="anim-grid">` +
          `<div class="mini"><span>início</span><input type="number" min="0" class="f-start" value="${def.start}"></div>` +
          `<div class="mini"><span>qtd</span><input type="number" min="1" class="f-count" value="${def.count}"></div>` +
          `<div class="mini"><span>fps</span><input type="number" min="1" class="f-fps" value="${def.fps}"></div>` +
          `<div class="mini"><span>loop</span><input type="checkbox" class="f-loop" ${def.loop ? 'checked' : ''} style="margin-top:8px;accent-color:var(--cyan);"></div>` +
        `</div>` +
        `<div style="display:flex; gap:8px; margin-top:8px;"><button class="tiny-btn play-btn">testar</button><button class="tiny-btn danger del-btn">remover</button></div>`;

      card.querySelector('.c-name').addEventListener('input', (e) => def.name = e.target.value || def.name);
      card.querySelector('.f-start').addEventListener('input', (e) => def.start = parseInt(e.target.value) || 0);
      card.querySelector('.f-count').addEventListener('input', (e) => def.count = Math.max(1, parseInt(e.target.value) || 1));
      card.querySelector('.f-fps').addEventListener('input', (e) => def.fps = Math.max(1, parseInt(e.target.value) || 1));
      card.querySelector('.f-loop').addEventListener('change', (e) => def.loop = e.target.checked);
      card.querySelector('.play-btn').addEventListener('click', () => {
        previewMode = def.name; restartAnim(def.name); DOM.previewBanner.classList.add('active');
      });
      card.querySelector('.del-btn').addEventListener('click', () => {
        customAnims = customAnims.filter(a => a !== def);
        renderCustomAnimList();
      });
      DOM.customAnimList.appendChild(card);
    });
  }

  document.getElementById('addCustomBtn').addEventListener('click', () => {
    customAnims.push({ name:'extra' + (customUid++), start:0, count:1, fps:6, loop:true });
    renderCustomAnimList();
  });

  document.getElementById('exitPreviewBtn').addEventListener('click', () => {
    previewMode = null;
    DOM.previewBanner.classList.remove('active');
    setAnim(computeDesiredState());
  });

  // ---------------- EXPORT / IMPORT ----------------
  document.getElementById('exportBtn').addEventListener('click', () => {
    const data = {
      sheet: {
        frameW: sheet.frameW, frameH: sheet.frameH, scale: sheet.scale,
        anchorX: sheet.anchorX, anchorY: sheet.anchorY, flipBase: sheet.flipBase, isDemo: sheet.isDemo,
        imageData: sheet.isDemo ? null : (sheet.img ? sheet.img.src : null)
      },
      coreAnims, customAnims
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'config-sprite.json'; a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('importInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try{
        const data = JSON.parse(ev.target.result);
        if(data.sheet){
          sheet.frameW = data.sheet.frameW || 64;
          sheet.frameH = data.sheet.frameH || 64;
          sheet.scale = data.sheet.scale || 3;
          sheet.anchorX = (data.sheet.anchorX !== undefined) ? data.sheet.anchorX : 0.5;
          sheet.anchorY = (data.sheet.anchorY !== undefined) ? data.sheet.anchorY : 1;
          sheet.flipBase = !!data.sheet.flipBase;
          if(data.sheet.isDemo || !data.sheet.imageData){
            sheet.img = buildDemoSheet(); sheet.isDemo = true;
          } else {
            const img = new Image();
            img.onload = () => { sheet.img = img; updateGridInfo(); };
            img.src = data.sheet.imageData; sheet.isDemo = false;
          }
        }
        if(data.coreAnims) Object.keys(coreAnims).forEach(key => { if(data.coreAnims[key]) coreAnims[key] = data.coreAnims[key]; });
        if(Array.isArray(data.customAnims)) customAnims = data.customAnims;

        syncSpriteFields(); renderCoreAnimList(); renderCustomAnimList();
      } catch(err){ alert('não foi possível ler este arquivo de configuração.'); }
    };
    reader.readAsText(file);
  });

  // ---------------- INIT ----------------
  loadDemoSprite();
  requestAnimationFrame(loop);

})();