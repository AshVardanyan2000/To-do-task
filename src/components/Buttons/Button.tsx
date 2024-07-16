import React, {FC} from 'react';
import classes from './styles.module.scss';
import {ReactComponent as CreateIcon} from '../../assets/icons/add.svg';

interface IButton {
    title: string | JSX.Element,
    type?: 'button' | 'submit',
    className?: string,
    btnClassName?: string,
    create?: boolean,
    onClick?: () => void,
}

const Button: FC<IButton> = (
    {
        title = '', onClick = () => {
    }, className = '', btnClassName = '',
        type = 'button', create = false
    }) => {
    const btnWrapperCls = [classes.btn_wrapper, className];
    const btnCls = [classes.btn, btnClassName];

    return (
        <div className={btnWrapperCls.join(' ')}>
            <button
                type={type}
                onClick={onClick}
                className={btnCls.join(' ')}
            >
              <span>
                {title}
              </span>

                {create && <CreateIcon/>}
            </button>
        </div>
    );
};

export default Button;
