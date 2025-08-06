
/**
 * /src/js/views/RootView.js
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
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            window.annexSearch.KeyboardShortcutUtils.setup();
            this._addOverlayClickEventListener();
            return true;
        }

        /**
         * _addOverlayClickEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addOverlayClickEventListener() {
            let $element = this._$element,
                handler = this._handleOverlayClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * _drawBody
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawBody() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('body', $content);
            this.setView('body', view);
            return true;
        }

        /**
         * _drawFooter
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawFooter() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('footer', $content);
            this.setView('footer', view);
            return true;
        }

        /**
         * _drawHeader
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawHeader() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('header', $content);
            this.setView('header', view);
            return true;
        }

        /**
         * _handleOverlayClickEvent
         * 
         * @access  public
         * @param   Object event
         * @return  Boolean
         */
        _handleOverlayClickEvent(event) {
            let $target = event.target;
            if ($target === this._$element) {
                // event.preventDefault();
                // event.stopPropagation();
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
            this._drawHeader();
            this._drawBody();
            this._drawFooter();
            super.render();
            this.setState('idle');
            return true;
        }

        /**
         * setState
         * 
         * @access  public
         * @param   String stateKey
         * @return  Boolean
         */
        setState(stateKey) {
            this._$element.setAttribute('data-state-key', stateKey);
            return true;
        }
    }
});
