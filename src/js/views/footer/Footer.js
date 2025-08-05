
/**
 * /src/js/views/footer/Footer.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FooterView = window.annexSearch.FooterView || class FooterView extends window.annexSearch.BaseView {

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
            let view = window.annexSearch.ElementUtils.renderTemplate('brandingBarFooter', this._$element);
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
            let view = window.annexSearch.ElementUtils.renderTemplate('statusBarFooter', this._$element);
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
