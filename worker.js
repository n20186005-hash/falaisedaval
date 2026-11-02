const CANONICAL_HOST = 'www.falaisedaval.com';
const BRANCH_PREVIEW_HOST = 'seo-falaisedaval-visitor-safety-falaisedaval.i080465.workers.dev';
const VERSION_PREVIEW_HOST = /^[a-f0-9]{8}-falaisedaval\.i080465\.workers\.dev$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (
      url.protocol === 'https:' &&
      (url.hostname === BRANCH_PREVIEW_HOST || VERSION_PREVIEW_HOST.test(url.hostname))
    ) {
      const assetResponse = await env.ASSETS.fetch(request);
      const response = new Response(assetResponse.body, assetResponse);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
    if (url.protocol !== 'https:' || url.hostname !== CANONICAL_HOST) {
      url.protocol = 'https:';
      url.host = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }
    return env.ASSETS.fetch(request);
  },
};
