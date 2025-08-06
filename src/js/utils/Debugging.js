
/**
 * /src/js/utils/Debugging.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.DebuggingUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.DebuggingUtils = window.annexSearch.DebuggingUtils || class DebuggingUtils extends window.annexSearch.BaseView {

        /**
         * log
         * 
         * @access  public
         * @return  Boolean
         */
        log() {
            let debug = window.annexSearch.ConfigUtils.get('debug');
            if (debug === false) {
                return false;
            }
            let response = window.annexSearch.LoggingUtils.debug.apply(
                window.annexSearch.LoggingUtils,
                arguments
            );
            return response;
        }
    }
    window.annexSearch.DebuggingUtils = new window.annexSearch.DebuggingUtils();
});
