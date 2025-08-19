
/**
 * /src/js/utils/Client.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ClientUtils
     * 
     * @access  public
     */
    window.annexSearch.ClientUtils = window.annexSearch.ClientUtils || class ClientUtils extends window.annexSearch.BaseUtils {

        /**
         * copyToClipboard
         * 
         * @see     https://chatgpt.com/c/6899376c-1860-832a-8a04-1e8135f98a00
         * @see     https://chatgpt.com/c/689cd2f3-acf8-8326-883a-601ac7ad320b
         * @access  public
         * @static
         * @param   String str
         * @return  Promise
         */
        static copyToClipboard(str) {
            let promise = window.navigator.clipboard.writeText(str).catch(function() {
                let message = window.annexSearch.ErrorUtils.getMessage('clientUtils.copyToClipboard.failed');
                this.error(message);
            });
            return promise;
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
