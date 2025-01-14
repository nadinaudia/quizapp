import { useEffect, useMemo, useState } from 'react';
import {decodeHtmlEntities } from '../lib/decodeHtmlEntities'
import {ngefetchsoal} from '../lib/ngefetchsoal'
import {shuffleArray } from '../lib/shuffleArray'
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Quiz() {
    const [questions, setQuestions] = useState([])
    const [timeLeft, setTimeLeft] = useState(300)

    const router = useRouter()
useEffect(() => 
{
    const isLogin = localStorage.getItem('sudah-login')

if (isLogin !== 'true') {
    router.push('/')
}
},[])

    useEffect(() => {
       (async () => {
        const data = await ngefetchsoal()

       if (data) setQuestions(data)
       })()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        if (timeLeft <= 0) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    

    const handleAnswerClick = (selectedOption) => {
        const isCorrect = selectedOption === questions[currentQuestion].correct_answer
        
        if (isCorrect) {
            setCorrect(correct + 1);
        } else {
            setIncorrect(incorrect + 1);
        }

        setCurrentQuestion(currentQuestion + 1);
    };
    
    const options = questions.length > 0  && currentQuestion < questions.length ? [...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer] : []

    const shuffledOptions = useMemo(() => shuffleArray(options), [options.length, currentQuestion])

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    if (questions.length === 0) {
        return <></> 
    }

    if (timeLeft <= 0 || currentQuestion >= questions.length) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="bg-white/60 text-black p-8 rounded-lg text-center w-full max-w-[400px] h-full min-h-[200px]">
                    <h1 className="text-3xl font-bold">Time's up!</h1>
                    <p className="text-lg mt-4">Correct Answer: {correct}</p>
                    <p className="text-lg mt-4">Incorrect Answer: {incorrect}</p>
                    <p className="text-lg mt-4">Answered Question: {correct + incorrect}</p>
                    
                </div>
            </section>
        );
    }

    
    
  return (
    <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute left-0 h-full w-full bg-red-400">
        <img src="https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?t=st=1736442325~exp=1736445925~hmac=91b2ff2c6d69668231f31a6347a5ac93ddb51f05c6a36d145eddc9d3910a6477&w=1060" alt="Dinosaur" className='h-full w-full object-cover' />
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-black/40"></div>
        <div className="relative p-8 bg-black/50 rounded-lg border-2 border-black shadow-lg w-full max-w-[800px] h-full min-h-[400px] z-10">
            <div className="absolute top-5 right-7">
                <span className="text-white text-xl font-bold">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </div>
            <div className="absolute text-white text-xl font-bold top-5 left-7">{correct + incorrect} / {questions.length} </div>
            <h1 className="text-white text-3xl font-bold mb-6 pt-10 text-center">Quiz App</h1>
            <div>
                <h2 className="text-white text-[22px] text-center mb-4">{decodeHtmlEntities(questions[currentQuestion].question)}</h2>

                <div className="flex flex-wrap justify-center gap-3 items-center">
                    {shuffledOptions.map((option, index) => (
                        <button 
                        className="bg-white min-w-[300px] text-black p-3 rounded-lg border-2 border-black hover:bg-gray-200 transition-colors" 
                            onClick={() => handleAnswerClick(option)}
                            key={index}
                        >
                            {decodeHtmlEntities(option)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
