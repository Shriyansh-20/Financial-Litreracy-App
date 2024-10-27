import './Quiz.css';
import React, { useState, useRef } from 'react';
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"

/**
 * Component for rendering and managing quizzes.
 * @param {Object[]} questions - Array of objects representing quiz questions.
 * @param {Function} onGoToHomepage - Callback function to navigate to the homepage.
 */
const Quiz = ({ questions, onGoToHomepage }) => {
    // State variables
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [result, setResult] = useState(false);
    const [score, setScore] = useState(0);
    const [explanation, setExplanation] = useState('');

    // Ref for options
    const optionRefs = useRef([]);

    /**
     * Check the selected answer against the correct answer.
     * @param {number} ans - The selected answer.
     */
    const checkAns = (ans) => {
        if (!lock) {
            const correctAns = questions[index].ans;
            if (ans === correctAns) {
                optionRefs.current[ans - 1].classList.add('correct');
                setScore(prev => prev + 1);
            } else {
                optionRefs.current[ans - 1].classList.add('wrong');
                optionRefs.current[correctAns - 1].classList.add('correct');
            }
            setLock(true);
            setExplanation(questions[index].explanation);
        }
    };

    /**
     * Calculate the percentage score.
     * @returns {number} - The percentage score.
     */
    const calculatePercentage = () => {
        return (score / questions.length) * 100;
    };

    /**
     * Get a message based on the score percentage.
     * @returns {Object} - Object containing the message and image URL.
     */
    const getScoreMessage = () => {
        const percentage = calculatePercentage();
        if (percentage === 100) {
            return {
                message: "Congratulations! You scored full marks!",
                imageUrl: img1 
            };
        } else if (percentage < 50) {
            return {
                message: "You scored below 50%. Keep practicing!",
                imageUrl: img3
            };
        } else {
            return {
                message: "Well done! You scored above 50%. Keep it up!",
                imageUrl: img2 
            };
        }
    };

    /**
     * Move to the next question.
     */
    const next = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prev => prev + 1);
            setLock(false);
            setExplanation('');
            optionRefs.current.forEach(ref => {
                ref.classList.remove('wrong');
                ref.classList.remove('correct');
            });
        }
    };

    /**
     * Reset the quiz.
     */
    const reset = () => {
        setIndex(0);
        setScore(0);
        setResult(false);
        setLock(false);
        setExplanation(''); 
    };

    // Get score message and image URL
    const { message, imageUrl } = getScoreMessage();

    return (
        <div className='container'>
            {result ? (
                <>
                    <h2 className="text-center">You Scored {score} out of {questions.length}</h2>
                    <h2 className="text-center">{message}</h2>
                    <img src={imageUrl} alt="Score Image" className="mx-auto" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <button onClick={reset} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Reset</button>
                            <button onClick={onGoToHomepage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Take another quiz</button>
                    </div>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="30" height="30" onClick={onGoToHomepage}>
                        <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
                    </svg>
                    <h2 className="text-center">{index + 1}.{questions[index].question}</h2>
                    <ul>
                        <li ref={el => (optionRefs.current[0] = el)} onClick={() => checkAns(1)} className="option">{questions[index].option1}</li>
                        <li ref={el => (optionRefs.current[1] = el)} onClick={() => checkAns(2)} className="option">{questions[index].option2}</li>
                        <li ref={el => (optionRefs.current[2] = el)} onClick={() => checkAns(3)} className="option">{questions[index].option3}</li>
                        <li ref={el => (optionRefs.current[3] = el)} onClick={() => checkAns(4)} className="option">{questions[index].option4}</li>
                    </ul>
                    {lock && explanation && (
                        <div>
                            <h3 className="explanation-label">Explanation:</h3>
                            <p className="explanation">{explanation}</p>
                        </div>
                    )}

                    <button onClick={next} className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Next</button>
                    <div className='index text-center'>{index + 1} out of {questions.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
