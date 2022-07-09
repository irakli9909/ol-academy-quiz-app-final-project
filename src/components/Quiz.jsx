import React from 'react'
import useFetch from '../helpers/useFetch'
import { useNavigate } from 'react-router-dom'
import "./Quiz.css";

function Quiz() {
    const data = useFetch()
    const navigate = useNavigate()
    const goHomePage = () => {navigate("/")}
  return (
    <div>
    <button className='button-home' onClick={goHomePage}> Go Home</button>
    
    <div className='container'>
        <div>this is question</div>
        <div>
            <div>answer 1</div>
            <div>answer 2</div>
            <div>answer 3</div>
            <div>answer 4</div>
        </div>

    </div>
    </div>
  )
}

export default Quiz
