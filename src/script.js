let ideas = []
// save to local storage

class Idea {
  constructor(title, body) {
    this.title = title.value
    this.body = body.value
    this.id = Date.now()
    this.levels = ["Swill", "Plausible", "Genius"]
    this.levelsIndex = 0
  }
}

const handleIdea = (e) => {
  e.preventDefault()
  const title = document.querySelector(".title-input")
  const body = document.querySelector(".body-input")
  const idea = new Idea(title, body)
  displayIdea(idea)
  resetInputs(title, body)
  ideas.push(idea)
}

const handleSectionClick = (event) => {
  const { className } = event.target
  switch (className) {
    case "fas fa-plus":
      increaseIdeaGreatness(event)
      break
    case "fas fa-minus":
      decreaseIdeaGreatness(event)
      break
    case "delete-btn":
      deleteIdea(event)
      break
    default: return;
  }
}

const resetInputs = (title, body) => {
  title.value = ""
  body.value = ""
}

const displayIdea = (idea) => {
  const ideaDiv = document.createElement("div")
  ideaDiv.innerHTML = 
    `<h3>Title: ${idea.title}</h3>
      <p>Body: ${idea.body}</p>
      <p class="levels">Level of Greatness: ${idea.levels[idea.levelsIndex]}</p>
      <div id=${idea.id}>
        <i class="fas fa-minus"></i>
        <i class="fas fa-plus"></i>
      </div>
      <button id=${idea.id} class="delete-btn">Delete Idea</button>`
  ideaSection.insertBefore(ideaDiv, ideaSection.childNodes[0])
}

const deleteIdea = (event) => {
  ideas = ideas.filter((idea) => {
    idea.id !== parseInt(event.toElement.id)
  })
  event.target.parentNode.remove()
}

const increaseIdeaGreatness = (event) => {
  const { id } = event.target.parentNode
  ideas = ideas.map((idea) => {
    if (idea.id === parseInt(id) && idea.levelsIndex < 2) {
      idea.levelsIndex++
      displayLevelChange(idea, event)
    }
    return idea
  })
}

const decreaseIdeaGreatness = (event) => {
  const { id } = event.target.parentNode
  ideas = ideas.map((idea) => {
    if (idea.id === parseInt(id) && idea.levelsIndex > 0) {
      idea.levelsIndex--
      displayLevelChange(idea, event)
    }
    return idea
  })
}

const displayLevelChange = (idea, event) => {
  const level = event.target.parentNode.previousSibling.previousSibling
  level.innerText = `Levels of greatness: ${idea.levels[idea.levelsIndex]}`
}

const ideaSection = document.querySelector(".ideas-container")
ideaSection.addEventListener("click", handleSectionClick)

const addIdeaBtn = document.querySelector(".idea-button")
addIdeaBtn.addEventListener("click", handleIdea)
