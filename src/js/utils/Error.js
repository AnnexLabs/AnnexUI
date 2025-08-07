
/**
 * /src/js/utils/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.ErrorUtils
     * 
     * @access  public
     */
    window.annexSearch.ErrorUtils = window.annexSearch.ErrorUtils || class {

        /**
         * #__messageMap
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__messageMap = {
            'configUtils.get.key.invalid':                      'Invalid {key} passed to {helper.config.get}: %0',
            'configUtils.set.key.undefined':                    'Invalid {undefined} value passed as {key} to {window.annexSearch.ConfigHelper.set}',
            'configUtils.set.value.undefined':                  'Invalid {undefined} value passed as {value} to {window.annexSearch.ConfigHelper.set}',
            'loggingUtils.fetchFailed.tip':                     'Tip: Double check that you defined your {hostname} value correctly in {config.cluster}',
            'loggingUtils.typesenseFailed.tip':                 'Tip: Double check that you defined your {apiKey} and {collectionName} values correctly in {config.cluster}',
            'stylesheets.failedLoading':                        'Could not load stylesheets.',
            'typesenseSearchRequest.abort':                     'TypesenseSearchRequest abort method called',
            'typesenseUtils.options.q.null':                    'Invalid valid {q} option; found (null)',
            'typesenseUtils.options.q.undefined':               'Invalid valid {q} option; found (undefined)',
            'typesenseUtils.options.q.empty':                   'Invalid valid {q} option; found (empty string)',
            'typesenseUtils.searchOptions.q.null':              'Invalid valid {query_by} option; found (null). Either {preset} or {query_by} needs to be defined in {config.searchOptions}',
            'typesenseUtils.searchOptions.q.undefined':         'Invalid valid {query_by} option; found (undefined). Either {preset} or {query_by} needs to be defined in {config.searchOptions}',
            // 'webComponent.getConfig.invalidKey':                'Invalid {key} passed to {$annexSearchWidget.getConfig}: %0',
            // 'webComponent.setConfig.invalidKey':                'Invalid {key} passed to {$annexSearchWidget.setConfig}: %0',
        };

        /**
         * getMessage
         * 
         * @see     https://chatgpt.com/c/6894309d-6e08-832f-885d-45699f8f4ee9
         * @access  public
         * @static
         * @param   String key
         * @return  null|String
         */
        static getMessage(key) {
            let message = this.#__messageMap[key];
            if (message === undefined) {
                return null;
            }
            for (let i = 0; i < args.length; i++) {
                message = message.replace(new RegExp(`%${i}`, 'g'), args[i]);
            }
            return message;
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
