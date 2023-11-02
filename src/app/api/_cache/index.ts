import { LRUCache } from 'lru-cache';
import { StatefulSingleton } from '~/utils/stateful-singleton';

const cache = new StatefulSingleton<LRUCache<string, any>>('cache');
if (!cache.value) {
  cache.value = new LRUCache<string, any>({
    ttl: 3 * 60 * 60 * 1000,
    max: 100,
  });
}

export default cache.value!;
