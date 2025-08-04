
/**
 * /src/js/views/header/Header.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.HeaderView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.HeaderView = window.typesenseInstantSearch.HeaderView || class HeaderView extends window.typesenseInstantSearch.BaseView {

        /**
         * _showingSpinner
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _showingSpinner = false;

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
         * _addClickEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addClickEventListener() {
            let handler = this._handleClickEvent.bind(this),
                $element = this._$element;
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * _addCloseClickEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addCloseClickEventListener() {
            let handler = this._handleCloseClickEvent.bind(this),
                $element = this.first('.close');
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this._addClickEventListener();
            this._addCloseClickEventListener();
            return true;
        }

        /**
         * _drawField
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawField() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('fieldHeader', this._$element);
            this.setView('field', view);
            return true;
        }

        /**
         * _drawMetaBar
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawMetaBar() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('metaBarHeader', this._$element);
            this.setView('metaBar', view);
            return true;
        }

        /**
         * _handleClickEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleClickEvent(event) {
            let $target = event.target,
                $close = this.first('.close');
            if ($target === $close) {
                return false;
            }
            this.focus();
            return true;
        };

        /**
         * _handleCloseClickEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleCloseClickEvent(event) {
            this.hideWebComponent();
            return false;
        };

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let response = this.getView('field').blur();
            return response;
        }

        /**
         * focus
         * 
         * @access  public
         * @param   Boolean scrollToTop (default: true);
         * @return  Boolean
         */
        focus() {//scrollToTop = true) {
            let response = this.getView('field').focus();//scrollToTop);
            return response;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this._drawField();
            this._drawMetaBar();
            super.render();
            // this._addEvents();
            return true;
        }

        /**
         * hideSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        hideSpinner() {
            if (this._showingSpinner === false) {
                return false;
            }
            this._showingSpinner = false;
            this.getWebComponent().getView('root').setAttribute('data-searching', '0');
            return true;
        }

        /**
         * showSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        showSpinner() {
            if (this._showingSpinner === true) {
                return false;
            }
            this._showingSpinner = true;
            this.getWebComponent().getView('root').setAttribute('data-searching', '1');
            return true;
        }

        /**
         * toggleSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        toggleSpinner() {
            if (this._showingSpinner === true) {
                let response = this.hideSpinner();
                return response;
            }
            let response = this.showSpinner();
            return response;
        }
    }
});
