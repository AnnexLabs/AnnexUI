
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
         * isMac
         *
         * @access  public
         * @static
         * @return  Boolean
         */
        static isMac() {
            let mac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            return mac;
        }

        /**
         * isTouchDevice
         *
         * @see     https://chatgpt.com/c/68a00e40-f680-8330-92bc-978befdd0db6
         * @see     https://chatgpt.com/c/68a3d3e5-12fc-8320-9ed8-94cc0262429e
         * @access  public
         * @static
         * @return  Boolean
         */
        static isTouchDevice() {
            let touchDevice = (('ontouchstart' in window)
                || (navigator.maxTouchPoints > 0)
                || (navigator.msMaxTouchPoints > 0));
            return touchDevice;
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
