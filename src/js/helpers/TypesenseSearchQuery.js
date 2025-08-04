
/**
 * /src/js/helpers/TypesenseSearchQuery.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.Base'], function() {

    /**
     * window.typesenseInstantSearch.TypesenseSearchQuery
     * 
     * @extends window.typesenseInstantSearch.Base
     */
    window.typesenseInstantSearch.TypesenseSearchQuery = window.typesenseInstantSearch.TypesenseSearchQuery || class TypesenseSearchQuery extends window.typesenseInstantSearch.Base {

        /**
         * _aborted
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _aborted = false;

        /**
         * _response
         * 
         * @access  protected
         * @var     null (default: null)
         */
        _response = null;

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
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
    }
});
