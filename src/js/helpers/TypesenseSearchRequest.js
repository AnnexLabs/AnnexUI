
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
    window.annexSearch.TypesenseSearchRequest = window.annexSearch.TypesenseSearchRequest || class TypesenseSearchRequest extends window.annexSearch.Base {

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
         * #__options
         * 
         * @access  private
         * @var     Object
         */
        #__options = {
            page: 1,
            per_page: 10
            // query_by: options.query_by || 'title,content',
            // filter_by: options.filter_by || '',
            // sort_by: options.sort_by || '_text_match:desc',
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
            this.#__options.highlight_end_tag = window.annexSearch.TypesenseUtils.getHighlightEndTag();
            this.#__options.highlight_start_tag = window.annexSearch.TypesenseUtils.getHighlightStartTag();
        }

        /**
         * #__getAuth
         * 
         * @access  private
         * @return  Object
         */
        #__getAuth() {
            let auth = {
                hostname: window.annexSearchConfig.cluster.hostname,
                protocol: 'https',
                apiKey: window.annexSearchConfig.cluster.apiKey,
                collectionName: window.annexSearchConfig.cluster.collectionName,
                presetName: window.annexSearchConfig.cluster.presetName
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
         * #__getSearchOptions
         * 
         * @access  private
         * @return  Object
         */
        #__getSearchOptions() {
            let auth = this.#__getAuth(),
                options = this.#__options;
            options.preset = auth.presetName || null;
            for (let key in options) {
                if (options[key] === null) {
                    delete options[key];
                }
            }
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
            let searchOptions = this.#__getSearchOptions(),
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
            this.#__abortController.abort();
            return true;
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
         * run
         * 
         * @access  public
         * @return  Promise
         */
        run() {
            let url = this.#__getSearchURL(),
                options = this.#__getFetchOptions(),
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
            this.#__options = Object.assign(
                {},
                this.#__options,
                window.annexSearch.ConfigUtils.get('searchOptions'),
                window.annexSearchConfig.searchOptions,
                options,
            );
            return true;
        }
    }
});
