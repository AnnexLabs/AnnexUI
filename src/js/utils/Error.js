
/**
 * /src/js/utils/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ErrorUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ErrorUtils = window.annexSearch.ErrorUtils || class ErrorUtils extends window.annexSearch.BaseView {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object
         */
        #__data = {
            'configUtils.get.key.invalid':                      'Invalid {key} passed to {window.annexSearch.ConfigUtils.get}: %0',
            'configUtils.set.key.undefined':                    'Invalid {undefined} value passed as {key} to {window.annexSearch.ConfigUtils.set}',
            'configUtils.set.value.undefined':                  'Invalid {undefined} value passed as {value} to {window.annexSearch.ConfigUtils.set}',
            'loggingUtils.fetchFailed.tip':                     'Tip: Double check that you defined your {hostname} value correctly in {window.annexSearchConfig.cluster}',
            'loggingUtils.typesenseFailed.tip':                 'Tip: Double check that you defined your {apiKey} and {collectionName} values correctly in {window.annexSearchConfig.cluster}',
            'stylesheets.failedLoading':                        'Could not load stylesheets.',
            'typesenseSearchRequest.abort':                     'TypesenseSearchRequest abort method called',
            'typesenseUtils.options.q.null':                    'Invalid valid {q} option; found (null)',
            'typesenseUtils.options.q.undefined':               'Invalid valid {q} option; found (undefined)',
            'typesenseUtils.options.q.empty':                   'Invalid valid {q} option; found (empty string)',
            'typesenseUtils.searchOptions.q.null':              'Invalid valid {query_by} option; found (null). Either {preset} or {query_by} needs to be defined in {window.annexSearchConfig.searchOptions}',
            'typesenseUtils.searchOptions.q.undefined':         'Invalid valid {query_by} option; found (undefined). Either {preset} or {query_by} needs to be defined in {window.annexSearchConfig.searchOptions}',
            // 'webComponent.getConfig.invalidKey':                'Invalid {key} passed to {$annexSearchWidget.getConfig}: %0',
            // 'webComponent.setConfig.invalidKey':                'Invalid {key} passed to {$annexSearchWidget.setConfig}: %0',
        };

        /**
         * getMessage
         * 
         * @see     https://chatgpt.com/c/6894309d-6e08-832f-885d-45699f8f4ee9
         * @access  public
         * @param   String key
         * @param   Array args (optional)
         * @return  null|String
         */
        getMessage(key, ...args) {
            let message = this.#__data[key];
            if (message === undefined) {
                return null;
            }
            for (let i = 0; i < args.length; i++) {
                message = message.replace(new RegExp(`%${i}`, 'g'), args[i]);
            }
            return message;
        }
    }
    window.annexSearch.ErrorUtils = new window.annexSearch.ErrorUtils();
});
