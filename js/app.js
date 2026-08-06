(function () {
  var telas = Array.prototype.slice.call(document.querySelectorAll('.tela'));
  var passos = Array.prototype.slice.call(document.querySelectorAll('.passos span'));
  var atual = 0;
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function criarBorboleta(classe) {
    var b = document.createElement('span');
    b.className = 'bfly ' + (classe || '');
    b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<i class="asa asa-l"></i><i class="asa asa-r"></i>';
    return b;
  }

  var jardim = document.createElement('div');
  jardim.className = 'jardim';
  jardim.setAttribute('aria-hidden', 'true');
  jardim.appendChild(criarBorboleta());
  jardim.appendChild(criarBorboleta());
  jardim.appendChild(criarBorboleta());
  document.body.appendChild(jardim);

  var guia = criarBorboleta('guia');
  guia.style.setProperty('--sz', '52px');
  document.body.appendChild(guia);

  var companheira = criarBorboleta('guia');
  companheira.style.setProperty('--sz', '30px');
  document.body.appendChild(companheira);

  var brisa = criarBorboleta('guia');
  brisa.style.setProperty('--sz', '22px');
  document.body.appendChild(brisa);

  function voarBorboleta(el, direcao, cfg) {
    if (reduzir || !el.animate) return;
    var h = window.innerHeight;
    var w = window.innerWidth;
    var deOnde = direcao > 0 ? -70 : w + 70;
    var paraOnde = direcao > 0 ? w + 70 : -70;
    var meio = h * (cfg.altura + Math.random() * 0.18);
    var virar = direcao > 0 ? 1 : -1;
    el.animate(
      [
        { opacity: 0, transform: 'translate(' + deOnde + 'px,' + h * cfg.saida + 'px) rotate(' + 12 * virar + 'deg) scaleX(' + virar + ')' },
        { opacity: cfg.forca, offset: 0.12 },
        { transform: 'translate(' + (deOnde + (paraOnde - deOnde) * 0.45) + 'px,' + meio + 'px) rotate(' + -8 * virar + 'deg) scaleX(' + virar + ')', offset: 0.5 },
        { opacity: cfg.forca, offset: 0.85 },
        { opacity: 0, transform: 'translate(' + paraOnde + 'px,' + h * cfg.chegada + 'px) rotate(' + 6 * virar + 'deg) scaleX(' + virar + ')' }
      ],
      { duration: cfg.duracao, delay: cfg.atraso, easing: 'cubic-bezier(0.45, 0, 0.3, 1)' }
    );
  }

  function voarGuia(direcao) {
    voarBorboleta(guia, direcao, { saida: 0.55, altura: 0.28, chegada: 0.4, forca: 1, duracao: 850, atraso: 0 });
    voarBorboleta(companheira, direcao, { saida: 0.63, altura: 0.4, chegada: 0.52, forca: 0.85, duracao: 1050, atraso: 140 });
    voarBorboleta(brisa, direcao, { saida: 0.47, altura: 0.2, chegada: 0.58, forca: 0.6, duracao: 1250, atraso: 300 });
  }

  function ondularJardim(direcao) {
    if (reduzir || !jardim.animate) return;
    jardim.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(' + -14 * direcao + 'px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 900, easing: 'ease-in-out' }
    );
  }

  function mostrar(n) {
    var proximo = ((n % telas.length) + telas.length) % telas.length;
    if (proximo === atual) return;
    var direcao = n > atual || (atual === telas.length - 1 && proximo === 0) ? 1 : -1;
    atual = proximo;
    telas.forEach(function (tela, i) {
      tela.classList.toggle('is-active', i === atual);
    });
    passos.forEach(function (passo, i) {
      passo.classList.toggle('is-active', i === atual);
    });
    voarGuia(direcao);
    ondularJardim(direcao);
  }

  document.getElementById('convite').addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    if (e.target.closest('[data-parar]')) return;
    mostrar(atual + 1);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') mostrar(atual + 1);
    if (e.key === 'ArrowLeft') mostrar(atual - 1);
  });

  var musica = document.getElementById('musica-fundo');
  var botaoSom = document.getElementById('botao-som');
  var somAtivo = true;

  function tocarMusica() {
    var tentativa = musica.play();
    if (tentativa && tentativa.catch) tentativa.catch(function () {});
  }

  function atualizarBotaoSom() {
    botaoSom.classList.toggle('mudo', !somAtivo);
    botaoSom.setAttribute('aria-pressed', String(!somAtivo));
    botaoSom.setAttribute('aria-label', somAtivo ? 'Silenciar a música' : 'Ativar a música');
  }

  botaoSom.addEventListener('click', function (e) {
    e.stopPropagation();
    somAtivo = !somAtivo;
    if (somAtivo) tocarMusica();
    else musica.pause();
    atualizarBotaoSom();
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.som')) return;
    if (somAtivo && musica.paused) tocarMusica();
  }, true);

  function tentarAutoplay() {
    if (somAtivo && musica.paused) tocarMusica();
  }

  tentarAutoplay();
  musica.addEventListener('canplaythrough', tentarAutoplay, { once: true });
})();
