
/**
 * /src/js/utils/Data.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.DataUtils
     * 
     * @access  public
     */
    window.annexSearch.DataUtils = window.annexSearch.DataUtils || class extends window.annexSearch.BaseUtils {

        /**
         * copyToClipboard
         * 
         * @see     https://chatgpt.com/c/6899376c-1860-832a-8a04-1e8135f98a00
         * @access  public
         * @static
         * @param   String str
         * @return  Promise
         */
        static copyToClipboard(str) {
            let promise = window.navigator.clipboard.writeText(str);
            return promise;
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
