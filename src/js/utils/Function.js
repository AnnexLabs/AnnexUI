
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
    window.annexSearch.FunctionUtils = window.annexSearch.FunctionUtils || class FunctionUtils extends window.annexSearch.BaseUtils {

        /**
         * #__callHistory
         * 
         * @access  private
         * @static
         * @var     Map
         */
        static #__callHistory = new Map();

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
            return function(...args) {
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
         * @param   ... args
         * @return  Promise
         */
        static getEmptyPromise(...args) {
            let promise = new Promise(function(resolve, reject) {
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
         * getPromise
         * 
         * @access  public
         * @static
         * @return  Promise
         */
        // static getPromise() {
        //     let args = Array.from(arguments),
        //         promise = new Promise(function(resolve, reject) {
        //             resolve.apply(window, args);
        //         });
        //     return promise;
        // }

        /**
         * limitReached
         * 
         * @see     https://claude.ai/chat/40050455-7300-4a08-bae1-7c0fe3347885
         * @access  public
         * @static
         * @param   Function fn
         * @param   Number maxCalls
         * @param   Number milliseconds
         * @return  Boolean
         */
        static limitReached(fn, maxCalls, milliseconds) {
            let now = Date.now();
            if (this.#__callHistory.has(fn) === false) {
                this.#__callHistory.set(fn, []);
            }
            let callTimes = this.#__callHistory.get(fn),
                cutoffTime = now - milliseconds;
            while (callTimes.length > 0 && callTimes[0] <= cutoffTime) {
                callTimes.shift();
            }
            if (callTimes.length >= maxCalls) {
                return true;
            }
            callTimes.push(now);
            return false;
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
