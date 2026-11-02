const CANONICAL_HOST = 'www.falaisedaval.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== 'https:' || url.hostname !== CANONICAL_HOST) {
      url.protocol = 'https:';
      url.host = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }
    return env.ASSETS.fetch(request);
  },
};
