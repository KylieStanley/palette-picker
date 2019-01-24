const colors = document.querySelectorAll('.color')
const hexCode = document.querySelectorAll('.hex-code')
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
    project.className = projectInput.value
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
  const matchedProject = projects.find(project => project.name === projectName)

  const response = await fetch(`/api/v1/projects/${matchedProject.id}/palettes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: paletteInput.value,
      color_1: hexCode[0].innerText,
      color_2: hexCode[1].innerText,
      color_3: hexCode[2].innerText,
      color_4: hexCode[3].innerText,
      color_5: hexCode[4].innerText,
      project_id: matchedProject.id
    })
  })

  const result = await response.json()
  addPalettetoPage(result, matchedProject)
}

const addPalettetoPage = (paletteObj, matchedProject) => {
  const project = document.querySelector(`.${matchedProject.name}`)
  const addedPalette = document.createElement('div')
  addedPalette.className = 'saved-palette'
  addedPalette.innerHTML = 
    `<h5>${paletteObj.name}:</h5>
    <div class="hex-box" style="background-color:${paletteObj.color_1}"></div>
    <div class="hex-box" style="background-color:${paletteObj.color_2}"></div>
    <div class="hex-box" style="background-color:${paletteObj.color_3}"></div>
    <div class="hex-box" style="background-color:${paletteObj.color_4}"></div>
    <div class="hex-box" style="background-color:${paletteObj.color_5}"></div>`
  project.appendChild(addedPalette)
}


generateColorsBtn.addEventListener('click', generateColorPalette)
paletteContainer.addEventListener('click', toggleLock)
createProjectBtn.addEventListener('click', createProject)
addPaletteBtn.addEventListener('click', createPalette)


generateColorPalette()