
/**
 * /src/js/views/header/MetaBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.MetaBarHeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.MetaBarHeaderView = window.annexSearch.MetaBarHeaderView || class MetaBarHeaderView extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="MetaBarHeaderView">
    Showing
    <span class="showing"><%- data?.typesenseSearchResponse?.found ?? 0 %></span> of
    <span class="found"><%- data?.typesenseSearchResponse?.found ?? 0 %></span>
    matching results
</div>`;
    }
});
