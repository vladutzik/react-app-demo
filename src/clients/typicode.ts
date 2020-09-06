const localCache: Record<string, any> = {};

const getFromCacheOrFetch = async (url: string) => {
  if (!localCache[url]) {
    localCache[url] = fetch(url).then((res) => res.json());
  }

  return localCache[url];
};

const host = 'https://jsonplaceholder.typicode.com/';
const urlBase = new URL(host);
const getUrl = (resource: string) => new URL(resource, urlBase).toString();

const Client = {
  getPosts: async () => getFromCacheOrFetch(getUrl('posts')),
  getPost: async (id: number) => getFromCacheOrFetch(getUrl(`posts/${id}`)),
  getPostComments: async (id: number) =>
    getFromCacheOrFetch(getUrl(`posts/${id}/comments`)),
  getUsers: async () => getFromCacheOrFetch(getUrl('users')),
  getUser: async (id: number) => getFromCacheOrFetch(getUrl(`users/${id}`)),
  getUserPosts: async (id: number) =>
    getFromCacheOrFetch(getUrl(`users/${id}/posts`)),
};

export default Client;
