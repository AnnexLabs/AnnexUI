
/**
 * /src/js/utils/Config.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ConfigUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ConfigUtils = window.annexSearch.ConfigUtils || class ConfigUtils extends window.annexSearch.BaseView {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object
         */
        #__data = {

            /**
             * $parentContainer
             * 
             * The container that the UI should be inserted into. If null, it'll
             * be appened to the either the $body, $head or $documentElement (in
             * that order).
             * 
             * @access  private
             * @var     null|EventTarget (default: null)
             */
            $parentContainer: null,

            /**
             * callbacks
             * 
             * Map of callbacks that can be used for custom logic.
             * 
             * @access  private
             * @var     Object
             */
            callbacks: {
                result: {
                    click: function($annexSearchWidget, event, hit) {
                        // console.log('result.click', $annexSearchWidget, event, hit);
                    },
                    focus: function($annexSearchWidget, event, hit) {
                        // console.log('result.focus', $annexSearchWidget, event, hit);
                    },
                },
                results: {
                    empty: function($annexSearchWidget) {
                        // console.log('results.empty', $annexSearchWidget);
                    },
                    error: function($annexSearchWidget, error) {
                        // console.log('results.error', $annexSearchWidget, error);
                    },
                    idle: function($annexSearchWidget) {
                        // console.log('results.idle', $annexSearchWidget);
                    },
                    loaded: function($annexSearchWidget, response) {
                        // console.log('results.loaded', $annexSearchWidget, response);
                    },
                },
                root: {
                    hide: function($annexSearchWidget) {
                        // console.log('root.hide', $annexSearchWidget);
                    },
                    show: function($annexSearchWidget) {
                        // console.log('root.show', $annexSearchWidget);
                    },
                    toggle: function($annexSearchWidget) {
                        // console.log('root.toggle', $annexSearchWidget);
                    }
                }
            },

            /**
             * cluster
             * 
             * Authentication and configuration details specifically for the
             * Typesense cluster.
             * 
             * @access  private
             * @var     Object
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
             * 
             * @access  private
             * @var     Object
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
             * debug
             * 
             * @access  private
             * @var     Boolean (default: false)
             */
            // debug: false,
            debug: true,

            /**
             * keyboardShortcut
             * 
             * The keyboard combination which when pressed, toggles the widget to
             * open or close. If null, no listener is created.
             * 
             * @access  private
             * @var     null|String (default: '⌘k')
             */
            keyboardShortcut: '⌘k',
            // keyboardShortcut: null,

            /**
             * highlightTagName
             * 
             * @access  private
             * @var     String (default: 'MARK')
             */
            highlightTagName: 'MARK',

            /**
             * layout
             * 
             * The UI layout for the widget. Currently supports:
             * - modal
             * - panel-left
             * - panel-right
             * 
             * @access  private
             * @var     String (default: 'modal')
             */
            layout: 'modal',

            /**
             * overlay
             * 
             * Whether an overlay should be shown. Currently doesn't effect the
             * click listener which when detected outside of the widget, triggers it
             * to be closed.
             * 
             * @access  private
             * @var     Boolean (default: true)
             */
            overlay: true,

            /**
             * paths
             * 
             * Map of arrays which are loaded into memory upon each page load. Core
             * to the functionality, but extensible for being able to define custom
             * styles and templating systems.
             * 
             * @access  private
             * @var     Object
             */
            paths: {
                css: [
                    'https://local.annexsearch.com/ts/css',
                    // 'https://local.annexsearch.com/ts/css2',
                ],
                templates: 'https://local.annexsearch.com/ts/templates',
            },

            /**
             * schema
             * 
             * @access  private
             * @var     String (default: 'webResource-v0.1.0')
             */
            schema: 'webResource-v0.1.0',

            /**
             * searchOptions
             * 
             * @access  private
             * @var     Object
             */
            searchOptions: {
                highlight_full_fields: null,
                highlight_affix_num_tokens: null,
                snippet_threshold: null,
            },

            /**
             * searchRequestMethod
             * 
             * @access  private
             * @var     String (default: 'lifo')
             */
            // searchRequestMethod: 'fifo',
            searchRequestMethod: 'lifo',

            /**
             * templates
             * 
             * Map of strings corresponding to all the available templates used in
             * the widget.
             * 
             * @access  private
             * @var     Object
             */
            templates: {
            }
        };

        /**
         * #__handleLoadTemplates
         * 
         * @access  private
         * @param   String templatesContent
         * @return  Boolean
         */
        #__handleLoadTemplates(templatesContent) {
            var expression = /<script\b[^>]*>[\s\S]*?<\/script>/gi,
                matches = templatesContent.match(expression);
            for (var match of matches) {
                var matches = match.match(/data-template-id=["']([^"']+)["']/),
                    id = matches ? matches[1] : null;
                if (id === null) {
                    continue;
                }
                this.#__data.templates[id] = match;
            }
            return true;
        }

        /**
         * #__loadTemplates
         * 
         * @access  private
         * @return  Promise
         */
        #__loadTemplates() {
            let handler = this.#__handleLoadTemplates.bind(this),
                promise = fetch(this.#__data.paths.templates).then(function(response) {
                        return response.text();
                    }).then(handler);
            return promise
        }

        /**
         * get
         * 
         * @access  public
         * @param   undefined|String key
         * @return  mixed
         */
        get(key) {
            if (key === undefined) {
                let data = this.#__data;
                return data;
            }
            let value = this.#__data[key];
            if (value !== undefined) {
                return value;
            }
            let pieces = key.split('.');
            if (pieces.length === 1) {
                let message = window.annexSearch.ErrorUtils.getMessage('configUtils.get.key.invalid', key);
                this.error(message);
                return undefined;
            }
            value = this.#__data;
            for (let piece of pieces) {
                value = value[piece];
                if (value === undefined) {
                    let message = window.annexSearch.ErrorUtils.getMessage('configUtils.get.key.invalid', key);
                    this.error(message);
                    return undefined;
                }
            }
            return value;
        }

        /**
         * set
         * 
         * @access  public
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        set(key, value) {
            if (key === undefined) {
                let message = window.annexSearch.ErrorUtils.getMessage('configUtils.set.key.undefined');
                this.error(message);
                return false;
            }
            if (value === undefined) {
                let message = window.annexSearch.ErrorUtils.getMessage('configUtils.set.value.undefined');
                this.error(message);
                return false;
            }
            if (this.get(key) === undefined) {
                return false;
            }
            let parent = this.#__data,
                reference = this.#__data[key],
                piece = key;
            if (reference === undefined) {
                let pieces = key.split('.');
                reference = this.#__data;
                for (piece of pieces) {
                    parent = reference;
                    reference = reference[piece];
                }
            }
            parent[piece] = value;
            return true;
        }

        /**
         * setup
         * 
         * @access  public
         * @return  Promise
         */
        setup() {
            this.#__data = window.annexSearch.DataUtils.deepMerge(
                this.#__data,
                window.annexSearchConfig || {}
            );
            let promise = this.#__loadTemplates();
            return promise;
        }
    }
    window.annexSearch.ConfigUtils = new window.annexSearch.ConfigUtils();
});
