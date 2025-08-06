window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.LoggingUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class LoggingUtils extends window.annexSearch.BaseView {

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
         * @var     String (default: 'Annex Search')
         */
        #__labels = {
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
         * @return  Boolean
         */
        debug() {
            let message = '%c[' + (this.#__labels.debug) + ']',
                styles = 'color: green; font-weight: bold; font-family: monospace;',
                args = [];
            args.push(message);
            args.push(styles);
            args = args.concat(Array.from(arguments));
            window.console && window.console.log && window.console.log.apply(window, args);
            return true;
        }

        /**
         * error
         * 
         * @access  public
         * @return  Boolean
         */
        error() {
            let message = '%c[' + (this.#__labels.error) + ']',
                styles = 'color: red; font-weight: bold; font-family: monospace;',
                args = [];
            args.push(message);
            args.push(styles);
            args = args.concat(Array.from(arguments));
            window.console && window.console.log && window.console.log.apply(window, args);
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
    }
    window.annexSearch.LoggingUtils = new window.annexSearch.LoggingUtils();
});
