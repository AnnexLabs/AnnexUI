
/**
 * window.annexSearch.TypesenseUtils
 * 
 * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
 * @see     https://typesense.org/docs/29.0/api/search.html
 * @access  public
 */
window.annexSearch.TypesenseUtils = window.annexSearch.TypesenseUtils || class TypesenseUtils {

    /**
     * _lastRequest
     * 
     * @static
     * @access  private
     * @var     null|window.annexSearch.TypesenseSearchRequest (default null)
     */
    static #__lastRequest = null;

    /**
     * _requests
     * 
     * @static
     * @access  private
     * @var     Array (default [])
     */
    static #__requests = [];

    /**
     * _abortLastRequest
     * 
     * @access  private
     * @static
     * @return  Boolean
     */
    static #__abortLastRequest() {
        if (this.#__lastRequest === null) {
            return false;
        }
        let request = this.#__lastRequest;
        this.#__lastRequest = null;
        request.abort();
        let index = this.#__requests.indexOf(request);
        if (index === -1) {
            return false;
        }
        this.#__requests.splice(index, 1);
        return true;
    }

    /**
     * _validSearchOptions
     * 
     * @access  private
     * @static
     * @param   Object options (default: {})
     * @return  Boolean
     */
    static #__validSearchOptions(options = {}) {
// return false;
        return true;
    }

    /**
     * getHighlightEndTag
     * 
     * @access  public
     * @static
     * @return  String
     */
    static getHighlightEndTag() {
        let tagName = window.annexSearch.ConfigUtils.get('highlightTagName'),
            tagNameLowerCase = tagName.toLowerCase(),
            endTag = '</' + (tagNameLowerCase) + '>';
        return endTag;
    }

    /**
     * getHighlightStartTag
     * 
     * @access  public
     * @static
     * @return  String
     */
    static getHighlightStartTag() {
        let tagName = window.annexSearch.ConfigUtils.get('highlightTagName'),
            tagNameLowerCase = tagName.toLowerCase(),
            startTag = '<' + (tagNameLowerCase) + '>';
        return startTag;
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
        if (this.#__validSearchOptions(options) === false) {
            let resolve = false,
                promise = window.annexSearch.DataUtils.getDelayedPromise(resolve);
            return promise;
        }
        this.#__abortLastRequest();
        let request = new window.annexSearch.TypesenseSearchRequest(query);
        request.setOptions(options);
        this.#__lastRequest = request;
        this.#__requests.push(request);
        let promise = request.run();
        return promise;
    }
}
