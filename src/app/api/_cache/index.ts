import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  ttl: 3 * 60 * 60 * 1000,
  max: 100,
});

export default cache;
