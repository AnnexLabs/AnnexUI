
/**
 * /src/js/utils/Vendor.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.VendorUtils
     * 
     * @access  public
     */
    window.annexSearch.VendorUtils = window.annexSearch.VendorUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__setupLodash
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__setupLodash() {
            let lodash = _.noConflict();
            window.annexSearch.libs = window.annexSearch.libs || {};
            window.annexSearch.libs._ = lodash;
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
            this.#__setupLodash();
            return true;
        }
    }
});
