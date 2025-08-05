
/**
 * window.typesenseInstantSearch.DataUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.DataUtils = window.typesenseInstantSearch.DataUtils || class DataUtils {

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
     * deepMerge
     * 
     * @see     https://claude.ai/chat/1af14a8b-4076-4d73-ad69-69aa4ee03c7a
     * @access  public
     * @static
     * @param   Object target
     * @param   Object source
     * @return  Promise
     */
    static deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
                        result[key] = this.deepMerge(result[key], source[key]);
                    } else {
                        result[key] = this.deepMerge({}, source[key]);
                    }
                } else {
                    result[key] = source[key];
                }
            }
        }
        return result;
    }

    /**
     * getDelayedPromise
     * 
     * @see     https://chatgpt.com/c/682aa846-11c4-800f-acc4-2b556cf72595
     * @access  public
     * @static
     * @param   Number delay
     * @return  Promise
     */
    static getDelayedPromise(delay, ... args) {
        let promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(args[0]);
            }, delay);
        });
        return promise;
    }

    /**
     * waitForAnimation
     * 
     * @see     https://chatgpt.com/c/682a39f4-d464-800f-bd7c-9793d2bf0349
     * @access  public
     * @static
     * @return  Promise
     */
    static waitForAnimation() {
        let promise = new Promise(function(resolve, reject) {
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    resolve();
                });
            });
        });
        return promise;
    }
}
