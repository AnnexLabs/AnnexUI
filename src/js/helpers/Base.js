
/**
 * /src/js/helpers/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.BaseHelper
     * 
     * @access  public
     * @extends window.annexSearch.Base
     */
    window.annexSearch.BaseHelper = window.annexSearch.BaseHelper || class extends window.annexSearch.Base {

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
