
/**
 * window.annexSearch.DebuggingUtils
 * 
 * @access  public
 */
window.annexSearch.DebuggingUtils = window.annexSearch.DebuggingUtils || class DebuggingUtils {

    /**
     * log
     * 
     * @access  public
     * @static
     * @return  Boolean
     */
    static log() {
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
