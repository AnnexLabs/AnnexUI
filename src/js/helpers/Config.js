
/**
 * /src/js/helpers/Config.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseHelper'], function() {

    /**
     * window.annexSearch.ConfigHelper
     * 
     * @access  public
     * @extends window.annexSearch.BaseHelper
     */
    window.annexSearch.ConfigHelper = window.annexSearch.ConfigHelper || class ConfigHelper extends window.annexSearch.BaseHelper {

        /**
         * _data
         * 
         * @access  protected
         * @var     Object
         */
        _data = {

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
                        // console.log('result.click', customEvent.detail, this);
                    },
                    copy: function(customEvent) {
                        // console.log('result.copy', customEvent.detail, this);
                    },
                    focus: function(customEvent) {
                        // console.log('result.focus', customEvent.detail, this);
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
             * chips
             * 
             * @access  private
             * @var     Object
             */
            chips: {
                idle: []
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
             * colorScheme
             * 
             * @access  private
             * @var     String (default: 'auto')
             */
            colorScheme: 'auto',

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
                disabled: {
                    title: 'Search disabled',
                    message: 'Apologies but search has been disabled for the time being.'
                },
                empty: {
                    message: 'No results found...'
                },
                error: {
                    message: 'Something went wrong...'
                },
                field: {
                    placeholder: 'Search...'
                },
                idle: {
                    chips: 'Popular searches:',
                    message: 'Start typing to begin your search...'
                },
                statusBar: {
                    message: 'Instantly search through our database'
                },
            },

            /**
             * debug
             * 
             * @access  private
             * @var     Boolean (default: false)
             */
            debug: true,

            /**
             * keyboardShortcut
             * 
             * The keyboard combination which when pressed, toggles the web
             * component to be shown or hidden. If null, no listener is created.
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
             * id
             * 
             * Useful for interaction attributes such that specific
             * $annexSearchWidget instances can be targeted.
             * 
             * @access  private
             * @var     String (default: window.annexSearch.StringUtils.generateUUID())
             */
            id: window.annexSearch.StringUtils.generateUUID(),

            /**
             * layout
             * 
             * The UI layout for the web component. Currently supports:
             * - inline
             * - modal
             * - panel-left
             * - panel-right
             * 
             * @access  private
             * @var     String (default: 'modal')
             */
            layout: 'modal',

            /**
             * resources
             * 
             * Map of arrays which are loaded into memory upon each page load.
             * Core to the functionality, but extensible for being able to
             * define custom styles.
             * 
             * Currently limited to CSS resources, but likely to be extended
             * later.
             * 
             * @access  private
             * @var     Object
             */
            resources: {
                css: [
                    'https://local.annexsearch.com/ts/css',
                ],
            },

            /**
             * schemaKey
             * 
             * The key of the Annex Search defined schema that is being adhered
             * to. This is useful for quicker "out of the box" setup, whereby
             * the ResultFoundResultsBodyView template used will adhere to the
             * fields defined in the schema JSON file.
             * 
             * Valid options currently are:
             * - auto-v0.1.0
             * - custom
             * - sku-v0.1.0
             * - webResource-v0.1.0
             * 
             * @access  private
             * @var     String (default: 'auto-v0.1.0')
             */
            schemaKey: 'auto-v0.1.0',

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
             * @note    noop
             * @access  private
             * @var     String (default: 'lifo')
             */
            // searchRequestMethod: 'fifo',
            searchRequestMethod: 'lifo',

            /**
             * showOverlay
             * 
             * Whether an overlay should be shown. Prevents the click event from
             * hiding a hidable-web-component.
             * 
             * @access  private
             * @var     Boolean (default: true)
             */
            showOverlay: true,

            /**
             * templates
             * 
             * Map of strings corresponding to custom templates for views.
             * 
             * @access  private
             * @var     Object (default: {})
             */
            templates: {}
        };

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  void
         */
        constructor($annexSearchWidget) {
            super($annexSearchWidget);
            this.#__addCustomEventListeners();
            this.#__setResources();
        }

        /**
         * #__addCustomEventListeners
         * 
         * @access  private
         * @return  Boolean
         */
        #__addCustomEventListeners() {
            this.#__addDataSetCustomEventListener();
            return true;
        }

        /**
         * #__setResources
         * 
         * @access  private
         * @return  Boolean
         */
        #__setResources() {
            let env = window.annexSearch.AnnexSearch.getEnv();
            if (env === 'prod') {
                return false;
            }
// console.log(env);
            return true;
        }

        /**
         * #__addDataSetCustomEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addDataSetCustomEventListener() {
            let handler = this.#__handleDataSetCustomEvent.bind(this);
            this.addCustomEventListener('data.set', handler);
            return true;
        }

        /**
         * #__handleChipsNormalization
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleChipsNormalization(event) {
            let type = event.type,
                chips = this._data.chips,
                idle = chips.idle || [];
            for (let index in idle) {
                let chip = idle[index];
                if (chip.constructor === String) {
                    idle[index] = {
                        label: chip,
                        query: chip
                    };
                }
            }
            return true;
        }

        /**
         * #__handleDataSetCustomEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDataSetCustomEvent(event) {
            this.#__handleChipsNormalization(event);
            return true;
        }

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
// console.log($annexSearchWidget.shadow);
// console.log(this.get());
            let $shadow = $annexSearchWidget.shadow,
                errorHandler = this.#__handleStylesheetErrorLoadEvent.bind(this),
                successfulHandler = this.#__handleStylesheetSuccessfulLoadEvent.bind(this),
                resources = Array.from(
                    new Set(this.get('resources').css)
                ),
                promises = resources.map(function(href) {
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
         * triggerCallback
         * 
         * @access  public
         * @param   String type
         * @param   Object detail (default: {})
         * @return  Boolean
         */
        triggerCallback(type, detail = {}) {
            let reference = this._data.callbacks || {},
                pieces = type.split('.');
            for (var piece of pieces) {
                reference = reference[piece] ?? null;
                if (reference === null) {
                    return false;
                }
            }
            let $annexSearchWidget = this.getWebComponent();
            detail.$annexSearchWidget = $annexSearchWidget;
            let customEvent = new CustomEvent(type, {
                detail: detail
            });
            reference.apply($annexSearchWidget, [customEvent]);
            return true;
        }
    }
});
