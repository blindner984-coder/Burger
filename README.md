# Burger

Kleine Burger-Webanwendung mit Node.js und Express.

## Projektstruktur

```text
Burger/
├── data/
│   └── menu.json
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   └── server.js
├── package.json
└── README.md
```

## Voraussetzungen

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Starten

```bash
npm start
```

Danach ist die App unter `http://localhost:3000` erreichbar.

## Entwicklungsmodus (Auto-Neustart)

```bash
npm run dev
```

## Deployment (kostenlos) mit GitHub Pages

Fuer die statische Seite ist ein Workflow in `.github/workflows/deploy-pages.yml` hinterlegt.
Bei jedem Push auf `main` wird der Inhalt aus `public/` automatisch auf GitHub Pages veroeffentlicht.

### Einmalig aktivieren

1. Repository auf GitHub oeffnen.
2. `Settings` -> `Pages`.
3. Bei `Source` `GitHub Actions` auswaehlen.
4. Einmal auf `main` pushen.

Die URL ist dann in der Regel:

`https://blindner984-coder.github.io/Burger/`

Direkter Seitenlink:

`https://blindner984-coder.github.io/Burger/burger.html#regional`

## API-Endpunkte

- `GET /api/health`: Liefert Statusinformationen.
- `GET /api/menu`: Liefert das Burger-Menue aus `data/menu.json`.
- `POST /api/order`: Nimmt eine einfache Bestellung entgegen.

Beispiel fuer `POST /api/order`:

```json
{
	"items": [
		{ "id": "classic", "qty": 2 }
	]
}
```
