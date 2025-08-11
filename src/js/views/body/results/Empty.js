
/**
 * /src/js/views/body/results/Empty.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.EmptyResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.EmptyResultsBodyView = window.annexSearch.EmptyResultsBodyView || class EmptyResultsBodyView extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="EmptyResultsBodyView">
    <%
        let message = data?.config?.copy?.empty?.message ?? 'Something went wrong...';
        message = message.trim();
    %>
    <div class="graphic"></div>
    <div class="message"><%= (message) %></div>
</div>`;
    }
});
