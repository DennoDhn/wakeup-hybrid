const CACHE='wakeup-hybrid-v3-2.0.0';
const ASSETS=['./','./index.html','./style.css','./app.js','./core.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('wakeup-hybrid-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);const key=event.request.mode==='navigate'?new URL('./index.html',self.registration.scope).href:event.request;const cached=await cache.match(key);if(cached)return cached;try{return await fetch(event.request);}catch{return Response.error();}})());});
