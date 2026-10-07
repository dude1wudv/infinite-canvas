// Retire the previous GPT Image Playground worker at the reused /image2/ entry.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key.startsWith("gpt-image-playground-")).map((key) => caches.delete(key)));
        await self.clients.claim();
        await self.registration.unregister();
    })());
});
