# ChatGPT에 보낼 프롬프트 — 다시 만들 그림 5장

> ✅ 완료 (2026-10-28): 아래 5장을 다시 만들어 게임에 반영했습니다. 이 파일은 기록용으로 남겨 둡니다.

> 2026-10-28 점검 결과 다시 만들어야 하는 그림만 모았습니다. 나머지 42장은 그대로 써도 됩니다.
> 각 코드 블록을 통째로 복사해 붙여 넣으세요. 저장 위치는 `public/regions/geumsan/art/`, 파일 이름은 제목에 적힌 그대로입니다.

| 파일 | 문제 | 첨부할 그림 |
|---|---|---|
| `char-sani-think.png` | 산이(남자아이)가 아니라 금이(여자아이)로 나옴 | `char-sani-normal.png` 하나만 |
| `char-sani-happy.png` | 〃 | 〃 |
| `char-sani-sad.png` | 〃 | 〃 |
| `char-sani-surprised.png` | 〃 | 〃 |
| `ui-heart.png` | 빨간 열매 두 알 모양이라 빈 하트(`ui-heart-empty.png`)와 짝이 안 맞음 | `ui-heart-empty.png` |

## 먼저 읽어 주세요

1. **산이 4장은 금이 그림이 있던 대화에서 만들면 또 섞입니다.** ChatGPT에서 산이용 새 대화를 열고, `char-sani-normal.png` 하나만 첨부한 뒤 시작하세요. 금이 그림이나 기준 이미지는 첨부하지 않습니다.
2. 한 장 만들 때마다 **깻잎 모자·남자아이·작은 배낭**이 그대로인지 확인하고, 틀리면 아래 "고쳐 달라는 말"을 보내세요.
3. 하트는 아무 대화에서나 만들어도 됩니다. `ui-heart-empty.png`를 첨부하세요.

---

## 산이 공통 설명 (4장 모두에 들어 있음)

산이는 **초록 깻잎 모양 버킷햇을 쓴 남자아이**입니다. 빨간 머리띠·돋보기·포니테일은 금이의 것이라 넣으면 안 됩니다.

### 1. `char-sani-think.png` — 산이 생각 (문제를 낼 때)

```text
Use ONLY the attached image as the character reference. This is "Sani", a BOY.
Keep him exactly the same: the green bucket hat shaped like a perilla leaf, short dark hair under the hat, the same face, the same traditional-Korean-inspired vest and outfit, the small backpack, the same proportions, colors, toy-figure style and lighting.
Do NOT draw a girl. No red headband, no ponytail, no magnifying glass.

Change only the expression and pose: thinking, one finger on his chin, eyes looking up, a small curious smile.
Full body, standing, facing slightly to the left, same size in the frame as the reference.
Centered, the whole figure visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.
No text, no letters, no logos, no watermark.
```

### 2. `char-sani-happy.png` — 산이 정답

```text
Use ONLY the attached image as the character reference. This is "Sani", a BOY.
Keep him exactly the same: the green bucket hat shaped like a perilla leaf, short dark hair under the hat, the same face, the same traditional-Korean-inspired vest and outfit, the small backpack, the same proportions, colors, toy-figure style and lighting.
Do NOT draw a girl. No red headband, no ponytail, no magnifying glass.

Change only the expression and pose: very happy and cheering, both arms raised up, big open smile, eyes closed in joy.
Full body, standing, facing slightly to the left, same size in the frame as the reference.
Centered, the whole figure visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.
No text, no letters, no logos, no watermark.
```

### 3. `char-sani-sad.png` — 산이 오답

```text
Use ONLY the attached image as the character reference. This is "Sani", a BOY.
Keep him exactly the same: the green bucket hat shaped like a perilla leaf, short dark hair under the hat, the same face, the same traditional-Korean-inspired vest and outfit, the small backpack, the same proportions, colors, toy-figure style and lighting.
Do NOT draw a girl. No red headband, no ponytail, no magnifying glass.

Change only the expression and pose: a little sad but still cute, shoulders down, eyebrows tilted, small pout, hands together in front.
Full body, standing, facing slightly to the left, same size in the frame as the reference.
Centered, the whole figure visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.
No text, no letters, no logos, no watermark.
```

### 4. `char-sani-surprised.png` — 산이 시간 초과

```text
Use ONLY the attached image as the character reference. This is "Sani", a BOY.
Keep him exactly the same: the green bucket hat shaped like a perilla leaf, short dark hair under the hat, the same face, the same traditional-Korean-inspired vest and outfit, the small backpack, the same proportions, colors, toy-figure style and lighting.
Do NOT draw a girl. No red headband, no ponytail, no magnifying glass.

Change only the expression and pose: surprised, round eyes, mouth open in an "O", both hands on his cheeks.
Full body, standing, facing slightly to the left, same size in the frame as the reference.
Centered, the whole figure visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.
No text, no letters, no logos, no watermark.
```

### 금이로 또 나오면 보낼 말

```text
That is the wrong character. This must be the BOY from the attached image, with the green perilla-leaf bucket hat and the small backpack. Remove the red headband, the ponytail and the magnifying glass. Keep the same expression and pose you just made, and keep the transparent background.
```

---

## 5. `ui-heart.png` — 하트 (가득)

`ui-heart-empty.png`를 첨부하세요. 빈 하트와 **같은 모양·같은 금색 테두리**에 속만 빨갛게 채우는 것이 목표입니다.

```text
Use the attached image as the exact shape and style reference.
Create the FILLED version of this heart: exactly the same heart shape, the same size and position in the frame, the same thick glossy gold rim and the same lighting.
Only change the inside: fill it with glossy bright red (#D7392F) like a shiny ginseng berry, with a soft white highlight on the upper-left and a tiny green ginseng leaf at the top center.
Front view, game UI icon, chunky and bold so it reads clearly at 32px.
Centered, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel).
No text, no letters, no numbers, no logos, no watermark.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Soft rounded shapes, chunky proportions, smooth glossy painted texture.
Soft warm key light from the upper-left.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges.
Clean, bright, friendly, for elementary school children.
```

---

## 고치지 않아도 되는 것 (참고)

- `mg-card-back.png`: 둘레에 흰 여백이 있지만 게임에서 조금 확대해 가렸습니다.
- `piece-fish.png`: 다른 말보다 그림 속 여백이 많아 조금 작게 보입니다. 거슬리면 "make the fish fill more of the frame, same style" 로 다시 만들어도 됩니다.
