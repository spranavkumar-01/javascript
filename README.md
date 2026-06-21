# 🎯 Number Guessing Game

A fun browser-based number guessing game built with plain HTML, CSS, and vanilla JavaScript.  
This is a beginner JS learning project — no frameworks, no libraries (except Bootstrap for layout).

---
Live 
https://spranavkumar-01.github.io/javascript/
---

## 🎮 How to Play

1. The game picks a secret number between **1 and 100**
2. Type your guess in the input box and click **Guess**
3. The game tells you if your guess is **Too High**, **Too Low**, or **Correct**
4. You have **10 attempts** to guess the number
5. Click **New Game** to reset and play again

---

## ✨ Features

- 🎉 **Confetti animation** on correct guess
- 🔊 **Sound effects** — win sound, wrong buzz, game over tone
- ❌ **Shake animation** on wrong guess
- 📊 **Scoreboard** — tracks attempts, best score, and total wins
- 🏷️ **Guess history pills** — shows every guess with direction arrows
- ⏱️ **Progress bar** — fills up as attempts increase
- ⌨️ **Enter key support** — no need to click the button
- 🔒 **Button locks** after win or game over

---

## 📁 Project Structure

```
number-guessing-game/
│
├── index.html       → Game layout and structure
├── style.css        → All styling and animations
├── script.js        → Game logic and interactivity
└── README.md        → You are here
```

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and elements |
| CSS3 | Styling, animations, keyframes |
| Vanilla JavaScript | Game logic, DOM manipulation, events |
| Bootstrap 5 | Base layout utility |
| Web Audio API | Sound effects (no library needed) |
| Canvas API | Confetti animation |

---

## 💡 JavaScript Concepts Used

This project was built while learning JS basics. Concepts covered:

- **Variables** (`let`, `const`) — storing game state
- **Conditionals** (`if / else if / else`) — checking guesses
- **Functions** — reusable blocks like `setMessage()`, `updateProgress()`
- **Events** (`addEventListener`) — reacting to button clicks and keypresses
- **DOM Manipulation** — grabbing elements, updating text, toggling classes
- **Guard clauses** (`return`) — stopping functions early
- **`createElement` / `appendChild`** — building HTML elements with JS
- **CSS class toggling** — shake and win-pulse animations
- **Web Audio API** — generating sounds with oscillators
- **Canvas API** — drawing and animating confetti

---

## 🚀 How to Run

No setup needed. Just:

1. Download or clone the project
2. Open `index.html` in any browser
3. Start guessing!

---

## 🐛 Bugs Fixed Along the Way

A list of real bugs caught while building this — great learning moments:

| Bug | What went wrong | Fix |
|---|---|---|
| Attempts not increasing | Typo: `atempts` vs `attempts` | Match variable names exactly |
| Scoreboard stacking | Typo: `scoeboard` class in HTML | CSS class must match HTML exactly |
| Dark background not showing | Bootstrap's `text-bg-light` on body overriding CSS | Removed Bootstrap body class |
| Card not styled | Missing `class="game-card"` wrapper div | Wrap content in the right div |
| Confetti not working | `clearReact` instead of `clearRect` | Correct Canvas API method name |
| Sound not playing | `webKitAudioContext` wrong capitalisation | Use `webkitAudioContext` |
| Pills not styled | `"pill" + result` missing space | `"pill " + result` (space matters!) |
| Wrong range for secret number | `Math.random() * 10` instead of `100` | Changed to `* 100` |

> **Lesson:** Always keep the browser Console (F12) open while coding.  
> Every bug above would show a red error pointing to the exact line.

---

## 📸 Preview

```
┌─────────────────────────────────┐
│       🎯 Guess the Number       │
│   Pick a number between 1-100   │
│                                 │
│  [Attempts]  [Best]  [Wins]     │
│     0          —        0       │
│                                 │
│  [Your guess...]    [Guess]     │
│                                 │
│   Make your first guess!        │
│                                 │
│  Progress          0/10         │
│  ▓░░░░░░░░░░░░░░░░░░░░          │
│                                 │
│  Guess history                  │
│                                 │
│       [🔄 New Game]             │
└─────────────────────────────────┘
```

---

## 👤 Author

**Seelavantula Pranav Kumar **  
Backend Python Developer | Learning JavaScript  
📍 Hyderabad, India

---

## 📝 License

This project is open source and free to use for learning purposes.
