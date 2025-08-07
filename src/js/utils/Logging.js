
/**
 * /src/js/utils/Logging.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.LoggingUtils
     * 
     * @access  public
     */
    window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class {

        /**
         * #__colorCodes
         * 
         * @access  private
         * @var     Object
         */
        // #__colorCodes = {
        //     green: '\x1b[32m',
        //     red: '\x1b[31m',
        //     reset: '\x1b[0m',
        // };

        /**
         * #__labels
         * 
         * @access  private
         * @static
         * @var     String (default: 'Annex Search')
         */
        static #__labels = {
            // debug: '🐞 Annex Search',
            // message: '📣 Annex Search'
            debug: 'Annex Search',
            error: 'Annex Search',
            message: 'Annex Search'
        };

        /**
         * debug
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static debug() {
            let message = '%c[' + (this.#__labels.debug) + ']',
                styles = 'color: green; font-weight: bold; font-family: monospace;',
                args = [];
            args.push(message);
            args.push(styles);
            args = args.concat(Array.from(arguments));
            window.console && window.console.log && window.console.log.apply(window, args);
            window.console.trace();
            return true;
        }

        /**
         * error
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static error() {
            let message = '%c[' + (this.#__labels.error) + ']',
                styles = 'color: red; font-weight: bold; font-family: monospace;',
                args = [];
            args.push(message);
            args.push(styles);
            args = args.concat(Array.from(arguments));
            window.console && window.console.log && window.console.log.apply(window, args);
// window.console.trace();
            return true;
        }

        /**
         * logFailedTypesenseSearchRequestError
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        static logFailedTypesenseSearchRequestError(typesenseSearchRequest) {
            let error = typesenseSearchRequest.getError(),
                key = error.key,
                message = error.message;
            this.error('Could not complete Typesense search request');
            if (key === 'typesenseSearchRequestResponse') {
                this.error('Typesense response: ' + (message));
                if (message.includes('Forbidden - a valid `x-typesense-api-key` header must be sent.') === true) {
                    message = window.annexSearch.ErrorUtils.getMessage('loggingUtils.typesenseFailed.tip');
                    this.error(message);
                    return true;
                }
                return true;
            }
            this.error('Error: ' + (message));
            if (message.includes('Failed to fetch') === true) {
                message = window.annexSearch.ErrorUtils.getMessage('loggingUtils.fetchFailed.tip');
                this.error(message);
                return true;
            }
            return true;
        }

        /**
         * info
         * 
         * @access  public
         * @return  Boolean
         */
        // info() {
        //     let message = '%c[' + (this.#__labels.message) + ']',
        //         styles = 'color: blue; font-weight: bold; font-family: monospace;',
        //         args = [];
        //     args.push(message);
        //     args.push(styles);
        //     args = args.concat(Array.from(arguments));
        //     window.console && window.console.log && window.console.log.apply(window, args);
        //     return true;
        // }

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
