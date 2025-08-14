
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
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="RootView" data-state-key="idle">
    <div class="content"></div>
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
        };

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
        };

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
        };

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let $annexSearchWidget = this.getWebComponent();
            window.annexSearch.AnnexSearch.setFocused($annexSearchWidget);
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
            let $annexSearchWidget = this.getWebComponent();
            window.annexSearch.AnnexSearch.setFocused($annexSearchWidget);
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
            if ($target === this._$element) {
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
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('header').focus();
            return response;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container
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
