import React from 'react';
import styles from 'components/common/Button/Button.scss';


import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);


// 전달받은 className onClick 등 값들이 rest안에 들어 있스빈다.
// JSX에서 ...을 사용하면 내부에 있는 값들을 props에 넣어 둡니다.
const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

interface Props {
    children?:string[] | string, 
    to?:string,
    onClick?, 
    disabled?: boolean, 
    theme?: string
}

const Button = (props: Props) => {

    const {  children, to, onClick, disabled, theme = 'default' } = props
    // to 값이 존재하면 Link를 사용하고, 그렇지 않으면 div를 사용하빈다.
    // 비활성화됭 있는 버튼일 때도 div를 사용합니다.
    const Element = (to && !disabled) ? Link : Div;

    return (
        <Element
            to={to}
            className={cx('button', theme, {disabled})}
            onClick={disabled ? () => null : onClick}
            >
            {children}
        </Element>
    )
}


export default Button;