
/**
 * /src/js/utils/Cache.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.CacheUtils
     * 
     * @note    Not currently used (was being used with template loading).
     *          Leaving in for now, as it's likely to be useful with plugins and
     *          remote data requests later (e.g. GDPR).
     * @access  public
     */
    window.annexSearch.CacheUtils = window.annexSearch.CacheUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__data
         * 
         * @access  private
         * @static
         * @var     Object (default: {})
         */
        static #__data = {};

        /**
         * get
         * 
         * @access  public
         * @static
         * @param   String key
         * @return  undefined|Boolean
         */
        static get(key) {
            let value = this.#__data[key];
            if (value === undefined) {
                return undefined;
            }
            return value;
        }

        /**
         * set
         * 
         * @access  public
         * @static
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        static set(key, value) {
            this.#__data[key] = value;
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
