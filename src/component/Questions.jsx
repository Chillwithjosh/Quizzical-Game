import {nanoid} from 'nanoid'
export default function Question (props){
    let answers = props.everything.answers

    function handleClick(answer){
        if(props.everything.checked){
            return
        }
        props.handleClickAnswer(props.id, answer)
    }

    const answerElement = answers.map(answer =>{
        let id = null
        if (props.everything.checked){
            if (props.everything.correct ==answer){
                id = 'correct'
            }else if(props.everything.selected === answer){
                id = 'incorrect'
            }else{
                id = 'not-selected'
            }

        }
        return(
            <button key={nanoid()} id={id} className={answer === props.everything.selected ? 'answer selected' : 'answer'} onClick={() =>handleClick(answer)} >{atob(answer)}</button>
        )
    })

    return(
        <div className='question-container'>
            <h3 className='question-title'>{atob(props.everything.question)}</h3>
            {answerElement}
            <div className='line'></div>
        </div>
    )

}