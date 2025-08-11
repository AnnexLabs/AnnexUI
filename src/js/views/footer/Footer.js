
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
    window.annexSearch.FooterView = window.annexSearch.FooterView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div class="clearfix" data-view-name="FooterView">
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
         * #__drawBrandingBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawBrandingBar() {
            let view = window.annexSearch.ElementUtils.renderTemplate('brandingBarFooter', this._$element);
            this.setView('brandingBar', view);
            return true;
        }

        /**
         * #__drawStatusBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawStatusBar() {
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
            this.#__drawBrandingBar();
            this.#__drawStatusBar();
            super.render();
            return true;
        }
    }
});
