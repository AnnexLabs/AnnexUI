
/**
 * /src/js/views/Root.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.RootView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.RootView = window.annexSearch.RootView || class RootView extends window.annexSearch.BaseView {

        /**
         * #__$focused
         * 
         * @access  private
         * @var     null|EventTarget (default: null)
         */
        #__$focused = null;

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="RootView" data-state-key="idle" part="root">
    <div class="overlay" part="root-overlay"></div>
    <div class="content" part="root-content">
        <div class="disabled" part="root-content-disabled"></div>
    </div>
</div>`;

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            this.#__addFocusinEventListener();
            this.#__addOverlayClickEventListener();
            return true;
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this);
            this.click(handler);
            return true;
        }

        /**
         * #__addFocusinEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addFocusinEventListener() {
            let handler = this.#__handleFocusinEvent.bind(this);
            this.event('focusin', handler);
            return true;
        }

        /**
         * #__addOverlayClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addOverlayClickEventListener() {
            let handler = this.#__handleOverlayClickEvent.bind(this);
            this.click(handler);
            return true;
        }

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let $annexSearchWidget = this._$annexSearchWidget;
            // window.annexSearch.AnnexSearch.setFocused($annexSearchWidget);
            $annexSearchWidget.focus();
            return true;
        }

        /**
         * #__handleFocusinEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleFocusinEvent(event) {
            let $target = event.target,
                $annexSearchWidget = this._$annexSearchWidget;
            this.#__$focused = $target;
            $annexSearchWidget.focus();
            // window.annexSearch.AnnexSearch.setFocused($annexSearchWidget);
            return true;
        }

        /**
         * #__handleOverlayClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleOverlayClickEvent(event) {
            let showOverlay = this.getHelper('config').get('showOverlay');
            if (showOverlay === false) {
                return false;
            }
            let $target = event.target;
            if ($target === null) {
                return false;
            }
            if ($target === undefined) {
                return false;
            }
            if ($target.matches('.overlay') === true) {
                this._$annexSearchWidget.hide();
                return true;
            }
            return false;
        }

        /**
         * #__mountBody
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountBody() {
            let view = new window.annexSearch.BodyView(this._$annexSearchWidget),
                $container = this.first('.content');
            this.setView('body', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountFooter
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountFooter() {
            let view = new window.annexSearch.FooterView(this._$annexSearchWidget),
                $container = this.first('.content');
            this.setView('footer', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountHeader
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountHeader() {
            let view = new window.annexSearch.HeaderView(this._$annexSearchWidget),
                $container = this.first('.content');
            this.setView('header', view);
            view.mount($container);
            return true;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let response = this.getView('header').blur();
            return response;
        }

        /**
         * focus
         * 
         * @see     https://chatgpt.com/c/68ac9354-94e0-8320-beba-7538d46813f4
         * @access  public
         * @return  Promise
         */
        focus() {
            if (this._$annexSearchWidget.disabled() === true) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            let $focused = this.#__$focused;
            if ($focused === null) {
                let promise = this.getView('header').focus();
                return promise;
            }
            if (this._$annexSearchWidget.shadow.contains($focused) === false) {
                let promise = this.getView('header').focus();
                return promise;
            }
            let promise = window.annexSearch.ElementUtils.focus($focused);
            return promise;
        }

        /**
         * getFocused
         * 
         * @access  public
         * @return  null|EventTarget
         */
        getFocused() {
            let $focused = this.#__$focused;
            return $focused;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   EventTarget $container
         * @return  Boolean
         */
        mount($container) {
            super.mount($container);
            this.#__mountHeader();
            this.#__mountBody();
            this.#__mountFooter();
            this._$annexSearchWidget.getHelper('config').triggerCallback('results.idle');
            this._$annexSearchWidget.dispatchCustomEvent('results.idle');
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            super.render();
            this.#__addEvents();
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
            this._$element.setAttribute('data-state-key', stateKey);
            return true;
        }
    }
});
