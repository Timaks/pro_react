import React from "react";
import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        //добавляем два класса через пробел // onClick={() => setVisible(false)}> - закрытие мод.окна наж на экран
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* убираем всплытие при нажатие на экран stopPropagation*/}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;