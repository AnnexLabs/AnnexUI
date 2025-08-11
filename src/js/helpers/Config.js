
/**
 * /src/js/helpers/Config.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ConfigHelper
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ConfigHelper = window.annexSearch.ConfigHelper || class extends window.annexSearch.BaseView {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object
         */
        #__data = {

            /**
             * $container
             * 
             * The container that the UI should be inserted into. If null, it'll
             * be appened to the either the $body, $head or $documentElement (in
             * that order).
             * 
             * @access  private
             * @var     null|HTMLElement (default: null)
             */
            // $container: (document.body || document.head || document.documentElement),
            $container: null,

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
                    click: function(customEvent) {
                        console.log('result.click', customEvent.detail, this);
                    },
                    // copy: function(customEvent) {
                    //     console.log('result.copy', customEvent.detail, this);
                    // },
                    focus: function(customEvent) {
                        console.log('result.focus', customEvent.detail, this);
                    },
                },
                results: {
                    empty: function(customEvent) {
                        // console.log('results.empty', customEvent.detail, this);
                    },
                    error: function(customEvent) {
                        // console.log('results.error', customEvent.detail, this);
                    },
                    idle: function(customEvent) {
                        // console.log('results.idle', customEvent.detail, this);
                    },
                    loaded: function(customEvent) {
                        // console.log('results.loaded', customEvent.detail, this);
                    },
                },
                root: {
                    hide: function(customEvent) {
                        // console.log('root.hide', customEvent.detail, this);
                    },
                    show: function(customEvent) {
                        // console.log('root.show', customEvent.detail, this);
                    },
                    toggle: function(customEvent) {
                        // console.log('root.toggle', customEvent.detail, this);
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
             * Series of copy variables which are dotted throughout the UI. For
             * more comprehensive updates, templates can be used.
             * 
             * Copy properties support HTML.
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
                    message: 'Instantly search through our entire database'
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
             * The keyboard combination which when pressed, toggles the widget
             * to be shown or hidden. If null, no listener is created.
             * 
             * @access  private
             * @var     null|String (default: '⌘k')
             */
            keyboardShortcut: '⌘k',

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
             * mode
             * 
             * @access  private
             * @var     String (default: 'auto')
             */
            mode: 'auto',

            /**
             * name
             * 
             * @access  private
             * @var     null|String (default: null)
             */
            name: null,

            /**
             * paths
             * 
             * Map of arrays which are loaded into memory upon each page load.
             * Core to the functionality, but extensible for being able to
             * define custom styles and templating systems.
             * 
             * @access  private
             * @var     Object
             */
            paths: {
                css: [
                    'https://local.annexsearch.com/ts/css',
                    // 'https://local.annexsearch.com/ts/css2',
                ],
                // templates: 'https://local.annexsearch.com/ts/templates',
            },

            /**
             * schemaKey
             * 
             * The key of the Annex Search defined schema that is being adhered
             * to. This is useful for quicker "out of the box" setup, whereby
             * the ResultFoundResultsBodyView template used will adhere to the
             * fields defined in the schema JSON file.
             * 
             * @access  private
             * @var     String (default: 'webResource-v0.1.0')
             */
            schemaKey: 'webResource-v0.1.0',

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
             * showOverlay
             * 
             * Whether an overlay should be shown. Currently doesn't effect the
             * click listener which when detected outside of the widget,
             * triggers the widget to be hidden.
             * 
             * @access  private
             * @var     Boolean (default: true)
             */
            showOverlay: true,

            /**
             * templates
             * 
             * Map of strings corresponding to all the available templates used
             * in the widget.
             * 
             * @access  private
             * @var     Object
             */
            templates: {
            }
        };

        /**
         * #__env
         * 
         * @access  private
         * @var     String (default: 'prod')
         */
        // #__env = 'prod';
        // #__env = 'local';

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
        }
        // getVersion

        /**
         * #__setPaths
         * 
         * @access  private
         * @param   String templatesContent
         * @return  Boolean
         */
        // #__setPaths(templatesContent) {
        //     let expression = /<script\b[^>]*>[\s\S]*?<\/script>/gi,
        //         matches = templatesContent.match(expression);
        //     for (let match of matches) {
        //         let matches = match.match(/data-template-id=["']([^"']+)["']/),
        //             id = matches ? matches[1] : null;
        //         if (id === null) {
        //             continue;
        //         }
        //         this.#__data.templates[id] = match;
        //     }
        //     window.annexSearch.CacheUtils.set('templates', this.#__data.templates);
        //     return true;
        // }

        /**
         * #__handleLoadTemplates
         * 
         * @access  private
         * @param   String templatesContent
         * @return  Boolean
         */
        // #__handleLoadTemplates(templatesContent) {
        //     let expression = /<script\b[^>]*>[\s\S]*?<\/script>/gi,
        //         matches = templatesContent.match(expression);
        //     for (let match of matches) {
        //         let matches = match.match(/data-template-id=["']([^"']+)["']/),
        //             id = matches ? matches[1] : null;
        //         if (id === null) {
        //             continue;
        //         }
        //         this.#__data.templates[id] = match;
        //     }
        //     window.annexSearch.CacheUtils.set('templates', this.#__data.templates);
        //     return true;
        // }

        /**
         * #__handleStylesheetErrorLoadEvent
         * 
         * @access  private
         * @param   Function reject
         * @param   Object event
         * @return  Boolean
         */
        #__handleStylesheetErrorLoadEvent(reject, event) {
            let message = window.annexSearch.ErrorUtils.getMessage('stylesheets.failedLoading');
            window.annexSearch.LoggingUtils.error(message, event);
            reject();
            return true;
        }

        /**
         * #__handleStylesheetSuccessfulLoadEvent
         * 
         * @access  private
         * @param   Function resolve
         * @return  Boolean
         */
        #__handleStylesheetSuccessfulLoadEvent(resolve) {
            window.annexSearch.ElementUtils.waitForAnimation().then(resolve);
            return true;
        }

        /**
         * #__loadStylesheets
         * 
         * @see     https://claude.ai/chat/3683f5e2-b3b9-4cbb-846f-ac1a2d2cb64b
         * @access  private
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Promise
         */
        #__loadStylesheets($annexSearchWidget) {
            let $shadow = $annexSearchWidget.shadow,
                errorHandler = this.#__handleStylesheetErrorLoadEvent.bind(this),
                successfulHandler = this.#__handleStylesheetSuccessfulLoadEvent.bind(this),
                paths = Array.from(
                    new Set(this.get('paths').css)
                ),
                promises = paths.map(function(href) {
                    return new Promise(function(resolve, reject) {
                        let $link = document.createElement('link');
                        $link.rel = 'stylesheet';
                        $link.href = href;
                        $link.onload = resolve;
                        $link.onerror = errorHandler.bind(null, reject);
                        $shadow.appendChild($link);
                    });
                }),
                promise = Promise.all(promises).then(function() {
                    return new Promise(function(resolve) {
                        successfulHandler(resolve);
                    });
                })
            return promise;
        }

        /**
         * #__loadTemplates
         * 
         * @access  private
         * @return  Promise
         */
        // #__loadTemplates() {
        //     let handler = this.#__handleLoadTemplates.bind(this),
        //         promise = fetch(this.#__data.paths.templates).then(function(response) {
        //             return response.text();
        //         }).then(handler);
        //     return promise
        // }

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
                let message = window.annexSearch.ErrorUtils.getMessage('configHelper.get.key.invalid', key);
                this.error(message);
                return undefined;
            }
            value = this.#__data;
            for (let piece of pieces) {
                value = value[piece];
                if (value === undefined) {
                    let message = window.annexSearch.ErrorUtils.getMessage('configHelper.get.key.invalid', key);
                    this.error(message);
                    return undefined;
                }
            }
            return value;
        }

        /**
         * loadStylesheets
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        loadStylesheets($annexSearchWidget) {
            let promise = this.#__loadStylesheets($annexSearchWidget);
            return promise;
        }

        /**
         * loadTemplates
         * 
         * @access  public
         * @return  Promise
         */
//         loadTemplates() {
//             let templates = window.annexSearch.CacheUtils.get('templates');
//             if (templates === undefined) {
//                 let promise = this.#__loadTemplates();
//                 return promise;
//             }
//             this.#__data.templates = templates;
// console.log('oh');
//             return true;
//         }

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
                let message = window.annexSearch.ErrorUtils.getMessage('configHelper.set.key.undefined');
                this.error(message);
                return false;
            }
            if (value === undefined) {
                let message = window.annexSearch.ErrorUtils.getMessage('configHelper.set.value.undefined');
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
         * setData
         * 
         * @access  public
         * @param   Object data
         * @return  Boolean
         */
        setData(data) {
// console.log(data);
            this.#__data = window.annexSearch.DataUtils.deepMerge(this.#__data, data);
            return true;
        }
    }
});
