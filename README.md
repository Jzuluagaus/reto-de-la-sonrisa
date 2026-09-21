# Reto de la Sonrisa

Quiz educativo de salud dental de **Smile Alegría Dental Studio** (León, Guanajuato). La persona elige una edad, responde cinco preguntas y ve un resultado con el Dr. Pandita. No hay registro, contraseña ni recolección de nombre, teléfono o correo. El avance vive solo en la memoria de la sesión.

## Correr en local

```bash
npm i && npm run dev
```

Abre la dirección que muestra Vite (por defecto `http://localhost:5173`).

Producción local:

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

El proyecto es un sitio estático de Vite.

1. Importa este repositorio en [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. No hace falta ninguna variable de entorno.

`vercel.json` ya declara el framework, el comando de build, la carpeta `dist` y encabezados básicos. También puedes publicar con la CLI:

```bash
npx vercel
```

## Imágenes del Dr. Pandita

La interfaz usa cuatro retratos. El anillo de color y la insignia **Experto en Sonrisas** los dibuja el CSS; no hace falta editar código para cambiar las fotos. Sustituye el archivo y conserva el nombre (PNG cuadrado, recomendado 720×720 o mayor):

| Resultado | Archivo | Cuándo se muestra |
| --- | --- | --- |
| Motivador | `public/dr-pandita/motivating.png` | 0–1 respuestas correctas |
| Sonriente | `public/dr-pandita/smiling.png` | 2–3 correctas, y también la portada |
| Celebrando | `public/dr-pandita/celebrating.png` | 4 correctas |
| Experto | `public/dr-pandita/expert.png` | 5 correctas |

Las rutas que carga la app están en `src/data/pandita.ts`:

- `/dr-pandita/motivating.png`
- `/dr-pandita/smiling.png`
- `/dr-pandita/celebrating.png`
- `/dr-pandita/expert.png`

`public/dr-pandita/source.png` es el recorte limpio de la foto oficial, sin filtro de color. La app no lo muestra. Sirve como base si preparas variantes nuevas. Los PNG publicados no incluyen datos EXIF ni GPS de la foto original.

## Agregar preguntas

Edita `src/data/questions.ts`. Cada grupo (`nino`, `adolescente`, `adulto`) es un arreglo de preguntas con esta forma:

```ts
{
  id: 'nino-nueva',
  prompt: '¿Texto de la pregunta?',
  options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
  correctIndex: 0,
  explanation: 'Explicación breve y positiva.',
}
```

`correctIndex` es `0`, `1`, `2` o `3`. El reto usa todas las preguntas del grupo, muestra «Pregunta X de N» y suma 100 puntos por acierto (máximo 100 × N). Con las 5 preguntas actuales, los resultados son:

- 0–1 correctas: mensaje de buen comienzo, botón «INTENTAR OTRA VEZ»
- 2–3: «MEJORAR MI RESULTADO»
- 4: «JUGAR DE NUEVO»
- 5: insignia Experto en Sonrisas y «VOLVER A JUGAR»

Si un grupo crece, se conserva esa proporción (todo correcto es experto; más de 60% celebra; más de 20% va bien; el resto es un buen comienzo).

## Estructura

```text
index.html
vercel.json
public/
  favicon.svg
  dr-pandita/
    motivating.png
    smiling.png
    celebrating.png
    expert.png
    source.png
src/
  main.tsx
  App.tsx
  index.css
  components/
    HomeScreen.tsx
    QuizScreen.tsx
    ResultsScreen.tsx
    TopNav.tsx
    Attribution.tsx
  data/
    questions.ts
    results.ts
    pandita.ts
    cta.ts
```

El enlace de WhatsApp vive en `src/data/cta.ts` y el botón solo se renderiza al terminar las cinco preguntas.

## Contenido

Todo el texto visible está en español. El reto no guarda datos en `localStorage`, no tiene backend y no incluye analítica.
