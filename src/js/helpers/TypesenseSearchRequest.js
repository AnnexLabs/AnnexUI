
/**
 * /src/js/helpers/TypesenseSearchRequest.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.Base'], function() {

    /**
     * window.typesenseInstantSearch.TypesenseSearchRequest
     * 
     * @extends window.typesenseInstantSearch.Base
     */
    window.typesenseInstantSearch.TypesenseSearchRequest = window.typesenseInstantSearch.TypesenseSearchRequest || class TypesenseSearchRequest extends window.typesenseInstantSearch.Base {

        /**
         * _abortController
         * 
         * @access  protected
         * @var     AbortController|null (default: null)
         */
        _abortController = null;

        /**
         * _aborted
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _aborted = false;

        /**
         * _options
         * 
         * @access  protected
         * @var     Object
         */
        _options = {
            // highlight_start_tag: '%3Cmark%3E',
            // highlight_end_tag: '%3C%2Fmark%3E',
            // use_cache: true,
            page: 1,
            per_page: 10
            // query_by: options.query_by || 'title,content',
            // filter_by: options.filter_by || '',
            // sort_by: options.sort_by || '_text_match:desc',
        };

        /**
         * _query
         * 
         * @access  protected
         * @var     String|null (default: null)
         */
        _query = null;

        /**
         * _response
         * 
         * @access  protected
         * @var     Object|null (default: null)
         */
        _response = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   String query
         * @return  void
         */
        constructor(query) {
            super();
            this._query = query;
        }

        /**
         * _getAuth
         * 
         * @access  protected
         * @return  Object
         */
        _getAuth() {
            let auth = {
                hostname: window.typesenseInstantSearchConfig.cluster.hostname,
                protocol: 'https',
                apiKey: window.typesenseInstantSearchConfig.cluster.apiKey,
                collectionName: window.typesenseInstantSearchConfig.cluster.collectionName,
                presetName: window.typesenseInstantSearchConfig.cluster.presetName
            };
            return auth;
        }

        /**
         * _getBaseURL
         * 
         * @access  protected
         * @return  String
         */
        _getBaseURL() {
            let auth = this._getAuth(),
                baseURL = (auth.protocol) + '://' + (auth.hostname);
            return baseURL;
        }

        /**
         * _getFetchHeaders
         * 
         * @access  protected
         * @return  Object
         */
        _getFetchHeaders() {
            let auth = this._getAuth(),
                headers = {
                    'X-TYPESENSE-API-KEY': auth.apiKey,
                    'Content-Type': 'application/json'
                };
            return headers;
        }

        /**
         * _getFetchOptions
         * 
         * @access  protected
         * @return  Object
         */
        _getFetchOptions() {
            let controller = new AbortController(),
                headers = this._getFetchHeaders(),
                options = {
                    method: 'GET',
                    signal: controller.signal,
                    headers: headers
                };
            this._abortController = controller;
            return options;
        }

        /**
         * _getSearchOptions
         * 
         * @access  protected
         * @return  Object
         */
        _getSearchOptions() {
            let auth = this._getAuth(),
                options = this._options;
            options.q = this._query;
            options.preset = auth.presetName || null;
            return options;
        }

        /**
         * _getSearchParams
         * 
         * @access  protected
         * @param   String query
         * @return  Object
         */
        _getSearchParams() {
            let searchOptions = this._getSearchOptions(),
                params = new URLSearchParams(searchOptions);
            for (const [key, value] of params.entries()) {
                if (!value) {
                    params.delete(key);
                }
            }
            return params;
        }

        /**
         * _getSearchURL
         * 
         * @access  protected
         * @return  String
         */
        _getSearchURL() {
            let baseURL = this._getBaseURL(),
                auth = this._getAuth(),
                params = this._getSearchParams(),
                searchParams = new URLSearchParams(params).toString(),
                searchURL = (baseURL) + '/collections/' + (auth.collectionName) + '/documents/search?' + (searchParams);
            return searchURL;
        }

        /**
         * abort
         * 
         * @access  public
         * @return  Boolean
         */
        abort() {
            if (this._aborted === true) {
                return false;
            }
            this._aborted = true;
            this._abortController.abort();
            return true;
        }

        /**
         * getResponse
         * 
         * @access  public
         * @return  null|Object
         */
        getResponse() {
            let response = this._response;
            return response;
        }

        /**
         * run
         * 
         * @access  public
         * @return  Promise
         */
        run() {
            let url = this._getSearchURL(),
                options = this._getFetchOptions(),
                promise = new Promise(async function(resolve, reject) {
                    try {
                        let response = await fetch(url, options);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        response.json().then(resolve);
                    } catch (error) {
                        if (error.name === 'AbortError') {
                        } else {
                            reject(error);
                        }
                    }
                });
            return promise;
        }

        /**
         * setOptions
         * 
         * @access  public
         * @param   Object options
         * @return  Boolean
         */
        setOptions(options) {
            this._options = Object.assign(
                {},
                this._options,
                window.typesenseInstantSearchConfig.searchOptions,
                options,
            );
            return true;
        }
    }
});
