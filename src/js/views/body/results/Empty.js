
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
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="EmptyResultsBodyView" part="empty">
    <%
        let message = data?.config?.copy?.empty?.message ?? 'Something went wrong...';
        message = message.trim();
    %>
    <div class="graphic" part="empty-graphic"></div>
    <div class="message" part="empty-message"><%= (message) %></div>
</div>`;
    }
});
