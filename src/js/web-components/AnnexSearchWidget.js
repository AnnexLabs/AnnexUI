
/**
 * /src/js/web-components/AnnexSearchWidget.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearchWidgetWebComponent
     * 
     * @see     https://chatgpt.com/c/68952fc2-4a9c-8323-9de9-8857960241d8
     * @see     https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
     * @extends HTMLElement
     */
    window.annexSearch.AnnexSearchWidgetWebComponent = window.annexSearch.AnnexSearchWidgetWebComponent || class AnnexSearchWidgetWebComponent extends HTMLElement {

        /**
         * #__dead
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__dead = false;

        /**
         * #__helpers
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__helpers = {};

        /**
         * #__ready
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__ready = false;

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

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
            this.#__register();
            this.#__setupHelpers();
            this.#__setupShadow();
        }

        /**
         * #__getContainer
         * 
         * @throws  Error
         * @access  public
         * @param   null|HTMLElement $container (default: null)
         * @return  HTMLElement
         */
        #__getContainer($container = null) {
            $container = $container || this.getConfig('$container') || null;
            if ($container === null) {
                if (this.getConfig('layout') === 'inline') {
                    let message = window.annexSearch.ErrorUtils.getMessage('annexSearchWidget.ccontainer.error');
                    this.#__helpers.webComponentUI.error(message);
                    throw new Error('Check console.');
                }
                $container = (document.body || document.head || document.documentElement);
            }
            return $container;
        }

        /**
         * #__handleRenderEvent
         * 
         * @access  private
         * @return  Boolean
         */
        #__handleRenderEvent() {
            this.#__mountRoot();
            this.#__helpers.webComponentUI.setupConfigHelperCustomEventListeners();
            this.#__helpers.webComponentUI.setUUID();
            this.#__helpers.webComponentUI.setAttributes();
            this.#__helpers.webComponentUI.autoShow();
            this.#__ready = true;
            this.dispatchCustomEvent('ready');
            return true;
        };

        /**
         * #__mountRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountRoot() {
            let view = new window.annexSearch.RootView(this),
                $container = this.shadow;
            this.#__views.root = view;
            this.#__views.root.mount($container);
            return true;
        }

        /**
         * #__render
         * 
         * @access  private
         * @return  Promise
         */
        #__render() {
            let config = this.#__helpers.config,
                handler = this.#__handleRenderEvent.bind(this),
                promise = config.loadStylesheets(this)
                    .then(handler)
                    // .catch(function(error) {
                    //     console.log(error);
                    // });
            return promise;
        }

        /**
         * #__register
         * 
         * @access  private
         * @return  Boolean
         */
        #__register() {
            window.annexSearch.AnnexSearch.register(this);
            return true;
        }

        /**
         * #__setupHelpers
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupHelpers() {
            this.#__helpers.config = new window.annexSearch.ConfigHelper(this);
            this.#__helpers.typesense = new window.annexSearch.TypesenseHelper(this);
            this.#__helpers.webComponentUI = new window.annexSearch.WebComponentUIHelper(this);
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
         * dead
         * 
         * @access  public
         * @return  Boolean
         */
        dead() {
            let response = this.#__dead;
            return response;
        }

        /**
         * dispatchCustomEvent
         * 
         * @see     https://chatgpt.com/c/68942c36-15a0-8328-a9aa-a0a5e682af61
         * @access  public
         * @param   String type
         * @param   Object detail (default: {})
         * @return  Boolean
         */
        dispatchCustomEvent(type, detail = {}) {
            detail.$annexSearchWidget = this;
            let customEvent = new CustomEvent(type, {
                detail: detail
            });
            this.dispatchEvent(customEvent);
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
            let value = this.#__helpers.config.get(key);
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
            this.#__showing = false;
            window.annexSearch.AnnexSearch.clearActive();
            this.#__helpers.webComponentUI.hide();
            return true;
        }

        /**
         * kill
         * 
         * @access  public
         * @return  Boolean
         */
        kill() {
            if (this.#__dead === true) {
                return false;
            }
            this.#__dead = true;
            this.#__helpers.webComponentUI.kill();
            return true;
        }

        /**
         * mount
         * 
         * @throws  Error
         * @access  public
         * @param   null|HTMLElement $container (default: null)
         * @return  Promise
         */
        mount($container = null) {
            $container = this.#__getContainer($container);
            let promise = this.#__render();
            $container.appendChild(this);
            return promise;
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
            if (this.#__ready === true) {
                let promise = new Promise(function(resolve, reject) {
                    resolve(this);
                });
                return promise;
            }
            let $annexSearchWidget = this,
                promise = new Promise(function(resolve, reject) {
                    let handler = function(customEvent) {
                        resolve($annexSearchWidget);
                    };
                    $annexSearchWidget.addEventListener('ready', handler, {
                        once: true
                    });
                });
            return promise;
        }

        /**
         * setConfig
         * 
         * @access  public
         * @param   Object|String key
         * @param   mixed value
         * @return  Boolean
         */
        setConfig(key, value) {
            if (typeof key === 'object') {
                let response = this.#__helpers.config.merge(key);
                return response;
            }
            let response = this.#__helpers.config.set(key, value);
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
            this.#__showing = true;
            window.annexSearch.AnnexSearch.setActive(this);
            this.#__helpers.webComponentUI.show();
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
         * @param   null|Number duration (default: window.annexSearch.ToastUtils.getDuration())
         * @return  window.annexSearch.ToastView
         */
        showToast(title, message, duration = window.annexSearch.ToastUtils.getDuration()) {
            let options = {title, message},
                view = window.annexSearch.ToastUtils.build(this, options);
            view.setDuration(duration);
            view.show();
            return view;
        }

        /**
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            this.#__helpers.webComponentUI.toggle();
            if (this.#__showing === true) {
                let response = this.hide();
                return response;
            }
            let response = this.show();
            return response;
        }
    }
});
