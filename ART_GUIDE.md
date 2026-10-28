# 그래픽 · 사진 준비 가이드 — 「다 같이 돌자, 금산 한 바퀴」

> 그림은 **ChatGPT 이미지 생성**으로, 사진은 담당자가 직접 준비합니다.
> 홍성판(cne-localmarble)과 **같은 규격·같은 파일 이름 규칙**을 써서 게임 코드를 고치지 않고 그림만 바꿔 끼웁니다.

---

## 0. 시작 전에 꼭 지킬 4가지

1. **한 대화창에서 끝까지** 만듭니다. 새 대화를 열면 스타일이 달라집니다.
2. 기준 이미지(`style-anchor.png`)를 먼저 확정하고, 이후 모든 요청에 **그 그림을 첨부**합니다.
3. 프롬프트 끝에 아래 `[STYLE]` 문장을 **매번 그대로** 붙입니다.
4. **그림 안에 글자·로고·간판 글씨를 넣지 않습니다.** 장소 이름은 게임 화면에서 표시합니다.

> 투명 배경이 안 나오면 "make the background pure white #FFFFFF"로 다시 요청하세요. 배경은 정리 도구로 지웁니다.

---

## 1. 공통 스타일 문장 `[STYLE]`

```
[STYLE]
Style: cute miniature diorama, like a handmade toy model on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay/painted-wood texture.
Soft warm lighting from the upper-left, gentle soft shadow on the ground.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
Clean, bright, friendly, for elementary school children.
No text, no letters, no signs with writing, no logos, no watermark.
```

---

## 2. 만들 그림 목록

| # | 파일 이름 | 내용 | 크기 | 배경 |
|---|---|---|---|---|
| 0 | `style-anchor.png` | **기준 이미지**: 금산인삼관 (확정 후 `bld-museum.png`로도 저장) | 1024×1024 | 투명 |
| 1 | `map-base.png` | 지도 바탕 (건물 없이) | 1536×1024 | 불투명 |
| 2~10 | `bld-*.png` | 장소 건물 9채 | 1024×1024 | 투명 |
| 11~13 | `bld-start.png`, `bld-rest.png`, `bld-chance.png` | 출발, 쉼터, 찬스 | 1024×1024 | 투명 |
| 14~23 | `char-geumi-*.png`, `char-sani-*.png` | 안내 캐릭터 2명 × 5장 | 1024×1024 | 투명 |
| 24~27 | `piece-*.png` | 플레이어 말 4종 | 1024×1024 | 투명 |
| 28~ | `mg-*.png` | 미니게임 그림 | 1024×1024 | 투명 |

모든 건물은 **같은 크기의 둥근 잔디 받침** 위에 올립니다. 원본 해상도 PNG로 저장해 주세요.

---

## 3. 프롬프트

### 3.0 기준 이미지 — 가장 먼저

```
A single miniature diorama building piece: a small museum about Korean ginseng
inspired by the Geumsan Ginseng Hall in Geumsan, Korea — a warm modern building
with a gently curved roof, big windows, a small ginseng field with shade
canopies beside it, and a giant cute ginseng root sculpture at the entrance.
The building sits on a round grassy base disc, like a board-game tile piece.
Centered, whole object visible, nothing cut off, transparent background.
[STYLE]
```

→ 마음에 들 때까지 다시 만들고, **확정한 그림을 이후 모든 요청에 첨부**합니다.

### 3.1 장소 건물 (기준 이미지 첨부)

공통 앞부분:
```
Using the attached image as the style reference, create another building piece
in exactly the same style, scale, camera angle, lighting, and round grassy base.
Centered, whole object visible, transparent background.
```
공통 앞부분 + 아래 설명 + `[STYLE]` 순서로 붙입니다.

| 파일 | 장소 | 건물 설명 |
|---|---|---|
| `bld-market.png` | 인삼약초시장 | A cozy traditional Korean herb market with a few colorful awning stalls, baskets full of fresh ginseng roots, red-boxed dried ginseng, bundles of medicinal herbs, no text on any sign. |
| `bld-shrine.png` | 칠백의총 | A calm, respectful memorial garden: a large round grassy burial mound, a small traditional Korean shrine with red pillars and a tiled roof, stone path and pine trees. Peaceful, not scary. |
| `bld-monument.png` | 이치대첩비 | A mountain pass with a tall stone monument on a turtle-shaped stone base, small Korean flags of the Joseon era (plain, no letters), pine trees, a winding path. |
| `bld-mountain.png` | 서대산 | A tall but cute rocky mountain, the highest peak of the board, with granite cliffs, pine trees, a tiny hiking trail and a small observation deck on top. |
| `bld-daedun.png` | 대둔산 | A cute rocky mountain with sharp granite peaks connected by a small red suspension bridge high between two rocks, autumn maple trees. |
| `bld-river.png` | 적벽강 | A bend of a clear blue river below tall reddish-brown rock cliffs, a small sandy beach, a little wooden boat and a few river fish jumping. |
| `bld-temple.png` | 보석사 | A small traditional Korean Buddhist temple in the forest with colorful dancheong eaves, a stone stairway, and a huge old golden ginkgo tree beside it. |
| `bld-satellite.png` | 금산위성센터 | A satellite earth station in a green valley: several large white parabolic dish antennas of different sizes pointing at the sky, a small control building, tiny glowing signal waves. No logos. |
| `bld-village.png` | 추부 깻잎마을 | A small farming village with rows of tall green perilla (kkaennip) plants in greenhouses and open fields, a little farmhouse, stacked boxes of perilla leaves. |
| `bld-start.png` | 출발: 인삼축제 마당 | A festive open plaza with a small outdoor stage, colorful paper lanterns, a big cute ginseng root mascot statue (original design), and food stalls. Slightly larger than other pieces. |
| `bld-rest.png` | 쉼터: 금강변 정자 | A small traditional Korean pavilion (jeongja) by a river with a bench, and a steaming pot of fish-and-ginseng porridge on a little table. |
| `bld-chance.png` | 찬스 | A cute wooden seed box overflowing with glowing ginseng seeds and red ginseng berries, on the same round base. |

### 3.2 지도 바탕 (건물 없이)

```
Using the attached image as the style reference, create a wide isometric
miniature diorama landscape of a mountainous county in a basin on a tabletop:
a tall rocky mountain at the top (north), sharp granite peaks at the
bottom-left (southwest), a blue river with red cliffs winding along the right
(east) side, and a small town basin in the middle surrounded by rows of
ginseng fields with black shade canopies and green perilla fields.
Leave plenty of empty open flat ground spread across the land where game
pieces will be placed later. NO buildings, no text.
Wide landscape format, the land fills the frame like an island board on a table.
[STYLE]
```

건물이 그려져 나오면 "remove all buildings"로 다시 요청하세요.

### 3.3 안내 캐릭터 — 금이, 산이

```
Using the attached image as the style reference, create a cute chibi child
explorer character as a small painted toy figure:
[금이: a girl with a red headband decorated with a small ginseng berry, holding a magnifying glass
 / 산이: a boy with a green bucket hat shaped like a perilla leaf and a small backpack],
wearing a simple traditional-Korean-inspired vest.
Full body, standing, facing slightly to the left, friendly smile.
Centered, transparent background.
[STYLE]
```

첫 그림이 **기본(normal)** 입니다. 기본 그림을 첨부하고 표정을 한 장씩 만듭니다.
```
Same character, same pose and outfit, only change the expression to: <아래 영어 표현>.
Transparent background.
```

| 금이 | 산이 | 표정 (영어) | 쓰는 곳 |
|---|---|---|---|
| `char-geumi-normal.png` | `char-sani-normal.png` | (첫 그림) | 오늘의 도장 안내 |
| `char-geumi-think.png` | `char-sani-think.png` | thinking with a finger on chin | 문제를 낼 때 |
| `char-geumi-happy.png` | `char-sani-happy.png` | happy and cheering | 정답 |
| `char-geumi-sad.png` | `char-sani-sad.png` | a little sad | 오답 |
| `char-geumi-surprised.png` | `char-sani-surprised.png` | surprised | 시간 초과 |

### 3.4 플레이어 말 4종

공통 앞부분:
```
Using the attached image as the style reference, create a board-game player
piece: <아래 설명> toy figure standing on a small round red (#D7392F)
pedestal. Centered, whole object visible, transparent background.
[STYLE]
```

| 파일 | 말 | 설명 |
|---|---|---|
| `piece-ginseng.png` | 인삼 요정 | a cute ginseng root character with tiny arms and legs made of roots, a few green leaves and red berries on its head, big round eyes |
| `piece-perilla.png` | 깻잎 | a cute perilla leaf character with a jagged leaf edge, small arms and legs, rosy cheeks |
| `piece-fish.png` | 금강 피라미 | a cute small silver river minnow with pink-blue stripes, standing upright on its tail fin |
| `piece-satellite.png` | 위성 로봇 | a cute small robot with a white dish antenna on its head and blinking light |

### 3.5 미니게임 그림

| 파일 | 프롬프트 (기준 이미지 첨부 + `[STYLE]`) |
|---|---|
| `mg-ginseng-field.png` | A ginseng field seen from the front with dark brown soil and black shade canopies, wide format, no characters. |
| `mg-ginseng-root.png` | A single whole cute ginseng root with many fine hair roots and leaves, front view, transparent background. |
| `mg-card-back.png` | A playing card back design with a red and ivory traditional Korean pattern with ginseng leaves, no text, front view, flat. |
| `mg-card-1~4.png` | 한 장씩: (1) a ginseng root, (2) a stack of perilla leaves, (3) a memorial shrine with red pillars, (4) a satellite dish antenna — centered, transparent background. |
| `mg-antenna.png` | A single cute white satellite dish antenna on a stand, side view, transparent background. |
| `mg-satellite.png` | A cute small satellite with solar panels floating in a pastel starry sky, transparent background. |

---

## 4. 사진 준비 (담당자)

| 분류 | 사진 |
|---|---|
| 장소 | 금산인삼관, 인삼약초시장, 칠백의총, 이치대첩비, 서대산, 대둔산 구름다리, 적벽강, 보석사, 금산위성센터 안테나, 추부 깻잎밭, 인삼밭(차광막) |
| 특산물·음식 | 수삼, 홍삼, 깻잎, 인삼어죽, 도리뱅뱅이 |
| 인물 | 조헌, 영규대사, 권율 (기념관 영정·동상 사진) |

- 가로 4:3, 가로 1200px 이상, 간판·이름이 보이지 않는 사진이 퀴즈용으로 좋습니다.
- 파일 이름은 영문 소문자 (예: `chilbaek.jpg`, `satellite-center.jpg`).
- 사용 가능한 사진: **직접 촬영**, **공공누리 제1유형**, **기관에서 허락 받은 사진**. 블로그·뉴스 사진은 허락 없이 쓰지 않습니다.
- 사진마다 출처 표를 함께 주세요.

| 파일 이름 | 무엇인가 | 출처 | 이용 조건 |
|---|---|---|---|
| chilbaek.jpg | 칠백의총 | 직접 촬영 / 금산군청 / 공공누리 | 공공누리 제1유형 등 |

---

## 5. 전달 순서

1. `style-anchor.png` (기준 이미지) → 확인 후 진행
2. 건물 12채 + 말 4종
3. 캐릭터 2명 × 5장, 미니게임 그림
4. 지도 바탕, 사진 + 출처 표

저장 위치: `public/regions/geumsan/art/` (그림), `public/regions/geumsan/photos/` (사진). 채팅으로 보내 주셔도 됩니다.
그림이 늦어도 게임은 임시 그림으로 먼저 완성하고, 도착하는 대로 바꿔 끼웁니다.
