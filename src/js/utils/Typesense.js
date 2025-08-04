
/**
 * window.typesenseInstantSearch.TypesenseUtils
 * 
 * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
 * @see     https://typesense.org/docs/29.0/api/search.html
 * @access  public
 */
window.typesenseInstantSearch.TypesenseUtils = window.typesenseInstantSearch.TypesenseUtils || class TypesenseUtils {

    /**
     * _searchOptions
     * 
     * @static
     * @access  protected
     * @var     Object
     */
    static _searchOptions = {
        // highlight_start_tag: '%3Cmark%3E',
        // highlight_end_tag: '%3C%2Fmark%3E',
        // use_cache: true,
        page: 1,
        per_page: 10
        // query_by: options.query_by || 'title,content',
        // filter_by: options.filter_by || '',
        // sort_by: options.sort_by || '_text_match:desc',
    }

    /**
     * _getAuth
     * 
     * @access  protected
     * @static
     * @return  Object
     */
    static _getAuth() {
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
     * @static
     * @return  String
     */
    static _getBaseURL() {
        let auth = this._getAuth(),
            baseURL = (auth.protocol) + '://' + (auth.hostname);
        return baseURL;
    }

    /**
     * _getFetchOptions
     * 
     * @access  protected
     * @static
     * @return  Object
     */
    static _getFetchOptions() {
        let auth = this._getAuth();
        return {
            method: 'GET',
            headers: {
                'X-TYPESENSE-API-KEY': auth.apiKey,
                // 'X-TYPESENSE-API-KEY': auth.apiKey + 's',
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * _getSearchOptions
     * 
     * @access  protected
     * @static
     * @param   String query
     * @return  Object
     */
    static _getSearchOptions(query, options = {}) {
        let auth = this._getAuth(),
            searchOptions = Object.assign(
                {},
                this._searchOptions,
                window.typesenseInstantSearchConfig.searchOptions,
                options,
            );
        searchOptions.q = query;
// console.log(searchOptions);
        searchOptions.preset = auth.presetName || null;
        return searchOptions;
    }

    /**
     * _getSearchParams
     * 
     * @access  protected
     * @static
     * @param   String query
     * @return  Object
     */
    static _getSearchParams(query, options = {}) {
        let searchOptions = this._getSearchOptions(query, options),
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
     * @static
     * @param   String query
     * @param   Object options (default: {})
     * @return  String
     */
    static _getSearchURL(query, options = {}) {
        let auth = this._getAuth(),
            baseURL = this._getBaseURL(),
            params = this._getSearchParams(query, options),
            searchParams = new URLSearchParams(params).toString(),
            searchURL = (baseURL) + '/collections/' + (auth.collectionName) + '/documents/search?' + (searchParams);
        return searchURL;
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
        let searchURL = this._getSearchURL(query, options),
            fetchOptions = this._getFetchOptions(),
            promise = new Promise(async function(resolve, reject) {
                try {
                    let response = await fetch(searchURL, fetchOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    response.json().then(function(json) {
                        // console.log(json);
                        resolve(json);
                    });
                } catch (error) {
                    // console.log(error);
                    reject(error);
                }
            });
        return promise;
    }
}
