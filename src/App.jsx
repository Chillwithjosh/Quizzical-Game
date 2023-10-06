import React from 'react'
import './App.css'
import Question from './component/Questions'
import {nanoid} from 'nanoid'

// ` `
export default function App() {
const [correct, setCorrect] = React.useState(0)
const[checked,setChecked] = React.useState(false)
const[play,setPlay] = React.useState(false)
const[started, setStarted] = React.useState(false)
const [count, setCount] = React.useState(0)
const [num, setNum] = React.useState()
const[questions,setQuestions] = React.useState([])
const [input, setInput] = React.useState({
  personName : ''
})

const[difficulty, setDifficulty] = React.useState()
const[category, setCategory] = React.useState()

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

function start(){
  if(category && difficulty !== undefined){
    setStarted(prevStarted => !prevStarted)
  }
  
}

function handleInput(event){
  setInput(prevInput => {
    return{
      ...prevInput,
      [event.target.name] : event.target.value
    }
  })
}  

let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&encode=base64`


const handleCategory = (event) => {
  let x = event.target.id;
  
   if(x === 'television'){
      
      setCategory('14')
   }else if (x === 'music'){
    
        setCategory('12')
   }else if (x === 'sports'){
    
        setCategory('21')
   }else if (x === 'computers'){
    setCategory('18')
    
 }else if (x === 'celebrities'){
  setCategory('26')
   
 }else if (x === 'animals'){
  setCategory('27')
   
   }else if (x === 'vehicles'){
    setCategory('28')
    
   }else if (x === 'gadgets'){
    setCategory('30')
    
 }else if (x === 'science'){
  setCategory('17')
  }
 }

const handleDifficulty = (event) => {
 let x = event.target.id;
 // Using Swith Statement
  // switch(x) {
  //     case 'easyMode':
  //         console.log('easyMode');
  //         break;
  //     case 'mediumMode':
  //         console.log('mediumMode');
  //         break;
  //     case 'hardMode':
  //         console.log('hardMode');
  //         break;
  //     default:
  //         return false;
  // }

  // Using If Statement
  if(x === 'easy'){

      setDifficulty('easy')
  }else if (x === 'medium'){
    setDifficulty('medium')

  }else if (x === 'hard'){
    setDifficulty('hard')
 
  }
}


React.useEffect(()=>{
  console.log(num)
  async function getQuestion(){
    const res = await fetch (url)
    const data = await res.json()
    let container = []
    data.results.forEach(question =>{
      container.push({id:nanoid(), question:question.question, correct: question.correct_answer, selected:null, checked:false, answers:shuffleArray([...question.incorrect_answers, question.correct_answer],)})
    })
    setQuestions(container)
  }
  getQuestion()
},[started, play])



const questionElement = questions ?  questions.map(question =>{
  return(
    <Question
      key={question.id}
      everything = {question}
      id={question.id}
      handleClickAnswer={handleClickAnswer}
    />
  )
}) : []

function handleCheck(){
  let selected = true
  questions.forEach(question =>{
    if(question.selected === null){
      selected = false
      return
    }
  })
  if(!selected){
    return
  }
  setQuestions(questions => questions.map(question =>{
    return {...question, checked:true}
  }))
  setChecked(true)
  let correct = 0
  questions.forEach(question => {
    if (question.correct === question.selected){
      correct += 1
    }
  })
  setCorrect(correct)
}

function handleClickAnswer(id, answer){
  setQuestions(questions => questions.map(question =>{
    return question.id === id ? {...question, selected:answer} : question
  }))
}

function handlePlayAgain(){
  setCount(count => count + 1)
  setChecked(false)
  setPlay(prevPlay => !prevPlay)

}

return(
  // ` `
  <div className='main-container'>
    <div className='content-container'>
      {
        started ?
        <div className='start-content-container'>
          {questionElement}
          <div className='end-div'>
            {checked && <span className='score'>Your scored {correct}/5 correct answers</span>}
            <button className='check' onClick={checked ? handlePlayAgain : handleCheck }>
              {checked ? 'Play Again' : 'Check Answer'}
            </button>
          </div>
        </div>
        :
        <div className="container">
          <div className='menu'>
            <h1 className="page-title">Quizzical</h1>
            <span className="page-description">A Fun Game</span>
            <div className="line"></div>
            <p className="page-description">Choose Category</p>
            <div className="category-container">
                <button 
                onClick={event => handleCategory(event)} 
                id='television'
                className={category === '14' ? 'clicked category-button' : 'category-button'}
                >
                  Television
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='music'
                className={category === '12' ? 'clicked category-button' : 'category-button'}
                >
                Music
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='sports'
                className={category === '21' ? 'clicked category-button' : 'category-button'}
                >
                Sports
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='computers'
                className={category === '18' ? 'clicked category-button' : 'category-button'}
                >
                Computers
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='celebrities'
                className={category === '26' ? 'clicked category-button' : 'category-button'}
                >
                Celebrities
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='animals'
                className={category === '27' ? 'clicked category-button' : 'category-button'}
                >
                Animals
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='vehicles'
                className={category === '28' ? 'clicked category-button' : 'category-button'}
                >
                Vehicles
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='gadgets'
                className={category === '30' ? 'clicked category-button' : 'category-button'}
                >
                Gadgets
                </button>
                <button 
                onClick={event => handleCategory(event)} 
                id='science'
                className={category === '17' ? 'clicked category-button' : 'category-button'}
                >
                Science
                </button>
              </div>  

            <div className="line"></div>
            <p className="page-description margin">Choose level of Difficulty </p>
            <div className="button-container">
                <button 
                onClick={event => handleDifficulty(event)} 
                id='easy'
                className={difficulty === 'easy' ? 'clicked difficulty-button' : 'difficulty-button'}
                >
                Easy
                </button>
                <button 
                onClick={event => handleDifficulty(event)} 
                id='medium'
                className={difficulty === 'medium' ? 'clicked difficulty-button' : 'difficulty-button'}
                >
                Medium
                </button>
                <button 
                onClick={event => handleDifficulty(event)} 
                id='hard'
                className={difficulty === 'hard' ? 'clicked difficulty-button' : 'difficulty-button'}
                >
                Hard
                </button>
            </div>
            <button className="start-button" onClick={start}>Start Quizzical</button>
        </div>
        </div>
      }
    </div>
  </div>
  
)

}

