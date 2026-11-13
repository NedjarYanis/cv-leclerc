# Portfolio 3D Interactif (Three.js & React)

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black" alt="React" /></a>
  <a href="https://threejs.org"><img src="https://img.shields.io/badge/Three.js-0.183-black?logo=threedotjs&logoColor=white" alt="Three.js" /></a>
  <a href="https://docs.pmnd.rs/react-three-fiber"><img src="https://img.shields.io/badge/React_Three_Fiber-9.5-black?logo=react&logoColor=white" alt="R3F" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-12.38-black?logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://nedjaryanis.github.io/cv-leclerc/"><img src="https://img.shields.io/badge/Démo_en_ligne-Explorer_en_3D-success" alt="Démo" /></a>
</p>

<br/>

Expérience web immersive en 3D développée avec **React 19**, **Three.js** et **React Three Fiber (R3F)**. L'application propose une présentation visuelle moderne avec une caméra dynamique plongeante, un environnement volumétrique avec effets de particules (`Sparkles`), des ombres de contact réalistes et des animations fluides orchestrées par **Framer Motion**.

---

## Fonctionnalités Clés

- **Caméra Plongeante Dynamique (`PlungingCamera`)** : Transition fluide de l'espace aérien vers le plan de travail avec interpolation sphérique (`lerp`) et suivi réactif aux mouvements du curseur.
- **Scène 3D Volumétrique** :
  - Éclairage environnemental haute fidélité (`Environment`).
  - Effets atmosphériques de particules lumineuses (`Sparkles`).
  - Ombres douces au sol (`ContactShadows`).
  - Typographie 3D texturée dans l'espace (`@react-three/drei Text`).
- **Composants d'Interface Réactifs** : Panneaux d'information en superposition HTML (`Html` component de Drei) préservant l'accessibilité tout en étant ancrés dans le monde 3D.
- **Styling Moderne** : Intégration de la toute nouvelle version de **Tailwind CSS v4** via le plugin officiel Vite.

---

## Démo en Ligne

Le projet est hébergé et accessible directement sur GitHub Pages :  
**[https://nedjaryanis.github.io/cv-leclerc/](https://nedjaryanis.github.io/cv-leclerc/)**

---

## Architecture Technique

```text
src/
├── App.jsx             # Scène 3D principale (Canvas, caméras, lumières, contrôles interactifs)
├── App.css             # Styles personnalisés et animations CSS
├── index.css           # Configuration Tailwind CSS v4
├── main.jsx            # Point d'entrée React 19
└── assets/             # Icônes SVG et textures graphiques
```

---

## Installation & Démarrage en Local

### Prérequis
- [Node.js](https://nodejs.org/) version 18+

### 1. Cloner le dépôt
```bash
git clone https://github.com/NedjarYanis/cv-leclerc.git
cd cv-leclerc
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur Vite
```bash
npm run dev
```
L'application démarre instantanément en local sur `http://localhost:5173`.

### 4. Build de production & Déploiement
```bash
# Compiler le build optimisé
npm run build

# Déployer sur GitHub Pages
npm run deploy
```

---

<div align="center">
  <sub>Développé par Yanis Nedjar</sub>
</div>
