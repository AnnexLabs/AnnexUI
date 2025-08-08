
/**
 * /src/js/utils/Cache.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.CacheUtils
     * 
     * @access  public
     */
    window.annexSearch.CacheUtils = window.annexSearch.CacheUtils || class {

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
