
/**
 * /src/js/core/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.Base
     * 
     * @access  public
     */
    window.annexSearch.Base = window.annexSearch.Base || class {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object (default: {})
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
         * error
         * 
         * @access  public
         * @return  Boolean
         */
        error() {
            let scope = window.annexSearch.LoggingUtils,
                response = window.annexSearch.LoggingUtils.error.apply(scope, arguments);
            return response;
        }

        /**
         * get
         * 
         * @access  public
         * @param   undefined|String key (default: undefined)
         * @return  Object|undefined|mixed
         */
        get(key = undefined) {
            if (key === undefined) {
                let response = this.#__data;
                return response;
            }
            let response = this.#__data[key] || undefined;
            return response;
        }

        /**
         * getHelper
         * 
         * @access  public
         * @param   String key
         * @return  window.annexSearch.BaseHelper
         */
        getHelper(key) {
            let webComponent = this.getWebComponent(),
                helper = webComponent.getHelper(key);
            return helper;
        }

        /**
         * getView
         * 
         * @access  public
         * @param   String key
         * @return  undefined|BaseView
         */
        getView(key) {
            let views = this.get('views') || {},
                view = views[key] || undefined;
            if (view !== undefined) {
                return view;
            }
            if (key === 'root') {
                view = this.getWebComponent().getView('root');
                return view;
            }
            let pieces = key.split('.');
            view = this.getWebComponent().getView('root');
            for (let piece of pieces) {
                if (piece === 'root') {
                    continue;
                }
                view = view.getView(piece);
            }
            return view;
        }

        /**
         * getWebComponent
         * 
         * @access  public
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        getWebComponent() {
            let webComponent = this._$annexSearchWidget;
            return webComponent;
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
         * setStateKey
         * 
         * @access  public
         * @param   String stateKey
         * @return  Boolean
         */
        setStateKey(stateKey) {
            this.getView('root').setStateKey(stateKey);
            return true;
        }
    }
});
