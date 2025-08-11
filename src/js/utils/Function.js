
/**
 * /src/js/utils/Function.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.FunctionUtils
     * 
     * @access  public
     */
    window.annexSearch.FunctionUtils = window.annexSearch.FunctionUtils || class extends window.annexSearch.BaseUtils {

        /**
         * debounce
         * 
         * @see     https://chatgpt.com/c/674ebab2-ff0c-800f-a44b-74e72f9e99f8
         * @access  public
         * @static
         * @param   Function func
         * @param   Number delay
         * @return  Function
         */
        static debounce(func, delay) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(this, args);
                }, delay);
            };
        }

        /**
         * getEmptyPromise
         * 
         * @access  public
         * @static
         * @return  Promise
         */
        static getEmptyPromise() {
            let args = Array.from(arguments),
                promise = new Promise(function(resolve, reject) {
                    resolve.apply(window, args);
                });
            return promise;
        }

        /**
         * getPassThrough
         * 
         * @access  public
         * @static
         * @param   mixed value
         * @return  Function
         */
        static getPassThrough() {
            let fn = function(value) {
                return value;
            };
            return fn;
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
