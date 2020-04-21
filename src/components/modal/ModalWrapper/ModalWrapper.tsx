import React, { useState,useEffect } from 'react';
import sytles from './ModalWrapper.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(sytles);

interface Props {
    visible: boolean,
    children: any
}

const ModalWrapper = ({visible= false, children} : Props) => {

    const [animate, setAnimate] = useState(false);
    const [init, setInit] = useState(false);


    // 초기화 시점에 실행되면 안됩니다. (componentDidUpdate)는 최초 렌더링에 호출되면 안된다.
    // visible값이 변했을때만 실행되어야합니다.
    // useEffect을 이용해 componentDidMount와 componentDidUpdate를 분리해야한다.
    useEffect(()=>{

        // componentDidMount을 피하기 위해서.
        if(init){

            const startAnimation = () => {
                // animation 값을 true로 설정 후
                setAnimate(true)
        
                // 250ms 이후 다시 false로 설정
                setTimeout(() => {
                    setAnimate(false)
                }, 250)
            }

            startAnimation();
            return function cleanUp(){
                console.log('[ModalWrapper]  effect Clean up')
            }
        }
    },[visible ])


    // 초기시점을 잡기 위해서.
    useEffect(()=>{
        setInit(true);
    },[])



    // visible과 animate값이 둘 다 false일 때만  null을 리턴
    if(!visible && !animate) return null;  

    // 상태에 따라 애니메이션 설정
    const animation = animate && (visible ? 'enter' : 'leave');

    return (
        <div>
            <div className={cx('gray-background', animation)}/>
            <div className={cx('modal-wrapper')}>
                <div className={cx('modal', animation)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalWrapper;