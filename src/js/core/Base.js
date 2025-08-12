
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
         * #__eventTarget
         * 
         * @see     https://chatgpt.com/c/682a6c39-abc8-800f-ac2d-9b758dfb8384
         * @access  private
         * @var     EventTarget
         */
        #__eventTarget = new EventTarget();

        /**
         * _$annexSearchWidget
         * 
         * @access  protected
         * @var     null|window.annexSearch.AnnexSearchWidgetWebComponent (defautl: null)
         */
        _$annexSearchWidget = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  void
         */
        constructor($annexSearchWidget) {
            this._$annexSearchWidget = $annexSearchWidget;
        }

        /**
         * addEventListener
         * 
         * @access  public
         * @param   String type
         * @param   Function listener
         * @param   Boolean once (default: false)
         * @return  Boolean
         */
        addEventListener(type, listener, once = false) {
            this._eventTarget.addEventListener(type, listener, {
                once: once
            });
            return true;
        }

        /**
         * dispatchEvent
         * 
         * @access  public
         * @param   String type
         * @param   Object detail (default: {})
         * @return  Boolean
         */
        dispatchEvent(type, detail = {}) {
            this._eventTarget.dispatchEvent(new CustomEvent(type, {
                detail: detail
            }));
            return true;
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
    }
});
