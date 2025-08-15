
/**
 * /src/js/views/footer/StatusBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.StatusBarFooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.StatusBarFooterView = window.annexSearch.StatusBarFooterView || class StatusBarFooterView extends window.annexSearch.BaseView {

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="StatusBarFooterView" part="statusBar">
    <%
        let val = data.config.copy.statusBar.message;
    %>
    <div class="message truncate" part="statusBar-message"><%- (val) %></div>
</div>`;
    }
});
