
/**
 * /src/js/helpers/TypesenseSearchRequest.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.TypesenseSearchRequest
     * 
     * @extends window.annexSearch.Base
     */
    window.annexSearch.TypesenseSearchRequest = window.annexSearch.TypesenseSearchRequest || class extends window.annexSearch.Base {

        /**
         * #__abortController
         * 
         * @access  private
         * @var     AbortController|null (default: null)
         */
        #__abortController = null;

        /**
         * #__aborted
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__aborted = false;

        /**
         * #__encodingExemptFields
         * 
         * @see     https://typesense.org/docs/0.20.0/api/documents.html#arguments
         * @access  private
         * @var     Array
         */
        // #__encodingExemptFields = [
        //     'include_fields',
        //     'exclude_fields',
        //     'highlight_full_fields',
        //     'pinned_hits',
        //     'hidden_hits'
        // ];

        /**
         * #__error
         * 
         * @access  private
         * @var     null|Object (default: null)
         */
        #__error = null;

        /**
         * #__options
         * 
         * @access  private
         * @var     Object
         */
        #__options = {
            page: 1,
            per_page: 10
            // query_by: options.query_by || 'title,content',// working: title,body
            // filter_by: options.filter_by || '',// working: filter_by = score:>8
            // sort_by: options.sort_by || '_text_match:desc',// working: sort_by = score:desc
        };

        /**
         * #__query
         * 
         * @access  private
         * @var     String|null (default: null)
         */
        #__query = null;

        /**
         * #__response
         * 
         * @access  private
         * @var     Object|null (default: null)
         */
        #__response = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   String query
         * @return  void
         */
        constructor(query) {
            super();
            this.#__query = query;
            this.#__options.q = query;
// console.log(this, this.getHelper);//, this.getHelper('typesense'));
            this.#__options.highlight_end_tag = this.getHelper('typesense').getHighlightEndTag();
            this.#__options.highlight_start_tag = this.getHelper('typesense').getHighlightStartTag();
        }

        /**
         * #__fetch
         * 
         * @access  private
         * @param   String url
         * @param   Object options
         * @return  Promise
         */
        #__fetch(url, options) {
            let successful = this.#__handleSuccessfulRequest.bind(this),
                failed = this.#__handleFailedRequest.bind(this),
                promise = window.fetch(url, options).then(successful).catch(failed);
            return promise;
        }

        /**
         * #__getAuth
         * 
         * @access  private
         * @return  Object
         */
        #__getAuth() {
            let auth = {
                hostname: this.getHelper('config').get('cluster.hostname'),
                protocol: 'https',
                apiKey: this.getHelper('config').get('cluster.apiKey'),
                collectionName: this.getHelper('config').get('cluster.collectionName'),
                presetName: this.getHelper('config').get('cluster.presetName')
            };
            return auth;
        }

        /**
         * #__getBaseURL
         * 
         * @access  private
         * @return  String
         */
        #__getBaseURL() {
            let auth = this.#__getAuth(),
                baseURL = (auth.protocol) + '://' + (auth.hostname);
            return baseURL;
        }

        /**
         * #__getFetchHeaders
         * 
         * @access  private
         * @return  Object
         */
        #__getFetchHeaders() {
            let auth = this.#__getAuth(),
                headers = {
                    'X-TYPESENSE-API-KEY': auth.apiKey,
                    'Content-Type': 'application/json'
                };
            return headers;
        }

        /**
         * #__getFetchOptions
         * 
         * @access  private
         * @return  Object
         */
        #__getFetchOptions() {
            let controller = new AbortController(),
                headers = this.#__getFetchHeaders(),
                options = {
                    method: 'GET',
                    signal: controller.signal,
                    headers: headers
                };
            this.#__abortController = controller;
            return options;
        }

        /**
         * #__getSearchParams
         * 
         * @access  private
         * @param   String query
         * @return  Object
         */
        #__getSearchParams() {
            let searchOptions = this.getSearchOptions(),
                params = new URLSearchParams(searchOptions);
// console.log(__encodingExemptFields);
            for (const [key, value] of params.entries()) {
                // if (key === 'highlight_full_fields') {
                //     console.log('yep', key, value);
                //     // params.set(key, value.replaceAll('%2C', ','));
                // }
                if (!value) {
                    params.delete(key);
                }
            }
            return params;
        }

        /**
         * #__getSearchURL
         * 
         * @access  private
         * @return  String
         */
        #__getSearchURL() {
            let baseURL = this.#__getBaseURL(),
                auth = this.#__getAuth(),
                params = this.#__getSearchParams(),
                searchParams = new URLSearchParams(params).toString(),
                searchURL = (baseURL) + '/collections/' + (auth.collectionName) + '/documents/search?' + (searchParams);
// searchURL = searchURL.replaceAll('%2C', ',');
// console.log(searchParams);
            return searchURL;
        }

        /**
         * #__handleFailedRequest
         * 
         * @access  private
         * @param   Object error
         * @return  window.annexSearch.TypesenseSearchRequest
         */
        #__handleFailedRequest(error) {
// console.log(error);
            let key = error.name,
                message = error.message;
            this.setError(key, message);
            return this;
        }

        /**
         * #__handleSuccessfulRequestJSONDecoding
         * 
         * @throws  Error
         * @access  private
         * @param   Object json
         * @return  Promise
         */
        #__handleSuccessfulRequestJSONDecoding(json) {
            this.#__response = json;
            let message = json?.message;
            if (message !== undefined) {
                let key = 'typesenseSearchRequestResponse';
                this.setError(key, message);
                throw new Error();
            }
            if (json.ok === false) {
                alert('hmmm');
            }
            // this.#__response = json;
            return this;
        }

        /**
         * #__handleSuccessfulRequest
         * 
         * @access  private
         * @param   Response response
         * @return  Promise
         */
        #__handleSuccessfulRequest(response) {
            let handler = this.#__handleSuccessfulRequestJSONDecoding.bind(this),
                promise = response.json().then(handler);
            return promise;
        }

        /**
         * abort
         * 
         * @access  public
         * @return  Boolean
         */
        abort() {
            if (this.#__aborted === true) {
                return false;
            }
            this.#__aborted = true;
            let key = 'abort',
                message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.abort');
            this.setError(key, message);
            this.#__abortController.abort();
            return true;
        }

        /**
         * fetch
         * 
         * @access  public
         * @return  Promise
         */
        fetch() {
            let url = this.#__getSearchURL(),
                options = this.#__getFetchOptions(),
                promise = this.#__fetch(url, options);
            // this.abort();
            return promise;
        }

        /**
         * getError
         * 
         * @access  public
         * @return  null|Object
         */
        getError() {
            let error = this.#__error;
            return error;
        }

        /**
         * getOptions
         * 
         * @access  public
         * @return  Object
         */
        getOptions() {
            let options = this.#__options;
            return options;
        }

        /**
         * getQuery
         * 
         * @access  public
         * @return  String
         */
        getQuery() {
            let query = this.#__query;
            return query;
        }

        /**
         * getResponse
         * 
         * @access  public
         * @return  null|Object
         */
        getResponse() {
            let response = this.#__response;
            return response;
        }

        /**
         * getSearchOptions
         * 
         * @access  public
         * @return  Object
         */
        getSearchOptions() {
            let auth = this.#__getAuth(),
                options = Object.assign({}, this.#__options);
            options.preset = auth.presetName || null;
            for (let key in options) {
                if (options[key] === null) {
                    delete options[key];
                }
            }
            return options;
        }

        /**
         * setError
         * 
         * @access  public
         * @param   String key
         * @param   String message
         * @return  Boolean
         */
        setError(key, message) {
            if (this.#__error !== null) {
                return false;
            }
            this.#__error = {};
            this.#__error.key = key;
            this.#__error.message = message;
            return true;
        }

        /**
         * setOptions
         * 
         * @access  public
         * @param   Object options
         * @return  Boolean
         */
        setOptions(options) {
            this.#__options = Object.assign(
                {},
                this.#__options,
                this.getHelper('config').get('searchOptions'),
                options,
            );
            return true;
        }
    }
});
