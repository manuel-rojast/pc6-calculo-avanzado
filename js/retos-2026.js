/**
 * MÓDULO DE ENTRENAMIENTO AVANZADO Y RETOS 2026-2 (CM2A1 - UNI) — PC6 v2.0
 * Incluye:
 *  1. Conmutadores de Anatomía de Demostraciones en 2 Fases (KaTeX perezoso)
 *  2. Sub-pestañas de Retos con ARIA
 *  3. Simulador 2D Canvas Responsivo: Circulación, Vórtice con Agujero y Teorema de Green
 */

(function () {
  let greenCanvas = null;
  let greenCtx = null;
  let resizeBound = false;

  const simState = {
    mode: 'vortex', // 'conservative' | 'rotational' | 'vortex'
    cx: 0.0,
    radius: 1.15
  };

  function renderMathOnce(el) {
    if (!el || el.dataset.mathRendered === '1') return;
    if (window.renderMathSafe) {
      window.renderMathSafe(el);
      el.dataset.mathRendered = '1';
    } else if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
      el.dataset.mathRendered = '1';
    }
  }

  window.initRetos2026Module = function () {
    initProofPhaseToggles();
    initRetosSubtabs();
    initGreenVortexSimulator();
  };

  function initProofPhaseToggles() {
    document.querySelectorAll('.proof-phase-toggle-btn').forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';

      btn.addEventListener('click', () => {
        const parent = btn.closest('.proof-anatomy-widget');
        if (!parent) return;

        const targetPhase = btn.dataset.phase;
        parent.querySelectorAll('.proof-phase-toggle-btn').forEach(b => {
          const isMatch = b.dataset.phase === targetPhase;
          b.classList.toggle('active', isMatch);
          b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
        parent.querySelectorAll('.proof-phase-pane').forEach(pane => {
          const isMatch = pane.dataset.phase === targetPhase;
          pane.classList.toggle('active', isMatch);
          if (isMatch) renderMathOnce(pane);
        });
      });
    });
  }

  function initRetosSubtabs() {
    const subtabBtns = document.querySelectorAll('.retos-subtab-btn');
    const subtabPanes = document.querySelectorAll('.retos-subtab-pane');

    subtabBtns.forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';

      btn.addEventListener('click', () => {
        const target = btn.dataset.subtab;
        subtabBtns.forEach(b => {
          const isMatch = b.dataset.subtab === target;
          b.classList.toggle('active', isMatch);
          b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
        subtabPanes.forEach(p => {
          const isMatch = p.id === `retos-pane-${target}`;
          p.classList.toggle('active', isMatch);
          if (isMatch) renderMathOnce(p);
        });

        if (target === 'green-sim') {
          requestAnimationFrame(drawGreenSimulation);
        }
      });
    });
  }

  function initGreenVortexSimulator() {
    greenCanvas = document.getElementById('green-2d-canvas');
    if (!greenCanvas) return;
    greenCtx = greenCanvas.getContext('2d');

    const cxSlider = document.getElementById('sim-green-cx-slider');
    const rSlider = document.getElementById('sim-green-r-slider');
    const modeBtns = document.querySelectorAll('.sim-green-mode-btn');

    if (cxSlider) simState.cx = parseFloat(cxSlider.value) || 0.0;
    if (rSlider) simState.radius = parseFloat(rSlider.value) || 1.15;

    if (cxSlider && !cxSlider.dataset.bound) {
      cxSlider.dataset.bound = 'true';
      cxSlider.addEventListener('input', (e) => {
        simState.cx = parseFloat(e.target.value);
        const ro = document.getElementById('sim-green-cx-readout');
        if (ro) ro.textContent = simState.cx.toFixed(2);
        drawGreenSimulation();
      });
    }

    if (rSlider && !rSlider.dataset.bound) {
      rSlider.dataset.bound = 'true';
      rSlider.addEventListener('input', (e) => {
        simState.radius = parseFloat(e.target.value);
        const ro = document.getElementById('sim-green-r-readout');
        if (ro) ro.textContent = simState.radius.toFixed(2);
        drawGreenSimulation();
      });
    }

    modeBtns.forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        simState.mode = btn.dataset.mode;
        drawGreenSimulation();
      });
    });

    if (!resizeBound) {
      resizeBound = true;
      window.addEventListener('resize', () => {
        if (greenCanvas && greenCanvas.offsetParent !== null) {
          drawGreenSimulation();
        }
      });
    }

    drawGreenSimulation();
  }

  function evalField(x, y, mode) {
    if (mode === 'conservative') {
      // F = ∇(0.5(x^2 - y^2)) = (x, -y) -> rot = 0 en todo R^2
      return { fx: x, fy: -y };
    }
    if (mode === 'rotational') {
      // F = (-y, x) -> rot = Q_x - P_y = 2 en todo R^2
      return { fx: -y, fy: x };
    }
    // Vórtice irrotacional F = (-y/(x^2+y^2), x/(x^2+y^2))
    const r2 = x * x + y * y;
    if (r2 < 1e-4) return { fx: 0, fy: 0 };
    return { fx: -y / r2, fy: x / r2 };
  }

  function drawGreenSimulation() {
    if (!greenCanvas || !greenCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = greenCanvas.getBoundingClientRect();
    const width = Math.max(280, rect.width || 600);
    const height = width < 460 ? 300 : 340;
    if (parseInt(greenCanvas.style.height, 10) !== height) {
      greenCanvas.style.height = `${height}px`;
    }

    greenCanvas.width = Math.round(width * dpr);
    greenCanvas.height = Math.round(height * dpr);
    greenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    greenCtx.fillStyle = '#0b1329';
    greenCtx.fillRect(0, 0, width, height);

    const originX = width * 0.42;
    const originY = height * 0.52;
    const scale = Math.min(width, height) / 6.2;

    const toPx = (x, y) => ({ px: originX + x * scale, py: originY - y * scale });

    // Ejes cartesianos
    greenCtx.strokeStyle = '#334155';
    greenCtx.lineWidth = 1.4;
    greenCtx.beginPath();
    greenCtx.moveTo(16, originY);
    greenCtx.lineTo(width - 16, originY);
    greenCtx.moveTo(originX, 26);
    greenCtx.lineTo(originX, height - 16);
    greenCtx.stroke();

    greenCtx.fillStyle = '#94a3b8';
    greenCtx.font = '11px monospace';
    greenCtx.fillText('x', width - 24, originY + 14);
    greenCtx.fillText('y', originX + 8, 36);

    // Campo vectorial en rejilla
    const step = 0.65;
    for (let x = -2.6; x <= 3.6; x += step) {
      for (let y = -2.3; y <= 2.3; y += step) {
        if (simState.mode === 'vortex' && Math.hypot(x, y) < 0.32) continue;
        const f = evalField(x, y, simState.mode);
        const mag = Math.hypot(f.fx, f.fy);
        if (mag < 1e-3) continue;
        const lenPx = Math.min(18, 7 + 5 * Math.min(mag, 2.2));
        const ux = f.fx / mag;
        const uy = f.fy / mag;
        const p = toPx(x, y);
        const ex = p.px + ux * lenPx;
        const ey = p.py - uy * lenPx;
        drawMiniArrow(greenCtx, p.px, p.py, ex, ey, 'rgba(56, 189, 248, 0.52)');
      }
    }

    // Marcar singularidad (0,0) en modo vórtice
    const oPx = toPx(0, 0);
    if (simState.mode === 'vortex') {
      greenCtx.beginPath();
      greenCtx.arc(oPx.px, oPx.py, 7, 0, Math.PI * 2);
      greenCtx.fillStyle = 'rgba(244, 63, 94, 0.25)';
      greenCtx.fill();
      greenCtx.strokeStyle = '#f43f5e';
      greenCtx.lineWidth = 2;
      greenCtx.stroke();
      greenCtx.fillStyle = '#fda4af';
      greenCtx.font = 'bold 11px sans-serif';
      greenCtx.fillText('Agujero (0,0)', oPx.px + 10, oPx.py - 8);
    }

    // Dibujar contorno cerrado C(t) = (cx + R cos t, R sin t)
    const cPx = toPx(simState.cx, 0);
    const rPx = simState.radius * scale;
    const enclosesOrigin = Math.abs(simState.cx) < simState.radius;

    greenCtx.beginPath();
    greenCtx.arc(cPx.px, cPx.py, rPx, 0, Math.PI * 2);
    greenCtx.fillStyle = simState.mode === 'vortex' && enclosesOrigin
      ? 'rgba(245, 158, 11, 0.14)'
      : 'rgba(16, 185, 129, 0.14)';
    greenCtx.fill();
    greenCtx.strokeStyle = simState.mode === 'vortex' && enclosesOrigin ? '#f59e0b' : '#22c55e';
    greenCtx.lineWidth = 2.6;
    greenCtx.stroke();

    // 4 flechas antihorarias de orientación positiva sobre C
    for (let k = 0; k < 4; k++) {
      const th = k * Math.PI / 2 + Math.PI / 4;
      const x = simState.cx + simState.radius * Math.cos(th);
      const y = simState.radius * Math.sin(th);
      const p = toPx(x, y);
      const tx = -Math.sin(th);
      const ty = Math.cos(th);
      drawMiniArrow(greenCtx, p.px, p.py, p.px + tx * 16, p.py - ty * 16, '#fef08a');
    }

    // Integración numérica de la circulación ∮ F·dr (240 segmentos)
    let circ = 0;
    const N = 240;
    const dt = (2 * Math.PI) / N;
    const nearSingularity = simState.mode === 'vortex' && Math.abs(Math.abs(simState.cx) - simState.radius) < 0.04;

    if (!nearSingularity) {
      for (let i = 0; i < N; i++) {
        const t = (i + 0.5) * dt;
        const x = simState.cx + simState.radius * Math.cos(t);
        const y = simState.radius * Math.sin(t);
        const dx = -simState.radius * Math.sin(t) * dt;
        const dy = simState.radius * Math.cos(t) * dt;
        const f = evalField(x, y, simState.mode);
        circ += f.fx * dx + f.fy * dy;
      }
    }

    const areaVal = Math.PI * simState.radius * simState.radius;
    const circEl = document.getElementById('sim-green-circ-readout');
    const statusEl = document.getElementById('sim-green-status');

    if (circEl) {
      if (nearSingularity) {
        circEl.textContent = 'Indefinida (C pasa por (0,0))';
      } else {
        circEl.textContent = `${circ.toFixed(3)}  |  Área(D) = ${areaVal.toFixed(3)}`;
      }
    }

    if (statusEl) {
      if (simState.mode === 'conservative') {
        statusEl.textContent = '✅ Campo Conservativo F = ∇(½(x²-y²)): Q_x - P_y = 0 en todo ℝ² ⇒ ∮ F·dr = 0 siempre.';
        statusEl.className = 'sim-status-badge success';
      } else if (simState.mode === 'rotational') {
        statusEl.textContent = `✅ Teorema de Green F = (-y, x): Q_x - P_y = 2 ⇒ ∮ F·dr = 2·Área(D) = ${(2 * areaVal).toFixed(3)}.`;
        statusEl.className = 'sim-status-badge success';
      } else if (nearSingularity) {
        statusEl.textContent = '⚠️ El contorno C atraviesa la singularidad (0,0): la integral de línea diverge.';
        statusEl.className = 'sim-status-badge pending';
      } else if (enclosesOrigin) {
        statusEl.textContent = '⚠️ ¡TRAMPA UNI! Q_x - P_y = 0 fuera de (0,0), pero C encierra el agujero ⇒ ∮ V·dr = 2π ≈ 6.283 ≠ 0.';
        statusEl.className = 'sim-status-badge pending';
      } else {
        statusEl.textContent = '✅ C NO encierra el agujero (0,0): Green sí aplica en el disco D ⇒ ∮ V·dr = ∬ 0 dA = 0.';
        statusEl.className = 'sim-status-badge success';
      }
    }

    // Título superior del lienzo
    greenCtx.fillStyle = '#e2e8f0';
    greenCtx.font = 'bold 12px Inter, sans-serif';
    const titleMap = {
      conservative: 'Campo Conservativo: F(x,y) = (x, -y)  |  rot F = 0',
      rotational: 'Rotacional Constante: F(x,y) = (-y, x)  |  rot F = 2',
      vortex: 'Vórtice Irrotacional: V(x,y) = (-y, x) / (x²+y²)  |  rot V = 0 fuera de (0,0)'
    };
    greenCtx.fillText(titleMap[simState.mode], 14, 18);
  }

  function drawMiniArrow(ctx, x1, y1, x2, y2, color) {
    const head = 5;
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(ang - Math.PI / 5), y2 - head * Math.sin(ang - Math.PI / 5));
    ctx.lineTo(x2 - head * Math.cos(ang + Math.PI / 5), y2 - head * Math.sin(ang + Math.PI / 5));
    ctx.closePath();
    ctx.fill();
  }
})();
