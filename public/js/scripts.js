const colors = document.querySelectorAll('.color')
const generateColorsBtn = document.querySelector('.generate-colors')
const paletteContainer = document.querySelector('.palette')
const createProjectBtn = document.querySelector('.create-project-btn')
const paletteInput = document.querySelector('.palette-input')
const projectInput = document.querySelector('.project-input')
const projectContainer = document.querySelector('.projects-container')
const select = document.querySelector('select')

const generateColorPalette = () => {
  const values = '0123456789ABCDEF'
  
  colors.forEach(item => {
    if (item.childNodes[1].className !== 'fas fa-lock') {
      let color = '#'

      for (let i = 0; i < 6; i++) {
        color += values[(Math.floor(Math.random() * 16))]
      }

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

const createProject = () => {
  if (projectInput.value) {
    const project = document.createElement('h3')
    project.innerText = projectInput.value
    projectContainer.appendChild(project)  
    const option = document.createElement('option')
    option.value = projectInput.value
    option.innerText = projectInput.value
    select.appendChild(option)
    postProject(projectInput.value)
  }
}

const postProject = async (project) => {
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: project, palettes: []})
  })
  const result = await response.json()
}

const postPalette = async (project) => {
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: project, palettes: []})
  })
  const result = await response.json()
}


generateColorsBtn.addEventListener('click', generateColorPalette)
paletteContainer.addEventListener('click', toggleLock)
createProjectBtn.addEventListener('click', createProject)


generateColorPalette()