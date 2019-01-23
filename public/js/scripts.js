const colors = document.querySelectorAll('.color')

const generateColorPalette = () => {
  const values = '0123456789ABCDEF'
  
  colors.forEach(item => {
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += values[(Math.floor(Math.random() * 16))]
    }

    item.style.backgroundColor = color
  })
}

generateColorPalette()