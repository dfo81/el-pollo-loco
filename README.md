# El Pollo Loco 🐔

A browser-based 2D jump-and-run game built with vanilla JavaScript and object-oriented programming. Help **Pepe** survive a dangerous desert filled with cacti, aggressive chickens, and flying bottles — collect coins and Tabasco bottles to defeat the final boss.

🔗 **[Live Demo](https://el-pollo-loco.dieter-foos.de)**

---

## Features

- 60 FPS game loop with interval-based task scheduling
- OOP architecture with a clear class hierarchy
- Boss fight with dynamic music transition
- Collectibles: coins & Tabasco bottles
- HUD with status bars for health, coins, bottles and boss health
- Sound toggle with `localStorage` persistence
- Fullscreen mode
- Mobile support with on-screen touch controls
- Portrait mode detection — pauses the game automatically
- Multiple game states: start screen, gameplay, pause, win & lose screen

---

## Controls

| Key | Action |
|---|---|
| `←` `→` | Move left / right |
| `↑` or `Space` | Jump |
| `D` | Throw bottle |
| `P` | Pause |
| `F` | Toggle fullscreen |
| `S` | Toggle sound |

Mobile: on-screen buttons for all actions.

---

## Architecture

The project follows an object-oriented design with inheritance chains:

```
DrawableObject
  └── MovableObject
        ├── Character        (player)
        ├── Chicken          (enemy)
        ├── Chicks           (small enemy)
        ├── Boss             (final boss)
        ├── Bottle           (collectible)
        └── ThrowableObject  (thrown bottle)
```

| File | Responsibility |
|---|---|
| `world.class.js` | Central game orchestrator |
| `collision-manager.class.js` | Collision detection |
| `level.class.js` | Level data & layout |
| `keyboard.class.js` | Keyboard & touch input |
| `sounds.class.js` | Audio management |
| `status-bar.class.js` | HUD elements |
| `background.class.js` / `cloud.class.js` | Environment rendering |

---

## Getting Started

No build step required. Open `index.html` directly in any modern browser:

```bash
git clone https://github.com/dfo81/el-pollo-loco.git
cd el-pollo-loco
open index.html
```

---

## Technologies

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Author

**Dieter Foos** — [Portfolio](https://dieter-foos.de) · [GitHub](https://github.com/dfo81) · [LinkedIn](https://www.linkedin.com/in/dieter-foos-7a13a63ba/)
