
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
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div class="clearfix" data-view-name="FooterView">
</div>`;

        /**
         * #__mountBrandingBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountBrandingBar() {
            let view = new window.annexSearch.BrandingBarFooterView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('brandingBar', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountStatusBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountStatusBar() {
            let view = new window.annexSearch.StatusBarFooterView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('statusBar', view);
            view.mount($container);
            return true;
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
            this.#__mountBrandingBar();
            this.#__mountStatusBar();
            return true;
        }
    }
});
