# Publicar en GitHub Pages desde macOS

El sitio es estático: no necesita Node, compilación, paquetes ni servidor. Este paquete incluye `index.html`, `styles.css` y `app.js` en la raíz de la carpeta.

## Opción rápida: GitHub CLI

1. Descarga el ZIP y, si aún no lo tienes, instala [GitHub CLI](https://cli.github.com/).
2. En Terminal, descomprime y entra a la carpeta:

```bash
cd ~/Downloads
unzip -q evento-vs-incidente-github-pages.zip
cd evento-vs-incidente
gh auth login
git init -b main
git add .
git commit -m "Publica actividad evento vs incidente"
gh repo create evento-vs-incidente --public --source=. --remote=origin --push
```

3. Activa GitHub Pages desde la terminal:

```bash
gh api --method POST "/repos/$(gh api user --jq .login)/evento-vs-incidente/pages" --input - <<'JSON'
{"source":{"branch":"main","path":"/"}}
JSON
```

4. Consulta la dirección publicada:

```bash
gh api "/repos/$(gh api user --jq .login)/evento-vs-incidente/pages" --jq .html_url
```

GitHub puede tardar unos minutos en publicar la primera versión.

## Si ya tienes un repositorio

Descomprime el ZIP, copia los archivos de `evento-vs-incidente/` a la raíz de tu clon local y ejecuta:

```bash
cd /ruta/a/tu/repositorio
git add index.html styles.css app.js README.md PUBLICAR_GITHUB_MAC.md
git commit -m "Agrega reto de eventos e incidentes"
git push
```

En GitHub, confirma que Pages sirva la rama `main` desde `/ (root)` en **Settings → Pages**.

## Si no tienes GitHub CLI

Puedes subir el contenido con Git si el repositorio remoto ya existe:

```bash
cd ~/Downloads/evento-vs-incidente
git init -b main
git add .
git commit -m "Publica actividad evento vs incidente"
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Reemplaza `USUARIO/REPOSITORIO` por la dirección de tu repositorio. Luego habilita Pages en **Settings → Pages**, seleccionando `main` y `/ (root)`.
