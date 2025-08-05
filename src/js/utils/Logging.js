
/**
 * window.typesenseInstantSearch.LoggingUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.LoggingUtils = window.typesenseInstantSearch.LoggingUtils || class LoggingUtils {

    /**
     * log
     * 
     * @access  public
     * @static
     * @return  Boolean
     */
    static log() {
        let logging = window.typesenseInstantSearch.ConfigUtils.get('logging');
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
    //     let logging = window.typesenseInstantSearch.ConfigUtils.get('logging');
    //     if (logging === false) {
    //         return false;
    //     }
    //     window.console && window.console.log && window.console.log.apply(window, arguments);
    //     return true;
    // }
}
