(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tema claro/escuro, salvo no navegador
  function tema() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function aplicaTema(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('tema', t); } catch (e) {}
    document.querySelectorAll('.theme-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      b.title = t === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro';
    });
    document.querySelectorAll('.menu-theme').forEach(function (b) {
      b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      b.textContent = t === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro';
    });
  }
  aplicaTema(tema());
  document.querySelectorAll('.theme-btn, .menu-theme').forEach(function (b) {
    b.addEventListener('click', function () { aplicaTema(tema() === 'dark' ? 'light' : 'dark'); });
  });

  // Menu do mobile
  var menuBtn = document.querySelector('.menu-btn');
  var painel = document.getElementById('menu-mobile');
  function fechaMenu() {
    if (!painel || painel.hidden) return;
    painel.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu';
  }
  if (menuBtn && painel) {
    menuBtn.addEventListener('click', function () {
      var abrir = painel.hidden;
      painel.hidden = !abrir;
      menuBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      menuBtn.textContent = abrir ? 'Fechar' : 'Menu';
    });
    painel.addEventListener('click', function (e) { if (e.target.closest('a')) fechaMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { fechaMenu(); menuBtn.focus(); } });
  }

  // Cabeçalho ganha sombra ao rolar
  var header = document.querySelector('.site-header');
  // Índice do case: marca a seção visível
  var toc = Array.prototype.slice.call(document.querySelectorAll('.toc-link'));
  var secoes = toc.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var pendente = false;
  function aoRolar() {
    pendente = false;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (!toc.length) return;
    var atual = 0;
    secoes.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < 160) atual = i; });
    toc.forEach(function (a, i) { a.setAttribute('aria-current', i === atual ? 'true' : 'false'); });
  }
  window.addEventListener('scroll', function () {
    if (!pendente) { pendente = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();

  // Voltar ao topo leva o foco junto
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var skip = document.querySelector('.skip'); if (skip) skip.focus({ preventScroll: true });
    });
  });

  // Formulário de contato (Formspree)
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var botao = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.action.indexOf('SEU_CODIGO') !== -1) {
        status.hidden = false; status.className = 'form-status erro';
        status.textContent = 'O formulário ainda não está ativo. Escreva para larissapetrungaro@gmail.com.';
        return;
      }
      botao.disabled = true; botao.textContent = 'Enviando…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.hidden = false; status.className = 'form-status ok';
          status.textContent = 'Mensagem enviada. Obrigada! Respondo pelo e-mail que você informou.';
        })
        .catch(function () {
          status.hidden = false; status.className = 'form-status erro';
          status.textContent = 'Não consegui enviar agora. Tente de novo ou escreva para larissapetrungaro@gmail.com.';
        })
        .then(function () { botao.disabled = false; botao.textContent = 'Enviar mensagem'; });
    });
  }
})();
