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

Hay nueve ilustraciones oficiales. La app muestra una sola, sin recorte, con `object-fit: contain`. El texto del resultado (título, mensaje y botón) va en HTML, no dentro de la imagen.

La ruta es `/images/dr-pandita/{edad}-{resultado}.png`:

| Edad | 0–1 correctas (INTÉNTALO) | 2–3 (VAS BIEN) | 4–5 (EXCELENTE) |
| --- | --- | --- | --- |
| Niño(a) | `public/images/dr-pandita/nino-intentalo.png` | `public/images/dr-pandita/nino-vas-bien.png` | `public/images/dr-pandita/nino-excelente.png` |
| Adolescente | `public/images/dr-pandita/adolescente-intentalo.png` | `public/images/dr-pandita/adolescente-vas-bien.png` | `public/images/dr-pandita/adolescente-excelente.png` |
| Adulto | `public/images/dr-pandita/adulto-intentalo.png` | `public/images/dr-pandita/adulto-vas-bien.png` | `public/images/dr-pandita/adulto-excelente.png` |

4 y 5 respuestas correctas usan la misma imagen `excelente`. Para sustituir una ilustración, conserva el nombre exacto del archivo. La función que arma la ruta está en `src/data/pandita.ts`.

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

`correctIndex` es `0`, `1`, `2` o `3`. El reto usa todas las preguntas del grupo, muestra «Pregunta X de N» y suma 100 puntos por acierto (máximo 100 × N). El texto de cada resultado, distinto por edad, está en `src/data/results.ts`. Con el conteo de aciertos:

- 0–1: título «¡Buen comienzo!», botón «INTENTAR OTRA VEZ», imagen `intentalo`
- 2–3: título «¡Vas muy bien!», botón «MEJORAR MI RESULTADO», imagen `vas-bien`
- 4–5: título «¡Excelente!», botón «JUGAR DE NUEVO», imagen `excelente`

## Estructura

```text
index.html
vercel.json
public/
  favicon.svg
  images/
    dr-pandita/
      nino-intentalo.png
      nino-vas-bien.png
      nino-excelente.png
      adolescente-intentalo.png
      adolescente-vas-bien.png
      adolescente-excelente.png
      adulto-intentalo.png
      adulto-vas-bien.png
      adulto-excelente.png
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

La promoción de WhatsApp vive en `src/data/cta.ts` y solo se muestra al terminar las cinco preguntas. Depende de la edad elegida al inicio, no del puntaje: menores de 12 años agendan consulta y limpieza por $650, adolescentes la valoración de ortodoncia por $999 y adultos limpieza, evaluación y pastilla reveladora por $850. Mañana y Tarde arman el mensaje con horario AM o PM; si no hay horario, el texto pide conocer los horarios disponibles.

El aspecto sigue la identidad de [Smile Alegría](https://www.smilealegria.com): Poppins y Raleway, durazno, menta y lila, botones en píldora y el logotipo del estudio.

## Contenido

Todo el texto visible está en español. El reto no guarda datos en `localStorage`, no tiene backend y no incluye analítica.
