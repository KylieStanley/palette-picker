const colors = document.querySelectorAll('.color')
const generateColorsBtn = document.querySelector('.generate-colors')
const paletteContainer = document.querySelector('.palette')

const generateColorPalette = () => {
  const values = '0123456789ABCDEF'
  
  colors.forEach(item => {
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += values[(Math.floor(Math.random() * 16))]
    }

    if (item.childNodes[1].className !== 'fas fa-lock') {
      item.style.backgroundColor = color
      item.childNodes[3].innerText = color 
    }
  })
}

const toggleLock = (e) => {
  if (e.target.className === 'fas fa-lock-open') {
    e.target.className = 'fas fa-lock'
  } else if (e.target.className === 'fas fa-lock') {
    e.target.className = 'fas fa-lock-open'
  }
}


generateColorsBtn.addEventListener('click', generateColorPalette)
paletteContainer.addEventListener('click', toggleLock)


generateColorPalette()