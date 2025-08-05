
/**
 * window.typesenseInstantSearch.TypesenseUtils
 * 
 * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
 * @see     https://typesense.org/docs/29.0/api/search.html
 * @access  public
 */
window.typesenseInstantSearch.TypesenseUtils = window.typesenseInstantSearch.TypesenseUtils || class TypesenseUtils {

    /**
     * _lastRequest
     * 
     * @static
     * @access  protected
     * @var     null|window.typesenseInstantSearch.TypesenseSearchRequest (default null)
     */
    static _lastRequest = null;

    /**
     * _requests
     * 
     * @static
     * @access  protected
     * @var     Array (default [])
     */
    static _requests = [];

    /**
     * _abortLastRequest
     * 
     * @access  protected
     * @static
     * @return  Boolean
     */
    static _abortLastRequest() {
        if (this._lastRequest === null) {
            return false;
        }
        let request = this._lastRequest;
        this._lastRequest = null;
        request.abort();
        let index = this._requests.indexOf(request);
        if (index === -1) {
            return false;
        }
        this._requests.splice(index, 1);
        return true;
    }

    /**
     * search
     * 
     * @access  public
     * @static
     * @param   String query
     * @param   Object options (default: {})
     * @return  Promise
     */
    static search(query, options = {}) {
        this._abortLastRequest();
        let request = new window.typesenseInstantSearch.TypesenseSearchRequest(query);
        request.setOptions(options);
        this._lastRequest = request;
        this._requests.push(request);
        let promise = request.run();
        return promise;
    }
}
