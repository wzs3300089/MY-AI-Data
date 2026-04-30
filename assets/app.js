(function () {
  const data = window.AI_EPIC_DATA || { articles: [], categories: [], featuredIds: [] };
  const initialParams = new URLSearchParams(window.location.search);
  const state = {
    category: data.categories.includes(initialParams.get('category')) ? initialParams.get('category') : '全部文章',
    query: initialParams.get('q') || '',
    visible: data.articles.slice(),
    currentId: initialParams.get('article'),
  };

  const els = {
    totalCount: document.querySelector('[data-total-count]'),
    heroCount: document.querySelector('[data-hero-count]'),
    featured: document.querySelector('[data-featured]'),
    categories: document.querySelector('[data-categories]'),
    articles: document.querySelector('[data-articles]'),
    search: document.querySelector('[data-search]'),
    resultCount: document.querySelector('[data-result-count]'),
    reader: document.querySelector('#reader'),
    readerTitle: document.querySelector('[data-reader-title]'),
    readerCategory: document.querySelector('[data-reader-category]'),
    readerSummary: document.querySelector('[data-reader-summary]'),
    readerMeta: document.querySelector('[data-reader-meta]'),
    readerBody: document.querySelector('[data-reader-body]'),
    back: document.querySelector('[data-back]'),
    prev: document.querySelector('[data-prev]'),
    next: document.querySelector('[data-next]'),
    topbar: document.querySelector('[data-topbar]'),
    quickToggles: document.querySelectorAll('[data-quick-toggle]'),
    quickPanels: document.querySelectorAll('[data-quick-panel]'),
    quickCategories: document.querySelector('[data-quick-categories]'),
    quickNavList: document.querySelector('[data-quick-nav-list]'),
    scrollTop: document.querySelector('[data-scroll-top]'),
    scrollBottom: document.querySelector('[data-scroll-bottom]'),
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugText(article) {
    return [
      article.title,
      article.fileTitle,
      article.summary,
      article.markdown,
      article.categories.join(' '),
      article.tags.join(' '),
    ].join(' ').toLowerCase();
  }

  function badge(label) {
    return `<span class="badge">${escapeHtml(label)}</span>`;
  }

  function categoryCount(category) {
    if (category === '全部文章') return data.articles.length;
    return data.articles.filter((article) => article.categories.includes(category)).length;
  }

  function renderFeatured() {
    const featured = data.featuredIds
      .map((id) => data.articles.find((article) => article.id === id))
      .filter(Boolean)
      .slice(0, 4);

    els.featured.innerHTML = featured.map((article) => `
      <article class="feature-card" tabindex="0" role="button" data-open="${article.id}">
        <div>
          <div class="badge-row">${article.categories.slice(0, 2).map(badge).join('')}</div>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.summary)}</p>
        </div>
        <strong>${article.wordCount} 字</strong>
      </article>
    `).join('');
  }

  function renderCategories() {
    els.categories.innerHTML = data.categories.map((category) => `
      <button class="category-button${category === state.category ? ' is-active' : ''}" type="button" data-category="${escapeHtml(category)}">
        ${escapeHtml(category)}
      </button>
    `).join('');

    if (els.quickCategories) {
      els.quickCategories.innerHTML = data.categories.map((category) => `
        <button class="quick-category-button${category === state.category ? ' is-active' : ''}" type="button" data-quick-category="${escapeHtml(category)}">
          <span>${escapeHtml(category)}</span>
          <strong>${categoryCount(category)}</strong>
        </button>
      `).join('');
    }
  }

  function matches(article) {
    const categoryOk = state.category === '全部文章' || article.categories.includes(state.category);
    const queryOk = !state.query || slugText(article).includes(state.query.toLowerCase());
    return categoryOk && queryOk;
  }

  function renderArticles() {
    state.visible = data.articles.filter(matches);
    els.resultCount.textContent = `${state.visible.length} / ${data.articles.length} 篇`;

    if (!state.visible.length) {
      els.articles.innerHTML = '<div class="empty-state">没有匹配文章。换个关键词或分类试试。</div>';
      renderQuickNav();
      return;
    }

    els.articles.innerHTML = state.visible.map((article) => `
      <article class="article-card" tabindex="0" role="button" data-open="${article.id}">
        <div>
          <div class="badge-row">${article.categories.slice(0, 2).map(badge).join('')}</div>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.summary)}</p>
        </div>
        <div>
          <div class="badge-row">${badge(`${article.wordCount} 字`)}</div>
          <div class="source">${escapeHtml(article.sourceFile)}</div>
        </div>
      </article>
    `).join('');
    renderQuickNav();
  }

  function shortenTitle(title) {
    return title.length > 24 ? `${title.slice(0, 23)}…` : title;
  }

  function renderQuickNav() {
    if (!els.quickNavList) return;

    if (!state.visible.length) {
      els.quickNavList.innerHTML = '<div class="quick-nav-empty">无匹配文章</div>';
      return;
    }

    els.quickNavList.innerHTML = state.visible.map((article, index) => `
      <button class="quick-nav-item" type="button" data-open="${article.id}" title="${escapeHtml(article.title)}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(shortenTitle(article.title))}</strong>
      </button>
    `).join('');
  }

  function syncUrl(mode) {
    const params = new URLSearchParams();
    if (state.category && state.category !== '全部文章') params.set('category', state.category);
    if (state.query) params.set('q', state.query);
    if (state.currentId) params.set('article', state.currentId);
    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history[mode === 'push' ? 'pushState' : 'replaceState']({}, '', nextUrl);
  }

  function inlineMarkdown(text) {
    return escapeHtml(text)
      .replace(/!\[\[([^\]]+)\]\]/g, '<strong>$1</strong>')
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<strong>$2</strong>')
      .replace(/\[\[([^\]]+)\]\]/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function markdownToHtml(markdown) {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let list = [];
    let inCode = false;
    let code = [];

    function flushParagraph() {
      if (paragraph.length) {
        html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
        paragraph = [];
      }
    }

    function flushList() {
      if (list.length) {
        html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
        list = [];
      }
    }

    for (const line of lines) {
      if (line.startsWith('```')) {
        if (inCode) {
          html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
          code = [];
          inCode = false;
        } else {
          flushParagraph();
          flushList();
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        code.push(line);
        continue;
      }

      if (!line.trim()) {
        flushParagraph();
        flushList();
        continue;
      }

      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = heading[1].length;
        html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        continue;
      }

      const bullet = line.match(/^\s*[-*]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        list.push(bullet[1]);
        continue;
      }

      const quote = line.match(/^>\s?(.*)$/);
      if (quote) {
        flushParagraph();
        flushList();
        html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
        continue;
      }

      paragraph.push(line.trim());
    }

    flushParagraph();
    flushList();
    if (inCode) html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    return html.join('');
  }

  function openArticle(id) {
    const article = data.articles.find((item) => item.id === id);
    if (!article) return;
    state.currentId = id;
    syncUrl('push');
    els.reader.hidden = false;
    els.readerTitle.textContent = article.title;
    els.readerCategory.textContent = article.categories.join(' / ');
    els.readerSummary.textContent = article.summary;
    els.readerMeta.innerHTML = [
      ...article.categories,
      `${article.wordCount} 字`,
      article.sourceFile,
    ].map(badge).join('');
    els.readerBody.innerHTML = markdownToHtml(article.markdown);
    updateReaderNav();
    document.querySelector('#reader').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateReaderNav() {
    const index = state.visible.findIndex((article) => article.id === state.currentId);
    els.prev.disabled = index <= 0;
    els.next.disabled = index === -1 || index >= state.visible.length - 1;
  }

  function moveReader(offset) {
    const index = state.visible.findIndex((article) => article.id === state.currentId);
    const next = state.visible[index + offset];
    if (next) openArticle(next.id);
  }

  function setQuickPanel(panelName) {
    els.quickToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', String(toggle.dataset.quickToggle === panelName));
    });
    els.quickPanels.forEach((panel) => {
      panel.hidden = panel.dataset.quickPanel !== panelName;
    });
  }

  function selectCategory(category, shouldScroll) {
    state.category = category;
    state.currentId = null;
    renderCategories();
    renderArticles();
    syncUrl('replace');
    if (shouldScroll) setQuickPanel('articles');
    if (shouldScroll) {
      document.querySelector('#library').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleOpen(event) {
    const card = event.target.closest('[data-open]');
    if (!card) return;
    openArticle(card.dataset.open);
  }

  function handleKeyboardOpen(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('[data-open]');
    if (!card) return;
    event.preventDefault();
    openArticle(card.dataset.open);
  }

  function bindEvents() {
    els.search.addEventListener('input', () => {
      state.query = els.search.value.trim();
      state.currentId = null;
      renderArticles();
      syncUrl('replace');
    });

    els.categories.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      selectCategory(button.dataset.category, false);
    });

    if (els.quickCategories) els.quickCategories.addEventListener('click', (event) => {
      const button = event.target.closest('[data-quick-category]');
      if (!button) return;
      selectCategory(button.dataset.quickCategory, true);
    });

    els.quickToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        setQuickPanel(toggle.dataset.quickToggle);
      });
    });

    document.addEventListener('click', handleOpen);
    document.addEventListener('keydown', handleKeyboardOpen);
    els.back.addEventListener('click', () => {
      state.currentId = null;
      syncUrl('push');
      els.reader.hidden = true;
      document.querySelector('#library').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    els.prev.addEventListener('click', () => moveReader(-1));
    els.next.addEventListener('click', () => moveReader(1));
    if (els.scrollTop) els.scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    if (els.scrollBottom) els.scrollBottom.addEventListener('click', () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      els.topbar.classList.toggle('is-compact', window.scrollY > 80);
    }, { passive: true });
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      state.category = data.categories.includes(params.get('category')) ? params.get('category') : '全部文章';
      state.query = params.get('q') || '';
      state.currentId = params.get('article');
      els.search.value = state.query;
      renderCategories();
      renderArticles();
      if (state.currentId) {
        openArticle(state.currentId);
      } else {
        els.reader.hidden = true;
      }
    });
  }

  function init() {
    els.totalCount.textContent = `${data.articles.length} 篇`;
    els.heroCount.textContent = data.articles.length;
    els.search.value = state.query;
    renderFeatured();
    renderCategories();
    renderArticles();
    setQuickPanel('articles');
    bindEvents();
    if (state.currentId) openArticle(state.currentId);
  }

  init();
})();
