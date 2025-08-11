
/**
 * /src/js/views/body/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ErrorBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ErrorBodyView = window.annexSearch.ErrorBodyView || class ErrorBodyView extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="ErrorBodyView">
    <%
        let message = data?.config?.copy?.error?.message ?? 'Something went wrong...';
        message = message.trim();
    %>
    <div class="graphic"></div>
    <div class="message"><%= (message) %></div>
</div>`;
    }
});
