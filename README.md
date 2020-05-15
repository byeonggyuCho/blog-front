## ReadMe



1. 드롭다운을 만들것.(햄버거 버튼)
2. 사이드 메뉴를 만들것.
3. 양식을 마크다운으로 전환할것.
4. 이미지 업로드를 구현할것.
    - 마크다운에 이미지를 업로드.
5. 번들링 프로세스에 대해서 이해할것.    
    - 
6. https
7. 소셜로그인

## 개선사항
3. 포스트 로딩속도가 살짝 느림
6. 네비게이션이 상세보기에서 이동한다. 
    - 스크롤바.


## 벤치마크
1. 벨로그
    - [velog](https://velog.io/@_uchanlee/Semantic-UI%EC%8B%9C%EB%A7%A8%ED%8B%B1-UI-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
    - [참고](https://blog.woolta.com/)


## feat
3. 로그인
    - 계정과 페스워드 암호화 전송.
    - JWT ([참고](https://github.com/velopert/nodejs-jwt-example))
        - [참고2](https://backend-intro.vlpt.us/4/01.html)
4. 네비
    - 햄버거버튼으로 카테고리 나누기.
    - 검색바 
      - [참고](https://blog.woolta.com/)
5. 윙배너
    - 마크다운에서 헤더로 점프하는 기능.
    - 왼쪽에? 오른쪽에?
    - 라우터를 적용할것.
8. saga
    - 스로틀링...
9. 헤드라인 이동 배너
    - [참고](https://velog.io/@dvmflstm/RxJS-Practice)



## TODO
1. 렌더링 최적화를 해야하는 부분 찾아서 적용하기.
4. jest를 이용해서 컴포넌트 단위테스트를 수행한다.
5. 스토리북을 이용해 컴포넌트 개발을 해본다.
6. AWS & 도커 배포를 연습한다.
7. d3를 이용한 리포팅 페이지를 만든다.
8. 빌드 배포 프로세스 구축.
9. 무한스크롤링
10. 포스팅 목록보기를 다양한 형식으로 제공하기.




## 정리
1. 사가 플로우
3. d3
- [참고](https://riptutorial.com/ko/d3-js/example/8402/%EC%A2%8C%ED%91%9C%EA%B3%84)
4. 코드 스플리트
7. redux-devtools-extension 사용법 
    - __REDUX_DEVTOOLS_EXETENSION_COMPOSE__랑 차이가 뭔지
8. 설계관점에서 생각하는 연습.
9. 리액트 디버깅툴, 리덕스 디버깅툴 도구 분석.
10. 최적화
    - onchange시 여러번 호출되는것 최적화하기.
14. 컴포넌트 설계와 구성을 어떻게 할 것인지?
16. 디버깅
    - 리덕스 디버깅툴을 이용해 Dispatch를 날리는 것
17. 배포
    - 정적파일로 만들어서 서버에 배포하는것.



# 질문

2. 라우터
    - 왜 프론트에서 라우팅 처리를 할까?
    - 어떤 차이가 있나?


## REF
- [벨로퍼트와 함께 하는 모던 리액트](https://react.vlpt.us/basic/01-concept.html)
- [벨로퍼트와 함께 하는 백엔드](https://backend-intro.vlpt.us/6/04.html)