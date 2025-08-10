
/**
 * /src/js/utils/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.BaseUtils
     * 
     * @access  public
     */
    window.annexSearch.BaseUtils = window.annexSearch.BaseUtils || class {

        /**
         * #__setup
         * 
         * @access  private
         * @static
         * @var     Boolean (default: false)
         */
        static #__setup = false;

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            if (document === null) {
                return false;
            }
            if (document === undefined) {
                return false;
            }
            if (document.readyState === 'complete') {
                return true;
            }
            if (document.readyState === 'interactive') {
                return true;
            }
            return false
        }
    }
});
