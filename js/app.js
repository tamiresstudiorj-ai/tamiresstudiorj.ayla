(function () {
  var telas = Array.prototype.slice.call(document.querySelectorAll('.tela'));
  var passos = Array.prototype.slice.call(document.querySelectorAll('.passos span'));
  var atual = 0;

  function mostrar(n) {
    atual = ((n % telas.length) + telas.length) % telas.length;
    telas.forEach(function (tela, i) {
      tela.classList.toggle('is-active', i === atual);
    });
    passos.forEach(function (passo, i) {
      passo.classList.toggle('is-active', i === atual);
    });
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
})();
