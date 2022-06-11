const UrlParser = {
  activeUrl() {
    const url = this._url();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  activeUrlSplitter() {
    const url = this._url();
    return this._urlSplitter(url);
  },

  _url() {
    return window.location.hash.slice(1).toLowerCase();
  },

  _urlSplitter(url) {
    const querySplits = url.split('?');
    const sourceSplits = querySplits[0].split('/');

    return ({
      fragment: sourceSplits[0],
      source: sourceSplits[1],
      id: sourceSplits[2],
      query: querySplits[1],
    });
  },

  _urlCombiner(splitedUrl) {
    return (
      (splitedUrl.source ? `/${splitedUrl.source}` : '/')
      + (splitedUrl.id ? '/:id' : '')
    );
  },

};

export default UrlParser;