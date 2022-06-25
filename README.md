## tailwind css install / Doc

```
  1. npm install -D tailwindcss postcss autoprefixer
     npx tailwindcsss init -p

  2. vscode -> extensions
  tailwind css intellisense install  <- auto color / 자동 완성

  3. create poscss.config + tailwind.config.js
     ex) content: [
        "./pages/**/*.{js,jsx,ts,tsx}" <- ** All folders / * All files
     ]
  4. styles/globals.css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

## Learn

Tailwind
모든 클래스 네임이 모바일에 우선 적용 그 다음 큰 화면을 위한 선택자가 있음
3.0 에서는 Just in time 으로 엄청 큰 css 파일이 아님.
클래스 생성 하면 컴파일러가 그걸 찾아서 원하는 클래스로 바로 생성

className

    border-dashed <- 점선
    shadow-xl <- 그림자,사이즈
    fonet-semibold <- 폰트 사이즈
    w-2/4 <- width 50%
    overflow-hidden
    relative <- position: relative
    focus:text-red-500
    ring-2 ring-offset-1 <- 링 생성
    aspect-square <- 정확한 사각형 생성 aspect-radiol 1/1;
    transition-colors <- 컬러 말고도 다른 요소 있음.
    first:bg-blue-50
    invalid:bg-red-500 <- form 경우 입력 되면 보이던 빨간색 사라짐

    list-decimal <- ul 태그에서 1. 2. 3. <-  이표시를 점으로 교체
    marker:text-teal-500 <- 1. 2.3. <- 색상 변경
    first-letter <- 첫번쨰 글자 선택.

    sm- , xl- <- 화면 사이즈에 맞게 조절 @media
    xl-grid-cols-2 / xl-grid-cols-3  화면 사이즈에 맞게 col 조절
    landscape:? <- 화면 가로인지 세로인지 알수 있음

    dark:bg-black <-  다크 모드 일 경우 배경 black
    #수동으로 할려면 tailwind.config.js 추가
    darkmode: "media" <- 현재 웹 설정 따라감
    "class" <- 수동으로 설정 사용 할때 / 상위에 dark 를 꼭 넣어줘야함

```
<ul className="first:bg-blue-50 last:bg-red-50">
    <div /> <- 첫번째 요소만 blue로 변경
    <div />
    <div /> <- 마지막 요소만 red로 변경
</ul>
```

```
<div className="group">
    <div className="group-hover:bg-red-300 trnsition-colors" /> <-셀렉터 group 이밖에도 다양한 기능 있음.
    <div />
</div>
```

```
<form>
    <input className="peer"/> <- group
    <span className="peer-invalid:text-red-500"/> <- focust 되고 입력이 없으면 빨간색으로 표시.
</form>
```

```
클릭 되면 목차 보이는 기능 No JS
<details className="select-none open:text-white open:bg-indigo-400">
    <summary className="cursor-pointer">What is<summary/>
    <span>kimchi</span>
</details>
```
