# geumsan-marble
다 같이 돌자, 금산 한 바퀴 — 금산 체험 보드게임

「다 같이 돌자, 홍성 한 바퀴」(cne-localmarble)와 같은 방식으로 만드는 금산판입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 에 배포용 파일
```

Vercel에 올릴 때는 Framework를 Vite로 두면 됩니다.

## 폴더

| 위치 | 내용 |
|---|---|
| `ART_GUIDE.md` | ChatGPT에 부탁할 그림 프롬프트, 사진 준비 안내 |
| `src/main.js`, `src/style.css` | 게임 화면과 규칙 |
| `public/regions/geumsan/board.json` | 칸 위치(지도 1536×1024 기준), 장소, 말, 안내 캐릭터 |
| `public/regions/geumsan/questions.json` | 퀴즈 (`level`: low·high·both, `places`로 장소와 연결) |
| `public/regions/geumsan/facts.json` | 쉼터·출발 칸의 "알고 있나요?" 카드 |
| `public/regions/geumsan/nicknames.json` | 추천 별명 |
| `public/regions/geumsan/art/` | 그림 (건물, 캐릭터, 말, 미니게임, 지도) |
| `public/regions/geumsan/photos/` | 사진 퀴즈용 사진과 출처 |

데이터 형식은 홍성판(`regions/hongseong/`)과 같습니다. 그림 파일이 아직 없으면 게임이 이모지로 대신 보여 주므로, 그림은 `art/`에 같은 이름으로 넣기만 하면 바로 바뀝니다.

## 규칙 (홍성판과 같음)

- 12턴, 하트 3개. 문제를 틀리거나 15초가 지나면 하트가 하나 줄어듭니다.
- 오늘의 도장 4곳(판마다 무작위)에서 문제를 맞혀 도장을 모으고 출발 칸으로 돌아오면 완주(+30점).
- 정답 +10점, 출발 칸을 지나면 +5점, 힌트 1번(틀린 보기 지우기), 금산 버스 3번(도장 장소로 바로 이동).
- 찬스 칸: 점수·버스표·하트·2칸 앞으로·깜짝 퀴즈 중 하나. 쉼터: 하트 1개 회복과 금산 이야기 카드.

## 아직 할 일

- 그림: 건물 9개, 금이 표정 4장, 산이 5장, 미니게임 그림
- 미니게임 3종(인삼 캐기, 깻잎 짝 맞추기, 위성 신호 맞추기)
- 사진 퀴즈(`type: "photo"`, `image: "photos/..."`)용 사진과 출처
- 교사 모드, 오프라인 설치(PWA)

## 금산판 구성

- 출발: 인삼축제 마당 · 쉼터: 금강변 정자 · 찬스: 인삼 씨앗 상자
- 장소: 금산인삼관, 인삼약초시장, 칠백의총, 이치대첩비, 서대산, 대둔산, 적벽강, 보석사, 금산위성센터, 추부 깻잎마을
- 안내 캐릭터: 금이, 산이 · 말: 인삼 요정, 깻잎, 금강 피라미, 위성 로봇
