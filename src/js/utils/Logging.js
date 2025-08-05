
/**
 * window.annexSearch.LoggingUtils
 * 
 * @access  public
 */
window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class LoggingUtils {

    /**
     * log
     * 
     * @access  public
     * @static
     * @return  Boolean
     */
    static log() {
        let logging = window.annexSearch.ConfigUtils.get('logging');
        if (logging === false) {
            return false;
        }
        window.console && window.console.log && window.console.log.apply(window, arguments);
        return true;
    }

    /**
     * time
     * 
     * @access  public
     * @static
     * @param   String label
     * @return  Boolean
     */
    // static time(label) {
    //     let logging = window.annexSearch.ConfigUtils.get('logging');
    //     if (logging === false) {
    //         return false;
    //     }
    //     window.console && window.console.log && window.console.log.apply(window, arguments);
    //     return true;
    // }
}
