
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
    window.annexSearch.Base = window.annexSearch.Base || class Base {

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
         * _data
         * 
         * @access  protected
         * @var     Object (default: {})
         */
        _data = {};

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
         * #__handleMergeCustomEvent
         * 
         * @access  private
         * @param   String pathArr
         * @param   mixed oldVal
         * @param   mixed newVal
         * @return  Boolean
         */
        #__handleMergeCustomEvent(pathArr, oldVal, newVal) {

            // Event (broad)
            let type = 'data.set',
                detail = {};
            detail.key = pathArr.join('.');
            detail.value = newVal;
            this.dispatchCustomEvent(type, detail);

            // Event (specific)
            type = 'data.set.' + (pathArr.join('.'));
            this.dispatchCustomEvent(type, detail);

            // console.log("Replaced %s:", pathArr.join("."), oldVal, "→", newVal);
            // console.log("Replaced %s:", pathArr.join("."), oldVal, "→", newVal);
            return true;
        }

        /**
         * addCustomEventListener
         * 
         * @access  public
         * @param   String type
         * @param   Function listener
         * @param   Boolean once (default: false)
         * @return  Boolean
         */
        addCustomEventListener(type, listener, once = false) {
            this.#__eventTarget.addEventListener(type, listener, {
                once: once
            });
            return true;
        }

        /**
         * dispatchCustomEvent
         * 
         * @access  public
         * @param   String type
         * @param   Object detail (default: {})
         * @return  Boolean
         */
        dispatchCustomEvent(type, detail = {}) {
            detail.$annexSearchWidget = this.getWebComponent();
            let customEvent = new CustomEvent(type, {
                detail: detail
            });
            this.#__eventTarget.dispatchEvent(customEvent);
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
            // if (key === undefined) {
            //     let response = this._data;
            //     return response;
            // }
            // let response = this._data[key] || undefined;
            // return response;



            if (key === undefined) {
                let data = this._data;
                return data;
            }
            let value = this._data[key];
            if (value !== undefined) {
                return value;
            }
            let pieces = key.split('.');
            if (pieces.length === 1) {
// console.log(pieces, this._data);
                let message = window.annexSearch.ErrorUtils.getMessage('base.get.key.invalid', key);
                this.error(message);
                return undefined;
            }
            value = this._data;
            for (let piece of pieces) {
                value = value[piece];
                if (value === undefined) {
                    let message = window.annexSearch.ErrorUtils.getMessage('base.get.key.invalid', key);
                    this.error(message);
                    return undefined;
                }
            }
            return value;
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
            // key = 'views.' + (key);
            // let response = this.get(key);
            // return response;
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
            let $webComponent = this._$annexSearchWidget;
            return $webComponent;
        }

        /**
         * merge
         * 
         * @access  public
         * @param   Object data
         * @return  Boolean
         */
        merge(data) {
            let handler = this.#__handleMergeCustomEvent.bind(this);
            window.annexSearch.DataUtils.deepMerge(this._data, data, handler);
            let type = 'data.merge',
                detail = {data};
            this.dispatchCustomEvent(type, detail);
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

            // Validation
            if (key === undefined) {
                let message = window.annexSearch.ErrorUtils.getMessage('base.set.key.undefined');
                this.error(message);
                return false;
            }
            if (value === undefined) {
                let message = window.annexSearch.ErrorUtils.getMessage('base.set.value.undefined');
                this.error(message);
                return false;
            }

            // Let's do this!
            let parent = this._data,
                reference = this._data[key],
                piece = key;
            if (reference === undefined) {
                let pieces = key.split('.');
                reference = this._data;
                for (piece of pieces) {
                    parent = reference;
                    reference = reference[piece];
                }
            }
            parent[piece] = value;

            // Events
            reference = this;
            let detail = {key, value, reference};
            this.dispatchCustomEvent('data.set', detail);
            let type = 'data.set.' + (key);
            this.dispatchCustomEvent(type, detail);
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
        // set__(key, value) {
        //     this._data[key] = value;
        //     let detail = {key, value};
        //     this.dispatchCustomEvent('data.set', detail);
        //     let type = 'data.set.' + (key);
        //     this.dispatchCustomEvent(type, detail);
        //     return true;
        // }
    }
});
