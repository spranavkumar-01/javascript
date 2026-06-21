// -- DATA --
let secretNumber = Math.floor(Math.random() * 100) + 1  
let attempts     = 0
let maxAttempts  = 10
let wins         = 0
let bestScore    = null
let gameOver     = false
let guessHistory = []

// -- ELEMENTS --
const guessInput   = document.getElementById("guessInput")
const submitBtn    = document.getElementById("submitBtn")
const messageBox   = document.getElementById("message")
const resetBtn     = document.getElementById("resetBtn")
const attemptsVal  = document.getElementById("attemptsVal")
const attemptsText = document.getElementById("attemptsText")
const progressBar  = document.getElementById("progressBar")
const historyPills = document.getElementById("historyPills")
const bestVal      = document.getElementById("bestVal")
const winsVal      = document.getElementById("winsVal")
const gameCard     = document.getElementById("gameCard")

// -- SOUNDS --
const AudioCtx = window.AudioContext || window.webkitAudioContext  

function playSound(type) {
    const ctx  = new AudioCtx()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    if (type === "correct") {
        osc.type = "sine"
        osc.frequency.setValueAtTime(523, ctx.currentTime)
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1)
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2)  
        gain.gain.setValueAtTime(0.3, ctx.currentTime)             
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
        osc.start()
        osc.stop(ctx.currentTime + 0.6)
    } else if (type === "wrong") {
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(200, ctx.currentTime)
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc.start()
        osc.stop(ctx.currentTime + 0.25)
    } else if (type === "gameover") {
        osc.type = "square"
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15)
        osc.frequency.setValueAtTime(100, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
        osc.start()
        osc.stop(ctx.currentTime + 0.5)
    }
}

// -- CONFETTI --
const canvas       = document.getElementById("confettiCanvas")  
const ctx2d        = canvas.getContext("2d")
let confettiPieces = []                                          
let confettiRunning = false

function launchConfetti() {                                      
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    confettiPieces = []
    const colors = ["#a78bfa","#60a5fa","#34d399","#fbbf24","#fb7185","#f472b6"]
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({                                    
            x: Math.random() * canvas.width,
            y: -10,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 4 - 2,
            swing: Math.random() * 2 - 1
        })
    }
    confettiRunning = true
    drawConfetti()
    setTimeout(() => { confettiRunning = false }, 3000)
}

function drawConfetti() {
    if (!confettiRunning) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height)      
        return
    }
    ctx2d.clearRect(0, 0, canvas.width, canvas.height)          
    confettiPieces.forEach(p => {                               
        p.y += p.speed
        p.x += p.swing
        p.angle += p.spin
        ctx2d.save()
        ctx2d.translate(p.x, p.y)
        ctx2d.rotate(p.angle * Math.PI / 180)
        ctx2d.fillStyle = p.color
        ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx2d.restore()
    })
    requestAnimationFrame(drawConfetti)                         
}

// -- HELPERS --
function setMessage(text, type) {
    messageBox.textContent = text
    messageBox.className   = "message-box " + type             
}

function triggerShake() {
    guessInput.classList.add("shake")
    guessInput.addEventListener("animationend",
        () => guessInput.classList.remove("shake"),          
        { once: true }
    )
}

function updateProgress() {
    attemptsVal.textContent  = attempts
    attemptsText.textContent = attempts + " / " + maxAttempts + " attempts"
    progressBar.style.width  = (attempts / maxAttempts * 100) + "%"
}

function addHistoryPill(guess, result) {
    const pill = document.createElement("span")
    pill.className = "pill " + result                          
    const arrow = result === "high" ? "↓" : result === "low" ? "↑" : "✓"
    pill.textContent = guess + " " + arrow
    historyPills.appendChild(pill)
}

// -- SUBMIT --
submitBtn.addEventListener("click", function () {
    if (gameOver) return

    const userGuess = Number(guessInput.value)

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        setMessage("Enter a number between 1 and 100!", "warning")
        triggerShake()
        return
    }

    attempts++
    updateProgress()
    guessInput.value = ""
    guessInput.focus()

    if (userGuess === secretNumber) {
        setMessage("🎉 Correct! The number was " + secretNumber + "!", "correct")
        addHistoryPill(userGuess, "win")                     
        playSound("correct")
        launchConfetti()                                       
        gameCard.classList.add("win-pulse")
        gameCard.addEventListener("animationend",
            () => gameCard.classList.remove("win-pulse"),
            { once: true }
        )
        wins++
        winsVal.textContent = wins
        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts
            bestVal.textContent = bestScore
        }
        submitBtn.disabled = true                              
        gameOver = true                                    

    } else if (attempts >= maxAttempts) {
        setMessage(" Game Over! The number was " + secretNumber + ".", "wrong-high")
        playSound("gameover")
        triggerShake()
        submitBtn.disabled = true
        gameOver = true

    } else if (userGuess > secretNumber) {                  
        setMessage("⬇Too High! Try lower.", "wrong-high")
        addHistoryPill(userGuess, "high")
        playSound("wrong")
        triggerShake()

    } else {
        setMessage("⬆Too Low! Try higher.", "wrong-low")
        addHistoryPill(userGuess, "low")
        playSound("wrong")
        triggerShake()
    }
})

// -- ENTER KEY --
guessInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitBtn.click()
})

// -- RESET --
resetBtn.addEventListener("click", function () {
    secretNumber = Math.floor(Math.random() * 100) + 1
    attempts     = 0
    gameOver     = false
    guessHistory = []
    submitBtn.disabled    = false
    historyPills.innerHTML = ""
    messageBox.className  = "message-box"
    messageBox.textContent = "Make your first guess!"
    updateProgress()
    guessInput.focus()
})