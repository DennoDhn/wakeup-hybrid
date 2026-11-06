const CACHE = 'wakeup-hybrid-v2';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith('wakeup-hybrid-') && key !== CACHE).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      if (fresh.ok) (await caches.open(CACHE)).put(req, fresh.clone());
      return fresh;
    } catch {
      return (await caches.match(req)) || (req.mode === 'navigate' ? await caches.match('./index.html') : undefined) || Response.error();
    }
  })());
});