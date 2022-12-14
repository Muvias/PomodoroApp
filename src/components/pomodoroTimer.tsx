import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToMinutes } from "../utils/secondsToMinutes";
import { secondsToTime } from "../utils/secondsToTime";
import { Button } from "./button";

const bellStart = require('../sounds/soundsBellStart.mp3');
const bellFinish = require('../sounds/soundsBellFinish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
};

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesManager, setCyclesManager] = useState(new Array(props.cycles - 1).fill(true));

    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);

        if (working) setFullWorkingTime(fullWorkingTime + 1);
    }, timeCounting ? 1000 : null);

    const configureWork = useCallback(() => {
            setTimeCounting(true);
            setWorking(true);
            setResting(false);
            setMainTime(props.pomodoroTime);

            audioStartWorking.play();
        }, [props.pomodoroTime]
    );

    const configureRest = useCallback((Long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);
    
            if (Long) {
                setMainTime(props.longRestTime);
            } else {
                setMainTime(props.shortRestTime);
            };
    
            audioStopWorking.play();
        }, [props.longRestTime, props.shortRestTime]
    );

    useEffect(() => {
        if (working) {
            document.body.classList.add("working")
        };

        if (resting) {
            document.body.classList.remove("working")
        };

        if (mainTime > 0) return;

        if (working && cyclesManager.length > 0) {
            configureRest(false);

            cyclesManager.pop();
        } else if(working && cyclesManager.length <= 0) {
            configureRest(true);

            setCyclesManager(new Array(props.cycles - 1).fill(true));

            setCompletedCycles(completedCycles + 1);
        };

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();

    }, [working, resting, mainTime, cyclesManager, props.cycles, completedCycles, numberOfPomodoros, configureRest, configureWork]);

    return (
        <div className="pomodoro">
            <h1>Voc?? est??: {working ? "Trabalhando" : "Descansando"}</h1>
            <p className="timer">{secondsToMinutes(mainTime)}</p>

            <div className="controls">
                <Button text={!working ? "Come??ar" : "Reiniciar"} onclick={() => configureWork()}/>
                <Button text={!resting ? "Descanso" : "Reiniciar"} onclick={() => configureRest(false)}/>
                <Button
                    classname={!working && !resting ? "hidden" : ""}
                    text={timeCounting ? "Pausar" : "Retomar"}
                    onclick={() => setTimeCounting(!timeCounting)}
                />
            </div>

            <div className="details">
                <p>Ciclos conclu??dos: {completedCycles}</p>
                <p>Pomodoros conclu??dos: {numberOfPomodoros}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
            </div>
        </div>
    );
};