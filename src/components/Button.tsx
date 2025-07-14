import {MouseEventHandler} from "react";

export type ButtonProps = {
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

export const Button = (
    props: ButtonProps
) => {

    return (
        <button
            className="font-bold p-3 bg-blue-500 border-2 border-white rounded-2xl max-w-48 hover:bg-blue-600"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};