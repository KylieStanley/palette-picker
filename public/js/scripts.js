const colors = document.querySelectorAll('.color')
const generateColorsBtn = document.querySelector('.generate-colors')
const paletteContainer = document.querySelector('.palette')
const createProjectBtn = document.querySelector('.create-project-btn')
const addPaletteBtn = document.querySelector('.add-palette-btn')
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
    option.innerText = projectInput.value
    select.appendChild(option)
    postProject(projectInput.value)
  }
}

const createPalette = (e) => {
  e.preventDefault()
  const projectName = select.options[select.selectedIndex].value
  postPalette(projectName)
}

const getAllProjects = async () => {
  const response = await fetch('/api/v1/projects')
  const projects = await response.json()
  return projects;
}

const postProject = async (project) => {
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: project })
  })
  const result = await response.json()
}

const postPalette = async (projectName) => {
  const projects = await getAllProjects()
  console.log(projects)
  const matchedProject = projects.find(project => project.name === projectName)

  const response = await fetch(`/api/v1/projects/${matchedProject.id}/palettes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: paletteInput.value,
      color_1: colors[0].value,
      color_2: colors[1].value,
      color_3: colors[2].value,
      color_4: colors[3].value,
      color_5: colors[4].value,
      project_id: matchedProject.id
    })
  })
  
  const result = await response.json()
}


generateColorsBtn.addEventListener('click', generateColorPalette)
paletteContainer.addEventListener('click', toggleLock)
createProjectBtn.addEventListener('click', createProject)
addPaletteBtn.addEventListener('click', createPalette)


generateColorPalette()