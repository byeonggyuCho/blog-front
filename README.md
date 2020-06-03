## ReadMe

## intro
react와 typescript 기반의 블로그


## skill

### react
- styled Component로 css모듈화
- hooks기반의 함수형 컴포넌트로 상태관리
- 렌더링 최적화를 위한 컴포넌트 분리


## redux
- saga를 이용한 비동기처리
- router middlerware를 이용한 리다렉션 처리.
```js
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout, ()=>{
  storage.remove('user')
})
```

### typescript
- redux reducer, 컴포넌트 props, 서버api에 타입 체크 적용.


### 최적화
- PureComponent와 React.memo를 이용한 렌터링 최적화.


### etc.
- JWT을 이용한 로그인처리
- sementic-UI와 styled component로 디자인.
- toast editor작용.


## 참고
1. 벨로그
    - [velog](https://velog.io/@_uchanlee/Semantic-UI%EC%8B%9C%EB%A7%A8%ED%8B%B1-UI-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
        - 포스트 쓰기
    - [참고](https://blog.woolta.com/)
2. react-editor
    - [참고](https://github.com/nhn/tui.editor/tree/master/apps/react-editor)
3. sementic-UI
    - [참고](https://react.semantic-ui.com/)

- [벨로퍼트와 함께 하는 모던 리액트](https://react.vlpt.us/basic/01-concept.html)
- [벨로퍼트와 함께 하는 백엔드](https://backend-intro.vlpt.us/6/04.html)
4. JWT 
    - [참고](https://github.com/velopert/nodejs-jwt-example)
    - [참고2](https://backend-intro.vlpt.us/4/01.html)
5. d3
    - [참고](https://riptutorial.com/ko/d3-js/example/8402/%EC%A2%8C%ED%91%9C%EA%B3%84)

## TODO
    
1. 네비
    - 검색바 
      - [참고](https://blog.woolta.com/)
2. 윙배너
    - 마크다운에서 헤더로 점프하는 기능.
    - [참고](https://velog.io/@dvmflstm/RxJS-Practice)
3. 렌더링 최적화를 해야하는 부분 찾아서 적용하기.
4. jest를 이용해서 컴포넌트 단위테스트를 수행한다.
4. AWS & 도커 배포를 연습한다.
5. 빌드 배포 프로세스 구축.
