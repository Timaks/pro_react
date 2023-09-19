import React from "react";
import classes from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
    return(
        //передаем пропсы внутрь компонента
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    )
}

export default MyButton;