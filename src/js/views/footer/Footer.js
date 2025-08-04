
/**
 * /src/js/views/footer/Footer.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.FooterView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.FooterView = window.typesenseInstantSearch.FooterView || class FooterView extends window.typesenseInstantSearch.BaseView {

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
         * _drawBrandingBar
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawBrandingBar() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('brandingBarFooter', this._$element);
            this.setView('brandingBar', view);
            return true;
        }

        /**
         * _drawStatusBar
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawStatusBar() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('statusBarFooter', this._$element);
            this.setView('statusBar', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this._drawBrandingBar();
            this._drawStatusBar();
            super.render();
            return true;
        }
    }
});
