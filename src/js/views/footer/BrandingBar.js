
/**
 * /src/js/views/footer/BrandingBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.BrandingBarFooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.BrandingBarFooterView = window.annexSearch.BrandingBarFooterView || class BrandingBarFooterView extends window.annexSearch.BaseView {

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="BrandingBarFooterView" part="brandingBar">
    Built with <a href="https://annexsearch.com/" target="_blank" part="brandingBar-anchor">Annex</a>
    <!--Powered by <a href="https://annexsearch.com/" target="_blank">Annex</a>-->
</div>`;
    }
});
