
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
    window.annexSearch.DataUtils = window.annexSearch.DataUtils || class DataUtils extends window.annexSearch.BaseUtils {

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
                let message = window.annexSearch.ErrorUtils.getMessage('dataUtils.copyToClipboard.failed');
                this.error(message);
            });
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
        // static deepMerge_(target, source) {
        //     const result = { ...target };
        //     for (const key in source) {
        //         if (source.hasOwnProperty(key)) {
        //             if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        //                 if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
        //                     result[key] = this.deepMerge(result[key], source[key]);
        //                 } else {
        //                     result[key] = this.deepMerge({}, source[key]);
        //                 }
        //             } else {
        //                 // console.log('w00t', key);
        //                 result[key] = source[key];
        //             }
        //         }
        //     }
        //     return result;
        // }

        /**
         * deepMerge
         * 
         * @see     https://chatgpt.com/c/689bb7c4-cd40-8332-a1bd-a585ad5eef06
         * @access  public
         * @static
         * @param   Object target
         * @param   Object source
         * @param   Function onReplace
         * @return  Promise
         */
        static deepMerge(target, source, onReplace) {
            function isPlainObject(value) {
                return Object.prototype.toString.call(value) === "[object Object]";
            }
            function arraysEqualShallow(a, b) {
                if (!Array.isArray(a) || a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) return false;
                }
                return true;
            }
            function _merge(t, s, path) {
                path = path || [];
                if (!isPlainObject(s)) return t;

                for (let key in s) {
                    if (!Object.prototype.hasOwnProperty.call(s, key)) continue;
                    let sVal = s[key];
                    if (typeof sVal === "undefined") continue;

                    let nextPath = path.concat(key);
                    let tHas = Object.prototype.hasOwnProperty.call(t, key);
                    let tVal = t[key];

                    if (Array.isArray(sVal)) {
                        if (!tHas || !arraysEqualShallow(tVal, sVal)) {
                            if (tHas) onReplace && onReplace(nextPath, tVal, sVal);
                            t[key] = sVal.slice();
                        }
                        continue;
                    }
                    if (isPlainObject(sVal)) {
                        if (!isPlainObject(tVal)) {
                            if (tHas) onReplace && onReplace(nextPath, tVal, sVal);
                            t[key] = {};
                        }
                        _merge(t[key], sVal, nextPath);
                        continue;
                    }
                    if (!tHas || tVal !== sVal) {
                        if (tHas) onReplace && onReplace(nextPath, tVal, sVal);
                        t[key] = sVal;
                    }
                }
                return t;
            }
            return _merge(target, source);
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
