
/**
 * /src/js/utils/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ErrorUtils
     * 
     * @access  public
     */
    window.annexSearch.ErrorUtils = window.annexSearch.ErrorUtils || class ErrorUtils extends window.annexSearch.BaseUtils {

        /**
         * #__messageMap
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__messageMap = {
            'annexSearchWidget.ccontainer.error':                               'Inline web components must have a $container defined before mounting.',
            'base.get.key.invalid':                                             'Invalid {key} value passed to {base.base.get}; found {%0}',
            'base.set.key.undefined':                                           'Invalid {key} value passed to {base.base.set}; found {undefined}',
            'base.set.value.undefined':                                         'Invalid {value} value passed to {base.base.set}; found {undefined}',
            'interactionUtils.zeroRegistered':                                  'No registered $annexSearchWidget elements found',
            'interactionUtils.multipleRegistered':                              'Multiple registered $annexSearchWidget elements found. Unable to determine which $element is the target.',
            'loggingUtils.fetchFailed.tip':                                     'Tip: Double check that {config.cluster.hostname} is defined and correct.',
            'stylesheets.failedLoading':                                        'Could not load stylesheets.',
                'typesenseSearchRequest.abort':                                     'Abort method called against {window.annexSearch.TypesenseSearchRequest}',
            'typesenseHelper.options.q.empty':                                  'Invalid {q} value; found {empty string}',
            'typesenseHelper.options.q.null':                                   'Invalid {q} value; found {null}',
            'typesenseHelper.options.q.undefined':                              'Invalid {q} value; found {undefined}',
            'typesenseHelper.searchOptions.query_by.null':                      'Invalid {config.searchOptions.query_by} value; found {null}. Either {config.searchOptions.query_by} or {config.cluster.presetName} needs to be defined.',
            'typesenseHelper.searchOptions.query_by.undefined':                 'Invalid {config.searchOptions.query_by} value; found {undefined}. Either {config.searchOptions.query_by} or {config.cluster.presetName} needs to be defined.',
            'typesenseSearchRequest.failed.general':                            'Could not complete Typesense search request.',
            'typesenseSearchRequest.failed.responseReceived':                   'Typesense response: %0',
            'typesenseSearchRequest.failed.responseReceived.fieldTip':          'Tip: Double check that {config.searchOptions.query_by} is referencing valid collection fields.',
            'typesenseSearchRequest.failed.responseReceived.forbiddenTip':      'Tip: Double check that {config.cluster.apiKey} and {config.cluster.collectionName} are defined and correct.',
            'typesenseSearchRequest.failed.responseReceived.queryTip':          'Tip: Double check that, if defined, both {config.cluster.presetName} and/or {config.searchOptions.query_by} are correct.',
            'typesenseSearchRequest.failed.unknown':                            'Error: %0',
        };

        /**
         * getMessage
         * 
         * @see     https://chatgpt.com/c/6894309d-6e08-832f-885d-45699f8f4ee9
         * @access  public
         * @static
         * @param   String key
         * @param   ... args
         * @return  null|String
         */
        static getMessage(key, ...args) {
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
