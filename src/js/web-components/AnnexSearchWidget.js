
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
         * #__disabled
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__disabled = false;

        /**
         * #__helpers
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__helpers = {};

        /**
         * #__mounted
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__mounted = false;

        /**
         * #__mutators
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__mutators = {};

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
         * @access  private
         * @param   null|EventTarget $container (default: null)
         * @return  null|EventTarget
         */
        #__getContainer($container = null) {
            $container = $container || this.getConfig('$container') || null;
            if (this.getConfig('layout') === 'inline') {
                if ($container === null) {
                    let message = window.annexSearch.ErrorUtils.getMessage('annexSearchWidget.container.null');
                    this.#__helpers.webComponentUI.error(message);
                    return null;
                }
                return $container;
            }
            if ($container === null) {
                $container = (document.body || document.head || document.documentElement);
                return $container;
            }
            return $container;
        }

        /**
         * #__handleReadyEvent
         * 
         * Handler which formally marks the web component as ready, including
         * dispatching a customer event. It's important for this to be it's own
         * handler, called after wiating for the next animation frame, in order
         * for smooth effects (like a panel layout sliding out properly when
         * it's set to be shown immediately upon DOM load).
         * 
         * @access  private
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        #__handleReadyEvent() {
            this.#__mounted = true;
            this.#__ready = true;
            this.dispatchCustomEvent('ready');
            return this;
        }

        /**
         * #__handleRenderEvent
         * 
         * @access  private
         * @return  Promise
         */
        #__handleRenderEvent() {
            try {
                this.#__mountRoot();
                this.#__helpers.webComponentUI.setupConfigHelperCustomEventListeners();
                this.#__helpers.webComponentUI.setAttributes();
                this.#__helpers.webComponentUI.autoShow();
            } catch (err) {
                let debug = this.#__helpers.config.get('debug');
                if (debug === true) {
                    console.log(err);
                    console.trace();
                }
            }
            let handler = this.#__handleReadyEvent.bind(this),
                promise = window.annexSearch.ElementUtils.waitForAnimation().then(handler);
            return promise;
        }

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
         * #__render
         * 
         * @access  private
         * @return  Promise
         */
        #__render() {
            let handler = this.#__handleRenderEvent.bind(this),
                $annexSearchWidget = this,
                promise = this.#__helpers.config.loadStylesheets(this).then(handler).catch(function(error) {
                    return $annexSearchWidget;
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
         * #__validMountAttempt
         * 
         * @access  private
         * @return  Boolean
         */
        #__validMountAttempt() {
            let $registered = window.annexSearch.AnnexSearch.getRegistered();
            for (let $annexSearchWidget of $registered) {
                if (this === $annexSearchWidget) {
                    continue;
                }
                let keyboardShortcut = this.getConfig('keyboardShortcut');
                if (keyboardShortcut === null) {
                    continue;
                }
                if (keyboardShortcut === $annexSearchWidget.getConfig('keyboardShortcut')) {
                    this.setConfig('keyboardShortcut', null);
                    let message = window.annexSearch.ErrorUtils.getMessage('annexSearchWidget.keyboardShortcut.reserved', keyboardShortcut);
                    this.#__helpers.webComponentUI.error(message);
                    break;
                }
            }
            return true;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Promise
         */
        blur() {
            let focused = this.focused();
            if (focused === false) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(this);
                return promise;
            }
            window.annexSearch.AnnexSearch.setFocused(null);
            let $annexSearchWidget = this,
                promise = this.#__helpers.webComponentUI.blur();
            return promise;
        }

        /**
         * clear
         * 
         * @access  public
         * @return  Boolean
         */
        clear() {
            let field = this.getView('root').getView('root.header.field'),
                found = this.getView('root').getView('body.results.found');
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * disable
         * 
         * @access  public
         * @return  Boolean
         */
        disable() {
            if (this.#__disabled === true) {
                return false;
            }
            this.#__disabled = true;
            this.#__helpers.webComponentUI.disable();
            return true;
        }

        /**
         * disabled
         * 
         * @access  public
         * @return  Boolean
         */
        disabled() {
            let response = this.#__disabled;
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
         * enable
         * 
         * @access  public
         * @return  Boolean
         */
        enable() {
            if (this.#__disabled === false) {
                return false;
            }
            this.#__disabled = false;
            this.#__helpers.webComponentUI.enable();
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Promise
         */
        focus() {
            let focused = this.focused();
            if (focused === true) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(this);
                return promise;
            }
            window.annexSearch.AnnexSearch.setFocused(this);
            this.#__helpers.webComponentUI.focus();
            let $annexSearchWidget = this,
                promise = this.getView('root').focus().then(function() {
                    return $annexSearchWidget;
                });
            return promise;
        }

        /**
         * focused
         * 
         * @access  public
         * @return  Boolean
         */
        focused() {
            let focused = window.annexSearch.AnnexSearch.getFocused() === this;
            return focused;
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
         * getFocused
         * 
         * @access  public
         * @return  null|EventTarget
         */
        getFocused() {
            let root = this.getView('root'),
                $focused = root.getFocused();
            return $focused;
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
         * getMutator
         * 
         * @access  public
         * @param   String key
         * @param   Function mutator
         * @return  Boolean
         */
        getMutator(key) {
            let mutator = this.#__mutators[key] || null;
            return mutator;
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
         * @return  Promise
         */
        hide() {
            if (this.getConfig('layout') === 'inline') {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            if (this.#__showing === false) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            this.#__showing = false;
            window.annexSearch.AnnexSearch.clearFocused();
            let promise = this.#__helpers.webComponentUI.hide();
            return promise;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   null|EventTarget $container (default: null)
         * @return  Promise
         */
        mount($container = null) {
            $container = this.#__getContainer($container);
            if ($container === null) {
                this.#__mounted = false;
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(this);
                return promise;
            }
            if (this.#__validMountAttempt() === false) {
                this.#__mounted = false;
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(this);
                return promise;
            }
            let promise = this.#__render();
            $container.appendChild(this);
            return promise;
        }

        /**
         * mounted
         * 
         * @access  public
         * @return  Boolean
         */
        mounted() {
            let mounted = this.#__mounted;
            return mounted;
        }

        /**
         * partiallyVisible
         * 
         * @access  public
         * @return  Boolean
         */
        partiallyVisible() {
            let $element = this,
                partiallyVisible = window.annexSearch.ElementUtils.partiallyVisible($element);
            return partiallyVisible;
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
         * setMutator
         * 
         * @access  public
         * @param   String key
         * @param   Function mutator
         * @return  Boolean
         */
        setMutator(key, mutator) {
            this.#__mutators[key] = mutator;
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Promise
         */
        show() {
            if (this.#__showing === true) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            this.#__showing = true;
            let $annexSearchWidget = this,
                promise = this.#__helpers.webComponentUI.show();
            return promise;
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
         * showTimer
         * 
         * @access  public
         * @param   Number seconds
         * @return  Promise
         */
        showTimer(seconds) {
            let options = {seconds},
                view = window.annexSearch.TimerUtils.build(this, options),
                promise = view.show();
            return promise;
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
         * @return  Promise
         */
        toggle() {
            this.#__helpers.webComponentUI.toggle();
            if (this.#__showing === true) {
                let promise = this.hide();
                return promise;
            }
            let promise = this.show();
            return promise;
        }
    }
});
