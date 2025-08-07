
/**
 * /src/js/utils/Function.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FunctionUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FunctionUtils = window.annexSearch.FunctionUtils || class FunctionUtils extends window.annexSearch.BaseView {

        /**
         * #__triggerWebComponentEvent
         * 
         * @access  private
         * @param   String eventName
         * @param   Array args
         * @return  Boolean
         */
        #__triggerWebComponentEvent(eventName, args) {
            let $annexSearchWidget = this.getWebComponent(),
                event = new CustomEvent(eventName, {
                    detail: args
                });
            $annexSearchWidget.dispatchEvent(event);
            return true;
        }

        /**
         * debounce
         * 
         * @see     https://chatgpt.com/c/674ebab2-ff0c-800f-a44b-74e72f9e99f8
         * @access  public
         * @param   Function func
         * @param   Number delay
         * @return  Function
         */
        debounce(func, delay) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(this, args);
                }, delay);
            };
        }

        /**
         * getDelayedPromise
         * 
         * @see     https://chatgpt.com/c/682aa846-11c4-800f-acc4-2b556cf72595
         * @access  public
         * @param   Boolean resolve
         * @param   Number delay
         * @return  Promise
         */
//         getDelayedPromise(resolve, delay, ... args) {
//             let promise = new Promise(function(resolve, reject) {
// console.log('123solving');
//                 setTimeout(function() {
//                     if (resolve === true) {
// console.log('resolving');
//                         resolve(args[0]);
//                     } else {
//                         reject(args[0]);
//                     }
//                 }, delay);
//             });
//             return promise;
//         }

        /**
         * getEmptyPromise
         * 
         * @access  public
         * @return  Promise
         */
        getEmptyPromise() {
            let args = Array.from(arguments),
                promise = new Promise(function(resolve, reject) {
                    resolve.apply(window, args);
                });
            return promise;
        }

        /**
         * triggerCallback
         * 
         * @see     https://chatgpt.com/c/68942c36-15a0-8328-a9aa-a0a5e682af61
         * @access  public
         * @param   String key
         * @param   Array args
         * @return  Boolean
         */
        triggerCallback(key, ...args) {
            let reference = window.annexSearch.ConfigUtils.get('callbacks') || {},
                pieces = key.split('.');
            for (var piece of pieces) {
                reference = reference[piece] ?? null;
                if (reference === null) {
                    return false;
                }
            }
            let $annexSearchWidget = this.getWebComponent();
            this.#__triggerWebComponentEvent(key, args.slice());
            args.unshift($annexSearchWidget);
            reference.apply(window, args);
            return true;
        }
    }
    window.annexSearch.FunctionUtils = new window.annexSearch.FunctionUtils();
});
