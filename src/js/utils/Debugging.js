
/**
 * /src/js/utils/Debugging.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.DebuggingUtils
     * 
     * @access  public
     */
    window.annexSearch.DebuggingUtils = window.annexSearch.DebuggingUtils || class {

        /**
         * log
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static log() {
            let debug = this.getHelper('config').get('debug');
            if (debug === false) {
                return false;
            }
            let response = window.annexSearch.LoggingUtils.debug.apply(
                window.annexSearch.LoggingUtils,
                arguments
            );
            return response;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            return true;
        }
    }
});
