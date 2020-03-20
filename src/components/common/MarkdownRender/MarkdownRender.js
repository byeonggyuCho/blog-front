import React, {useState, useEffect} from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';


// prism관련 코드 불러오기.
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

// 지원할 코드 형식들을 불러옵니다. 지원하고 싶은 언어가 있으면 아래 링크를 참조해서 추가하면 된다.
// http://prismjs.com/#language-list 참조
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'

const cx = classNames.bind(styles);

const MarkdownRender =  ({ markdown }) => {

    // state = {
    //     html:''
    // }

    const [html, setHtml] = useState(
        markdown 
        ? marked(markdown, {braeks: true, sanitize:true}) 
        : ''
    )

    const renderMarkdown = () => {

        //마크다운이 존재하지 않는다면 공백처리를 한다.
        if(!markdown) {
            return  setHtml('');
        }

        setHtml(marked(markdown, {
                breaks: true,   // 일반 엔터로 새 줄 입력
                // sanitize: true  // 마크다운 내부 html 무시
            })
        );
    }



    //여기서 마크다운 변환 작업을 하는 이유는 constructor함수가 서버사이드 랜더링을 할 때도 호출하기 때문이빈다ㅣ
    // componentDidMount에서 하면 웹 브라우저쪽에서만 실행하고 나중에 서버 쪽에서는 호출하지 않는다.
    /*
    constructor(props) {
        super(props);
        const { markdown } = props;

        //서버 사이드 랜더링에서도 마크다운 처리가 되도록 constructor쪽에서도 구현합니다.
        this.state = {
            html: markdown 
                    ? marked(props.markdown, {braeks: true, sanitize:true}) 
                    : ''
        }
    }
    */


    useEffect(()=>{
        //state가 바뀌면 코드 하이라이팅
        //html을 렌더링한 후에 반영되어야한다.
        Prism.highlightAll();
    },[html])


    //markdown 값이 변겨오디면 renderMardown을 호출한다.
    useEffect(()=>{
        renderMarkdown();
    },[markdown])



    /* 
    componentDidUpdate(prevProps, prevState) {
        //markdown 값이 변겨오디면 renderMardown을 호출한다.
        if(prevProps.markdown !== this.props.markdown) {
            this.renderMarkdown();
        }

        //state가 바뀌면 코드 하이라이팅
        //html을 렌더링한 후에 반영되어야한다.
        if(prevState.html !== this.state.html) {
            Prism.highlightAll();
        }
    }

    componentDidMount(){
        this.renderMarkdown();
        Prism.highlightAll();
    } */


    // React에서 html을 렌더링하려면 객체를 만들어 내부에 __html값을 설정해야합니다.
    const markup = {
        __html: html
    };

    // 그리고 dangerouslySetInnerHTLM 값에 해당 객체를 넣어주면 됩니다.
    return (
        <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
    )
}

export default MarkdownRender;