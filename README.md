# Portfólio · Larissa Petrungaro

Site estático (HTML, CSS e JavaScript, sem framework) publicado na Vercel.

## Estrutura
- `index.html` — Home
- `cases/<case>/index.html` — Oficina Concursos, EasyMath, LM, Facilita CNH
- `sobre/index.html` — Sobre
- `404.html` — página não encontrada
- `assets/img/` — imagens em WebP · `assets/js/site.js` — tema, menu, índice do case e formulário
- `assets/larissa-petrungaro-curriculo.pdf` — currículo

## Formulário
O formulário da Home envia para o Formspree (`https://formspree.io/f/xnpdqjnb`). Para trocar, altere o `action` do `<form>` em `index.html`.

## Publicar
1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel: Add New → Project → importe o repositório (sem build, Framework “Other”).
3. Domínio: Settings → Domains → `larissapetrungaro.com.br` e `www.larissapetrungaro.com.br`; copie os registros DNS que a Vercel mostrar para o Registro.br.
