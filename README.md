# Convite Virtual — 1º Aninho da Ayla

Convite de aniversário digital e interativo para o primeiro aninho da Ayla, com tema de
jardim/floresta encantada em aquarela rosa e lilás. Feito para ser enviado pelo WhatsApp e aberto
direto no celular, com experiência de "story": telas em sequência que avançam com um toque.

**Convite publicado em:** [https://tamiresstudiorj-ai.github.io/tamiresstudiorj.ayla/]

## Como funciona

O convite tem 6 telas navegáveis:

1. **Portão do jardim** — abertura com "Toque para entrar"
2. **Convite principal** — "1º Aninho da Ayla"
3. **Data e local** — dia, horário e endereço da festa
4. **Opções** — "Como chegar" e "Sugestões de presente", com botão flutuante
   **Confirmar presença** que abre o WhatsApp com a mensagem de confirmação já preenchida
5. **Sugestões de presente** — roupas, calçados e brinquedos, com tamanhos
6. **Encerramento** — "Esperamos você!" (um novo toque volta para a primeira tela)

Detalhes da experiência:

- **Navegação**: toque/clique em qualquer ponto da tela avança; as setas ← → do teclado também
  funcionam. Links e opções clicáveis não avançam a tela.
- **Música de fundo**: piano suave em loop (`assets/audio/musica-fundo.mp3`), iniciada na primeira
  interação (navegadores bloqueiam autoplay). O botão de som no canto permite silenciar/reativar.
- **Borboletas animadas**: borboletas decorativas ao fundo e borboletas-guia que cruzam a tela a
  cada transição. As animações respeitam a preferência `prefers-reduced-motion` do aparelho.
- **Preview no WhatsApp**: meta tags Open Graph configuradas (`assets/og.jpg`) para o link exibir
  imagem e descrição ao ser compartilhado.
- **Orientação**: pensado para uso em retrato; em paisagem, um aviso pede para girar o celular.
- Há fallback via `<noscript>` que exibe todas as telas empilhadas caso o JavaScript esteja
  desabilitado.

## Estrutura de arquivos

```
convite_ayla/
├── index.html          # Estrutura das 6 telas, meta tags e Open Graph
├── css/
│   └── style.css       # Estilos, animações e responsividade
├── js/
│   └── app.js          # Navegação entre telas, borboletas e controle da música
└── assets/
    ├── fundo1..6       # Fundos em aquarela de cada tela (.webp com fallback .jpg)
    ├── borboleta.webp  # Sprite das borboletas
    ├── icone-*.webp    # Ícones das sugestões de presente
    ├── og.jpg          # Imagem do preview de link (Open Graph)
    └── audio/
        └── musica-fundo.mp3
```

Site estático puro (HTML5 + CSS3 + JavaScript vanilla), sem build e sem dependências — a única
requisição externa é a das fontes do Google Fonts.

## Rodar localmente

Basta servir a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
```

e abrir http://localhost:8000 no navegador (de preferência no modo de emulação mobile do DevTools,
já que o layout é voltado para celular).

## Publicação

Hospedado no GitHub Pages a partir do repositório
[https://tamiresstudiorj-ai.github.io/tamiresstudiorj.ayla/](https://tamiresstudiorj-ai.github.io/tamiresstudiorj.ayla/).
Qualquer push na branch `main` atualiza o site publicado.
