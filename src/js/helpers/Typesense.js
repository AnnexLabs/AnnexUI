
/**
 * /src/js/helpers/Typesense.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseHelper'], function() {

    /**
     * window.annexSearch.TypesenseHelper
     * 
     * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
     * @see     https://typesense.org/docs/29.0/api/search.html
     * @access  public
     * @extends window.annexSearch.BaseHelper
     */
    window.annexSearch.TypesenseHelper = window.annexSearch.TypesenseHelper || class TypesenseHelper extends window.annexSearch.BaseHelper {

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
         * @see     https://416.io/ss/f/fm0aua
         * @access  private
         * @param   window.annexSearch.TypesenseSearchRequest request
         * @return  Boolean
         */
        #__validSearchOptions(request) {

            // Options
            let options = request.getOptions();
            if (options.q === null) {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.null');
                request.setError(key, message);
                return false;
            }
            if (options.q === undefined) {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.undefined');
                request.setError(key, message);
                return false;
            }
            if (options.q.trim() === '') {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.empty');
                request.setError(key, message);
                return false;
            }

            // Search options
            let searchOptions = request.getSearchOptions();
            if (searchOptions.preset) {
                return true;
            }
            if (searchOptions.query_by === null) {
                let key = 'searchOptions',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.searchOptions.query_by.null');
                request.setError(key, message);
                return false;
            }
            if (searchOptions.query_by === undefined) {
                let key = 'searchOptions',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.searchOptions.query_by.undefined');
                request.setError(key, message);
                return false;
            }
            return true;
        }

        /**
         * getHighlightEndTag
         * 
         * @access  public
         * @return  String
         */
        getHighlightEndTag() {
            let tagName = this.getHelper('config').get('highlightTagName'),
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
            let tagName = this.getHelper('config').get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                startTag = '<' + (tagNameLowerCase) + '>';
            return startTag;
        }

        /**
         * replaceHightlightTags
         * 
         * @access  public
         * @param   String html
         * @return  String
         */
        replaceHightlightTags(html) {
            let startTag = this.getHighlightStartTag(),
                endTag = this.getHighlightEndTag(),
                escapedStartTag = startTag.replace('<', '&lt;').replace('>', '&gt;'),
                escapedEndTag = endTag.replace('<', '&lt;').replace('>', '&gt;');
            html = html.replaceAll(escapedStartTag, startTag);
            html = html.replaceAll(escapedEndTag, endTag);
            return html;
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
            this.#__abortLastRequest();
            let $annexSearchWidget = this.getWebComponent(),
                request = new window.annexSearch.TypesenseSearchRequest($annexSearchWidget);
            request.setQuery(query);
            // query);
            request.setOptions(options);
            if (this.#__validSearchOptions(request) === false) {
                // let promise = window.annexSearch.FunctionUtils.getEmptyPromise($annexSearchWidget, request);
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(request);
                return promise;
            }
            this.#__lastRequest = request;
            this.#__requests.push(request);
            let promise = request.fetch();
            return promise;
        }
    }
});
