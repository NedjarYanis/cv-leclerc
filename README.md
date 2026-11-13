# Portfolio 3D Interactif (Three.js & React)

<div align="center">
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
  [![React Three Fiber](https://img.shields.io/badge/R3F-9.5-black?logo=react&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![Demo en ligne](https://img.shields.io/badge/D%C3%A9mo-Explorer_en_3D-success)](https://nedjaryanis.github.io/cv-leclerc/)
</div>

<br/>

Exp?rience web immersive en 3D d?velopp?e avec **React 19**, **Three.js** et **React Three Fiber (R3F)**. L'application propose une pr?sentation visuelle moderne avec une cam?ra dynamique plongeante, un environnement volum?trique avec effets de particules (`Sparkles`), des ombres de contact r?alistes et des animations fluides orchestr?es par **Framer Motion**.

---

## Fonctionnalit?s Cl?s

- **Cam?ra Plongeante Dynamique (`PlungingCamera`)** : Transition fluide de l'espace a?rien vers le plan de travail avec interpolation sph?rique (`lerp`) et suivi r?actif aux mouvements du curseur.
- **Sc?ne 3D Volum?trique** :
  - ?clairage environnemental haute fid?lit? (`Environment`).
  - Effets atmosph?riques de particules lumineuses (`Sparkles`).
  - Ombres douces au sol (`ContactShadows`).
  - Typographie 3D textur?e dans l'espace (`@react-three/drei Text`).
- **Composants d'Interface R?actifs** : Panneaux d'information en superposition HTML (`Html` component de Drei) pr?servant l'accessibilit? tout en ?tant ancr?s dans le monde 3D.
- **Styling Moderne** : Int?gration de la toute nouvelle version de **Tailwind CSS v4** via le plugin officiel Vite.

---

## D?mo en Ligne

Le projet est h?berg? et accessible directement sur GitHub Pages :  
**[https://nedjaryanis.github.io/cv-leclerc/](https://nedjaryanis.github.io/cv-leclerc/)**

---

## Architecture Technique

```text
src/
??? App.jsx             # Sc?ne 3D principale (Canvas, cam?ras, lumi?res, contr?les interactifs)
??? App.css             # Styles personnalis?s et animations CSS
??? index.css           # Configuration Tailwind CSS v4
??? main.jsx            # Point d'entr?e React 19
??? assets/             # Ic?nes SVG et textures graphiques
```

---

## Installation & D?marrage en Local

### Pr?requis
- [Node.js](https://nodejs.org/) version 18+

### 1. Cloner le d?p?t
```bash
git clone https://github.com/NedjarYanis/cv-leclerc.git
cd cv-leclerc
```

### 2. Installer les d?pendances
```bash
npm install
```

### 3. Lancer le serveur Vite
```bash
npm run dev
```
L'application d?marre instantan?ment en local sur `http://localhost:5173`.

### 4. Build de production & D?ploiement
```bash
# Compiler le build optimis?
npm run build

# D?ployer sur GitHub Pages
npm run deploy
```

---

<div align="center">
  <sub>D?velopp? par Yanis Nedjar</sub>
</div>
