
/**
 * /src/js/web-components/AnnexSearchWidget.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearchWidgetWebComponent
     * 
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
            window.annexSearch.AnnexSearch.register(this);
            this.#__setupShadow();
            this.#__setupHelpers();
            this.#__setUUID();
            this.#__render();
        }

        /**
         * #__dispatchEvent
         * 
         * @access  private
         * @param   String eventName
         * @param   Array args
         * @return  Boolean
         */
        #__dispatchEvent(eventName, args) {
            let event = new CustomEvent(eventName, {
                detail: args
            });
            this.dispatchEvent(event);
            return true;
        }

        /**
         * #__drawRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawRoot() {
            let $shadow = this.shadow,
                view = window.annexSearch.ElementUtils.renderTemplate('root', $shadow, this),
                layout = this.getHelper('config').get('layout'),
                overlay = String(+this.getHelper('config').get('overlay'));
            this.#__views.root = view;
            this.setAttribute('id', this.#__uuid);
            this.setAttribute('data-annex-search-layout', layout);
            this.setAttribute('data-annex-search-overlay', overlay);
            this.setAttribute('data-annex-search-ready', '1');
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
                handler = this.#__drawRoot.bind(this),
                promise = helper.loadStylesheets(this)
                    .then(helper.loadTemplates.bind(helper))
                    .then(handler)
                    .catch(function(error) {
                        console.log(error);
                    });
            return promise;
        }

        /**
         * #__setupHelpers
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupHelpers() {
            this.#__helpers.config = new window.annexSearch.ConfigHelper();
            this.#__helpers.typesense = new window.annexSearch.TypesenseHelper();
            return true;
        }

        /**
         * #__setupShadow
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
         * dispatchCustomEvent
         * 
         * @see     https://chatgpt.com/c/68942c36-15a0-8328-a9aa-a0a5e682af61
         * @access  public
         * @param   String key
         * @param   Array args
         * @return  Boolean
         */
        dispatchCustomEvent(key, ...args) {
            let reference = this.getHelper('config').get('callbacks') || {},
                pieces = key.split('.');
            for (var piece of pieces) {
                reference = reference[piece] ?? null;
                if (reference === null) {
                    return false;
                }
            }
            this.#__dispatchEvent(key, args.slice());
            args.unshift(this);
            reference.apply(window, args);
            return true;
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
            $container = $container || this.getHelper('config').get('$container');
// console.log($container);
            $container.appendChild(this);
            return true;
        }

        /**
         * ready
         * 
         * @access  public
         * @return  Promise
         */
        ready() {
            let $annexSearchWidget = this,
                ready = this.getAttribute('data-annex-search-ready');
            if (ready === null) {
                let promise = new Promise(function(resolve, reject) {
                    let interval = setInterval(function() {
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
            // let response = this.getHelper('config').get(key);
console.log(key, value);
            let response = this.getHelper('config').set(key, value);
            return response;
            // if (reference === undefined) {
            //     let message = window.annexSearch.ErrorUtils.getMessage('webComponent.setConfig.invalidKey', key);
            //     window.annexSearch.LoggingUtils.error(message);
            //     return false;
            // }
            // window.annexSearch.ConfigUtils.set(key, value);
            // return true;
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
            window.annexSearch.AnnexSearch.setActive(this);
            this.dispatchCustomEvent('root.show');
            this.#__showing = true;
            this.setAttribute('data-annex-search-open', '1');
            this.removeAttribute('inert');
            let found = this.#__views.root.getView('root.body.results.found'),
                results = found.getResults();
            if (results.length === 0) {
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
// console.log('1223');
