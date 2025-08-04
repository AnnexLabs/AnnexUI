
/**
 * window.typesenseInstantSearch.ConfigUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.ConfigUtils = window.typesenseInstantSearch.ConfigUtils || class ConfigUtils {

    /**
     * _data
     * 
     * @static
     * @access  protected
     * @var     Object
     */
    static _data = {

        /**
         * callbacks
         * 
         * Map of callbacks that can be used for custom logic.
         */
        callbacks: {
            results: {
                click: function(event, hit) {
                }
            }
        },

        /**
         * cluster
         * 
         * Authentication and configuration details specifically for the
         * Typesense cluster.
         */
        cluster: {
            apiKey: null,
            collectionName: null,
            hostname: null,
            presetName: null,
        },

        /**
         * copy
         * 
         * Series of copy variables which are dotted throughout the UI. For more
         * comprehensive updates, templates may need to be defined. Supports
         * HTML.
         */
        copy: {
            empty: {
                message: 'No results found...'
            },
            error: {
                message: 'Something went wrong...'
            },
            idle: {
                message: 'Start typing to begin your search...'
            },
            placeholder: 'Search...',
            statusBar: {
                message: 'Search through 10,000+ results instantly'
            },
        },

        /**
         * keyboardShortcut
         * 
         * The keyboard combination which when pressed, toggles the widget to
         * open or close. If null, no listener is created.
         */
        keyboardShortcut: '⌘k',
        // keyboardShortcut: null,

        /**
         * mode
         * 
         * The UI mode for the widget. Currently supports:
         * - modal
         * - panel-left
         * - panel-right
         */
        // mode: 'panel-right',
        mode: 'modal',

        /**
         * overlay
         * 
         * Whether an overlay should be shown. Currently doesn't effect the
         * click listener which when detected outside of the widget, triggers it
         * to be closed.
         */
        overlay: true,

        /**
         * paths
         * 
         * Map of arrays which are loaded into memory upon each page load. Core
         * to the functionality, but extensible for being able to define custom
         * styles and templating systems.
         */
        paths: {
            css: [
                'https://local.annexsearch.com/ts/css',
            ],
            templates: 'https://local.annexsearch.com/ts/templates',
        },

        /**
         * resultTruncationLimit
         * 
         * 
         */
        // resultTruncationLimit: 240,
        resultTruncationLimit: 40,

        /**
         * templates
         * 
         * Map of strings corresponding to all the available templates used in
         * the widget.
         */
        templates: {
        }
    }

    /**
     * _handleLoadTemplates
     * 
     * @access  protected
     * @static
     * @param   String templatesContent
     * @return  Boolean
     */
    static _handleLoadTemplates(templatesContent) {
        var expression = /<script\b[^>]*>[\s\S]*?<\/script>/gi,
            matches = templatesContent.match(expression);
        for (var match of matches) {
            var matches = match.match(/data-template-id=["']([^"']+)["']/),
                id = matches ? matches[1] : null;
            if (id === null) {
                continue;
            }
            this._data.templates[id] = match;
        }
        return true;
    }

    /**
     * _loadTemplates
     * 
     * @access  protected
     * @static
     * @return  Promise
     */
    static _loadTemplates() {
        let handler = this._handleLoadTemplates.bind(this);
        return fetch(this._data.paths.templates).then(function(response) {
            return response.text();
        }).then(handler);
    }

    /**
     * get
     * 
     * @access  public
     * @static
     * @param   undefined|String key
     * @return  mixed
     */
    static get(key) {
        if (key === undefined) {
            let data = this._data;
            return data;
        }
        let value = this._data[key];
        return value;
    }

    /**
     * setup
     * 
     * @access  public
     * @static
     * @return  Promise
     */
    static setup() {
        this._data = window.typesenseInstantSearch.DataUtils.deepMerge(
            this._data,
            window.typesenseInstantSearchConfig || {}
        );
        let promise = this._loadTemplates();
        return promise;
    }
}
