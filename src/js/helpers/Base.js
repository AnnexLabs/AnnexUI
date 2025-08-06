
/**
 * /src/js/helpers/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.Base
     * 
     * @access  public
     */
    window.annexSearch.Base = window.annexSearch.Base || class Base {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object (default:{})
         */
        #__data = {};


        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
        }

        /**
         * debug
         * 
         * @access  public
         * @return  Boolean
         */
        debug() {
            let scope = window.annexSearch.DebuggingUtils,
                response = window.annexSearch.DebuggingUtils.log.apply(scope, arguments);
            return response;
        }

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  undefined|mixed
         */
        get(key) {
            let value = this.#__data[key] || undefined;
            return value;
        }

        /**
         * getWebComponent
         * 
         * @access  public
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        getWebComponent() {
            let value = window.annexSearch.webComponent;
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
            let scope = window.annexSearch.LoggingUtils,
                response = window.annexSearch.LoggingUtils.message.apply(scope, arguments);
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
            this.#__data[key] = value;
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
