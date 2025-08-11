
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
        <%
            let showing = 0;
            if (data.typesenseSearchResponse) {
                showing = (data.typesenseSearchResponse.page - 1) * (data.typesenseSearchResponse.request_params.per_page) + data.typesenseSearchResponse.hits.length;
            }
        %>
<div data-view-name="MetaBarHeaderView">
    Showing
    <span class="showing"><%- (showing) %></span> of
    <span class="found"><%- data?.typesenseSearchResponse?.found ?? 0 %></span>
    matching results
    (<span class="duration"><%- data?.typesenseSearchResponse?.search_time_ms ?? 0 %>ms</span>)
</div>`;
    }
});
