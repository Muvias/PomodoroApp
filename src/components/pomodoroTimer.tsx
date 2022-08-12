import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/secondsToTime";
import { Button } from "./button";

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

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, timeCounting ? 1000 : null);

    useEffect(() => {
        if (working) {
            document.body.classList.add("working")
        }
        if (resting) {
            document.body.classList.remove("working")
        }
    }, [working, resting])

    function configureWork() {
        setTimeCounting(true);
        setWorking(true)
        setResting(false)
        setMainTime(props.pomodoroTime)
    };

    function configureRest(Long: boolean) {
        setTimeCounting(true);
        setWorking(false)
        setResting(true)

        if (Long) {
            setMainTime(props.longRestTime);
        } else {
            setMainTime(props.shortRestTime);
        }
    };

    return (
        <div className="pomodoro">
            <h1>You are: working</h1>
            <p className="timer">{secondsToTime(mainTime)}</p>

            <div className="controls">
                <Button text={"Começar"} onclick={() => configureWork()}/>
                <Button text={"Descanso"} onclick={() => configureRest(false)}/>
                <Button
                    classname={!working && !resting ? "hidden" : ""}
                    text={timeCounting ? "Pausar" : "Retomar"}
                    onclick={() => setTimeCounting(!timeCounting)}
                />
            </div>

            <div className="details">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
        </div>
    );
};