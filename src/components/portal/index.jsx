import {createPortal} from "react-dom";
import {Fragment} from "react";

export const Portal = (props) => {
    const { children } = props;

    return (
        <Fragment>
            {createPortal(children, document.getElementById("root"))}
        </Fragment>
    )
};