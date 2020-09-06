interface QueryOptions {
  embed?: string;
  expand?: string;
}

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

const getSearchParams = (options?: QueryOptions) => {
  if (!options) {
    return '';
  }

  const searchParams = [];
  if (options.expand) {
    searchParams.push(`_expand=${options.expand}`);
  }
  if (options.embed) {
    searchParams.push(`_embed=${options.embed}`);
  }

  if (searchParams.length) {
    return `?${searchParams.join('&')}`;
  }

  return '';
};

const getUrlWithSearchParams = (url: string, options?: QueryOptions) =>
  getUrl(`${url}/${getSearchParams(options)}`);

const executeApiCall = (url: string, options?: QueryOptions) =>
  getFromCacheOrFetch(getUrl(getUrlWithSearchParams(url, options)));

const Client = {
  getPosts: (options = {}) => executeApiCall('posts', options),
  getPost: (id: number, options = {}) => executeApiCall(`posts/${id}`, options),
  getPostComments: (id: number, options = {}) =>
    executeApiCall(`posts/${id}/comments`, options),
  getUsers: (options = {}) => executeApiCall('users', options),
  getUser: (id: number, options = {}) => executeApiCall(`users/${id}`, options),
  getUserPosts: (id: number, options = {}) =>
    executeApiCall(`users/${id}/posts`, options),
};

export default Client;
