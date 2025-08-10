
/**
 * /src/js/utils/Logging.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.LoggingUtils
     * 
     * @access  public
     */
    window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__labels
         * 
         * @access  private
         * @static
         * @var     String (default: 'Annex Search')
         */
        static #__labels = {
            error: 'Annex Search',
        };

        /**
         * error
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static error() {
            let message = '%c[' + (this.#__labels.error) + ']',
                styles = 'color: red; font-weight: bold; font-family: monospace;',
                args = Array.from(arguments);
            args.unshift(styles);
            args.unshift(message);
            window.console && window.console.log && window.console.log.apply(window, args);
            return true;
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
