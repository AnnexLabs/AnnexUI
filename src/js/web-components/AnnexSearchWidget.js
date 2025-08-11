
/**
 * /src/js/web-components/AnnexSearchWidget.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearchWidgetWebComponent
     * 
     * @see     https://chatgpt.com/c/68952fc2-4a9c-8323-9de9-8857960241d8
     * @extends HTMLElement
     */
    window.annexSearch.AnnexSearchWidgetWebComponent = window.annexSearch.AnnexSearchWidgetWebComponent || class extends HTMLElement {

        /**
         * #__helpers
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__helpers = {};

        /**
         * #__index
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__index = null;

        /**
         * #__maxZIndexValue
         * 
         * @access  private
         * @var     Number (default: 2147483647)
         */
        // #__maxZIndexValue = 2147483647;

        /**
         * #__mounted
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__mounted = false;

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

        /**
         * #__uuid
         * 
         * @access  private
         * @var     null|String (default: null)
         */
        #__uuid = null;

        /**
         * #__views
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__views = {};

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
            this.#__index = window.annexSearch.AnnexSearch.getRegistered().length;
            window.annexSearch.AnnexSearch.register(this);
            this.#__setupShadow();
            this.#__setupHelpers();
            this.#__setUUID();
            this.#__render();
        }

        /**
         * #__setStyles
         * 
         * @access  private
         * @return  Boolean
         */
//         #__setStyles() {
//             // let showing = window.annexSearch.AnnexSearch.getShowing();
//             // if (showing.length === 0) {
//             //     return false;
//             // }
//             // if (showing.length === 1) {
//             //     return false;
//             // }
//             let zIndex = this.#__maxZIndexValue - this.#__index;
// // console.log(zIndex);
//             return true;
//         }

        /**
         * #__mountRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountRoot() {
            let view = new window.annexSearch.RootView(this);
            this.#__views.root = view;
            this.#__views.root.mount(this.shadow);
            return true;
        }

        /**
         * #__setAttributes
         * 
         * @access  private
         * @return  Boolean
         */
        #__setAttributes() {
            let layout = this.getConfig('layout'),
                overlay = String(+this.getConfig('showOverlay')),
                index = this.#__index;
            if (this.getConfig('layout') === 'inline') {
                overlay = 0;
            }
            this.setAttribute('id', this.#__uuid);
            let mode = this.getConfig('mode');
            this.setAttribute('data-annex-search-mode', mode);
            this.setAttribute('data-annex-search-layout', layout);
            this.setAttribute('data-annex-search-overlay', overlay);
            this.setAttribute('data-annex-search-ready', '1');
            this.setAttribute('data-annex-search-index', index);
            this.setAttribute('data-annex-search-open', '0');
            if (this.getConfig('name') !== null) {
                let name = this.getConfig('name');
                this.setAttribute('data-annex-search-name', name);
            }
            return true;
        }

        /**
         * #__setupRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupRoot() {
            this.#__mountRoot();
            this.#__setAttributes();
            if (this.getConfig('layout') === 'inline') {
                this.show();
            }
            return true;
        }

        /**
         * #__render
         * 
         * @access  private
         * @return  Promise
         */
        #__render() {
            let helper = this.getHelper('config'),
                handler = this.#__setupRoot.bind(this),
                promise = helper.loadStylesheets(this)
                    // .then(helper.loadTemplates.bind(helper))
                    .then(handler)
                    // .catch(function(error) {
                    //     console.log(error);
                    // });
            return promise;
        }

        /**
         * #__mountHelpers
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupHelpers() {
            this.#__helpers.config = new window.annexSearch.ConfigHelper(this);
            this.#__helpers.typesense = new window.annexSearch.TypesenseHelper(this);
            return true;
        }

        /**
         * #__mountShadow
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupShadow() {
            this.shadow = this.attachShadow({
                mode: 'closed'
            });
            return true;
        }

        /**
         * #__setUUID
         * 
         * @access  private
         * @return  Boolean
         */
        #__setUUID() {
            this.#__uuid = window.annexSearch.StringUtils.generateUUID();
            return true;
        }

        /**
         * clear
         * 
         * @access  public
         * @return  Boolean
         */
        clear() {
            // if (this.#__showing === true) {
            //     return false;
            // }
// console.log('clearing');
            let field = this.getView('root').getView('root.header.field'),
                found = this.getView('root').getView('body.results.found');
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            // field.append(query);
            // found.smoothScrollToTop();
            found.resetFocusedIndex();
            // window.annexSearch.ElementUtils.waitForAnimation().then(function() {
            //     field.setCaret();
            // });
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * dispatchCustomEvent
         * 
         * @see     https://chatgpt.com/c/68942c36-15a0-8328-a9aa-a0a5e682af61
         * @access  public
         * @param   String eventName
         * @param   Object map (default: {})
         * @return  Boolean
         */
        dispatchCustomEvent(eventName, map = {}) {

            // CustomEvent
            map.$annexSearchWidget = this;
            let event = new CustomEvent(eventName, {
                detail: map
            });

            // Callback
            let reference = this.getConfig('callbacks') || {},
                pieces = eventName.split('.');
            for (var piece of pieces) {
                reference = reference[piece] ?? null;
                if (reference === null) {
                    break;
                }
            }
            reference && reference && reference.apply(this, [event]);

            // Dispatching
            this.dispatchEvent(event);
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('root').focus();
            return response;
        }

        /**
         * getConfig
         * 
         * @access  public
         * @param   String key
         * @return  Boolean
         */
        getConfig(key) {
            let value = this.getHelper('config').get(key);
            return value;
        }

        /**
         * getHelper
         * 
         * @access  public
         * @param   String key
         * @return  window.annexSearch.BaseView
         */
        getHelper(key) {
            let helper = this.#__helpers[key];
            return helper;
        }

        /**
         * getView
         * 
         * @access  public
         * @param   String viewKey
         * @return  window.annexSearch.BaseView
         */
        getView(viewKey) {
            let view = this.#__views[viewKey];
            return view;
        }

        /**
         * hide
         * 
         * @see     https://chatgpt.com/c/688faa3b-3b2c-832c-a55b-96d1ab15acbe
         * @access  public
         * @return  Boolean
         */
        hide() {
            if (this.getConfig('layout') === 'inline') {
                return false;
            }
            if (this.#__showing === false) {
                return false;
            }
            window.annexSearch.AnnexSearch.clearActive();
            this.dispatchCustomEvent('root.hide');
            this.#__showing = false;
            this.#__views.root.blur();
            this.setAttribute('data-annex-search-open', '0');
            this.setAttribute('inert', '');
            return true;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container (default: null)
         * @return  Boolean
         */
        mount($container = null) {
            $container = $container || this.getConfig('$container') || null;
            if ($container === null) {
                if (this.getConfig('layout') === 'inline') {
                    return false;
                }
                $container = (document.body || document.head || document.documentElement);
            }
            $container.appendChild(this);
            this.#__mounted = true;
            return true;
        }

        /**
         * query
         * 
         * @access  public
         * @param   String query
         * @return  Boolean
         */
        query(query) {
            let field = this.getView('root').getView('root.header.field'),
                found = this.getView('root').getView('body.results.found');
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(query);
            found.smoothScrollToTop();
            found.resetFocusedIndex();
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                field.setCaret();
            });
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * ready
         * 
         * @access  public
         * @return  Promise
         */
        ready() {
            if (this.#__mounted === false) {
                let promise = new Promise(function(resolve, reject) {
                    reject();
                });
                return promise;
            }
            let $annexSearchWidget = this,
                ready = this.getAttribute('data-annex-search-ready');
            if (ready === null) {
                let promise = new Promise(function(resolve, reject) {
                    let interval = setInterval(function() {
// console.log('eff');
                        let ready = $annexSearchWidget.getAttribute('data-annex-search-ready');
                        if (ready !== null) {
                            clearInterval(interval);
                            resolve($annexSearchWidget);
                        }
                    }, 10);
                });
                return promise;
            }
            let promise = new Promise(function(resolve, reject) {
                resolve();
            });
            return promise;
        }

        /**
         * setConfig
         * 
         * @access  public
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        setConfig(key, value) {
            if (typeof key === 'object') {
                let response = this.getHelper('config').setData(key);
                return response;
            }
            let response = this.getHelper('config').set(key, value);
            return response;
        }

        /**
         * show
         * 
         * @note    The logic below is to ensure state is preserved between
         *          openings.
         * @access  public
         * @return  Boolean
         */
        show() {
            if (this.#__showing === true) {
                return false;
            }
// console.log('eff');
// console.trace();
            window.annexSearch.AnnexSearch.setActive(this);
            this.dispatchCustomEvent('root.show');
// console.log('a');
            this.#__showing = true;
            // this.#__setStyles();
// console.log('b');
            this.setAttribute('data-annex-search-open', '1');
            this.removeAttribute('inert');
// console.log('b1');
            let found = this.#__views.root.getView('root.body.results.found'),
                results = found.getResults();
// console.log('c');
// console.log(results);
            if (results.length === 0) {
// console.log('a');
                this.#__views.root.focus();
                return true;
            }
            let focusedIndex = found.getFocusedIndex();
            if (focusedIndex === null) {
                focusedIndex = 0;
            }
            let result = results[focusedIndex];
            if (result === undefined) {
                return true;
            }
            result.focus();
            return true;
        }

        /**
         * showing
         * 
         * @access  public
         * @return  Boolean
         */
        showing() {
            let showing = this.#__showing;
            return showing;
        }

        /**
         * showToast
         * 
         * @access  public
         * @param   String title
         * @param   String message
         * @param   null|Number hideTimeoutDuration (default: null)
         * @return  Boolean
         */
        showToast(title, message, hideTimeoutDuration = null) {
            let options = {title, message, hideTimeoutDuration},
                response = window.annexSearch.ToastUtils.show(this, options);
            return response;
        }

        /**
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            this.dispatchCustomEvent('root.toggle');
            if (this.#__showing === true) {
                let response = this.hide();
                return response;
            }
            let response = this.show();
            return response;
        }
    }
});
