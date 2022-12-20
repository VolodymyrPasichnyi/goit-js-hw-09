const buttonStart = document.querySelector('button[data-start]')
const buttonStop = document.querySelector('button[data-stop]')
let interval = null

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

buttonStart.addEventListener('click',() => {
    interval = setInterval(() => {
        document.body.style.background = getRandomHexColor()
    }, 1000)
    buttonStart.disabled = true
    buttonStop.disabled = false
})

buttonStop.addEventListener('click', () => {
    clearInterval(interval)
    buttonStop.disabled = true
    buttonStart.disabled = false
})


