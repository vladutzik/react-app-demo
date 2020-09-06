export interface QueryOptions {
  embed?: string;
  expand?: string;
  offset?: string;
  limit?: string;
}

const localCache: Record<string, any> = {};

const getResponseHeaders = (res: Response) =>
  [...Array.from(res.headers.entries())].reduce(
    (col, [key, value]) => ({ ...col, [key.toLowerCase()]: value }),
    {}
  );

const getFromCacheOrFetch = async (url: string) => {
  if (!localCache[url]) {
    localCache[url] = fetch(url).then(async (res) => ({
      headers: getResponseHeaders(res),
      body: await res.json(),
    }));
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
  const mapper: Record<string, string> = {
    expand: '_expand',
    embed: '_embed',
    offset: '_start',
    limit: '_limit',
  };

  const searchParams = Object.entries(options).map(([key, value]) => {
    console.log({ key, value });
    return mapper[key] ? `${mapper[key]}=${value}` : '';
  });

  console.log(searchParams);

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
