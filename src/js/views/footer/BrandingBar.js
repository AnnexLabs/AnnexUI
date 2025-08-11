
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
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="BrandingBarFooterView">
    Powered by <a href="https://annexsearch.com/" target="_blank">Annex Search</a>
</div>`;
    }
});
