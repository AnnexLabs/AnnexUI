
/**
 * /src/js/requests/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.BaseRequest
     * 
     * @extends window.annexSearch.Base
     */
    window.annexSearch.BaseRequest = window.annexSearch.BaseRequest || class BaseRequest extends window.annexSearch.Base {

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  void
         */
        constructor($annexSearchWidget) {
            super($annexSearchWidget);
        }
    }
});
