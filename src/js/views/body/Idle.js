
/**
 * /src/js/views/body/Idle.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.IdleBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.IdleBodyView = window.annexSearch.IdleBodyView || class IdleBodyView extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="IdleBodyView">
    <%
        let message = data?.config?.copy?.idle?.message ?? 'Start typing to begin your search...';
        message = message.trim();
    %>
    <div class="graphic"></div>
    <div class="message"><%- (message) %></div>
</div>`;
    }
});
