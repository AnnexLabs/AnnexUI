window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FunctionUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FunctionUtils = window.annexSearch.FunctionUtils || class FunctionUtils extends window.annexSearch.BaseView {

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
        getDelayedPromise(resolve, delay, ... args) {
            var promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if (resolve === true) {
                        resolve(args[0]);
                    } else {
                        reject(args[0]);
                    }
                }, delay);
            });
            return promise;
        }
    }
    window.annexSearch.FunctionUtils = new window.annexSearch.FunctionUtils();
});
