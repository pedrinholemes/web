const newYearDate = new Date(`jan 1, ${new Date().getFullYear() + 1} 00:00:00`)

const nodes = {
  container: document.querySelector('.container .countdownBx .countdown'),
  day: document.querySelector('.container .countdownBx .countdown div#day'),
  hour: document.querySelector('.container .countdownBx .countdown div#hour'),
  minute: document.querySelector('.container .countdownBx .countdown div#minute'),
  second: document.querySelector('.container .countdownBx .countdown div#second'),
  year: document.querySelector(".container .countdownBx h2 span"),
  setYear: (year = new Date().getFullYear()) => {
    const yearString = String(year)
    const splitYear = yearString.split('')
    const finalYear = [splitYear[0] + splitYear[1], splitYear[2] + splitYear[3]]

    document.querySelector(".container .countdownBx h2 span").innerHTML = `${finalYear[0]}<i>${finalYear[1]}</1>`
  }
}

function format(gap = 0) {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24


  const data = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 0
  }

  data.day = Math.floor(gap / (day))
  data.hour = Math.floor((gap % (day)) / hour)
  data.minute = Math.floor((gap % (hour)) / minute)
  data.second = Math.floor((gap % (minute)) / second)

  Object.keys(data).forEach(k => {
    if (data[k] <= -1) data[k] = String(data[k] * -1)
    if (data[k] < 10) data[k] = `0${data[k]}`
  })

  return {
    second: String(data.second),
    minute: String(data.minute),
    hour: String(data.hour),
    day: String(data.day)
  }
}

function render() {
  const currDate = new Date()
  let gap = currDate.getTime() - newYearDate.getTime()
  const dateGap = format(gap)

  nodes.setYear(currDate.getFullYear())

  Object.keys(dateGap).forEach(k => {
    nodes[k].innerHTML = dateGap[k]
  })



  setTimeout(() => requestAnimationFrame(render), 1000)
}
requestAnimationFrame(render)


document.querySelector('a.optionButton.flipButton').addEventListener('click', () => document.querySelector('.container').classList.toggle('flip'))
document.querySelector('a.optionButton.invertButton').addEventListener('click', () => document.querySelector('.container').classList.toggle('invert'))
