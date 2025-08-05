
/**
 * /src/js/helpers/Base.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push([], function() {

    /**
     * window.typesenseInstantSearch.Base
     * 
     * @access  public
     */
    window.typesenseInstantSearch.Base = window.typesenseInstantSearch.Base || class Base {

        /**
         * _data
         * 
         * @access  protected
         * @var     Object (default:{})
         */
        _data = {};


        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
        }

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  undefined|mixed
         */
        get(key) {
            let value = this._data[key] || undefined;
            return value;
        }

        /**
         * getWebComponent
         * 
         * @access  public
         * @return  window.typesenseInstantSearch.AnnexSearchWidgetWebComponent
         */
        getWebComponent() {
            let value = window.typesenseInstantSearch.webComponent;
            return value;
        }

        /**
         * hideWebComponent
         * 
         * @access  public
         * @return  Boolean
         */
        hideWebComponent() {
            let webComponent = this.getWebComponent();
            webComponent.hide();
            return true;
        }

        /**
         * log
         * 
         * @access  public
         * @return  Boolean
         */
        log() {
            let scope = window.typesenseInstantSearch.LoggingUtils,
                response = window.typesenseInstantSearch.LoggingUtils.log.apply(scope, arguments);
            return response;
        }

        /**
         * set
         * 
         * @access  public
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        set(key, value) {
            this._data[key] = value;
            return true;
        }

        /**
         * setState
         * 
         * @access  public
         * @param   String stateKey
         * @return  Boolean
         */
        setState(stateKey) {
            this.getWebComponent().getView('root').setState(stateKey);
            return true;
        }
    }
});
