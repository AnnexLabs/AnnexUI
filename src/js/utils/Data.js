
/**
 * window.annexSearch.DataUtils
 * 
 * @access  public
 */
window.annexSearch.DataUtils = window.annexSearch.DataUtils || class DataUtils {

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
}
