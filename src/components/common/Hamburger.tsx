import React, { useState } from 'react';
import './Hamburger.css'


interface HamburgerProps {
    onShow: (v:boolean)=>void
    show : boolean
}

const Hamburger:React.FC<HamburgerProps> = ({onShow,show}) => {

    // const [toggle, setToggle] = useState(true);

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        //setToggle(!toggle)
        onShow(!show)
    }


    return (
        <div className='mainNavi_btn' onClick={onClickHandler}>
            {/* <div className={show ? 'Navibar' : 'trans'}></div> */}
            <div className={'Navibar'}></div>
        </div>
    )
}

export default Hamburger