/**
 * VISUALIZADORES 3D INTERACTIVOS v2.0 — CÁLCULO AVANZADO PC6 (CM2A1 - UNI)
 * Sesiones 31 a 36: Integral de Línea Escalar, Vectorial, Campos Gradientes, Vórtice y Green.
 * Motor optimizado con carga dinámica de Three.js bajo demanda (0 KB / 0 MB VRAM al abrir).
 */

(function () {
  const REGISTRY = {};
  let threeLoadPromise = null;

  const THREE_CDN_URLS = {
    core: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    orbit: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'
  };

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') { resolve(); return; }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Error cargando ${src}`)), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.addEventListener('load', () => { script.dataset.loaded = 'true'; resolve(); }, { once: true });
      script.addEventListener('error', () => { script.remove(); reject(new Error(`Error de red: ${src}`)); }, { once: true });
      document.head.appendChild(script);
    });
  }

  function ensureThreeLoaded() {
    if (window.THREE && window.THREE.OrbitControls) return Promise.resolve();
    if (!threeLoadPromise) {
      threeLoadPromise = (async () => {
        if (!window.THREE) await loadScriptOnce(THREE_CDN_URLS.core);
        if (!window.THREE || !window.THREE.OrbitControls) await loadScriptOnce(THREE_CDN_URLS.orbit);
        if (!window.THREE || !window.THREE.OrbitControls) {
          throw new Error('Three.js u OrbitControls no quedaron disponibles.');
        }
      })().catch(err => {
        threeLoadPromise = null;
        throw err;
      });
    }
    return threeLoadPromise;
  }

  function disposeObject3D(obj) {
    if (!obj) return;
    if (obj.children && obj.children.length > 0) {
      for (let i = obj.children.length - 1; i >= 0; i--) {
        disposeObject3D(obj.children[i]);
      }
    }
    if (obj.geometry && typeof obj.geometry.dispose === 'function') {
      obj.geometry.dispose();
    }
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(m => {
        if (!m) return;
        if (m.map && typeof m.map.dispose === 'function') m.map.dispose();
        if (typeof m.dispose === 'function') m.dispose();
      });
    }
  }

  function ensureControlToolbar(container, canvasId) {
    const card = container.closest('.visualizer-card');
    if (!card) return null;

    let toolbar = card.querySelector('.sim-lifecycle-bar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.className = 'sim-lifecycle-bar';
      toolbar.innerHTML = `
        <div class="sim-lifecycle-status">
          <span class="sim-status-dot stopped" id="dot-${canvasId}"></span>
          <span class="sim-status-label" id="status-${canvasId}">En espera (0 MB VRAM • Carga instantánea)</span>
        </div>
        <div class="sim-lifecycle-actions">
          <button type="button" class="sim-ctrl-btn btn-sim-start" data-action="start">▶️ Iniciar Gráfica 3D</button>
          <button type="button" class="sim-ctrl-btn btn-sim-pause" data-action="pause" style="display:none;">⏸️ Pausar</button>
          <button type="button" class="sim-ctrl-btn btn-sim-reset" data-action="reset" style="display:none;" title="Restablecer vista 3D">🔄 Cámara</button>
          <button type="button" class="sim-ctrl-btn btn-sim-close" data-action="close" style="display:none;">⏹️ Cerrar</button>
        </div>
      `;
      const header = card.querySelector('.visualizer-header');
      if (header && header.nextSibling) card.insertBefore(toolbar, header.nextSibling);
      else card.prepend(toolbar);

      toolbar.querySelector('[data-action="start"]').addEventListener('click', () => startVisualizer(canvasId));
      toolbar.querySelector('[data-action="pause"]').addEventListener('click', () => togglePauseVisualizer(canvasId));
      toolbar.querySelector('[data-action="reset"]').addEventListener('click', () => resetCamera(canvasId));
      toolbar.querySelector('[data-action="close"]').addEventListener('click', () => stopVisualizer(canvasId, false));
    }
    return toolbar;
  }

  function updateToolbarUI(canvasId, statusMode) {
    const container = document.getElementById(canvasId);
    if (!container) return;
    const card = container.closest('.visualizer-card');
    if (!card) return;

    const dot = card.querySelector(`#dot-${canvasId}`);
    const label = card.querySelector(`#status-${canvasId}`);
    const btnStart = card.querySelector('[data-action="start"]');
    const btnPause = card.querySelector('[data-action="pause"]');
    const btnReset = card.querySelector('[data-action="reset"]');
    const btnClose = card.querySelector('[data-action="close"]');
    if (!dot || !label || !btnStart || !btnPause || !btnClose) return;

    dot.className = 'sim-status-dot';
    if (statusMode === 'loading') {
      dot.classList.add('loading');
      label.textContent = 'Cargando motor 3D Three.js bajo demanda...';
      btnStart.style.display = 'none';
      btnPause.style.display = 'none';
      if (btnReset) btnReset.style.display = 'none';
      btnClose.style.display = 'none';
    } else if (statusMode === 'running') {
      dot.classList.add('active');
      label.textContent = 'Simulación Activa (Bajo demanda • 0 FPS en reposo)';
      btnStart.style.display = 'none';
      btnPause.style.display = 'inline-flex';
      btnPause.innerHTML = '⏸️ Pausar';
      if (btnReset) btnReset.style.display = 'inline-flex';
      btnClose.style.display = 'inline-flex';
    } else if (statusMode === 'paused') {
      dot.classList.add('paused');
      label.textContent = 'Simulación Pausada (Imagen congelada • 0% GPU)';
      btnStart.style.display = 'none';
      btnPause.style.display = 'inline-flex';
      btnPause.innerHTML = '▶️ Reanudar';
      if (btnReset) btnReset.style.display = 'inline-flex';
      btnClose.style.display = 'inline-flex';
    } else {
      dot.classList.add('stopped');
      label.textContent = 'En espera (Memoria gráfica liberada • 0 MB VRAM)';
      btnStart.style.display = 'inline-flex';
      btnPause.style.display = 'none';
      if (btnReset) btnReset.style.display = 'none';
      btnClose.style.display = 'none';
    }
  }

  function renderStandbyOverlay(container, canvasId, reasonText) {
    const entry = REGISTRY[canvasId];
    const desc = (entry && entry.description) || 'Gráfico interactivo 3D con Three.js bajo demanda.';
    const icon = (entry && entry.icon) || '🧊';

    container.innerHTML = `
      <div class="sim-standby-placeholder">
        <div class="sim-standby-icon">${icon}</div>
        <h4 class="sim-standby-title">${reasonText || 'Simulación 3D Lista para Iniciar'}</h4>
        <p class="sim-standby-desc">${desc}</p>
        <button type="button" class="sim-standby-launch-btn" id="launch-${canvasId}">
          ▶️ Iniciar Gráfica Interactiva 3D
        </button>
        <span class="sim-standby-hint">⚡ Carga bajo demanda: 0% GPU y 0 KB extra mientras está cerrada</span>
      </div>
    `;
    const launchBtn = container.querySelector(`#launch-${canvasId}`);
    if (launchBtn) {
      launchBtn.addEventListener('click', () => startVisualizer(canvasId));
    }
  }

  function stopVisualizer(canvasId, isAutoSwitch) {
    const entry = REGISTRY[canvasId];
    const container = document.getElementById(canvasId);

    if (entry && entry.instance) {
      const inst = entry.instance;
      inst.disposed = true;
      if (inst.abortController) inst.abortController.abort();
      if (inst.rafId) { cancelAnimationFrame(inst.rafId); inst.rafId = null; }
      if (inst.resizeHandler) window.removeEventListener('resize', inst.resizeHandler);
      if (inst.resizeObserver) inst.resizeObserver.disconnect();
      if (inst.visibilityObserver) inst.visibilityObserver.disconnect();
      if (inst.controls && inst.controls.dispose) inst.controls.dispose();
      if (inst.scene) disposeObject3D(inst.scene);
      if (inst.renderer) {
        try {
          inst.renderer.dispose();
          if (inst.renderer.forceContextLoss) inst.renderer.forceContextLoss();
        } catch (e) {}
      }
      entry.instance = null;
    }

    if (container) {
      ensureControlToolbar(container, canvasId);
      renderStandbyOverlay(
        container,
        canvasId,
        isAutoSwitch
          ? 'Simulación en Pausa Automática (Ahorro de Memoria)'
          : 'Simulación 3D Cerrada (Memoria GPU Liberada)'
      );
      updateToolbarUI(canvasId, 'stopped');
    }
  }

  function togglePauseVisualizer(canvasId) {
    const entry = REGISTRY[canvasId];
    if (!entry || !entry.instance) { startVisualizer(canvasId); return; }
    const inst = entry.instance;
    inst.paused = !inst.paused;
    if (inst.controls) inst.controls.enabled = !inst.paused;
    if (inst.paused) {
      if (inst.rafId) { cancelAnimationFrame(inst.rafId); inst.rafId = null; }
      updateToolbarUI(canvasId, 'paused');
    } else {
      updateToolbarUI(canvasId, 'running');
      inst.requestRender();
    }
  }

  function resetCamera(canvasId) {
    const entry = REGISTRY[canvasId];
    if (!entry || !entry.instance) return;
    const inst = entry.instance;
    if (inst.initialCamPos && inst.initialTarget) {
      inst.camera.position.copy(inst.initialCamPos);
      inst.controls.target.copy(inst.initialTarget);
      inst.controls.update();
      inst.requestRender();
    }
  }

  async function startVisualizer(canvasId) {
    Object.keys(REGISTRY).forEach(otherId => {
      if (otherId !== canvasId && REGISTRY[otherId].instance) {
        stopVisualizer(otherId, true);
      }
    });

    const entry = REGISTRY[canvasId];
    if (!entry) return;
    if (entry.instance) {
      if (entry.instance.paused) togglePauseVisualizer(canvasId);
      return;
    }

    const container = document.getElementById(canvasId);
    if (!container) return;

    const launchBtn = container.querySelector(`#launch-${canvasId}`);
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.textContent = '⏳ Cargando motor 3D...';
    }
    updateToolbarUI(canvasId, 'loading');

    try {
      await ensureThreeLoaded();
    } catch (err) {
      renderStandbyOverlay(container, canvasId, 'No se pudo descargar Three.js. Verifica tu conexión y reintenta.');
      updateToolbarUI(canvasId, 'stopped');
      return;
    }

    mountThreeInstance(canvasId, entry.setupCallback);
  }

  function mountThreeInstance(canvasId, initSceneCallback) {
    const container = document.getElementById(canvasId);
    if (!container) return null;

    ensureControlToolbar(container, canvasId);

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1329);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 4.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'default' });
    } catch (err) {
      renderStandbyOverlay(container, canvasId, 'No se pudo iniciar WebGL. Pulsa para reintentar.');
      updateToolbarUI(canvasId, 'stopped');
      return null;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1.1;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight1.position.set(8, 12, 8);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.5);
    dirLight2.position.set(-8, -6, -8);
    scene.add(dirLight2);

    const abortController = new AbortController();

    const inst = {
      scene, camera, renderer, controls, container, abortController,
      paused: false, disposed: false, isVisible: true,
      rafId: null, renderRequested: false,
      initialCamPos: null, initialTarget: null,
      requestRender: null
    };

    function renderFrame() {
      inst.rafId = null;
      inst.renderRequested = false;
      if (inst.disposed || inst.paused || !inst.isVisible) return;
      const stillMoving = controls.update();
      renderer.render(scene, camera);
      if (stillMoving) requestRender();
    }

    function requestRender() {
      if (inst.disposed || inst.paused || !inst.isVisible) return;
      if (!inst.renderRequested) {
        inst.renderRequested = true;
        inst.rafId = requestAnimationFrame(renderFrame);
      }
    }
    inst.requestRender = requestRender;

    controls.addEventListener('change', () => {
      if (!inst.disposed && !inst.paused && inst.isVisible) {
        renderer.render(scene, camera);
      }
    });

    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      stopVisualizer(canvasId, false);
      renderStandbyOverlay(container, canvasId, 'El navegador liberó la gráfica por inactividad. Pulsa para restaurarla.');
    }, false);

    if ('IntersectionObserver' in window) {
      inst.visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          inst.isVisible = entry.isIntersecting;
          if (inst.isVisible && !inst.paused && !inst.disposed) requestRender();
        });
      }, { threshold: 0.05 });
      inst.visibilityObserver.observe(container);
    }

    inst.resizeHandler = () => {
      if (inst.disposed) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
        requestRender();
      }
    };
    window.addEventListener('resize', inst.resizeHandler);
    if (window.ResizeObserver) {
      inst.resizeObserver = new ResizeObserver(() => inst.resizeHandler());
      inst.resizeObserver.observe(container);
    }

    function bindControl(el, eventName, handler) {
      if (!el) return;
      el.addEventListener(eventName, handler, { signal: abortController.signal });
    }

    REGISTRY[canvasId].instance = inst;
    updateToolbarUI(canvasId, 'running');

    initSceneCallback({ scene, camera, renderer, controls, requestRender, disposeObject3D, bindControl });

    inst.initialCamPos = camera.position.clone();
    inst.initialTarget = controls.target.clone();
    controls.update();
    requestRender();
    return inst;
  }

  function registerStandby(canvasId, options, setupCallback) {
    REGISTRY[canvasId] = {
      setupCallback,
      description: options.description,
      icon: options.icon || '🧊',
      instance: REGISTRY[canvasId] ? REGISTRY[canvasId].instance : null
    };
    const container = document.getElementById(canvasId);
    if (container && !REGISTRY[canvasId].instance) {
      ensureControlToolbar(container, canvasId);
      renderStandbyOverlay(container, canvasId, options.title || 'Simulación 3D Lista para Iniciar');
      updateToolbarUI(canvasId, 'stopped');
    }
  }

  window.VisualizerManager = {
    start: startVisualizer,
    stop: stopVisualizer,
    togglePause: togglePauseVisualizer,
    resetCamera,
    onTopicSwitch: function () {
      Object.keys(REGISTRY).forEach(cid => {
        if (REGISTRY[cid].instance) stopVisualizer(cid, true);
      });
    }
  };

  // ============================================================================
  // T1: CORTINA / VALLA VERTICAL 3D SOBRE CURVA (INTEGRAL ESCALAR ∫ f ds)
  // ============================================================================
  window.initTopic1Visualizer = function () {
    registerStandby('t1-canvas-container', {
      icon: '〰️',
      title: 'Cortina Vertical ∫ f ds en 3D Lista para Iniciar',
      description: 'Despliega la pared vertical z = f(x,y) levantada sobre una curva plana C y observa el área acumulada ∫ f ds.'
    }, ({ scene, camera, controls, requestRender, disposeObject3D, bindControl }) => {
      camera.position.set(4.0, 3.3, 4.4);
      controls.target.set(0, 0.7, 0);

      scene.add(new THREE.GridHelper(6, 12, 0x475569, 0x1e293b));
      scene.add(new THREE.AxesHelper(2.8));

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      const slider = document.getElementById('t1-param-slider');
      const readout = document.getElementById('t1-param-readout');
      const activeBtn = document.querySelector('.t1-curve-btn.active');
      let curveType = (activeBtn && activeBtn.dataset.curve) || 'circle';
      let tMax = slider ? parseFloat(slider.value) : 4.5;

      function curvePoint(s, type) {
        if (type === 'circle') {
          const R = 1.6;
          return { x: R * Math.cos(s), y: R * Math.sin(s) };
        }
        // Arco parabólico mapeando s en [0, 2pi] -> u en [-1.5, 1.5]
        const u = -1.5 + (s / (2 * Math.PI)) * 3.0;
        return { x: u, y: 0.55 * u * u - 0.6 };
      }

      function heightF(x, y) {
        return 1.35 + 0.45 * Math.cos(x) * Math.sin(y) + 0.18 * x;
      }

      function updateCurtain() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const steps = 64;
        const basePts = [];
        const topPts = [];
        const verts = [];
        let area = 0;
        let arcLen = 0;

        for (let i = 0; i <= steps; i++) {
          const s = (i / steps) * tMax;
          const p = curvePoint(s, curveType);
          const h = Math.max(0.15, heightF(p.x, p.y));
          basePts.push(new THREE.Vector3(p.x, 0.02, p.y));
          topPts.push(new THREE.Vector3(p.x, h, p.y));
        }

        for (let i = 0; i < steps; i++) {
          const b0 = basePts[i], b1 = basePts[i + 1];
          const t0 = topPts[i], t1 = topPts[i + 1];
          const ds = Math.hypot(b1.x - b0.x, b1.z - b0.z);
          arcLen += ds;
          area += 0.5 * (t0.y + t1.y) * ds;

          verts.push(b0.x, b0.y, b0.z, t0.x, t0.y, t0.z, t1.x, t1.y, t1.z);
          verts.push(b0.x, b0.y, b0.z, t1.x, t1.y, t1.z, b1.x, b1.y, b1.z);
        }

        const curtainGeo = new THREE.BufferGeometry();
        curtainGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
        curtainGeo.computeVertexNormals();
        dynamicGroup.add(new THREE.Mesh(
          curtainGeo,
          new THREE.MeshPhongMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72, side: THREE.DoubleSide })
        ));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(basePts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(topPts), new THREE.LineBasicMaterial({ color: 0xa855f7 })));

        if (readout) {
          readout.textContent = `t = ${tMax.toFixed(2)} • Longitud ℓ = ${arcLen.toFixed(2)} • ∫ f ds = ${area.toFixed(3)}`;
        }
        requestRender();
      }

      bindControl(slider, 'input', (e) => { tMax = parseFloat(e.target.value); updateCurtain(); });
      const curveBtns = document.querySelectorAll('.t1-curve-btn');
      curveBtns.forEach(btn => {
        bindControl(btn, 'click', () => {
          curveBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          curveType = btn.dataset.curve;
          updateCurtain();
        });
      });

      updateCurtain();
    });
  };

  // ============================================================================
  // T2: INTEGRAL VECTORIAL ∫ F·dr, CAMPO DE FLECHAS E INVERSIÓN DE ORIENTACIÓN
  // ============================================================================
  window.initTopic2Visualizer = function () {
    registerStandby('t2-canvas-container', {
      icon: '➡️',
      title: 'Campo Vectorial y Trabajo 3D Listos para Iniciar',
      description: 'Desliza la partícula a lo largo de C e invierte la orientación (+C ↔ -C) para ver el cambio de signo del trabajo W.'
    }, ({ scene, camera, controls, requestRender, disposeObject3D, bindControl }) => {
      camera.position.set(0, 5.2, 4.6);
      controls.target.set(0, 0.2, 0);

      scene.add(new THREE.GridHelper(6, 12, 0x334155, 0x1e293b));
      scene.add(new THREE.AxesHelper(2.5));

      // Campo vectorial F(x,y) = (-y, x) + (0.4, 0.2) en el plano XZ (y_math -> z_three)
      function fieldF(x, y) {
        return { fx: -0.65 * y + 0.35, fy: 0.65 * x + 0.25 };
      }

      // Flechas estáticas del campo vectorial
      for (let gx = -2; gx <= 2; gx += 0.8) {
        for (let gy = -2; gy <= 2; gy += 0.8) {
          const f = fieldF(gx, gy);
          const mag = Math.hypot(f.fx, f.fy);
          if (mag > 0.05) {
            const dir = new THREE.Vector3(f.fx / mag, 0, f.fy / mag);
            const len = Math.min(0.55, 0.22 + 0.22 * mag);
            scene.add(new THREE.ArrowHelper(dir, new THREE.Vector3(gx, 0.05, gy), len, 0x38bdf8, 0.14, 0.08));
          }
        }
      }

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      const posSlider = document.getElementById('t2-pos-slider');
      const readout = document.getElementById('t2-work-readout');
      const activeOrient = document.querySelector('.t2-orient-btn.active');
      let orientSign = (activeOrient && activeOrient.dataset.orient === 'neg') ? -1 : 1;
      let progress = posSlider ? parseFloat(posSlider.value) : 0.7;

      function curvePos(u) {
        // Semicircunferencia de radio 1.6 desde ángulo 0 hasta pi (o inversa si orientSign === -1)
        const theta = orientSign === 1 ? u * Math.PI : (1 - u) * Math.PI;
        return { x: 1.6 * Math.cos(theta), y: 1.6 * Math.sin(theta) };
      }

      function updateWork() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const totalSteps = 50;
        const fullPts = [];
        const donePts = [];
        let work = 0;

        for (let i = 0; i <= totalSteps; i++) {
          const u = i / totalSteps;
          const p = curvePos(u);
          fullPts.push(new THREE.Vector3(p.x, 0.12, p.y));
        }

        const nDone = Math.max(1, Math.round(progress * totalSteps));
        for (let i = 0; i <= nDone; i++) {
          const u = (i / totalSteps);
          const p = curvePos(u);
          donePts.push(new THREE.Vector3(p.x, 0.16, p.y));
          if (i > 0) {
            const prev = curvePos((i - 1) / totalSteps);
            const midX = 0.5 * (p.x + prev.x);
            const midY = 0.5 * (p.y + prev.y);
            const f = fieldF(midX, midY);
            work += f.fx * (p.x - prev.x) + f.fy * (p.y - prev.y);
          }
        }

        dynamicGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(fullPts),
          new THREE.LineBasicMaterial({ color: 0x64748b })
        ));
        dynamicGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(donePts),
          new THREE.LineBasicMaterial({ color: orientSign === 1 ? 0x10b981 : 0xf43f5e })
        ));

        // Partícula actual + vectores tangente y fuerza
        const cur = curvePos(progress);
        const nxt = curvePos(Math.min(1, progress + 0.02));
        const prv = curvePos(Math.max(0, progress - 0.02));
        const tang = new THREE.Vector3(nxt.x - prv.x, 0, nxt.y - prv.y).normalize();

        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.13, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706 })
        );
        particle.position.set(cur.x, 0.18, cur.y);
        dynamicGroup.add(particle);

        dynamicGroup.add(new THREE.ArrowHelper(tang, new THREE.Vector3(cur.x, 0.22, cur.y), 0.9, 0x22c55e, 0.2, 0.12));
        const fCur = fieldF(cur.x, cur.y);
        const fVec = new THREE.Vector3(fCur.fx, 0, fCur.fy);
        if (fVec.length() > 0.05) {
          dynamicGroup.add(new THREE.ArrowHelper(fVec.clone().normalize(), new THREE.Vector3(cur.x, 0.22, cur.y), 0.9, 0xf43f5e, 0.2, 0.12));
        }

        if (readout) {
          const signTag = orientSign === 1 ? '+C (Antihoraria)' : '-C (Horaria Invertida)';
          readout.textContent = `${signTag} • W acumulado = ${work >= 0 ? '+' : ''}${work.toFixed(3)}`;
        }
        requestRender();
      }

      bindControl(posSlider, 'input', (e) => { progress = parseFloat(e.target.value); updateWork(); });
      const orientBtns = document.querySelectorAll('.t2-orient-btn');
      orientBtns.forEach(btn => {
        bindControl(btn, 'click', () => {
          orientBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          orientSign = btn.dataset.orient === 'neg' ? -1 : 1;
          updateWork();
        });
      });

      updateWork();
    });
  };

  // ============================================================================
  // T3: SUPERFICIE POTENCIAL z = φ(x,y) E INDEPENDENCIA DEL CAMINO
  // ============================================================================
  window.initTopic3Visualizer = function () {
    registerStandby('t3-canvas-container', {
      icon: '🧭',
      title: 'Superficie Potencial φ(x,y) 3D Lista para Iniciar',
      description: 'Deforma la trayectoria C₂ entre A y B y comprueba que ∫ ∇φ·dr = φ(B) - φ(A) es estrictamente idéntica a C₁.'
    }, ({ scene, camera, controls, requestRender, disposeObject3D, bindControl }) => {
      camera.position.set(4.5, 4.0, 4.5);
      controls.target.set(0, 0.9, 0);

      scene.add(new THREE.GridHelper(6, 12, 0x334155, 0x1e293b));
      scene.add(new THREE.AxesHelper(2.8));

      function phi(x, y) {
        return 0.4 + 0.28 * (x * x + y * y) + 0.35 * x + 0.2 * y;
      }

      const surfGeo = new THREE.ParametricGeometry((u, v, target) => {
        const x = -1.8 + u * 3.6;
        const y = -1.8 + v * 3.6;
        target.set(x, phi(x, y), y);
      }, 28, 28);
      scene.add(new THREE.Mesh(
        surfGeo,
        new THREE.MeshPhongMaterial({ color: 0x0284c7, transparent: true, opacity: 0.42, side: THREE.DoubleSide })
      ));

      const A = { x: -1.2, y: -1.0 };
      const B = { x: 1.2, y: 1.1 };
      const phiA = phi(A.x, A.y);
      const phiB = phi(B.x, B.y);
      const deltaPhi = phiB - phiA;

      const ptA = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x15803d }));
      ptA.position.set(A.x, phiA, A.y);
      scene.add(ptA);
      const ptB = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0x9f1239 }));
      ptB.position.set(B.x, phiB, B.y);
      scene.add(ptB);

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      const bendSlider = document.getElementById('t3-bend-slider');
      const readout = document.getElementById('t3-pot-readout');
      let bend = bendSlider ? parseFloat(bendSlider.value) : 1.0;

      function updatePaths() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const pts1 = [], pts2 = [], base2 = [];
        for (let i = 0; i <= 50; i++) {
          const t = i / 50;
          // Camino C1: segmento recto
          const x1 = A.x + t * (B.x - A.x);
          const y1 = A.y + t * (B.y - A.y);
          pts1.push(new THREE.Vector3(x1, phi(x1, y1) + 0.04, y1));

          // Camino C2: desvío sinusoidal controlado por bend
          const dev = bend * Math.sin(Math.PI * t);
          const x2 = x1 - 0.65 * dev;
          const y2 = y1 + 0.75 * dev;
          pts2.push(new THREE.Vector3(x2, phi(x2, y2) + 0.05, y2));
          base2.push(new THREE.Vector3(x2, 0.03, y2));
        }

        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), new THREE.LineBasicMaterial({ color: 0x22c55e })));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(base2), new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45 })));

        if (readout) {
          readout.textContent = `Desvío = ${bend.toFixed(2)} • ∫_{C₁} = ∫_{C₂} = φ(B)-φ(A) = ${deltaPhi.toFixed(3)}`;
        }
        requestRender();
      }

      bindControl(bendSlider, 'input', (e) => { bend = parseFloat(e.target.value); updatePaths(); });
      updatePaths();
    });
  };

  // ============================================================================
  // T4: HELICOIDE MULTIVALUADO θ = atan2(y,x) Y SALTO 2π DEL VÓRTICE
  // ============================================================================
  window.initTopic4Visualizer = function () {
    registerStandby('t4-canvas-container', {
      icon: '🌀',
      title: 'Helicoide del Vórtice (Salto 2π) 3D Listo para Iniciar',
      description: 'Desplaza el centro del lazo cerrado C: si encierra el agujero (0,0), la curva sobre el helicoide salta 2π; si no, cierra en 0.'
    }, ({ scene, camera, controls, requestRender, disposeObject3D, bindControl }) => {
      camera.position.set(4.6, 3.8, 4.6);
      controls.target.set(0, 1.0, 0);

      scene.add(new THREE.GridHelper(6, 12, 0x334155, 0x1e293b));

      // Eje singular perforado en (0,0)
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 3.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0x9f1239 })
      );
      pole.position.y = 1.6;
      scene.add(pole);

      // Superficie helicoidal z = 0.35 * theta (escalada para encuadre cómodo)
      const scaleZ = 0.35;
      const helixGeo = new THREE.ParametricGeometry((u, v, target) => {
        const r = 0.22 + u * 2.1;
        const th = v * 2 * Math.PI;
        target.set(r * Math.cos(th), scaleZ * th, r * Math.sin(th));
      }, 22, 48);
      scene.add(new THREE.Mesh(
        helixGeo,
        new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
      ));

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      const centerSlider = document.getElementById('t4-center-slider');
      const readout = document.getElementById('t4-vortex-readout');
      let cx = centerSlider ? parseFloat(centerSlider.value) : 0.25;
      const R = 0.85;

      function updateLoop() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const basePts = [];
        const liftedPts = [];
        const steps = 80;
        let angleAcc = 0;
        let prevAng = null;

        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * 2 * Math.PI;
          const x = cx + R * Math.cos(t);
          const y = R * Math.sin(t);
          basePts.push(new THREE.Vector3(x, 0.03, y));

          const curAng = Math.atan2(y, x);
          if (prevAng !== null) {
            let dAng = curAng - prevAng;
            if (dAng > Math.PI) dAng -= 2 * Math.PI;
            if (dAng < -Math.PI) dAng += 2 * Math.PI;
            angleAcc += dAng;
          }
          prevAng = curAng;
          const zVal = Math.max(0.05, 0.2 + scaleZ * (angleAcc + (cx < R ? 0 : Math.PI)));
          liftedPts.push(new THREE.Vector3(x, zVal, y));
        }

        const encloses = Math.abs(cx) < R - 0.02;
        const colorLoop = encloses ? 0xf59e0b : 0x10b981;

        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(basePts), new THREE.LineBasicMaterial({ color: colorLoop })));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(liftedPts), new THREE.LineBasicMaterial({ color: 0xfef08a })));

        // Marcadores inicio y fin sobre el helicoide para evidenciar el salto 2π
        const startPt = liftedPts[0];
        const endPt = liftedPts[liftedPts.length - 1];
        const mkMat = new THREE.MeshStandardMaterial({ color: encloses ? 0xf43f5e : 0x10b981, emissive: encloses ? 0x881337 : 0x065f46 });
        const sMesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), mkMat);
        sMesh.position.copy(startPt);
        const eMesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), mkMat);
        eMesh.position.copy(endPt);
        dynamicGroup.add(sMesh, eMesh);

        if (encloses) {
          // Segmento vertical rojo mostrando el salto 2π
          dynamicGroup.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([startPt, endPt]),
            new THREE.LineBasicMaterial({ color: 0xf43f5e })
          ));
        }

        if (readout) {
          readout.textContent = encloses
            ? `Centro x₀ = ${cx.toFixed(2)} (Encierra al origen) → ∮ V·dr = 2π ≈ 6.283`
            : `Centro x₀ = ${cx.toFixed(2)} (No encierra al origen) → ∮ V·dr = 0.000`;
        }
        requestRender();
      }

      bindControl(centerSlider, 'input', (e) => { cx = parseFloat(e.target.value); updateLoop(); });
      updateLoop();
    });
  };

  // ============================================================================
  // T5: TEOREMA DE GREEN EN DISCO SIMPLE VS REGIÓN DOBLEMENTE CONEXA (ANILLO)
  // ============================================================================
  window.initTopic5Visualizer = function () {
    registerStandby('t5-canvas-container', {
      icon: '🔄',
      title: 'Teorema de Green 3D (Simple y Con Agujero) Listo para Iniciar',
      description: 'Alterna entre disco simplemente conexo y anillo con agujero, ajustando el radio interior para ver orientación positiva y circulación.'
    }, ({ scene, camera, controls, requestRender, disposeObject3D, bindControl }) => {
      camera.position.set(0, 4.8, 4.4);
      controls.target.set(0, 0.3, 0);

      scene.add(new THREE.GridHelper(6, 12, 0x334155, 0x1e293b));
      scene.add(new THREE.AxesHelper(2.8));

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      const holeSlider = document.getElementById('t5-hole-slider');
      const readout = document.getElementById('t5-green-readout');
      const activeMode = document.querySelector('.t5-mode-btn.active');
      let mode = (activeMode && activeMode.dataset.mode) || 'annulus';
      let rIn = holeSlider ? parseFloat(holeSlider.value) : 0.75;
      const rOut = 2.0;

      function updateGreen() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const innerR = mode === 'simple' ? 0.01 : rIn;

        // Superficie del dominio D (anillo o disco)
        const ringGeo = new THREE.RingGeometry(innerR, rOut, 48, 4);
        const ringMesh = new THREE.Mesh(
          ringGeo,
          new THREE.MeshPhongMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
        );
        ringMesh.rotation.x = -Math.PI / 2;
        ringMesh.position.y = 0.05;
        dynamicGroup.add(ringMesh);

        // Cilindro translúcido de altura = rotacional constante (Q_x - P_y = 2) escalado a 0.65
        const volGeo = new THREE.ParametricGeometry((u, v, target) => {
          const r = innerR + u * (rOut - innerR);
          const th = v * 2 * Math.PI;
          target.set(r * Math.cos(th), 0.7, r * Math.sin(th));
        }, 12, 48);
        dynamicGroup.add(new THREE.Mesh(
          volGeo,
          new THREE.MeshPhongMaterial({ color: 0xa855f7, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
        ));

        // Borde exterior C_ext+ (antihorario en verde)
        const extPts = [];
        for (let i = 0; i <= 64; i++) {
          const th = (i / 64) * 2 * Math.PI;
          extPts.push(new THREE.Vector3(rOut * Math.cos(th), 0.09, rOut * Math.sin(th)));
        }
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(extPts), new THREE.LineBasicMaterial({ color: 0x22c55e })));

        // Flechas de orientación antihoraria en el borde exterior
        for (let k = 0; k < 4; k++) {
          const th = k * Math.PI / 2 + Math.PI / 4;
          const pos = new THREE.Vector3(rOut * Math.cos(th), 0.14, rOut * Math.sin(th));
          const dir = new THREE.Vector3(-Math.sin(th), 0, Math.cos(th)).normalize();
          dynamicGroup.add(new THREE.ArrowHelper(dir, pos, 0.55, 0x22c55e, 0.18, 0.1));
        }

        if (mode === 'annulus') {
          // Borde interior C_int- (horario en ámbar para dejar D a la izquierda)
          const intPts = [];
          for (let i = 0; i <= 48; i++) {
            const th = (i / 48) * 2 * Math.PI;
            intPts.push(new THREE.Vector3(rIn * Math.cos(th), 0.09, rIn * Math.sin(th)));
          }
          dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(intPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));

          for (let k = 0; k < 4; k++) {
            const th = k * Math.PI / 2;
            const pos = new THREE.Vector3(rIn * Math.cos(th), 0.14, rIn * Math.sin(th));
            // Sentido horario opuesto al exterior
            const dir = new THREE.Vector3(Math.sin(th), 0, -Math.cos(th)).normalize();
            dynamicGroup.add(new THREE.ArrowHelper(dir, pos, 0.42, 0xf59e0b, 0.14, 0.08));
          }

          // Corte auxiliar de cancelación (ida y vuelta)
          dynamicGroup.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(rIn, 0.12, 0.04),
              new THREE.Vector3(rOut, 0.12, 0.04)
            ]),
            new THREE.LineBasicMaterial({ color: 0xf43f5e })
          ));
          dynamicGroup.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(rOut, 0.12, -0.04),
              new THREE.Vector3(rIn, 0.12, -0.04)
            ]),
            new THREE.LineBasicMaterial({ color: 0x38bdf8 })
          ));
        }

        const areaD = Math.PI * (rOut * rOut - (mode === 'simple' ? 0 : rIn * rIn));
        const greenVal = 2.0 * areaD; // Para F = (-y, x), Q_x - P_y = 2
        if (readout) {
          readout.textContent = mode === 'simple'
            ? `Disco (R=2) • Área = ${areaD.toFixed(2)} • ∮(-y dx + x dy) = ∬ 2 dA = ${greenVal.toFixed(2)}`
            : `Anillo (r=${rIn.toFixed(2)}, R=2) • Área = ${areaD.toFixed(2)} • ∮_{∂D⁺} = ${greenVal.toFixed(2)}`;
        }
        requestRender();
      }

      bindControl(holeSlider, 'input', (e) => { rIn = parseFloat(e.target.value); updateGreen(); });
      const modeBtns = document.querySelectorAll('.t5-mode-btn');
      modeBtns.forEach(btn => {
        bindControl(btn, 'click', () => {
          modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          mode = btn.dataset.mode;
          updateGreen();
        });
      });

      updateGreen();
    });
  };
})();
