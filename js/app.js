/**
 * APLICACIÓN PRINCIPAL v2.0 — PLATAFORMA INTERACTIVA UNIVERSITARIA (UNI FC)
 *
 * Optimizaciones clave:
 * 1. KaTeX resiliente y ultra-perezoso (solo renderiza la pestaña activa, enunciados visibles
 *    y glosarios al abrirlos por primera vez).
 * 2. Búsqueda de glosario insensible a tildes/diacríticos sin re-renderizar KaTeX.
 * 3. Selector de tema Oscuro / Claro persistido en localStorage.
 * 4. Progreso local de ejercicios ("✓ Dominado") + Hash Routing (#t1..#glosario).
 * 5. Enlace inteligente a Ejercicios, barra de progreso de lectura y botón Volver Arriba.
 */

document.addEventListener('DOMContentLoaded', () => {
  const evalSlug = document.body.dataset.evalSlug || 'cm2a1-platform';
  const STORAGE_KEY_DONE = `${evalSlug}_done_exercises_v1`;
  const STORAGE_KEY_THEME = 'cm2a1_ui_theme_v1';

  const glossaryData = window.GLOSSARY_DATA || window.PC5_GLOSSARY_DATA || window.PC4_GLOSSARY_DATA || window.PC6_GLOSSARY_DATA || [];
  const glossaryTopics = window.GLOSSARY_TOPICS || window.PC5_GLOSSARY_TOPICS || {};

  // Estado global
  const state = {
    currentTopic: 't1',
    currentLevels: {},
    initializedVisualizers: new Set(),
    initializedSubtopicGlossaries: new Set(),
    masterGlossaryInitialized: false,
    renderedMathSections: new Set(),
    pendingMathNodes: new Set(),
    doneExercises: loadDoneSet()
  };

  // Inicializar niveles por defecto para cada grupo .level-tabs presente en DOM
  document.querySelectorAll('.level-tabs[data-topic]').forEach(group => {
    const t = group.dataset.topic;
    const activeBtn = group.querySelector('.level-tab-btn.active');
    state.currentLevels[t] = activeBtn ? activeBtn.dataset.level : '0';
  });

  // ============================================================================
  // 1. UTILIDADES: ALMACENAMIENTO, NORMALIZACIÓN Y KATEX RESILIENTE
  // ============================================================================
  function loadDoneSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DONE);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? new Set(arr.map(String)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveDoneSet() {
    try {
      localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(Array.from(state.doneExercises)));
    } catch (e) {}
  }

  function normalizeSearch(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function formatMathText(str) {
    if (!str) return '';
    const mathBlocks = [];
    const stash = (m) => {
      const idx = mathBlocks.length;
      mathBlocks.push(m);
      return `@@MATH_${idx}@@`;
    };
    let html = str
      .replace(/\$\$[\s\S]+?\$\$/g, stash)
      .replace(/\$[^$\n]+?\$/g, stash);
    html = html
      .replace(/\*\*((?:(?!\*\*).)+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    return html.replace(/@@MATH_(\d+)@@/g, (_, idx) => mathBlocks[Number(idx)]);
  }

  const KATEX_OPTIONS = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  };

  function renderMath(targetElement) {
    const el = targetElement || document.body;
    if (!el) return;
    if (window.renderMathInElement) {
      window.renderMathInElement(el, KATEX_OPTIONS);
    } else {
      state.pendingMathNodes.add(el);
    }
  }

  window.renderMathSafe = renderMath;

  function flushPendingMath() {
    if (!window.renderMathInElement || state.pendingMathNodes.size === 0) return;
    state.pendingMathNodes.forEach(node => {
      window.renderMathInElement(node, KATEX_OPTIONS);
    });
    state.pendingMathNodes.clear();
  }

  window.addEventListener('load', flushPendingMath);
  // Poll corto de respaldo si auto-render termina antes o después de DOMContentLoaded
  if (!window.renderMathInElement) {
    let retries = 0;
    const timer = setInterval(() => {
      retries++;
      if (window.renderMathInElement) {
        flushPendingMath();
        clearInterval(timer);
      } else if (retries > 40) {
        clearInterval(timer);
      }
    }, 100);
  }

  // Renderizar KaTeX en el Hero Header (resuelve fórmulas como $\varepsilon$-$\delta$)
  const heroHeaderEl = document.querySelector('.hero-header');
  if (heroHeaderEl) {
    renderMath(heroHeaderEl);
  }

  // ============================================================================
  // 2. TEMA OSCURO / CLARO + BARRA DE PROGRESO + BOTÓN VOLVER ARRIBA
  // ============================================================================
  function applyTheme(theme) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', normalized);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', normalized === 'light' ? '#f1f5f9' : '#070b14');
    }
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.setAttribute('aria-pressed', normalized === 'light' ? 'true' : 'false');
      btn.setAttribute('title', normalized === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
      const iconEl = btn.querySelector('.theme-icon');
      const labelEl = btn.querySelector('.theme-label');
      if (iconEl) iconEl.textContent = normalized === 'light' ? '🌙' : '☀️';
      if (labelEl) labelEl.textContent = normalized === 'light' ? 'Oscuro' : 'Claro';
    }
  }

  (function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY_THEME);
    } catch (e) {}
    const initial = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(initial);

    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY_THEME, next); } catch (e) {}
      });
    }
  })();

  (function initScrollHelpers() {
    const progressBar = document.getElementById('reading-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    let ticking = false;

    function onScrollFrame() {
      ticking = false;
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      if (progressBar) {
        const pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
        progressBar.style.width = `${pct.toFixed(1)}%`;
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', scrollTop > 420);
      }
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScrollFrame);
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  })();

  // ============================================================================
  // 3. NAVEGACIÓN DE SUBTEMAS, HASH ROUTING Y SALTOS INTERNOS
  // ============================================================================
  const topicTabButtons = document.querySelectorAll('.topic-tab-btn');
  const topicSections = document.querySelectorAll('.topic-section');
  const validTopics = new Set(Array.from(topicTabButtons).map(b => b.dataset.topic));

  function switchTopic(topicId, updateHash) {
    if (!validTopics.has(topicId)) {
      topicId = 't1';
    }
    state.currentTopic = topicId;

    topicTabButtons.forEach(btn => {
      const isActive = btn.dataset.topic === topicId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    let activeSectionEl = null;
    topicSections.forEach(sec => {
      const isMatch = sec.id === `section-${topicId}`;
      sec.classList.toggle('active', isMatch);
      sec.hidden = !isMatch;
      if (isMatch) activeSectionEl = sec;
    });

    if (window.VisualizerManager) {
      window.VisualizerManager.onTopicSwitch(topicId);
    }

    initVisualizerForTopic(topicId);

    // Inicialización perezosa de glosarios
    if (topicId === 'glosario') {
      initMasterGlossaryOnce();
    } else if (topicId !== 'tr') {
      initSubtopicGlossaryOnce(topicId);
      renderExercises(topicId);
    }

    // Renderizar KaTeX una sola vez para la teoría estática de la sección activa
    if (activeSectionEl && !state.renderedMathSections.has(topicId)) {
      const theoryCard = activeSectionEl.querySelector('.theory-card');
      if (theoryCard) {
        // Excluir subtopic-glossary-cards porque ya se renderiza de forma acotada
        renderMath(theoryCard);
      } else if (topicId !== 'glosario') {
        renderMath(activeSectionEl);
      }
      state.renderedMathSections.add(topicId);
    }

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${topicId}`);
    }
  }

  topicTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTopic(btn.dataset.topic, true);
    });
  });

  // Registro en Standby de visores 3D (o módulo de Retos)
  function initVisualizerForTopic(topicId) {
    if (state.initializedVisualizers.has(topicId) || topicId === 'glosario') return;

    const mapInitFn = {
      t1: window.initTopic1Visualizer || window.initJacobianVisualizer,
      t2: window.initTopic2Visualizer || window.initImplicitVisualizer,
      t3: window.initTopic3Visualizer || window.initRiemannVisualizer,
      t4: window.initTopic4Visualizer,
      t5: window.initTopic5Visualizer || window.initFubiniVisualizer,
      tr: window.initRetos2026Module
    };

    const fn = mapInitFn[topicId];
    if (typeof fn === 'function') {
      try {
        fn();
        state.initializedVisualizers.add(topicId);
      } catch (e) {
        console.warn(`Error inicializando módulo para ${topicId}:`, e);
      }
    }
  }

  // Enlaces del navbar superior (Retos, Glosario y Ejercicios inteligente)
  const navRetosLink = document.getElementById('nav-link-retos');
  if (navRetosLink) {
    navRetosLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTopic('tr', true);
      const temarioEl = document.getElementById('temario');
      if (temarioEl) temarioEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navGlossaryLink = document.getElementById('nav-link-glosario');
  if (navGlossaryLink) {
    navGlossaryLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTopic('glosario', true);
      const temarioEl = document.getElementById('temario');
      if (temarioEl) temarioEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navExercisesLink = document.getElementById('nav-link-ejercicios');
  if (navExercisesLink) {
    navExercisesLink.addEventListener('click', (e) => {
      e.preventDefault();
      let targetTopic = state.currentTopic;
      if (targetTopic === 'tr' || targetTopic === 'glosario') {
        targetTopic = 't1';
        switchTopic('t1', true);
      }
      const exHeader = document.getElementById(`ejercicios-${targetTopic}`) || document.getElementById('ejercicios');
      if (exHeader) exHeader.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mini-barras de saltos rápidos dentro de cada subtema
  document.querySelectorAll('.jump-pill[data-jump-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.topic-section');
      if (!section) return;
      const selector = btn.dataset.jumpTarget;
      const target = section.querySelector(selector);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============================================================================
  // 4. BANCO DE EJERCICIOS (KATEX PEREZOSO EN PISTAS/SOLUCIONES + PROGRESO LOCAL)
  // ============================================================================
  function updateTopicProgressBadge(topicId) {
    const badge = document.getElementById(`progress-${topicId}`);
    if (!badge || !window.EXERCISES_DATA) return;
    const topicExs = window.EXERCISES_DATA.filter(ex => ex.topic === topicId);
    const doneCount = topicExs.filter(ex => state.doneExercises.has(String(ex.id))).length;
    badge.textContent = `✓ ${doneCount} / ${topicExs.length} dominados`;
  }

  function renderExercises(topicId) {
    const container = document.getElementById(`exercises-container-${topicId}`);
    if (!container) return;

    const currentLevel = state.currentLevels[topicId] || '0';
    const exercises = window.EXERCISES_DATA ? window.EXERCISES_DATA.filter(ex => ex.topic === topicId) : [];
    const filtered = currentLevel === 'all'
      ? exercises
      : exercises.filter(ex => String(ex.level) === String(currentLevel));

    updateTopicProgressBadge(topicId);
    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `<div class="exercise-card"><p>No hay ejercicios disponibles para este filtro.</p></div>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(ex => {
      const exKey = String(ex.id);
      const isDone = state.doneExercises.has(exKey);

      const card = document.createElement('article');
      card.className = `exercise-card${isDone ? ' is-done' : ''}`;
      card.id = `exercise-${ex.id}`;

      let examBadge = '';
      if (ex.title && (ex.title.includes('2026') || ex.title.includes('2025') || ex.title.includes('2024') || ex.title.includes('UNI'))) {
        examBadge = `<span class="exam-tag">🏛️ Examen UNI</span>`;
      }

      card.innerHTML = `
        <div class="exercise-card-header">
          <div class="exercise-badges">
            <span class="level-badge badge-l${ex.level}">Nivel ${ex.level}</span>
            ${examBadge}
            <span class="exercise-id-label">#${ex.id}</span>
          </div>
          <h3 class="exercise-title">${ex.title}</h3>
        </div>

        <div class="exercise-statement">
          ${formatMathText(ex.statement)}
        </div>

        <div class="exercise-actions">
          <button type="button" class="btn-action btn-hint" data-ex-id="${ex.id}" aria-expanded="false" aria-controls="hint-${ex.id}">
            💡 Pista Conceptual
          </button>
          <button type="button" class="btn-action btn-solution" data-ex-id="${ex.id}" aria-expanded="false" aria-controls="solution-${ex.id}">
            📝 Ver Solución Paso a Paso
          </button>
          <button type="button" class="btn-action btn-done${isDone ? ' active' : ''}" data-ex-id="${ex.id}" aria-pressed="${isDone ? 'true' : 'false'}">
            ${isDone ? '✅ Dominado' : '○ Marcar Dominado'}
          </button>
        </div>

        <div class="hint-box" id="hint-${ex.id}">
          <strong>Pista:</strong> ${formatMathText(ex.hint)}
        </div>

        <div class="solution-box" id="solution-${ex.id}">
          <h4 class="solution-box-heading">Desarrollo Riguroso:</h4>
          <div>${formatMathText(ex.solution)}</div>
          <div class="traps-box">
            <div class="traps-title">⚠️ Errores Frecuentes y Trampas UNI:</div>
            <div>${formatMathText(ex.commonMistakes)}</div>
          </div>
        </div>
      `;

      const hintBtn = card.querySelector('.btn-hint');
      const hintBox = card.querySelector('.hint-box');
      hintBtn.addEventListener('click', () => {
        const opening = !hintBox.classList.contains('active');
        hintBox.classList.toggle('active', opening);
        hintBtn.classList.toggle('active', opening);
        hintBtn.setAttribute('aria-expanded', opening ? 'true' : 'false');
        if (opening && hintBox.dataset.mathRendered !== '1') {
          renderMath(hintBox);
          hintBox.dataset.mathRendered = '1';
        }
      });

      const solBtn = card.querySelector('.btn-solution');
      const solBox = card.querySelector('.solution-box');
      solBtn.addEventListener('click', () => {
        const opening = !solBox.classList.contains('active');
        solBox.classList.toggle('active', opening);
        solBtn.classList.toggle('active', opening);
        solBtn.setAttribute('aria-expanded', opening ? 'true' : 'false');
        if (opening && solBox.dataset.mathRendered !== '1') {
          renderMath(solBox);
          solBox.dataset.mathRendered = '1';
        }
      });

      const doneBtn = card.querySelector('.btn-done');
      doneBtn.addEventListener('click', () => {
        if (state.doneExercises.has(exKey)) {
          state.doneExercises.delete(exKey);
          card.classList.remove('is-done');
          doneBtn.classList.remove('active');
          doneBtn.setAttribute('aria-pressed', 'false');
          doneBtn.textContent = '○ Marcar Dominado';
        } else {
          state.doneExercises.add(exKey);
          card.classList.add('is-done');
          doneBtn.classList.add('active');
          doneBtn.setAttribute('aria-pressed', 'true');
          doneBtn.textContent = '✅ Dominado';
        }
        saveDoneSet();
        updateTopicProgressBadge(topicId);
      });

      fragment.appendChild(card);
    });

    container.appendChild(fragment);

    // Renderizar KaTeX SOLO en los enunciados visibles (pistas y soluciones son perezosas)
    container.querySelectorAll('.exercise-statement, .exercise-title').forEach(node => {
      renderMath(node);
    });
  }

  // Selectores de nivel (Nivel 0 al 5 + Ver Todos)
  document.querySelectorAll('.level-tabs').forEach(tabGroup => {
    const topicId = tabGroup.dataset.topic;
    tabGroup.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabGroup.querySelectorAll('.level-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.currentLevels[topicId] = btn.dataset.level;
        renderExercises(topicId);
      });
    });
  });

  // ============================================================================
  // 5. GLOSARIO INTERACTIVO PEREZOSO (MAESTRO + POR SUBTEMA)
  // ============================================================================
  function createGlossaryCard(item) {
    const card = document.createElement('article');
    card.className = 'glossary-card';
    card.dataset.id = item.id;
    card.dataset.topic = item.topic;

    const topicMeta = glossaryTopics[item.topic];
    const topicLabel = (topicMeta && topicMeta.shortName) || item.topicName || item.topic.toUpperCase();

    card.dataset.searchText = normalizeSearch([
      item.symbol,
      item.name,
      item.reading,
      item.simple,
      item.action,
      item.trap,
      item.topic,
      topicLabel
    ].join(' '));

    card.innerHTML = `
      <div class="glossary-card-top">
        <span class="glossary-topic-pill pill-${item.topic}">${topicLabel}</span>
        <span class="glossary-card-id">#${item.id}</span>
      </div>
      <div class="glossary-symbol-banner">
        <div class="glossary-symbol-math">${item.symbol}</div>
      </div>
      <h4 class="glossary-card-title">${item.name}</h4>

      <div class="glossary-detail-section reading-section">
        <div class="glossary-detail-label">🗣️ Cómo se lee en clase / examen:</div>
        <div class="glossary-detail-text">«${item.reading}»</div>
      </div>

      <div class="glossary-detail-section simple-section">
        <div class="glossary-detail-label">💡 Significado intuitivo:</div>
        <div class="glossary-detail-text">${item.simple}</div>
      </div>

      <div class="glossary-detail-section action-section">
        <div class="glossary-detail-label">✍️ Qué escribir en tu hoja de examen:</div>
        <div class="glossary-detail-text">${item.action}</div>
      </div>

      <div class="glossary-detail-section trap-section">
        <div class="glossary-detail-label">⚠️ Trampa frecuente / Error clásico:</div>
        <div class="glossary-detail-text">${item.trap}</div>
      </div>
    `;
    return card;
  }

  function initMasterGlossaryOnce() {
    if (state.masterGlossaryInitialized) return;
    const container = document.getElementById('glossary-cards-container');
    if (!container || glossaryData.length === 0) return;
    state.masterGlossaryInitialized = true;

    const searchInput = document.getElementById('glossary-search-input');
    const clearBtn = document.getElementById('glossary-search-clear');
    const filterBtns = document.querySelectorAll('#glossary-topic-filters .glossary-pill-btn');
    const visibleCountEl = document.getElementById('glossary-visible-count');
    const totalCountEl = document.getElementById('glossary-total-count');
    const emptyStateEl = document.getElementById('glossary-empty-state');
    const resetBtn = document.getElementById('btn-reset-glossary-search');

    if (totalCountEl) totalCountEl.textContent = glossaryData.length;
    const countAllEl = document.getElementById('count-all');
    if (countAllEl) countAllEl.textContent = glossaryData.length;

    const topicCounts = glossaryData.reduce((acc, item) => {
      acc[item.topic] = (acc[item.topic] || 0) + 1;
      return acc;
    }, {});
    Object.keys(topicCounts).forEach(t => {
      const el = document.getElementById(`count-${t}`);
      if (el) el.textContent = topicCounts[t];
    });

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const cardNodes = glossaryData.map(item => {
      const card = createGlossaryCard(item);
      fragment.appendChild(card);
      return { element: card, topic: item.topic, text: card.dataset.searchText };
    });
    container.appendChild(fragment);

    renderMath(container);

    let activeTopicFilter = 'all';

    function filterMasterCards() {
      const query = normalizeSearch(searchInput ? searchInput.value.trim() : '');
      let visibleCount = 0;

      cardNodes.forEach(node => {
        const matchesTopic = (activeTopicFilter === 'all' || node.topic === activeTopicFilter);
        const matchesQuery = !query || node.text.includes(query);
        const show = matchesTopic && matchesQuery;
        node.element.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      if (visibleCountEl) visibleCountEl.textContent = visibleCount;
      if (emptyStateEl) emptyStateEl.style.display = visibleCount === 0 ? 'block' : 'none';
      if (clearBtn) clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }

    if (searchInput) searchInput.addEventListener('input', filterMasterCards);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) { searchInput.value = ''; searchInput.focus(); }
        filterMasterCards();
      });
    }
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTopicFilter = btn.dataset.filter || 'all';
        filterMasterCards();
      });
    });
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        activeTopicFilter = 'all';
        filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        filterMasterCards();
      });
    }

    filterMasterCards();
  }

  function initSubtopicGlossaryOnce(topicId) {
    if (state.initializedSubtopicGlossaries.has(topicId) || glossaryData.length === 0) return;
    const widget = document.querySelector(`.subtopic-glossary-widget[data-topic="${topicId}"]`);
    const container = document.getElementById(`subtopic-glossary-cards-${topicId}`);
    if (!widget || !container) return;

    state.initializedSubtopicGlossaries.add(topicId);

    const subtopicData = glossaryData.filter(item => item.topic === topicId);
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const cardNodes = subtopicData.map(item => {
      const card = createGlossaryCard(item);
      fragment.appendChild(card);
      return { element: card, text: card.dataset.searchText };
    });
    container.appendChild(fragment);

    renderMath(container);

    const searchInput = widget.querySelector('.subtopic-search-input');
    const clearBtn = widget.querySelector('.subtopic-search-clear');
    const counterEl = widget.querySelector('.subtopic-count-val');
    const toggleViewBtn = widget.querySelector('.btn-toggle-subtopic-view');

    function filterSubtopic() {
      const query = normalizeSearch(searchInput ? searchInput.value.trim() : '');
      let visibleCount = 0;
      cardNodes.forEach(node => {
        const match = !query || node.text.includes(query);
        node.element.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      if (counterEl) counterEl.textContent = visibleCount;
      if (clearBtn) clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }

    if (searchInput) searchInput.addEventListener('input', filterSubtopic);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) { searchInput.value = ''; searchInput.focus(); }
        filterSubtopic();
      });
    }
    if (toggleViewBtn) {
      toggleViewBtn.addEventListener('click', () => {
        container.classList.toggle('compact-mode');
        const isCompact = container.classList.contains('compact-mode');
        const label = toggleViewBtn.querySelector('.view-mode-label');
        if (label) label.textContent = isCompact ? 'Vista Detallada' : 'Vista Compacta';
      });
    }

    filterSubtopic();
  }

  // Inicializar conmutadores de demostración en 2 fases (globales en todas las pestañas)
  if (window.initRetos2026Module) {
    window.initRetos2026Module();
  }

  // Arrancar en la pestaña indicada por hash (#t2, #tr, #glosario) o 't1' por defecto
  const initialHash = (window.location.hash || '').replace('#', '').trim();
  const initialTopic = validTopics.has(initialHash) ? initialHash : 't1';
  switchTopic(initialTopic, false);

  window.addEventListener('hashchange', () => {
    const h = (window.location.hash || '').replace('#', '').trim();
    if (validTopics.has(h) && h !== state.currentTopic) {
      switchTopic(h, false);
    }
  });
});
