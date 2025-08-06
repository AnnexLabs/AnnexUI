window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.TypesenseUtils
     * 
     * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
     * @see     https://typesense.org/docs/29.0/api/search.html
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.TypesenseUtils = window.annexSearch.TypesenseUtils || class TypesenseUtils extends window.annexSearch.BaseView {

        /**
         * _lastRequest
         * 
         * @access  private
         * @var     null|window.annexSearch.TypesenseSearchRequest (default null)
         */
        #__lastRequest = null;

        /**
         * _requests
         * 
         * @access  private
         * @var     Array (default [])
         */
        #__requests = [];

        /**
         * _abortLastRequest
         * 
         * @access  private
         * @return  Boolean
         */
        #__abortLastRequest() {
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
         * @param   Object options (default: {})
         * @return  Boolean
         */
        #__validSearchOptions(options = {}) {
    // return false;
            return true;
        }

        /**
         * getHighlightEndTag
         * 
         * @access  public
         * @return  String
         */
        getHighlightEndTag() {
            let tagName = window.annexSearch.ConfigUtils.get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                endTag = '</' + (tagNameLowerCase) + '>';
            return endTag;
        }

        /**
         * getHighlightStartTag
         * 
         * @access  public
         * @return  String
         */
        getHighlightStartTag() {
            let tagName = window.annexSearch.ConfigUtils.get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                startTag = '<' + (tagNameLowerCase) + '>';
            return startTag;
        }

        /**
         * search
         * 
         * @access  public
         * @param   String query
         * @param   Object options (default: {})
         * @return  Promise
         */
        search(query, options = {}) {
            if (this.#__validSearchOptions(options) === false) {
                this.error('Invalid search $options');
                let resolve = false,
                    promise = window.annexSearch.FunctionUtils.getDelayedPromise(resolve);
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
    window.annexSearch.TypesenseUtils = new window.annexSearch.TypesenseUtils();
});
