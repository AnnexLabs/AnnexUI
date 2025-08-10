
/**
 * /src/js/utils/String.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.StringUtils
     * 
     * @access  public
     */
    window.annexSearch.StringUtils = window.annexSearch.StringUtils || class extends window.annexSearch.BaseUtils {

        /**
         * generateUUID
         * 
         * @see     https://chatgpt.com/c/689421e4-c708-8328-b5df-95b6028facf2
         * @access  public
         * @static
         * @return  String
         */
        static generateUUID() {
            let uuid = '', i, random;
            for (i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid += '-';
                } else if (i === 14) {
                    uuid += '4';
                } else if (i === 19) {
                    random = Math.random() * 16 | 0;
                    uuid += (random & 0x3 | 0x8).toString(16);
                } else {
                    random = Math.random() * 16 | 0;
                    uuid += random.toString(16);
                }
            }
            return uuid;
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
