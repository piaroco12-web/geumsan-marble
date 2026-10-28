# 그림 프롬프트 — 「다 같이 돌자, 금산 한 바퀴」

> 각 프롬프트는 공통 스타일 문장까지 들어 있는 완성본입니다. 코드 블록 오른쪽 위의 복사 버튼(GitHub·Obsidian·VS Code 미리보기)으로 복사해 ChatGPT에 그대로 붙여 넣으세요.
> 저장 위치: `public/regions/geumsan/art/` · 파일 이름을 그대로 쓰면 게임에 바로 들어갑니다.

현재 상태: 그림 47장 중 **42장 완료**, 5장 다시 만들기, 0장 필요 (✅ 완료 · ⚠️ 다시 만들기 · ⬜ 필요)

2026-10-28 확인: `board.json`이 참조하는 그림 파일은 모두 있습니다. 다만 ⚠️ 5장은 내용이 잘못되어 다시 만들어야 합니다 → [`GPT_다시만들기.md`](GPT_다시만들기.md)

## 목차

- [0. 기준 이미지 — 가장 먼저](#base)
- [1. 지도 바탕](#map)
- [2. 장소 건물](#bld)
- [3. 안내 캐릭터 — 금이 · 산이](#char)
- [4. 플레이어 말](#piece)
- [5. 미니게임 그림](#mg)
- [6. 화면(UI) 그림](#ui)

## 체크리스트

| 상태 | 파일 | 그림 |
|---|---|---|
| ✅ | `style-anchor.png` | 기준 이미지: 금산인삼관 |
| ✅ | `map-base.png` | 지도 바탕 (건물 없이) |
| ✅ | `bld-market.png` | 금산 인삼약초시장 |
| ✅ | `bld-shrine.png` | 칠백의총 |
| ✅ | `bld-monument.png` | 이치대첩 유적 |
| ✅ | `bld-mountain.png` | 서대산 |
| ✅ | `bld-daedun.png` | 대둔산 구름다리 |
| ✅ | `bld-river.png` | 적벽강 |
| ✅ | `bld-temple.png` | 보석사 |
| ✅ | `bld-satellite.png` | 금산위성센터 |
| ✅ | `bld-village.png` | 추부 깻잎마을 |
| ✅ | `bld-start.png` | 출발: 인삼축제 마당 |
| ✅ | `bld-rest.png` | 쉼터: 금강변 정자 |
| ✅ | `bld-chance.png` | 찬스: 인삼 씨앗 상자 |
| ✅ | `char-geumi-normal.png` | 금이 기본 |
| ✅ | `char-geumi-think.png` | 금이 생각 |
| ✅ | `char-geumi-happy.png` | 금이 정답 |
| ✅ | `char-geumi-sad.png` | 금이 오답 |
| ✅ | `char-geumi-surprised.png` | 금이 시간 초과 |
| ✅ | `char-sani-normal.png` | 산이 기본 |
| ⚠️ | `char-sani-think.png` | 산이 생각 (금이 그림으로 잘못 나옴 · 다시 만들기) |
| ⚠️ | `char-sani-happy.png` | 산이 정답 (금이 그림으로 잘못 나옴 · 다시 만들기) |
| ⚠️ | `char-sani-sad.png` | 산이 오답 (금이 그림으로 잘못 나옴 · 다시 만들기) |
| ⚠️ | `char-sani-surprised.png` | 산이 시간 초과 (금이 그림으로 잘못 나옴 · 다시 만들기) |
| ✅ | `piece-ginseng.png` | 인삼 요정 |
| ✅ | `piece-perilla.png` | 깻잎 |
| ✅ | `piece-fish.png` | 금강 피라미 |
| ✅ | `piece-satellite.png` | 위성 로봇 |
| ✅ | `mg-ginseng-field.png` | 인삼 캐기: 인삼밭 배경 |
| ✅ | `mg-ginseng-root.png` | 인삼 캐기: 인삼 뿌리 |
| ✅ | `mg-card-back.png` | 짝 맞추기: 카드 뒷면 |
| ✅ | `mg-card-1.png` | 짝 맞추기: 인삼 |
| ✅ | `mg-card-2.png` | 짝 맞추기: 깻잎 |
| ✅ | `mg-card-3.png` | 짝 맞추기: 칠백의총 사당 |
| ✅ | `mg-card-4.png` | 짝 맞추기: 위성 안테나 |
| ✅ | `mg-antenna.png` | 위성 신호: 안테나 |
| ✅ | `mg-satellite.png` | 위성 신호: 위성 |
| ✅ | `mg-block.png` | 위성 신호: 산 장애물 |
| ✅ | `ui-title-bg.png` | 첫 화면 배경 |
| ✅ | `ui-bus.png` | 금산 버스 아이콘 |
| ⚠️ | `ui-heart.png` | 하트 (가득) (빈 하트와 모양이 다름 · 다시 만들기) |
| ✅ | `ui-heart-empty.png` | 하트 (빈칸) |
| ✅ | `ui-score.png` | 점수 아이콘 |
| ✅ | `ui-hint.png` | 힌트 아이콘 |
| ✅ | `ui-stamp.png` | 도장 자국 |
| ✅ | `ui-trophy.png` | 완주 트로피 |
| ✅ | `ui-paper.png` | 카드 바탕 종이 (반복 무늬) |

## 공통 스타일 문장

ChatGPT가 스타일을 잊은 것 같을 때 따로 붙여 넣으세요. (아래 프롬프트에는 이미 들어 있습니다.)

```text
[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="base"></a>

## 0. 기준 이미지 — 가장 먼저

1. **한 대화창에서 끝까지** 만드세요. 새 대화를 열면 스타일이 달라집니다.
1. 기준 이미지(`style-anchor.png`)를 확정한 뒤, 이후 모든 요청에 **그 그림을 첨부**합니다.
1. 이미 있는 그림도 더 좋게 다시 만들고 싶으면 같은 프롬프트로 다시 요청하고 같은 이름으로 덮어쓰면 됩니다.
1. 투명 배경이 안 나오면 "make the background pure white #FFFFFF"로 다시 요청하세요. 배경은 정리 도구로 지웁니다.

### ✅ 기준 이미지: 금산인삼관 — `style-anchor.png` + `bld-museum.png`

1024×1024 · 투명 배경

```text
A single miniature diorama building piece: a small museum about Korean ginseng inspired by the Geumsan Ginseng Hall in Geumsan, Korea — a warm modern building with a gently curved roof, big windows, a small ginseng field with black shade canopies beside it, and a giant cute ginseng root sculpture at the entrance. The building sits on a round grassy base disc, like a board-game tile piece. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="map"></a>

## 1. 지도 바탕

건물이 그려져 나오면 "remove all buildings, keep only the landscape"로 다시 요청하세요. 지금 칸 위치는 현재 지도에 맞춰져 있어서, 새 지도를 쓰면 칸 위치를 다시 맞춰야 합니다.

### ✅ 지도 바탕 (건물 없이) — `map-base.png`

1536×1024 (가로 3:2) · 불투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference,

create a wide isometric miniature diorama landscape of a mountainous county in a basin, shaped like a round island board on a dark wooden tabletop: one tall rocky mountain at the top (north), sharp granite peaks at the bottom-left (southwest), a clear blue river with tall red-brown cliffs winding along the right (east) side, and a wide flat town basin in the middle surrounded by rows of ginseng fields with black shade canopies and bright green perilla fields. Light sandy footpaths connect several large empty round clearings spread around the land, where game pieces will be placed later. NO buildings, no houses, no people, no text. The island fills the frame with a little dark margin around it.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="bld"></a>

## 2. 장소 건물

모두 **기준 이미지(style-anchor.png)를 첨부**하고 복사한 프롬프트를 붙여 넣으세요. 받침 크기가 같아야 게임판에서 가지런해 보입니다.

### ✅ 금산 인삼약초시장 — `bld-market.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A cozy traditional Korean herb market with a few colorful striped awning stalls, wooden baskets full of fresh ginseng roots, red boxes of red ginseng, bundles of dried medicinal herbs hanging, a tiny shopkeeper figure. No text on any sign. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 칠백의총 — `bld-shrine.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A calm, respectful Korean memorial garden: one large round grassy burial mound with a low stone fence, a small traditional Korean shrine with red pillars and a dark tiled roof, a red spirit gate (hongsalmun), a stone path and pine trees. Peaceful and dignified, not scary. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 이치대첩 유적 — `bld-monument.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A mountain pass with a tall plain stone monument standing on a turtle-shaped stone base (no carved letters visible), a few Joseon-era triangular flags without letters, pine trees and a winding path over the pass. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 서대산 — `bld-mountain.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A tall but cute rocky mountain, clearly the tallest piece on the board, with granite cliffs, pine trees, a tiny zigzag hiking trail and a small wooden observation deck on the summit. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 대둔산 구름다리 — `bld-daedun.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A cute cluster of sharp granite rock peaks connected by a small red suspension bridge high between two rocks, a tiny staircase, colorful autumn maple trees. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 적벽강 — `bld-river.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A bend of a clear blue river below tall reddish-brown rock cliffs, a small sandy beach with pebbles, a little wooden boat and a few river fish jumping. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 보석사 — `bld-temple.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A small traditional Korean Buddhist temple hall in the forest with colorful dancheong painted eaves, a stone stairway, and a huge old golden ginkgo tree beside it, bigger than the hall. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금산위성센터 — `bld-satellite.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A satellite earth station in a green valley: several large white parabolic dish antennas of different sizes pointing at the sky, one very large old dish in front, a small control building, tiny glowing signal waves. No logos. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 추부 깻잎마을 — `bld-village.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A small farming village with rows of tall green perilla plants in arched greenhouses and open fields, a little farmhouse with a tiled roof, stacked crates of fresh perilla leaves. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 출발: 인삼축제 마당 — `bld-start.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A festive open plaza with a small outdoor stage, colorful paper lanterns on strings, a big cute ginseng-root mascot statue (original design), and two little food stalls. About 20% larger than the other pieces. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 쉼터: 금강변 정자 — `bld-rest.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A small traditional Korean wooden pavilion (jeongja) by a riverbank with a bench, and a steaming pot of fish-and-ginseng porridge on a little low table. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 찬스: 인삼 씨앗 상자 — `bld-chance.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create another board-game building piece in exactly the same style, scale, camera angle, lighting, and the same size round grassy base disc as the reference.

A cute wooden treasure seed box with its lid open, overflowing with glowing golden ginseng seeds and red ginseng berries, little sparkles. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="char"></a>

## 3. 안내 캐릭터 — 금이 · 산이

> ⚠️ 산이 표정 4장(think·happy·sad·surprised)이 금이 그림으로 나왔습니다. **char-sani-normal.png(깻잎 모자 남자아이)를 첨부**하고, 프롬프트 맨 앞에 "The boy with the green perilla-leaf bucket hat, NOT the girl." 을 붙여 다시 만들어 주세요.

먼저 **기본(normal)**을 만든 뒤, 표정 그림은 **그 캐릭터의 기본 그림을 첨부**해서 요청합니다. 포즈와 옷이 바뀌면 "keep exactly the same pose and outfit"을 덧붙여 다시 요청하세요.

### ✅ 금이 기본 — `char-geumi-normal.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference,

create a cute chibi child explorer character as a small painted toy figure: a cheerful girl with a red headband decorated with a small ginseng berry, short bob hair, holding a magnifying glass, wearing a simple traditional-Korean-inspired vest. Full body, standing, facing slightly to the left, friendly smile, big round eyes. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금이 생각 — `char-geumi-think.png`

1024×1024 · 투명 배경 · 📎 `char-geumi-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: thinking, one finger on the chin, eyes looking up. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금이 정답 — `char-geumi-happy.png`

1024×1024 · 투명 배경 · 📎 `char-geumi-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: very happy and cheering with both arms up. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금이 오답 — `char-geumi-sad.png`

1024×1024 · 투명 배경 · 📎 `char-geumi-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: a little sad but still cute, shoulders down. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금이 시간 초과 — `char-geumi-surprised.png`

1024×1024 · 투명 배경 · 📎 `char-geumi-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: surprised, mouth open, hands on cheeks. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 산이 기본 — `char-sani-normal.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference,

create a cute chibi child explorer character as a small painted toy figure: a cheerful boy with a green bucket hat shaped like a perilla leaf and a small backpack with a satellite-dish keychain, wearing a simple traditional-Korean-inspired vest. Full body, standing, facing slightly to the left, friendly smile, big round eyes. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ⚠️ 산이 생각 — `char-sani-think.png`

1024×1024 · 투명 배경 · 📎 `char-sani-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: thinking, one finger on the chin, eyes looking up. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ⚠️ 산이 정답 — `char-sani-happy.png`

1024×1024 · 투명 배경 · 📎 `char-sani-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: very happy and cheering with both arms up. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ⚠️ 산이 오답 — `char-sani-sad.png`

1024×1024 · 투명 배경 · 📎 `char-sani-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: a little sad but still cute, shoulders down. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ⚠️ 산이 시간 초과 — `char-sani-surprised.png`

1024×1024 · 투명 배경 · 📎 `char-sani-normal.png` 첨부

```text
Same character as the attached image, same outfit, same proportions, same style and lighting.

Only change the expression and pose to: surprised, mouth open, hands on cheeks. Full body. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="piece"></a>

## 4. 플레이어 말

기준 이미지와 이미 만든 말 1개를 함께 첨부하면 크기가 잘 맞습니다.

### ✅ 인삼 요정 — `piece-ginseng.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a board-game player piece: a toy figure standing on a small round red (#D7392F) pedestal, same size and style as the other pieces.

The figure is a cute ginseng root character with tiny arms and legs made of roots, a few green leaves and red berries on its head, big round eyes. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 깻잎 — `piece-perilla.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a board-game player piece: a toy figure standing on a small round red (#D7392F) pedestal, same size and style as the other pieces.

The figure is a cute perilla leaf character with a jagged leaf edge, small arms and legs, rosy cheeks. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금강 피라미 — `piece-fish.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a board-game player piece: a toy figure standing on a small round red (#D7392F) pedestal, same size and style as the other pieces.

The figure is a cute small silver river minnow with pink and blue stripes, standing upright on its tail fin. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 위성 로봇 — `piece-satellite.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a board-game player piece: a toy figure standing on a small round red (#D7392F) pedestal, same size and style as the other pieces.

The figure is a cute small white robot with a dish antenna on its head and a blinking light. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="mg"></a>

## 5. 미니게임 그림

미니게임 3종(인삼 캐기 · 깻잎 짝 맞추기 · 위성 신호 맞추기)에 쓰입니다. 모두 기준 이미지를 첨부하세요.

### ✅ 인삼 캐기: 인삼밭 배경 — `mg-ginseng-field.png`

1536×1024 · 불투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A wide front view of a ginseng field: dark rich brown soil in the lower half with a neat raised soil bed, black shade canopies on wooden posts along the top, soft green hills behind. Lots of empty soil in the center. No characters.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 인삼 캐기: 인삼 뿌리 — `mg-ginseng-root.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A single whole cute ginseng root standing upright, with a plump body, many fine hair roots at the bottom, a stem with five-leaf leaves and a cluster of red berries on top. Front view. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 짝 맞추기: 카드 뒷면 — `mg-card-back.png`

1024×1024 · 불투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A flat playing-card back design filling the whole square: red and ivory traditional Korean pattern with ginseng leaves and berries in the corners and a round ginseng-leaf emblem in the center. Flat front view, no perspective, no text.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 짝 맞추기: 인삼 — `mg-card-1.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A cute fresh ginseng root with leaves and red berries, as a simple bold card illustration. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 짝 맞추기: 깻잎 — `mg-card-2.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A neat stack of fresh green perilla leaves tied with a string, as a simple bold card illustration. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 짝 맞추기: 칠백의총 사당 — `mg-card-3.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A small traditional Korean shrine gate with red pillars and a tiled roof, as a simple bold card illustration. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 짝 맞추기: 위성 안테나 — `mg-card-4.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A big white satellite dish antenna on a stand, as a simple bold card illustration. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 위성 신호: 안테나 — `mg-antenna.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A single cute white satellite dish antenna on a small square grassy tile, viewed from above at an angle, chunky toy style. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 위성 신호: 위성 — `mg-satellite.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A cute small satellite with blue solar panels and a tiny dish, smiling face optional, floating. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 위성 신호: 산 장애물 — `mg-block.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a minigame asset in exactly the same style:

A small chunky rocky hill with two pine trees on a square grassy tile, used as an obstacle block in a puzzle game. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

---

<a id="ui"></a>

## 6. 화면(UI) 그림

게임 화면의 버튼·아이콘·배경을 바꿉니다. 파일이 없으면 지금처럼 이모지로 보이고, 넣으면 바로 그림으로 바뀝니다. 아이콘은 작게 보이므로 **단순하고 굵게** 나오는지 확인하세요.

### ✅ 첫 화면 배경 — `ui-title-bg.png`

1536×1024 · 불투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference,

create a wide key-art background for the title screen of a board game: the Geumsan miniature island board seen from a low angle at the bottom of the frame with tiny ginseng fields, a red cliff river, a satellite dish and a rocky mountain, a soft warm sunrise sky above with fluffy clouds and floating ginseng leaves. Keep the CENTER and upper middle of the image calm and empty (soft sky) for the title text. No characters, no text.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 금산 버스 아이콘 — `ui-bus.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

A cute chunky little country bus, ivory and berry-red colors with a green leaf stripe, round headlights, three-quarter front view. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ⚠️ 하트 (가득) — `ui-heart.png`

512×512 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

A glossy plump red heart shaped like it is made of a red ginseng berry, with a tiny green leaf on top. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 하트 (빈칸) — `ui-heart-empty.png`

512×512 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

The same plump heart shape but empty: pale beige translucent, with a soft outline, like an empty slot. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 점수 아이콘 — `ui-score.png`

512×512 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

A shiny golden coin with an embossed ginseng leaf on its face (no letters), slightly tilted. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 힌트 아이콘 — `ui-hint.png`

512×512 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

A cute magnifying glass with a wooden handle and a small glowing ginseng leaf inside the lens. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 도장 자국 — `ui-stamp.png`

512×512 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Create a flat game UI element, front view, no 3D perspective:

a round red ink seal stamp impression like a traditional Korean seal, slightly rough ink texture at the edges, with a simple ginseng leaf symbol in the center and a double ring border. No letters. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 완주 트로피 — `ui-trophy.png`

1024×1024 · 투명 배경 · 📎 `style-anchor.png` 첨부

```text
Using the attached image as the style reference, create a game UI icon in the same toy-diorama style, but simpler and bolder so it reads clearly at small size (64px). Front view, slightly tilted, chunky and glossy.

A cute golden trophy cup topped with a golden ginseng root with leaves and red berries, on a wooden base, small sparkles. Centered, the whole object visible with a small margin, nothing cut off. Isolated on a fully transparent background (PNG with alpha channel), no floor, no backdrop.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```

### ✅ 카드 바탕 종이 (반복 무늬) — `ui-paper.png`

1024×1024 · 불투명 배경 · 📎 `style-anchor.png` 첨부

```text
Create a seamless tileable texture:

warm ivory Korean hanji paper with very subtle fibers and a few faint pressed ginseng leaves, very light and low contrast so text on top stays easy to read. Flat, evenly lit, no shadows, no vignette, no text.

[STYLE]
Style: cute miniature diorama, like a premium handmade toy model photographed on a tabletop.
Isometric 3/4 view from the front-right, camera about 35 degrees above.
Soft rounded shapes, chunky proportions, smooth clay and painted-wood texture with fine hand-painted details.
Soft warm key light from the upper-left, gentle ambient occlusion, soft contact shadow only directly under the object.
Pastel colors with these accents: ginseng ivory #E9D3A8, ginseng berry red #D7392F,
perilla leaf green #4F8A3C, Geumgang river blue #3C7FB8, red cliff rust #B5532E.
High detail, crisp clean silhouette edges, cohesive with the attached reference image.
Clean, bright, friendly, for elementary school children.
No text, no letters, no numbers, no signs with writing, no logos, no watermark.
```
