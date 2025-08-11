
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
    window.annexSearch.RootView = window.annexSearch.RootView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="RootView" data-state-key="idle">
    <div class="content"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            // window.annexSearch.KeyboardShortcutUtils.setup();
            this.#__addOverlayClickEventListener();
            return true;
        }

        /**
         * #__addOverlayClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addOverlayClickEventListener() {
            let $element = this._$element,
                handler = this.#__handleOverlayClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__drawBody
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawBody() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('body', $content);
            this.setView('body', view);
            return true;
        }

        /**
         * #__drawFooter
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawFooter() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('footer', $content);
            this.setView('footer', view);
            return true;
        }

        /**
         * #__drawHeader
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawHeader() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('header', $content);
            this.setView('header', view);
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
            let $target = event.target;
            if ($target === this._$element) {
                this.getWebComponent().hide();
                return true;
            }
            return false;
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
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawHeader();
            this.#__drawBody();
            this.#__drawFooter();
            this.#__addEvents();
            this.setStateKey('idle');
            this.getWebComponent().dispatchCustomEvent('results.idle');
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
