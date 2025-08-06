
/**
 * window.annexSearch.LoggingUtils
 * 
 * @access  public
 */
window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class LoggingUtils {

    /**
     * #__colorCodes
     * 
     * @static
     * @access  private
     * @var     Object
     */
    static #__colorCodes = {
        green: '\x1b[32m',
        red: '\x1b[31m',
        reset: '\x1b[0m',
    };

    /**
     * #__labels
     * 
     * @static
     * @access  private
     * @var     String (default: 'Annex Search')
     */
    static #__labels = {
        debug: '🐞 Annex Search',
        message: 'Annex Search'
    };

    /**
     * debug
     * 
     * @access  public
     * @static
     * @return  Boolean
     */
    static debug() {
        for (let arg of arguments) {
            let message = (this.#__colorCodes.red) + '[' + (this.#__labels.debug) + '] ' + (this.#__colorCodes.reset);
            window.console && window.console.log && window.console.log(message, arg);
        }
        return true;
    }

    /**
     * message
     * 
     * @access  public
     * @static
     * @return  Boolean
     */
    static message() {
        for (let arg of arguments) {
            let message = (this.#__colorCodes.green) + '[' + (this.#__labels.message) + '] ' + (this.#__colorCodes.reset);
            window.console && window.console.log && window.console.log(message, arg);
        }
        return true;
    }
}
