# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Below are quick setup steps (PowerShell), where to place screenshots (desktop and mobile), examples for embedding them in this README, and a short explanation of what's visible in each screenshot.

## Setup (PowerShell)

Prerequisites
- Node.js (LTS) and npm installed

Frontend (development)

```powershell
cd frontend
npm install
npm run dev
```

The command above starts the Vite dev server (hot reload). Open the URL shown in the terminal (usually http://localhost:5173).

Backend (development)

```powershell
cd backend
npm install
node server.js
```

If your backend uses a start script in `package.json`, you can run `npm start` instead of `node server.js`.

## Where to put screenshots

Place screenshots in the frontend public folder so they are served statically and render correctly on GitHub and when the app is built.

- Recommended path: `frontend/public/screenshots/`
- Recommended filenames:
	- `desktop.png` (or `.jpg`) — a full-width desktop view
	- `mobile.png` (or `.jpg`) — a mobile / narrow viewport view

Create the folder if it doesn't exist:

```powershell
mkdir .\frontend\public\screenshots
```

Add your images to that folder and commit them to the repo.

## Example — embed screenshots in this README

Use relative paths (relative to this README file). Example Markdown:

```markdown
![Desktop screenshot](./public/screenshots/desktop.png)

![Mobile screenshot](./public/screenshots/mobile.png)
```

Tips:
- Use descriptive alt text for accessibility.
- Keep desktop screenshots around 1280×720 (or similar) and mobile screenshots at common phone sizes (e.g., 390×844) to show realistic layouts.

## What to capture (brief explanations)

- Desktop screenshot (`desktop.png`)
	- Show the app homepage with the product grid or list visible.
	- Ensure the navbar (logo, search/cart) and a couple of product cards are visible.
	- If applicable, capture a modal or product details card to show interactions.

- Mobile screenshot (`mobile.png`)
	- Show the responsive layout, stacked product cards, and mobile navigation (hamburger menu or condensed navbar).
	- Capture the checkout or cart view on mobile if you want to demonstrate the responsive checkout flow.

## Quick checklist for new contributors

- [ ] Install dependencies: `npm install` in both `frontend` and `backend` folders
- [ ] Start frontend: `npm run dev` (in `frontend`)
- [ ] Start backend: `node server.js` or `npm start` (in `backend`)
- [ ] Place screenshots in `frontend/public/screenshots` and update this README with your screenshots if desired

---

If you want, I can also add placeholder images in `frontend/public/screenshots` (small example images) and update this README to display them — tell me if you'd like that and whether you prefer PNG or JPG.

