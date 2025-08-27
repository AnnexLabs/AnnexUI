
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
         * deepMerge
         * 
         * @see     https://chatgpt.com/c/689bb7c4-cd40-8332-a1bd-a585ad5eef06
         * @access  public
         * @static
         * @param   Object target
         * @param   Object source
         * @param   Function onReplace
         * @return  Object
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
         * findKeyInsensitiveValue
         * 
         * @see     https://claude.ai/chat/99737548-7130-4c08-8eee-7fc6e6c9a801
         * @access  public
         * @static
         * @return  null|String
         */
        static findKeyInsensitiveValue(obj, targetKey) {
            let keys = Object.keys(obj),
                foundKey = keys.find(function(key) {
                    return key.toLowerCase() === targetKey.toLowerCase();
                }),
                value = foundKey ? obj[foundKey] : null;
            return value;
        }

        /**
         * removeDuplicateObjects
         * 
         * @see     https://chatgpt.com/c/68a9057e-e3e8-8325-abb7-d7ca140cdeec
         * @access  public
         * @static
         * @param   Array arr
         * @return  Boolean
         */
        static removeDuplicateObjects(arr) {
            let unique = Array.from(new Set(arr));
            arr.length = 0;
            arr.push.apply(arr, unique);
            return true;
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
