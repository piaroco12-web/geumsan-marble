// 오프라인 설치용 서비스 워커
// 한 번 열어 둔 파일은 저장해 두고, 인터넷이 없어도 저장본으로 실행한다.
// 인터넷이 있으면 저장본을 먼저 보여 주고 뒤에서 새 파일로 바꿔 둔다.
const CACHE = 'geumsan-marble-v2';

// 없는 그림을 서버가 HTML 페이지로 돌려주는 경우가 있어, 그런 응답은 저장하지 않는다
function storable(url, res) {
  if (res.type === 'opaque') return true;
  if (!res.ok) return false;
  const asset = /\.(png|webp|jpe?g|svg|json)$/i.test(new URL(url).pathname);
  return !(asset && (res.headers.get('content-type') || '').includes('text/html'));
}

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 게임 화면이 보내 준 목록(그림·데이터·글꼴)을 미리 저장한다. 없는 그림은 건너뛴다.
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'precache') return;
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(
        e.data.urls.map((url) =>
          fetch(url, { mode: url.startsWith(self.location.origin) ? 'same-origin' : 'no-cors' }).then((res) => {
            if (storable(url, res)) return cache.put(url, res);
          }),
        ),
      ),
    ),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const font = /fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(url.host);
  if (!sameOrigin && !font) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const key = req.mode === 'navigate' ? '/' : req;
      const hit = await cache.match(key, { ignoreSearch: req.mode === 'navigate' });
      const fresh = fetch(req)
        .then((res) => {
          if (storable(req.url, res)) cache.put(key, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || fresh;
    }),
  );
});
