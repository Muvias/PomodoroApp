interface Props {
    text: string;
    onclick?: () => void;
    classname?: string;
};

export function Button(props: Props): JSX.Element {
    return (
        <button onClick={props.onclick} className={props.classname}>
            {props.text}
        </button>
    );
};