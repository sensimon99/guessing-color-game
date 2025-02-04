import { useState, useEffect, useRef } from "react";
import "./Game.css";

const colorSets = [
    ["#1e88e5", "#87CEEB", "#1E90FF", "#4169E1", "#4682B4", "#5F9EA0"],
    ["#008F6B", "#00A982", "#007F63", "#00A074", "#009566", "#007C5B"],
    ["#FF4900", "#F86A5E", "#F37948", "#F9ABA5", "#EF5245", "#D32A1C"],
    ["#999999", "#777777", "#292D32", "#5E6C6C", "#5F5F61", "#414144"],
    ["#EEA5D7", "#FDE0F4", "#FFB7B1", "#FAB8E5", "#FFCCEF", "#FA87D6"],
    ["#D3C575", "#EEE4A8", "#F8EA9B", "#F9F1C2", "#FBF5D3", "#FFED8A"],
    ["#228E0E", "#2BD20C", "#39FF14", "#48F328", "#50A041", "#7DDB6C"],
    ["#A31212", "#CB4919", "#DD0101", "#E62626", "#EB3F3F", "#FF0404"],
    ["#A2AA2B", "#AEB455", "#B5BF2A", "#C7CE5B", "#C9D41D", "#E0EA48"],
    ["#672249", "#AA1A6A", "#AE3E7C", "#B4558A", "#D664A4", "#FF0E94"],
];

const getRandomColorSet = (currentSetIndex) => {
    const currentSet = colorSets[currentSetIndex];
    const correctColor = currentSet[Math.floor(Math.random() * currentSet.length)];
    const shuffledColors = [...currentSet].sort(() => Math.random() - 0.5);
    return { correctColor, options: shuffledColors };
};

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [gameState, setGameState] = useState(getRandomColorSet(0));
    const [feedback, setFeedback] = useState(null);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [timer, setTimer] = useState(10);
    const timerRef = useRef(null);

    useEffect(() => {
        if (gameStarted) startTimer();
        return () => clearInterval(timerRef.current);
    }, [round, gameStarted]);

    const startTimer = () => {
        clearInterval(timerRef.current);
        setTimer(10);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    handleNextRound();
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleGuess = (color) => {
        clearInterval(timerRef.current);
        if (color === gameState.correctColor) {
            setFeedback("correct");
            setScore((prev) => prev + 10);
        } else {
            setFeedback("wrong");
        }
        setTimeout(handleNextRound, 1000);
    };

    const handleNextRound = () => {
        clearInterval(timerRef.current);
        setFeedback(null);

        if (currentSetIndex < colorSets.length - 1) {
            setCurrentSetIndex((prevIndex) => prevIndex + 1);
            setGameState(getRandomColorSet(currentSetIndex + 1));
            setRound((prev) => prev + 1);
        } else {
            alert("🎉 Game Over! Click Ok to start a New Game! Your Score: " + score);
            if (score > bestScore) {
                setBestScore(score);
            }
            resetGame();
        }
    };

    const resetGame = () => {
        setCurrentSetIndex(0);
        setGameState(getRandomColorSet(0));
        setRound(1);
        setScore(0);
        setTimer(10);
        setGameStarted(false);
    };

    return (
        <div className="game-container">
            {!gameStarted && (
                <div className="start-screen">
                    <h1 data-testid="gameInstructions">Guess the Color</h1>
                    <button className="start-button" onClick={() => setGameStarted(true)}>
                        Start Game
                    </button>
                </div>
            )}

            {gameStarted && (
                <>
                    <div className="header">
                        <div>TIME<br /><span>{timer.toFixed(2)}</span></div>
                        <div>ROUND<br /><span>{round}/10</span></div>
                        <div data-testid="score">SCORE<br /><span>{score}</span></div>
                        <div>BEST<br /><span>{bestScore}</span></div>
                    </div>

                    <div data-testid="colorBox" className={`color-display ${feedback}`}>
                        <div
                            className="color-box"
                            style={{ backgroundColor: gameState.correctColor }}
                        >
                            {feedback === "correct" || feedback === "wrong" ? (
                                <span data-testid="gameStatus">
                                    {feedback === "correct" ? "Correct!" : "Wrong Selection!"}
                                </span>
                            ) : (
                                "GUESS THE COLOR"
                            )}
                        </div>
                    </div>

                    <div data-testid="colorOption" className="options">
                        {gameState.options.map((color) => (
                            <button
                                key={color}
                                className="option"
                                style={{ backgroundColor: color }}
                                onClick={() => handleGuess(color)}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;
