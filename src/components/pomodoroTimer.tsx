import { useState } from "react";
import { useInterval } from "../hooks/useInterval";

interface Props {
    defaultPomodoroTime: number;
};

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

    useInterval(() => {
        setMainTime(mainTime + 1);
    }, 10000);

    return <div>Olá mundo {mainTime}</div>
};