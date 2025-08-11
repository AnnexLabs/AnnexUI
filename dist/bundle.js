
// Setup
window.annexSearch = window.annexSearch || {};

/**
 * DependencyLoader
 * 
 * @abstract
 */
window.annexSearch.DependencyLoader = (function() {

    /**
     * Properties (private)
     * 
     */

    /**
     * __attemptClosures
     * 
     * @access  private
     * @var     Array (default: [])
     */
    let __attemptClosures = [];

    /**
     * __attempts
     * 
     * @access  private
     * @var     Number (default: 0)
     */
    let __attempts = 0;

    /**
     * Methods (private)
     * 
     */

    /**
     * __attempt
     * 
     * @access  private
     * @param   Array dependencies
     * @param   Function callback
     * @return  Boolean
     */
    let __attempt = function(dependencies, callback) {
        ++__attempts;
        __checkForFailure(dependencies);
        if (__dependenciesAvailable(dependencies) === true) {
            callback.apply(window.annexSearch.DependencyLoader);
            return true;
        }
        return false;
    };

    /**
     * __checkForFailure
     * 
     * @throws  Error
     * @access  private
     * @param   Array dependencies
     * @return  void
     */
    let __checkForFailure = function(dependencies) {
        if (__attempts > 10000) {
            let message = 'Could not complete an attempt: [';
            message += dependencies.join(', ') + ']';
            window.annexSearch && window.annexSearch.LoggingUtils && window.annexSearch.LoggingUtils.error(message);
            throw new Error(message);
        }
    };

    /**
     * __dependenciesAvailable
     * 
     * @access  private
     * @param   Array dependencies
     * @return  Boolean
     */
    let __dependenciesAvailable = function(dependencies) {
        let x = 0,
            l = dependencies.length;
        for (x; x < l; ++x) {
            if (__referenceExists(dependencies[x]) === false) {
                return false;
            }
        }
        return true;
    };

    /**
     * __referenceExists
     * 
     * @see     https://chatgpt.com/c/6750f75c-7cec-800f-bc86-c07201f22fcf
     * @access  private
     * @param   String path
     * @return  Boolean
     */
    let __referenceExists = function(path) {
        let parts = path.split('.'),
            current = window;
        for (var part of parts) {
            if (current[part] === undefined) {
                return false;
            }
            current = current[part];
        }
        return true;
    };

    /**
     * (public)
     * 
     */
    return {

        /**
         * load
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        load: function(callback) {
            callback = callback || function() {};
            let attempt;
            while (__attemptClosures.length > 0) {
                attempt = __attemptClosures.shift();
                if (attempt.apply(window.annexSearch.DependencyLoader) === false) {
                    __attemptClosures.push(attempt);
                }
            }
            callback(__attempts);
        },

        /**
         * push
         * 
         * @access  public
         * @param   String|Array dependencies
         * @param   Function callback
         * @return  Boolean
         */
        push: function(dependencies, callback) {
            if (typeof dependencies === 'string') {
                dependencies = [dependencies];
            }
            let args = [dependencies, callback],
                attempt = function() {
                    let response = __attempt.apply(window.annexSearch.DependencyLoader, args);
                    return response;
                };
            __attemptClosures.push(attempt);
            return true;
        }
    };
})();

/**
 * /src/js/core/AnnexSearch.js
 * 
 * @todo    - custom templates
 * @todo    - variable templating
 * @todo    - ensure multiple instantiations happen sequentially (to allow for /templates caching)
 * @todo    -- Not required if /templates no longer used?
 * @todo    - collection retrieval (for smart templates?)
 * 
 * @todo    - bug with focus not coming back (related to found.results not being cleared)
 * 
 * @todo    - bug with multiple open and query-ing
 * @todo    - multiple bugs (various)
 * 
 * @todo    [DONE] - dark mode
 * @todo    [DONE] - mobile
 * @todo    [DONE] - Panels: https://416.io/ss/f/50li0m
 * @todo    [DONE] - status bar content
 * @todo    [DONE] - clean up hidden class situations: https://416.io/ss/f/x7qz7h
 * @todo    [NOPE] - Missing quopte? https://416.io/ss/f/9uicm1?bp=1
 * @todo    [NOPE] -- Data submission bug
 * @todo    [DONE] - keyboard shortcut cleanup
 * @todo    [DONE] - pdf search (long body)
 * @todo    [DONE] - debouncing of requests (and/or throttling)
 * @todo    [DONE] -- TypesenseSearchRequest
 * @todo    [DONE] - bug where previous search doesn't get triggered (when changed)
 * @todo    [PUNT] - Error handling for failed XHRs
 * @todo    [PUNT] -- Tooltip class for communicating error messages
 * @todo    [PUNT] -- https://claude.ai/chat/b775bedd-d31a-464e-8e10-49c42a5a3644
 * @todo    [PUNT] - On toggle, restore $input focus state if focused
 * @todo    [PUNT] - thumbnails
 * @todo    [PUNT] - Look into CSV fields and commas being encoded in XHRs
 * @todo    [DONE] - loadMore bug re:adding and not clearing
 * @todo    [PUNT] - Missing truncation dots: https://416.io/ss/f/7wtusv
 * @todo    [DONE] - typesense query param (e.g. w/o preset)
 * @todo    [DONE] - config functions re:modifications
 * @todo    [DONE] - inline layout
 * @todo    [DONE] - instantiation
 * @todo    [DONE] - external trigger to show/hide/toggle
 * @todo    [DONE] - external trigger to show w/ query
 * @todo    [DONE] - clear-interaction
 * @todo    [DONE] - absolute positioning on long page
 * @todo    [DONE] - panel animations
 * @todo    [DONE] - focus-interaction
 * @todo    [PUNT] - "End of results" template
 * @todo    [PUNT] - "Loading more results" template
 * @todo    [DONE] - Deal w/ inline where 10 results doesn't trigger scroll / loadMore
 * @todo    [DONE] -- See: https://416.io/ss/f/y75fpa
 * @todo    [DONE] - Toast UI
 * @todo    [DONE] - event dispatching cleanup
 * @todo    [DONE] - ToastUtils, passing in $annexSearchWidget and tracking open toasts
 * @todo    [DONE] - Deal w/ Config role for css loading and dist script
 * @todo    [DONE] - Toast positioning...
 * @todo    [DONE] -- See getBoundingClientRect
 * @todo    [DONE] -- div.content with overflow: hidden;
 * @todo    [PUNT] - Further cleanup of error handling (e.g. don't define messages in TypesenseHelper?)
 * @todo    [PUNT] - UI for customizing and storing it on a server
 * @todo    [PUNT] - Arch cleanup to ensure object instances are directly tied to the respective $annexSearchWidget
 * @todo    [PUNT] -- Right now, this is messy. Should be standardized
 * @todo    [DONE] - Error logging cleanup
 * @todo    [PUNT] - Re-architect things so that config template functions receive data object(s)
 * @todo    [PUNT] - CacheUtils for /css and /templates lookups to speed things up (?)
 * @todo    [PUNT] -- Only for /templates since /css is direct linked (?)
 * @todo    [PUNT] - Hook escape key to toasts (introduce escape utils class)
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearch
     * 
     * @access  public
     */
    window.annexSearch.AnnexSearch = window.annexSearch.AnnexSearch || class {

        /**
         * #__$active
         * 
         * @access  private
         * @static
         * @var     null|window.annexSearch.AnnexSearchWidgetWebComponent (default: null)
         */
        static #__$active = null;

        /**
         * #__devMode
         * 
         * @access  private
         * @static
         * @var     Boolean (default: false)
         */
        // static #__devMode = false;

        /**
         * #__registered
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__registered = [];

        /**
         * #__version
         * 
         * @access  private
         * @static
         * @var     String (default: 'v0.1.0-dev')
         */
        static #__version = 'v0.1.0-dev';

        /**
         * #__parseAnnexSearchWidgets
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        // static #__parseAnnexSearchWidgets() {
        //     return true;
        // }

        /**
         * #__setupUtils
         * 
         * @see     https://chatgpt.com/c/6898260b-ca3c-8323-8df8-d8099634d658
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__setupUtils() {
            for (var propertyName in window.annexSearch) {
                if (window.annexSearch.hasOwnProperty(propertyName) === false) {
                    continue;
                }
                if (typeof window.annexSearch[propertyName] !== 'function') {
                    continue;
                }
                if (propertyName === 'BaseUtils') {
                    continue;
                }
                if (propertyName.endsWith('Utils') === false) {
                    continue;
                }
                window.annexSearch[propertyName].setup && window.annexSearch[propertyName].setup();
            }
            return true;
        }

        /**
         * clearActive
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static clearActive() {
            this.#__$active = null;
            return true;
        }

        /**
         * getActive
         * 
         * @access  public
         * @static
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static getActive() {
            let active = this.#__$active;
            return active;
        }

        /**
         * getDevMode
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        // static getDevMode() {
        //     let devMode = this.#__devMode;
        //     return devMode;
        // }

        /**
         * getRegistered
         * 
         * @access  public
         * @static
         * @return  Array
         */
        static getRegistered() {
            let registered = this.#__registered;
            return registered;
        }

        /**
         * getShowing
         * 
         * @access  public
         * @static
         * @return  Array
         */
        static getShowing() {
            let registered = this.#__registered,
                showing = [];
            for (let $annexSearchWidget of registered) {
                if ($annexSearchWidget.showing() === true) {
                    showing.push($annexSearchWidget);
                }
            }
            return showing;
        }

        /**
         * getVersion
         * 
         * @access  public
         * @static
         * @return  String
         */
        static getVersion() {
            let version = this.#__version;
            return version;
        }

        /**
         * register
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static register($annexSearchWidget) {
            this.#__registered.push($annexSearchWidget);
            return true;
        }

        /**
         * setActive
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static setActive($annexSearchWidget) {
            this.#__$active = $annexSearchWidget;
            return true;
        }

        /**
         * setDevMode
         * 
         * @access  public
         * @static
         * @param   Boolean devMode
         * @return  Boolean
         */
        // static setDevMode(devMode) {
        //     this.#__devMode = devMode;
        //     return true;
        // }

        /**
         * setStyles
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        // static setStyles($annexSearchWidget) {
        //     this.#__$active = $annexSearchWidget;
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
            this.#__setupUtils();
            // this.#__parseAnnexSearchWidgets();
            window.customElements.define('annex-search-widget', window.annexSearch.AnnexSearchWidgetWebComponent);
            return true;
        }
    }
});

/**
 * /src/js/core/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.Base
     * 
     * @access  public
     */
    window.annexSearch.Base = window.annexSearch.Base || class {

        /**
         * #__data
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__data = {};

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
        }

        /**
         * error
         * 
         * @access  public
         * @return  Boolean
         */
        error() {
            let scope = window.annexSearch.LoggingUtils,
                response = window.annexSearch.LoggingUtils.error.apply(scope, arguments);
            return response;
        }

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  undefined|mixed
         */
        get(key) {
            let value = this.#__data[key] || undefined;
            return value;
        }

        /**
         * getHelper
         * 
         * @access  public
         * @param   String key
         * @return  window.annexSearch.BaseView
         */
        getHelper(key) {
            let webComponent = this.getWebComponent(),
                helper = webComponent.getHelper(key);
            return helper;
        }

        /**
         * getView
         * 
         * @access  public
         * @param   String key
         * @return  undefined|BaseView
         */
        getView(key) {
            let views = this.get('views') || {},
                view = views[key] || undefined;
            if (view !== undefined) {
                return view;
            }
            if (key === 'root') {
                view = this.getWebComponent().getView('root');
                return view;
            }
            let pieces = key.split('.');
            view = this.getWebComponent().getView('root');
            for (let piece of pieces) {
                if (piece === 'root') {
                    continue;
                }
                view = view.getView(piece);
            }
            return view;
        }

        /**
         * getWebComponent
         * 
         * @access  public
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        getWebComponent() {
            let $webComponent = this._$element?.getRootNode()?.host || window.annexSearch.AnnexSearch.getActive();
            return $webComponent;
        }

        /**
         * hideWebComponent
         * 
         * @access  public
         * @return  Boolean
         */
        hideWebComponent() {
            let webComponent = this.getWebComponent();
            webComponent.hide();
            return true;
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
            this.#__data[key] = value;
            return true;
        }

        /**
         * setStateKey
         * 
         * @access  public
         * @param   String stateKey
         * @return  Boolean
         */
        setStateKey(stateKey) {
            this.getView('root').setStateKey(stateKey);
            return true;
        }
    }
});

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
                    'https://website.com/v0.1.0-dev/bundle.min.css',
                    // 'https://website.com/v0.1.0-dev/bundle.min.css2',
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

/**
 * /src/js/helpers/Typesense.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.TypesenseHelper
     * 
     * @see     https://claude.ai/chat/47f3434d-203d-45a8-a8ac-f52ad7505b0a
     * @see     https://typesense.org/docs/29.0/api/search.html
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.TypesenseHelper = window.annexSearch.TypesenseHelper || class extends window.annexSearch.BaseView {

        /**
         * _lastRequest
         * 
         * @access  private
         * @var     null|window.annexSearch.TypesenseSearchRequest (default null)
         */
        #__lastRequest = null;

        /**
         * _requests
         * 
         * @access  private
         * @var     Array (default [])
         */
        #__requests = [];

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
        }

        /**
         * _abortLastRequest
         * 
         * @access  private
         * @return  Boolean
         */
        #__abortLastRequest() {
            if (this.#__lastRequest === null) {
                return false;
            }
            let request = this.#__lastRequest;
            this.#__lastRequest = null;
            request.abort();
            let index = this.#__requests.indexOf(request);
            if (index === -1) {
                return false;
            }
            this.#__requests.splice(index, 1);
            return true;
        }

        /**
         * _validSearchOptions
         * 
         * @see     https://416.io/ss/f/fm0aua
         * @access  private
         * @param   window.annexSearch.TypesenseSearchRequest request
         * @return  Boolean
         */
        #__validSearchOptions(request) {

            // Options
            let options = request.getOptions();
            if (options.q === null) {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.null');
                request.setError(key, message);
                return false;
            }
            if (options.q === undefined) {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.undefined');
                request.setError(key, message);
                return false;
            }
            if (options.q.trim() === '') {
                let key = 'option',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.options.q.empty');
                request.setError(key, message);
                return false;
            }

            // Search options
            let searchOptions = request.getSearchOptions();
            if (searchOptions.preset) {
                return true;
            }
            if (searchOptions.query_by === null) {
                let key = 'searchOptions',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.searchOptions.query_by.null');
                request.setError(key, message);
                return false;
            }
            if (searchOptions.query_by === undefined) {
                let key = 'searchOptions',
                    message = window.annexSearch.ErrorUtils.getMessage('typesenseHelper.searchOptions.query_by.undefined');
                request.setError(key, message);
                return false;
            }
            return true;
        }

        /**
         * getHighlightEndTag
         * 
         * @access  public
         * @return  String
         */
        getHighlightEndTag() {
            let tagName = this.getHelper('config').get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                endTag = '</' + (tagNameLowerCase) + '>';
            return endTag;
        }

        /**
         * getHighlightStartTag
         * 
         * @access  public
         * @return  String
         */
        getHighlightStartTag() {
            let tagName = this.getHelper('config').get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                startTag = '<' + (tagNameLowerCase) + '>';
            return startTag;
        }

        /**
         * replaceHightlightTags
         * 
         * @access  public
         * @param   String html
         * @return  String
         */
        replaceHightlightTags(html) {
            let startTag = this.getHighlightStartTag(),
                endTag = this.getHighlightEndTag(),
                escapedStartTag = startTag.replace('<', '&lt;').replace('>', '&gt;'),
                escapedEndTag = endTag.replace('<', '&lt;').replace('>', '&gt;');
            html = html.replaceAll(escapedStartTag, startTag);
            html = html.replaceAll(escapedEndTag, endTag);
            return html;
        }

        /**
         * search
         * 
         * @access  public
         * @param   String query
         * @param   Object options (default: {})
         * @return  Promise
         */
        search(query, options = {}) {
            this.#__abortLastRequest();
            let request = new window.annexSearch.TypesenseSearchRequest(query);
            request.setOptions(options);
            if (this.#__validSearchOptions(request) === false) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(request);
                return promise;
            }
            this.#__lastRequest = request;
            this.#__requests.push(request);
            let promise = request.fetch();
            return promise;
        }
    }
});

/**
 * /src/js/requests/TypesenseCollection.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.TypesenseCollectionRequest
     * 
     * @extends window.annexSearch.Base
     */
    window.annexSearch.TypesenseCollectionRequest = window.annexSearch.TypesenseCollectionRequest || class extends window.annexSearch.Base {

        /**
         * constructor
         * 
         * @access  public
         * @param   String collectionName
         * @return  void
         */
        constructor(collectionName) {
            super();
        }

        /**
         * fetch
         * 
         * @access  public
         * @return  Boolean
         */
        fetch() {


// https://claude.ai/chat/5e0424e3-171d-4fe9-8403-c5072490b3a7
// https://typesense.org/docs/29.0/api/collections.html#list-all-collections


            // Typesense configuration
            const TYPESENSE_CONFIG = {
              host: 'your-typesense-host.com', // Replace with your Typesense host
              port: 443, // Use 443 for HTTPS, 8108 for HTTP
              protocol: 'https', // 'https' or 'http'
              apiKey: 'your-api-key' // Replace with your API key
            };

            // Base URL for Typesense API
            const BASE_URL = `${TYPESENSE_CONFIG.protocol}://${TYPESENSE_CONFIG.host}:${TYPESENSE_CONFIG.port}`;

            /**
             * Fetch details of a specific collection
             * @param {string} collectionName - Name of the collection to fetch
             * @returns {Promise<Object>} Collection details
             */
            async function fetchCollectionDetails(collectionName) {
              try {
                const url = `${BASE_URL}/collections/${collectionName}`;
                
                const response = await fetch(url, {
                  method: 'GET',
                  headers: {
                    'X-TYPESENSE-API-KEY': TYPESENSE_CONFIG.apiKey,
                    'Content-Type': 'application/json'
                  }
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }

                const collectionData = await response.json();
                return collectionData;

              } catch (error) {
                console.error('Error fetching collection details:', error);
                throw error;
              }
            }

            // This file focuses on fetching a SPECIFIC collection only

            // Usage example - fetching a specific collection
            async function example() {
              try {
                // Fetch details of a specific collection by name
                const collectionDetails = await fetchCollectionDetails('products');
                console.log('Collection Details:', collectionDetails);
                
                // The response will include:
                // - name: collection name
                // - fields: array of field definitions
                // - default_sorting_field: default field for sorting
                // - num_documents: number of documents in collection
                // - created_at: timestamp when collection was created
                
                // Display the schema in a readable format
                displayCollectionSchema(collectionDetails);

              } catch (error) {
                console.error('Failed to fetch collection:', error);
              }
            }

            // Alternative implementation using XMLHttpRequest (for older browser support)
            function fetchCollectionDetailsXHR(collectionName) {
              return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                const url = `${BASE_URL}/collections/${collectionName}`;
                
                xhr.open('GET', url, true);
                xhr.setRequestHeader('X-TYPESENSE-API-KEY', TYPESENSE_CONFIG.apiKey);
                xhr.setRequestHeader('Content-Type', 'application/json');
                
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                      try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                      } catch (parseError) {
                        reject(new Error('Failed to parse response JSON'));
                      }
                    } else {
                      reject(new Error(`HTTP error! status: ${xhr.status}`));
                    }
                  }
                };
                
                xhr.onerror = function() {
                  reject(new Error('Network error occurred'));
                };
                
                xhr.send();
              });
            }

            // Utility function to display collection schema in a readable format
            function displayCollectionSchema(collection) {
              console.log(`\n=== Collection: ${collection.name} ===`);
              console.log(`Documents: ${collection.num_documents}`);
              console.log(`Created: ${new Date(collection.created_at * 1000).toLocaleDateString()}`);
              
              if (collection.default_sorting_field) {
                console.log(`Default Sort: ${collection.default_sorting_field}`);
              }
              
              console.log('\nFields:');
              collection.fields.forEach(field => {
                const optional = field.optional ? ' (optional)' : ' (required)';
                const facet = field.facet ? ' [facetable]' : '';
                const index = field.index !== false ? ' [indexed]' : ' [not indexed]';
                console.log(`  - ${field.name}: ${field.type}${optional}${facet}${index}`);
              });
            }

            // Run example (uncomment to test)
            // example();
            return true;
        }
    }
});

/**
 * /src/js/requests/TypesenseSearch.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.TypesenseSearchRequest
     * 
     * @extends window.annexSearch.Base
     */
    window.annexSearch.TypesenseSearchRequest = window.annexSearch.TypesenseSearchRequest || class extends window.annexSearch.Base {

        /**
         * #__abortController
         * 
         * @access  private
         * @var     AbortController|null (default: null)
         */
        #__abortController = null;

        /**
         * #__aborted
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__aborted = false;

        /**
         * #__encodingExemptFields
         * 
         * @see     https://typesense.org/docs/0.20.0/api/documents.html#arguments
         * @access  private
         * @var     Array
         */
        // #__encodingExemptFields = [
        //     'include_fields',
        //     'exclude_fields',
        //     'highlight_full_fields',
        //     'pinned_hits',
        //     'hidden_hits'
        // ];

        /**
         * #__error
         * 
         * @access  private
         * @var     null|Object (default: null)
         */
        #__error = null;

        /**
         * #__options
         * 
         * @access  private
         * @var     Object
         */
        #__options = {
            page: 1,
            per_page: 10
            // per_page: 1
            // query_by: options.query_by || 'title,content',// working: title,body
            // filter_by: options.filter_by || '',// working: filter_by = score:>8
            // sort_by: options.sort_by || '_text_match:desc',// working: sort_by = score:desc
        };

        /**
         * #__query
         * 
         * @access  private
         * @var     String|null (default: null)
         */
        #__query = null;

        /**
         * #__response
         * 
         * @access  private
         * @var     Object|null (default: null)
         */
        #__response = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   String query
         * @return  void
         */
        constructor(query) {
            super();
            this.#__query = query;
            this.#__options.q = query;
// console.log(this, this.getHelper);//, this.getHelper('typesense'));
            this.#__options.highlight_end_tag = this.getHelper('typesense').getHighlightEndTag();
            this.#__options.highlight_start_tag = this.getHelper('typesense').getHighlightStartTag();
        }

        /**
         * #__fetch
         * 
         * @access  private
         * @param   String url
         * @param   Object options
         * @return  Promise
         */
        #__fetch(url, options) {
            let successful = this.#__handleSuccessfulRequest.bind(this),
                failed = this.#__handleFailedRequest.bind(this),
                promise = window.fetch(url, options).then(successful).catch(failed);
            return promise;
        }

        /**
         * #__getAuth
         * 
         * @access  private
         * @return  Object
         */
        #__getAuth() {
            let auth = {
                hostname: this.getHelper('config').get('cluster.hostname'),
                protocol: 'https',
                apiKey: this.getHelper('config').get('cluster.apiKey'),
                collectionName: this.getHelper('config').get('cluster.collectionName'),
                presetName: this.getHelper('config').get('cluster.presetName')
            };
            return auth;
        }

        /**
         * #__getBaseURL
         * 
         * @access  private
         * @return  String
         */
        #__getBaseURL() {
            let auth = this.#__getAuth(),
                baseURL = (auth.protocol) + '://' + (auth.hostname);
            return baseURL;
        }

        /**
         * #__getFetchHeaders
         * 
         * @access  private
         * @return  Object
         */
        #__getFetchHeaders() {
            let auth = this.#__getAuth(),
                headers = {
                    'X-TYPESENSE-API-KEY': auth.apiKey,
                    'Content-Type': 'application/json'
                };
            return headers;
        }

        /**
         * #__getFetchOptions
         * 
         * @access  private
         * @return  Object
         */
        #__getFetchOptions() {
            let controller = new AbortController(),
                headers = this.#__getFetchHeaders(),
                options = {
                    method: 'GET',
                    signal: controller.signal,
                    headers: headers
                };
            this.#__abortController = controller;
            return options;
        }

        /**
         * #__getSearchParams
         * 
         * @access  private
         * @param   String query
         * @return  Object
         */
        #__getSearchParams() {
            let searchOptions = this.getSearchOptions(),
                params = new URLSearchParams(searchOptions);
// console.log(__encodingExemptFields);
            for (const [key, value] of params.entries()) {
                // if (key === 'highlight_full_fields') {
                //     console.log('yep', key, value);
                //     // params.set(key, value.replaceAll('%2C', ','));
                // }
                if (!value) {
                    params.delete(key);
                }
            }
            return params;
        }

        /**
         * #__getSearchURL
         * 
         * @access  private
         * @return  String
         */
        #__getSearchURL() {
            let baseURL = this.#__getBaseURL(),
                auth = this.#__getAuth(),
                params = this.#__getSearchParams(),
                searchParams = new URLSearchParams(params).toString(),
                searchURL = (baseURL) + '/collections/' + (auth.collectionName) + '/documents/search?' + (searchParams);
// searchURL = searchURL.replaceAll('%2C', ',');
// console.log(searchParams);
            return searchURL;
        }

        /**
         * #__handleFailedRequest
         * 
         * @access  private
         * @param   Object error
         * @return  window.annexSearch.TypesenseSearchRequest
         */
        #__handleFailedRequest(error) {
// console.log(error);
            let key = error.name,
                message = error.message;
            this.setError(key, message);
            return this;
        }

        /**
         * #__handleSuccessfulRequestJSONDecoding
         * 
         * @throws  Error
         * @access  private
         * @param   Object json
         * @return  Promise
         */
        #__handleSuccessfulRequestJSONDecoding(json) {
            this.#__response = json;
            let message = json?.message;
            if (message !== undefined) {
                let key = 'typesenseSearchRequestResponse';
                this.setError(key, message);
                throw new Error();
            }
            if (json.ok === false) {
                alert('hmmm');
            }
            // this.#__response = json;
            return this;
        }

        /**
         * #__handleSuccessfulRequest
         * 
         * @access  private
         * @param   Response response
         * @return  Promise
         */
        #__handleSuccessfulRequest(response) {
            let handler = this.#__handleSuccessfulRequestJSONDecoding.bind(this),
                promise = response.json().then(handler);
            return promise;
        }

        /**
         * abort
         * 
         * @access  public
         * @return  Boolean
         */
        abort() {
            if (this.#__aborted === true) {
                return false;
            }
            this.#__aborted = true;
            let key = 'abort',
                message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.abort');
            this.setError(key, message);
            this.#__abortController.abort();
            return true;
        }

        /**
         * fetch
         * 
         * @access  public
         * @return  Promise
         */
        fetch() {
            let url = this.#__getSearchURL(),
                options = this.#__getFetchOptions(),
                promise = this.#__fetch(url, options);
            // this.abort();
            return promise;
        }

        /**
         * getError
         * 
         * @access  public
         * @return  null|Object
         */
        getError() {
            let error = this.#__error;
            return error;
        }

        /**
         * getOptions
         * 
         * @access  public
         * @return  Object
         */
        getOptions() {
            let options = this.#__options;
            return options;
        }

        /**
         * getQuery
         * 
         * @access  public
         * @return  String
         */
        getQuery() {
            let query = this.#__query;
            return query;
        }

        /**
         * getResponse
         * 
         * @access  public
         * @return  null|Object
         */
        getResponse() {
            let response = this.#__response;
            return response;
        }

        /**
         * getSearchOptions
         * 
         * @access  public
         * @return  Object
         */
        getSearchOptions() {
            let auth = this.#__getAuth(),
                options = Object.assign({}, this.#__options);
            options.preset = auth.presetName || null;
            for (let key in options) {
                if (options[key] === null) {
                    delete options[key];
                }
            }
            return options;
        }

        /**
         * logFailedEvent
         * 
         * @access  public
         * @return  Boolean
         */
        logFailedEvent() {

            // Typesense failure message
            let message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.general');
            this.error(message);

            // Response received, but request not processed
            let error = this.getError(),
                key = error.key;
            if (key === 'typesenseSearchRequestResponse') {

                // Response from Typesense
                let message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.responseReceived', error.message);
                this.error(message);

                // Possible $query_by incorrect
                if (message.includes('Could not find a field named') === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.responseReceived.fieldTip');
                    this.error(message);
                    return true;
                }

                // Possible $apiKey or $collectionName incorrect
                if (message.includes('Forbidden - a valid `x-typesense-api-key` header must be sent.') === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.responseReceived.forbiddenTip');
                    this.error(message);
                    return true;
                }

                // Possible $query_by incorrect
                if (message.includes('No search fields specified') === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.responseReceived.queryTip');
                    this.error(message);
                    return true;
                }

                // Done
                return true;
            }

            // Unknown error (e.g. fetch failed)
            message = window.annexSearch.ErrorUtils.getMessage('typesenseSearchRequest.failed.unknown', error.message);
            this.error(message);

            // Possible tip to help with debugging
            if (message.includes('Failed to fetch') === true) {
                message = window.annexSearch.ErrorUtils.getMessage('loggingUtils.fetchFailed.tip');
                this.error(message);
                return true;
            }

            // Done
            return true;
        }

        /**
         * setError
         * 
         * @access  public
         * @param   String key
         * @param   String message
         * @return  Boolean
         */
        setError(key, message) {
            if (this.#__error !== null) {
                return false;
            }
            this.#__error = {};
            this.#__error.key = key;
            this.#__error.message = message;
            return true;
        }

        /**
         * setOptions
         * 
         * @access  public
         * @param   Object options
         * @return  Boolean
         */
        setOptions(options) {
            this.#__options = Object.assign(
                {},
                this.#__options,
                this.getHelper('config').get('searchOptions'),
                options,
            );
            return true;
        }
    }
});

/**
 * /src/js/utils/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.BaseUtils
     * 
     * @access  public
     */
    window.annexSearch.BaseUtils = window.annexSearch.BaseUtils || class {

        /**
         * #__setup
         * 
         * @access  private
         * @static
         * @var     Boolean (default: false)
         */
        static #__setup = false;

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            if (document === null) {
                return false;
            }
            if (document === undefined) {
                return false;
            }
            if (document.readyState === 'complete') {
                return true;
            }
            if (document.readyState === 'interactive') {
                return true;
            }
            return false
        }
    }
});

/**
 * /src/js/utils/Cache.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.CacheUtils
     * 
     * @note    Not currently used (was being used with template loading).
     *          Leaving in for now, as it's likely to be useful with plugins and
     *          remote data requests later (e.g. GDPR).
     * @access  public
     */
    window.annexSearch.CacheUtils = window.annexSearch.CacheUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__data
         * 
         * @access  private
         * @static
         * @var     Object (default: {})
         */
        static #__data = {};

        /**
         * get
         * 
         * @access  public
         * @static
         * @param   String key
         * @return  undefined|Boolean
         */
        static get(key) {
            let value = this.#__data[key];
            if (value === undefined) {
                return undefined;
            }
            return value;
        }

        /**
         * set
         * 
         * @access  public
         * @static
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        static set(key, value) {
            this.#__data[key] = value;
            return true;
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

/**
 * /src/js/utils/Data.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.DataUtils
     * 
     * @access  public
     */
    window.annexSearch.DataUtils = window.annexSearch.DataUtils || class extends window.annexSearch.BaseUtils {

        /**
         * copyToClipboard
         * 
         * @see     https://chatgpt.com/c/6899376c-1860-832a-8a04-1e8135f98a00
         * @access  public
         * @static
         * @param   String str
         * @return  Promise
         */
        static copyToClipboard(str) {
            let promise = window.navigator.clipboard.writeText(str);
            return promise;
        }

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

/**
 * /src/js/utils/Element.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ElementUtils
     * 
     * @access  public
     */
    window.annexSearch.ElementUtils = window.annexSearch.ElementUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__getConfigTemplate
         * 
         * @see     https://chatgpt.com/c/68990349-0238-832f-bf0f-3bf14d1a7377
         * @access  private
         * @static
         * @param   String templateId
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  null|String
         */
        static #__getConfigTemplate(templateId, $annexSearchWidget) {
            let markup = $annexSearchWidget.getHelper('config').get('templates')[templateId];
            if (markup === null) {
                return null;
            }
            if (markup === undefined) {
                return null;
            }
            if (typeof markup === 'function') {
                let response = markup();
                return response;
            }
            return markup;
        }

        /**
         * #__getTemplateElement
         * 
         * @see     https://chatgpt.com/c/6828cebf-a638-800f-bdf2-3e8642c89de6
         * @access  private
         * @static
         * @param   String templateId
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  HTMLElement
         */
        static #__getTemplateElement(templateId, $annexSearchWidget) {
            let viewName = this.#__getViewName(templateId),
                markup = this.#__getConfigTemplate(templateId, $annexSearchWidget) || window.annexSearch[viewName].markup,
                parser = new DOMParser(),
                $document = parser.parseFromString(markup, 'text/html'),
                $element = $document.body.firstElementChild;
            return $element;
        }

        /**
         * #__getViewName
         * 
         * @access  private
         * @static
         * @param   String templateId
         * @return  String
         */
        static #__getViewName(templateId) {
            let viewName = templateId;
            viewName = (viewName) + 'View';
            viewName = viewName[0].toUpperCase() + viewName.slice(1);
            return viewName;
        }

        /**
         * getEscapedHTML
         * 
         * @see     https://chatgpt.com/c/68911e4d-9784-8330-b358-a52ba952426b
         * @see     https://chatgpt.com/c/68952ba0-eb34-8326-8389-f043ba0261be
         * @access  public
         * @static
         * @param   String str
         * @return  String
         */
        static getEscapedHTML(str) {
            let escaped = str
                .replace(/&(?!(?:[a-z\d]+|#\d+|#x[a-f\d]+);)/gi, '&amp;')
                // .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            return escaped;
        }

        /**
         * getValueFromPath
         * 
         * @access  public
         * @static
         * @param   String path
         * @param   Object map
         * @return  String
         */
        static getValueFromPath(path, map) {
            let keys = path.split('.'),
                value = map;
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                    continue;
                }
                return null;
            }
            if (value === null) {
                return null;
            }
            if (value === undefined) {
                return null;
            }
            value = value.trim();
            if (value === '') {
                return null;
            }
            value = String(value);
            return value;
        }

        /**
         * renderTemplate
         * 
         * @access  public
         * @static
         * @param   String templateId
         * @param   HTMLElement $parent
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget (default: null)
         * @return  window.annexSearch.BaseView
         */
        static renderTemplate(templateId, $parent, $annexSearchWidget = null) {
            $annexSearchWidget = $annexSearchWidget || $parent.getRootNode().host;
            let $element = this.#__getTemplateElement(templateId, $annexSearchWidget);
            $parent.appendChild($element);
            let viewName = $element.getAttribute('data-view-name'),
                view = new window.annexSearch[viewName]($element);
            $element.data = $element.data || {};
            $element.data.view = view;
            view.render();
            return view;
        }

        /**
         * renderTemplateVariables
         * 
         * @note    Ordered
         * @access  public
         * @static
         * @param   String html
         * @param   Object map
         * @return  String
         */
        static renderTemplateVariables(html, map) {
            html = html.replace(/\{\{([^}]+)\}\}/g, function(match, expression) {
                if (expression.includes('||') === true) {
                    const paths = expression.split('||').map(function(piece) {
                        return piece.trim();
                    });
                    for (const path of paths) {
                        let value = window.annexSearch.ElementUtils.getValueFromPath(path, map);
                        if (value === null) {
                            continue;
                        }
                        value = window.annexSearch.ElementUtils.getEscapedHTML(value);
                        return value;
                    }
                    return '';
                }
                expression = expression.trim();
                let value = window.annexSearch.ElementUtils.getValueFromPath(expression, map);
                if (value === null) {
                    return '';
                }
                value = window.annexSearch.ElementUtils.getEscapedHTML(value);
                return value;
            });
            return html;
        }

        /**
         * waitForAnimation
         *
         * @see     https://chatgpt.com/c/682a39f4-d464-800f-bd7c-9793d2bf0349
         * @access  public
         * @static
         * @return  Promise
         */
        static waitForAnimation() {
            let promise = new Promise(function(resolve, reject) {
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        resolve();
                    });
                });
            });
            return promise;
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
    window.annexSearch.ErrorUtils = window.annexSearch.ErrorUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__messageMap
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__messageMap = {
            'configHelper.get.key.invalid':                                     'Invalid {key} value passed to {base.configHelper.get}; found {%0}',
            'configHelper.set.key.undefined':                                   'Invalid {key} value passed to {base.configHelper.set}; found {undefined}',
            'configHelper.set.value.undefined':                                 'Invalid {value} value passed to {base.configHelper.set}; found {undefined}',
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

/**
 * /src/js/utils/Function.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.FunctionUtils
     * 
     * @access  public
     */
    window.annexSearch.FunctionUtils = window.annexSearch.FunctionUtils || class extends window.annexSearch.BaseUtils {

        /**
         * debounce
         * 
         * @see     https://chatgpt.com/c/674ebab2-ff0c-800f-a44b-74e72f9e99f8
         * @access  public
         * @static
         * @param   Function func
         * @param   Number delay
         * @return  Function
         */
        static debounce(func, delay) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(this, args);
                }, delay);
            };
        }

        /**
         * getEmptyPromise
         * 
         * @access  public
         * @static
         * @return  Promise
         */
        static getEmptyPromise() {
            let args = Array.from(arguments),
                promise = new Promise(function(resolve, reject) {
                    resolve.apply(window, args);
                });
            return promise;
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

/**
 * /src/js/utils/Interaction.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.InteractionUtils
     * 
     * @access  public
     */
    window.annexSearch.InteractionUtils = window.annexSearch.InteractionUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__addDocumentClickEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addDocumentClickEventListener() {
            let $element = (document.body || document.head || document.documentElement),
                handler = this.#__handleDocumentClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * #__handleBehaviorInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleBehaviorInteraction(event) {

            // Broadly invalid
            if (this.#__validEventTarget(event, 'data-annex-search') === false) {
                return false;
            }
// console.log('s');
            // Invalid layout (clear is always supported)
            let $target = event.target,
                value = $target.getAttribute('data-annex-search'),
                registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0];
            if ($annexSearchWidget.getConfig('layout') === 'inline') {
                if (value !== 'clear' && value !== 'focus') {
                    return false;
                }
            }

            // Unsupported value
            let validBehaviorInteractions = ['clear', 'focus', 'hide', 'show', 'toggle'];
            if (validBehaviorInteractions.includes(value) === false) {
                return false;
            }

            // Processing
            if (value === 'clear') {
                let response = $annexSearchWidget.clear();
                return response;
            }
            if (value === 'focus') {
                let response = $annexSearchWidget.focus();
                return response;
            }
            if (value === 'hide') {
                let response = $annexSearchWidget.hide();
                return response;
            }
            if (value === 'show') {
                let response = $annexSearchWidget.show();
                return response;
            }
            if (value === 'toggle') {
                let response = $annexSearchWidget.toggle();
                return response;
            }
            return false;
        }

        /**
         * #__handleDocumentClickEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentClickEvent(event) {
            if (this.#__handleBehaviorInteraction(event) === true) {
                return true;
            }
            if (this.#__handleQueryInteraction(event) === true) {
                return true;
            }
            return false;
        }

        /**
         * #__handleQueryInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleQueryInteraction(event) {

            // Broadly invalid
            if (this.#__validEventTarget(event, 'data-annex-search-query') === false) {
                return false;
            }

            // Invalid value
            let $target = event.target,
                value = $target.getAttribute('data-annex-search-query'),
                registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0],
                query = value;
            $annexSearchWidget.show();
            $annexSearchWidget.query(query);
            return true;
        }

        /**
         * #__validEventTarget
         * 
         * @access  private
         * @static
         * @param   Object event
         * @param   String attributeName
         * @return  Boolean
         */
        static #__validEventTarget(event, attributeName) {
            let $target = event.target || null;
            if ($target === null) {
                return false;
            }
            let selector = '[' + (attributeName) + ']';
            if ($target.matches(selector) === false) {
                return false;
            }
            event.preventDefault();
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.zeroRegistered');
                window.annexSearch.LoggingUtils.error(message);
                // this.#__logDevModeMessage('interactionUtils.zeroRegistered');
                return false;
            }
            if (registered.length > 1) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.multipleRegistered');
                window.annexSearch.LoggingUtils.error(message);
                // this.#__logDevModeMessage('interactionUtils.multipleRegistered');
                return false;
            }

            // Invalid value
            let value = $target.getAttribute(attributeName);
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            if (value === '') {
                return false;
            }

            // All good..
            return true;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            let response = super.setup();
            if (response === true) {
                this.#__addDocumentClickEventListener();
                return true;
            }
            let handler = window.annexSearch.InteractionUtils.setup.bind(window.annexSearch.InteractionUtils);
            document.addEventListener('DOMContentLoaded', handler);
            return true;
        }
    }
});

/**
 * /src/js/utils/KeyboardShortcut.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.KeyboardShortcutUtils
     * 
     * @access  public
     */
    window.annexSearch.KeyboardShortcutUtils = window.annexSearch.KeyboardShortcutUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__active
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__active = {

            /**
             * documentCatchAll
             * 
             * Whether any keyboard keydown event against the document should be
             * "caught" and processed as if it was entered into the $input
             * field.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentCatchAll: true,

            /**
             * documentDelete
             * 
             * Whether the delete key should be caught and processed as the user
             * wanting to delete the last entered character.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentDelete: true,

            /**
             * documentPaste
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentPaste: true,

            /**
             * documentEscape
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentEscape: true,

            /**
             * documentKeyboardNavigation
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentKeyboardNavigation: true,

            /**
             * documentKeyboardShortcut
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentKeyboardShortcut: true,

            /**
             * documentSelectAll
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentSelectAll: true,

            /**
             * documentSlash
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentSlash: true,

            /**
             * fieldEnter
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            fieldEnter: true,

            /**
             * fieldEscape
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            fieldEscape: true,

            /**
             * resultCopy
             * 
             * Keyboard detection for the Command+c / Ctrl+c keyboard
             * combination, which when detected, will dispatch an event for the
             * corresponding ResultFoundResultsBodyView.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            resultCopy: true,
        };

        /**
         * #__addDocumentCopyEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        // static #__addDocumentCopyEventListener() {
        //     let $element = document,
        //         handler = this.__handleDocumentCopyKeydownEvent.bind(this);
        //     $element.addEventListener('copy', handler);
        //     return true;
        // }

        /**
         * #__addDocumentPasteEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addDocumentPasteEventListener() {
            let $element = document,
                handler = this.#__handleDocumentPasteEvent.bind(this);
            $element.addEventListener('paste', handler);
            return true;
        }

        /**
         * #__addKeydownEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addKeydownEventListener() {
            let $element = document,
                handler = this.#__handleKeydownEvent.bind(this);
            $element.addEventListener('keydown', handler);
            return true;
        }

        /**
         * #__getActiveWebComponent
         * 
         * @access  private
         * @static
         * @return  null|window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static #__getActiveWebComponent() {
            let $active = window.annexSearch.AnnexSearch.getActive();
            return $active;
        }

        /**
         * #__getRegisteredWebComponents
         * 
         * @access  private
         * @static
         * @return  Array
         */
        static #__getRegisteredWebComponents() {
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            return registered;
        }

        /**
         * #__getField
         * 
         * @access  private
         * @static
         * @return  window.annexSearch.BaseView
         */
        static #__getField() {
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                field = $annexSearchWidget.getView('root').getView('header.field');
            return field;
        }

        /**
         * #__getFound
         * 
         * @access  private
         * @static
         * @return  window.annexSearch.BaseView
         */
        static #__getFound() {
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                found = $annexSearchWidget.getView('root').getView('body.results.found');
            return found;
        }

        /**
         * #__handleDocumentCatchAllKeydownEvent
         * 
         * @note    The key length check is to handle things like the "Meta" key
         *          etc.
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentCatchAllKeydownEvent(event) {
            if (this.#__active.documentCatchAll === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget === null) {
                return false;
            }
            if ($annexSearchWidget.showing() === false) {
                return false;
            }
            if (event.metaKey === true) {
                return false;
            }
            if (event.ctrlKey === true) {
                return false;
            }
            let key = event.key;
            if (key.length > 1) {
                return false;
            }
            if (key === ' ') {
                return false;
            }
            let $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(key);
                found.smoothScrollToTop();
                found.resetFocusedIndex();
                field.first('input').dispatchEvent(new Event('input', {
                    bubbles: true,
                    shiftKey: event.shiftKey
                }));
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(key);
            found.smoothScrollToTop();
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
                shiftKey: event.shiftKey
            }));
            return true;
        }

        /**
         * #__handleDocumentCopyKeydownEvent
         * 
         * @see     https://chatgpt.com/c/68993510-aa98-832b-bdd6-2356a4452616
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentCopyKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'resultCopy', 'c') === false) {
                return false;
            }
            if (this.#__isModifierCombo(event) === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            let found = this.#__getFound(),
                results = found.getResults();
            for (let result of results) {
                if (result.getElement() === $activeElement) {
                    result.dispatchCopyEvent(event);
                    return true;
                }
            }
            return false;
        }

        /**
         * #__handleDocumentDeleteKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentDeleteKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentDelete', 'backspace') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.decrement();
                field.nullifyLastTypesenseSearchResponse();
                found.smoothScrollToTop();
                found.resetFocusedIndex();
                field.first('input').dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            field.decrement();
            field.nullifyLastTypesenseSearchResponse();
            found.smoothScrollToTop();
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * #__handleDocumentEscapeKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentEscape', 'escape') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                let field = this.#__getField();
                field.focus();
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            let field = this.#__getField();
            field.focus();
            return true;
        }

        /**
         * #__handleDocumentKeyboardNavigationKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentKeyboardNavigationKeydownEvent(event) {
            let validKeys = ['tab', 'arrowdown', 'arrowup'];
            if (this.#__validKeydownEvent(event, 'documentKeyboardNavigation', validKeys) === false) {
                return false;
            }
            let key = event.key.toLowerCase();
            event.preventDefault();
            let direction = 'previous';
            if (key === 'arrowdown') {
                direction = 'next';
            }
            if (key === 'tab') {
                if (event.shiftKey === false) {
                    direction = 'next';
                }
            }
            let found = this.#__getFound();
            if (direction === 'next') {
                found.next();
                return true;
            }
            found.previous() || this.#__getActiveWebComponent().getView('root').focus();
            return true;
        }

        /**
         * #__handleDocumentKeyboardShortcutKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentKeyboardShortcutKeydownEvent(event) {
            if (this.#__active.documentKeyboardShortcut === false) {
                return false;
            }
            let registered = this.#__getRegisteredWebComponents();
            for (let $annexSearchWidget of registered) {
                if ($annexSearchWidget.getConfig('layout') === 'inline') {
                    continue;
                }
                let keyboardShortcut = $annexSearchWidget.getHelper('config').get('keyboardShortcut');
                if (keyboardShortcut === null) {
                    continue
                }
                if (keyboardShortcut === undefined) {
                    continue
                }
                keyboardShortcut = keyboardShortcut.trim().toLowerCase();
                if (keyboardShortcut.charAt(0) !== '⌘') {
                    continue
                }
                if (this.#__isModifierCombo(event) === false) {
                    continue;
                }
                let key = event.key.toLowerCase(),
                    character = keyboardShortcut.charAt(1);
                if (key === character) {
                    event.preventDefault();
                    $annexSearchWidget.toggle();
                    return true;
                }
            }
            return false;
        }

        /**
         * #__handleDocumentPasteEvent
         * 
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentPasteEvent(event) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            if (this.#__getActiveWebComponent() === null) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget.showing() === false) {
                return false;
            }
            let configKey = 'documentPaste';
            if (this.#__active[configKey] === false) {
                return false;
            }
            let pastedText = event.clipboardData.getData('text');
            if (pastedText.length === 0) {
                return false;
            }
            pastedText = pastedText.trim();
            if (pastedText.length === 0) {
                return false;
            }
            let $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(pastedText);
                found.smoothScrollToTop();
                found.resetFocusedIndex();
                field.first('input').dispatchEvent(new Event('input', {
                    bubbles: true,
                }));
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(pastedText);
            found.smoothScrollToTop();
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
            }));
            return true;
        }

        /**
         * #__handleDocumentSelectAllKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentSelectAllKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSelectAll', 'a') === false) {
                return false;
            }
            if (this.#__isModifierCombo(event) === false) {
                return false;
            }
            let field = this.#__getField();
            field.focus();
            field.select();
            return true;
        }

        /**
         * #__handleDocumentSlashKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentSlashKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSlash', '/') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField();
            if ($activeElement === null) {
                field.focus();
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            return true;
        }

        /**
         * #__handleFieldEnterKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleFieldEnterKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEnter', 'enter') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            if ($activeElement.matches('input') === true) {
                let found = this.#__getFound(),
                    focusedIndex = found.getFocusedIndex();
                if (focusedIndex === null) {
                    let results = found.getResults(),
                        result = results[0];
                    if (result === undefined) {
                        return false;
                    }
                    event.stopPropagation();
                    result.focus();
                    result.simulateClick(event);
                    return true;
                }
                return false;
            }
            return false;
        }

        /**
         * #__handleFieldEscapeKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleFieldEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEscape', 'escape') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            if ($activeElement.matches('input') === true) {
                event.preventDefault();
                event.stopPropagation();
                let value = $activeElement.value.trim(),
                    found = this.#__getFound();
                if (value === '') {
                    $annexSearchWidget.hide();
                    return true;
                }
                let field = this.#__getField();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                found.clearResults();
                found.setStateKey('idle');
                $annexSearchWidget.dispatchCustomEvent('results.idle');
                return true;
            }
            return false;
        }

        /**
         * #__handleKeydownEvent
         * 
         * @note    Ordered
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleKeydownEvent(event) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            if (this.#__handleDocumentCopyKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentKeyboardShortcutKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentKeyboardNavigationKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentEscapeKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleFieldEscapeKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleFieldEnterKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentSlashKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentSelectAllKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentDeleteKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentCatchAllKeydownEvent(event) === true) {
                return true;
            }
            return true;
        }

        /**
         * #__isModifierCombo
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__isModifierCombo() {
            let mac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            if (mac === true) {
                if (event.metaKey === true) {
                    return true;
                }
                return false;
            }
            if (event.ctrlKey === true) {
                return true;
            }
            return false;
        }

        /**
         * #__validKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @param   String configKey
         * @param   String|Array validKeys
         * @return  Boolean
         */
        static #__validKeydownEvent(event, configKey, validKeys) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget === null) {
                return false;
            }
            if ($annexSearchWidget === undefined) {
                return false;
            }
            if ($annexSearchWidget.showing() === false) {
                return false;
            }
            if (this.#__active[configKey] === false) {
                return false;
            }
            validKeys = [].concat(validKeys);
            let key = event.key.toLowerCase();
            if (validKeys.includes(key) === false) {
                return false;
            }
            return true;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            let response = super.setup();
            if (response === true) {
                this.#__addDocumentPasteEventListener();
                this.#__addKeydownEventListener();
                return true;
            }
            let handler = window.annexSearch.KeyboardShortcutUtils.setup.bind(window.annexSearch.KeyboardShortcutUtils);
            document.addEventListener('DOMContentLoaded', handler);
            return true;
        }
    }
});

/**
 * /src/js/utils/Logging.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.LoggingUtils
     * 
     * @access  public
     */
    window.annexSearch.LoggingUtils = window.annexSearch.LoggingUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__labels
         * 
         * @access  private
         * @static
         * @var     String (default: 'Annex Search')
         */
        static #__labels = {
            error: 'Annex Search',
        };

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
                args = Array.from(arguments);
            args.unshift(styles);
            args.unshift(message);
            window.console && window.console.log && window.console.log.apply(window, args);
            return true;
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

/**
 * /src/js/utils/String.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.StringUtils
     * 
     * @access  public
     */
    window.annexSearch.StringUtils = window.annexSearch.StringUtils || class extends window.annexSearch.BaseUtils {

        /**
         * generateUUID
         * 
         * @see     https://chatgpt.com/c/689421e4-c708-8328-b5df-95b6028facf2
         * @access  public
         * @static
         * @return  String
         */
        static generateUUID() {
            let uuid = '', i, random;
            for (i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid += '-';
                } else if (i === 14) {
                    uuid += '4';
                } else if (i === 19) {
                    random = Math.random() * 16 | 0;
                    uuid += (random & 0x3 | 0x8).toString(16);
                } else {
                    random = Math.random() * 16 | 0;
                    uuid += random.toString(16);
                }
            }
            return uuid;
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

/**
 * /src/js/utils/Toast.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ToastUtils
     * 
     * @access  public
     */
    window.annexSearch.ToastUtils = window.annexSearch.ToastUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__toasts
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__toasts = [];

        /**
         * all
         * 
         * @access  public
         * @static
         * @return  Array
         */
        static all() {
            let toasts = this.#__toasts;
            return toasts;
        }

        /**
         * get
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Array
         */
        static get($annexSearchWidget) {
            let toasts = [];
            for (let toast of this.#__toasts) {
                if (toast.getWebComponent() === $annexSearchWidget) {
                    toasts.push(toast);
                }
            }
            return toasts;
        }

        /**
         * remove
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.ToastView toast
         * @return  Boolean
         */
        static remove(toast) {
            let index = this.#__toasts.indexOf(toast);
            if (index === -1) {
                return false;
            }
            this.#__toasts.splice(index, 1);
            return true;
        }

        /**
         * #__getParent
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static #__getParent($annexSearchWidget) {
            let $parent = $annexSearchWidget.shadow;
            // if ($annexSearchWidget.getConfig('layout') === 'inline') {
            //     $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            // }
            // if ($annexSearchWidget.getConfig('layout') === 'panel-left') {
            //     $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            // }
                $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            return $parent;
        }

        /**
         * show
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  Boolean
         */
        static show($annexSearchWidget, options) {
            let $parent = this.#__getParent($annexSearchWidget),
                view = window.annexSearch.ElementUtils.renderTemplate('toast', $parent);
            this.#__toasts.push(view);
            options.hideTimeoutDuration && view.setHideTimeoutDuration(options.hideTimeoutDuration);
            options.message && view.setMessage(options.message);
            options.title && view.setTitle(options.title);
            view.show();
            return true;
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

/**
 * /src/js/views/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.BaseView
     * 
     * @access  public
     * @extends window.annexSearch.Base
     */
    window.annexSearch.BaseView = window.annexSearch.BaseView || class extends window.annexSearch.Base {

        /**
         * _$element
         * 
         * @access  protected
         * @var     null|HTMLElement (default: null)
         */
        _$element = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super();
            this._$element = $element;
        }

        /**
         * find
         * 
         * @access  public
         * @param   String selector
         * @return  Array
         */
        find(selector) {
            let $element = this._$element,
                nodeList = $element.querySelectorAll(selector),
                $elements = Array.from(nodeList);
            return $elements;
        }

        /**
         * first
         * 
         * @access  public
         * @param   String selector
         * @return  null|HTMLElement
         */
        first(selector) {
            let $element = this._$element,
                $found = $element.querySelector(selector);
            return $found;
        }

        /**
         * getElement
         * 
         * @access  public
         * @return  HTMLElement
         */
        getElement() {
            let $element = this._$element;
            return $element;
        }

        /**
         * removeAttribute
         * 
         * @access  public
         * @param   String key
         * @return  Boolean
         */
        removeAttribute(key) {
            this._$element.removeAttribute(key);
            return true;
        }

        /**
         * setAttribute
         * 
         * @access  public
         * @param   String key
         * @param   String value
         * @return  Boolean
         */
        setAttribute(key, value) {
            this._$element.setAttribute(key, value);
            return true;
        }

        /**
         * setView
         * 
         * @access  public
         * @param   String key
         * @param   window.annexSearch.BaseView view
         * @return  Boolean
         */
        setView(key, view) {
            let views = this.get('views');
            if (views === undefined) {
                views = {};
            }
            views[key] = view;
            this.set('views', views);
            return true;
        }
    }
});

/**
 * /src/js/views/body/Body.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.BodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.BodyView = window.annexSearch.BodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="BodyView">
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__drawError
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawError() {
            let view = window.annexSearch.ElementUtils.renderTemplate('errorBody', this._$element);
            this.setView('error', view);
            return true;
        }

        /**
         * #__drawIdle
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawIdle() {
            let view = window.annexSearch.ElementUtils.renderTemplate('idleBody', this._$element);
            this.setView('idle', view);
            return true;
        }

        /**
         * #__drawResults
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawResults() {
            let view = window.annexSearch.ElementUtils.renderTemplate('resultsBody', this._$element);
            this.setView('results', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawError();
            this.#__drawIdle();
            this.#__drawResults();
            return true;
        }
    }
});

/**
 * /src/js/views/body/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ErrorBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ErrorBodyView = window.annexSearch.ErrorBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="ErrorBodyView">
    <div class="graphic"></div>
    <div class="message"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__setMessage
         * 
         * @access  private
         * @return  Boolean
         */
        #__setMessage() {
            let value = this.getHelper('config').get('copy').error.message;
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            this.first('.message').innerHTML = value;
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__setMessage();
            return true;
        }
    }
});

/**
 * /src/js/views/body/Idle.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.IdleBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.IdleBodyView = window.annexSearch.IdleBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="IdleBodyView">
    <div class="graphic"></div>
    <div class="message"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__setMessage
         * 
         * @access  private
         * @return  Boolean
         */
        #__setMessage() {
            let value = this.getHelper('config').get('copy').idle.message;
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            this.first('.message').innerHTML = value;
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__setMessage();
            return true;
        }
    }
});

/**
 * /src/js/views/body/results/Empty.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.EmptyResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.EmptyResultsBodyView = window.annexSearch.EmptyResultsBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="EmptyResultsBodyView">
    <div class="graphic"></div>
    <div class="message"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__setMessage
         * 
         * @access  private
         * @return  Boolean
         */
        #__setMessage() {
            let value = this.getHelper('config').get('copy').empty.message;
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            this.first('.message').innerHTML = value;
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__setMessage();
            return true;
        }
    }
});

/**
 * /src/js/views/body/results/Found.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FoundResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FoundResultsBodyView = window.annexSearch.FoundResultsBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__focusedIndex
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__focusedIndex = null;

        /**
         * #__results
         * 
         * @access  private
         * @var     Array (default: [])
         */
        #__results = [];

        /**
         * #__scrollDebounceDelay
         * 
         * @access  private
         * @var     Number (default: 60)
         */
        #__scrollDebounceDelay = 60;

        /**
         * #__scrollRatio
         * 
         * @access  private
         * @var     Number (default: 0.65)
         */
        #__scrollRatio = 0.65;

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="FoundResultsBodyView">
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addScrollEventListener();
            return true;
        }

        /**
         * #__addScrollEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addScrollEventListener() {
            let $element = this._$element,
                handler = this.#__handleScrollEvent.bind(this),
                scrollDebounceDelay = this.#__scrollDebounceDelay,
                debounced = window.annexSearch.FunctionUtils.debounce(handler, scrollDebounceDelay);
            $element.addEventListener('scroll', debounced);
            return true;
        }

        /**
         * #__drawResult
         * 
         * @note    Ordered
         * @access  private
         * @param   Object hit
         * @return  Boolean
         */
        #__drawResult(hit) {
            let view = window.annexSearch.ElementUtils.renderTemplate('resultFoundResultsBody', this._$element);
            view.set('hit', hit);
            this.#__results.push(view);
            view.render();
            return true;
        }

        /**
         * #__handleScrollEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleScrollEvent(event) {
            let scrollPosition = this._$element.scrollTop + this._$element.clientHeight,
                threshold = this._$element.scrollHeight * this.#__scrollRatio;
            if (scrollPosition < threshold) {
                return false;
            }
            this.getView('root.header.field').loadMore();
            return true;
        }

        /**
         * clearResults
         * 
         * @access  public
         * @return  Boolean
         */
        clearResults() {
            this.#__results = [];
            while (this._$element.firstChild) {
                this._$element.removeChild(this._$element.firstChild);
            }
            this.scrollToTop();
            return true;
        }

        /**
         * containsScrollbar
         * 
         * @see     https://chatgpt.com/c/6897db9a-a3c8-8327-a22d-e1db1187c914
         * @access  public
         * @return  Boolean
         */
        containsScrollbar() {
            let $element = this._$element,
                response = $element.scrollHeight > $element.clientHeight;
            return response;
        }

        /**
         * drawResults
         * 
         * @access  public
         * @param   Object typesenseResponse
         * @return  Boolean
         */
        drawResults(typesenseResponse) {
            let hits = typesenseResponse.hits || [];
            if (hits.length === 0) {
                return false;
            }
            for (var hit of hits) {
                this.#__drawResult(hit);
            }
            return true;
        }

        /**
         * getFocusedIndex
         * 
         * @access  public
         * @return  null|Number
         */
        getFocusedIndex() {
            let focusedIndex = this.#__focusedIndex;
            return focusedIndex;
        }

        /**
         * getResults
         * 
         * @access  public
         * @return  Array
         */
        getResults() {
            let results = this.#__results;
            return results;
        }

        /**
         * next
         * 
         * @access  public
         * @return  Boolean
         */
        next() {
// console.log('a');
            if (this.#__results.length === 0) {
                return false;
            }
            if (this.#__focusedIndex === null) {
                this.#__focusedIndex = 0;
                let result = this.#__results[this.#__focusedIndex];
                result.focus();
                return true;
            }
            if (this.#__focusedIndex === (this.#__results.length - 1)) {
                return false;
            }
            ++this.#__focusedIndex;
            let result = this.#__results[this.#__focusedIndex];
            result.focus();
            return true;
        }

        /**
         * previous
         * 
         * @access  public
         * @return  Boolean
         */
        previous() {
            if (this.#__results.length === 0) {
                return false;
            }
            if (this.#__focusedIndex === null) {
                return false;
            }
            if (this.#__focusedIndex === 0) {
                this.#__focusedIndex = null;
                return false;
            }
            --this.#__focusedIndex;
            let result = this.#__results[this.#__focusedIndex];
            result.focus();
            return true;
        }

        /**
         * resetFocusedIndex
         * 
         * @access  public
         * @return  Boolean
         */
        resetFocusedIndex() {
            let response = this.setFocusedIndex(null);
            return response;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__addEvents();
            return true;
        }

        /**
         * setFocusedIndex
         * 
         * @access  public
         * @param   null|Number focusedIndex
         * @return  Boolean
         */
        setFocusedIndex(focusedIndex) {
            this.#__focusedIndex = focusedIndex;
            return true;
        }

        /**
         * setFocusedIndexByResultView
         * 
         * @access  public
         * @param   window.annexSearch.ResultFoundResultsBodyView result
         * @return  Boolean
         */
        setFocusedIndexByResultView(result) {
            let index = this.#__results.indexOf(result);
            this.setFocusedIndex(index);
            return true;
        }

        /**
         * scrollToTop
         * 
         * @access  public
         * @return  Boolean
         */
        scrollToTop() {
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.scrollTop = 0;
            });
            return true;
        }

        /**
         * smoothScrollToTop
         * 
         * @access  public
         * @return  Boolean
         */
        smoothScrollToTop() {
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            return true;
        }
    }
});

/**
 * /src/js/views/body/results/Result.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ResultFoundResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ResultFoundResultsBodyView = window.annexSearch.ResultFoundResultsBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<a data-view-name="ResultFoundResultsBodyView" href="https://{{hit.document.hostname}}{{hit.document.relativeURL}}">
    <div class="title">{{hit.highlight.title.snippet || hit.document.title}}</div>
    <div class="body">{{hit.highlight.body.snippet || hit.document.body}}</div>
    <div class="uri truncate">https://{{hit.document.hostname}}{{hit.document.relativeURL}}</div>
</a>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let $element = this._$element,
                handler = this.#__handleClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            this.#__addFocusEventListener();
            this.#__addKeydownEventListener();
            return true;
        }

        /**
         * #__addFocusEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addFocusEventListener() {
            let $element = this._$element,
                handler = this.#__handleFocusEvent.bind(this);
            $element.addEventListener('focus', handler);
            return true;
        }

        /**
         * #__addKeydownEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addKeydownEventListener() {
            if (this._$element.hasAttribute('href') === true) {
                return false;
            }
            let $element = this._$element,
                handler = this.#__handleKeydownEvent.bind(this);
            $element.addEventListener('keydown', handler);
            return true;
        }

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let hit = this.get('hit'),
                $result = this._$element,
                map = {$result, event, hit};
            this.getWebComponent().dispatchCustomEvent('result.click', map);
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            return true;
        }

        /**
         * #__handleFocusEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleFocusEvent(event) {
            let hit = this.get('hit'),
                $result = this._$element,
                map = {$result, event, hit};
            this.getWebComponent().dispatchCustomEvent('result.focus', map);
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            return true;
        }

        /**
         * #__handleKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleKeydownEvent(event) {
            let key = event.key;
            key = key.toLowerCase();
            if (key === 'enter') {
                this.simulateClick(event);
                return true;
            }
            return false;
        }

        /**
         * #__renderTemplateVariables
         * 
         * @access  private
         * @return  Boolean
         */
        #__renderTemplateVariables() {
            let html = this._$element.outerHTML,
                hit = this.get('hit'),
                map = {
                    hit: hit
                };
            html = window.annexSearch.ElementUtils.renderTemplateVariables(html, map);
            html = this.getHelper('typesense').replaceHightlightTags(html);
            this._$element = this.#__replaceOuterHTML(html);
            return true;
        }

        /**
         * #__replaceOuterHTML
         * 
         * @see     https://chatgpt.com/c/68886a45-7668-8328-84b2-40f3673282e3
         * @access  private
         * @param   String html
         * @return  HTMLElement
         */
        #__replaceOuterHTML(html) {
            let $template = document.createElement('template');
            $template.innerHTML = html.trim();
            let $new = $template.content.firstChild,
                data = this._$element.data || {};
            this._$element.replaceWith($new);
            $new.data = data;
            return $new;
        }

        /**
         * #__setIndexAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setIndexAttribute() {
            let found = this.getView('root.body.results.found'),
                results = found.getResults(),
                index = results.indexOf(this);
            this.setAttribute('data-index', index);
            return true;
        }

        /**
         * #__setTabindex
         * 
         * Neccessary method to account for the case where a custom template is
         * defined, and the custom template doesn't have an [href] attribute
         * applied.
         * 
         * @see     https://chatgpt.com/c/68990038-8970-8320-acb6-a2bef11bf487
         * @access  private
         * @return  Boolean
         */
        #__setTabindex() {
            if (this._$element.hasAttribute('href') === true) {
                return false;
            }
            this.setAttribute('tabindex', 0);
            return true;
        }

        /**
         * dispatchCopyEvent
         * 
         * @access  public
         * @param   Object event
         * @return  Boolean
         */
        dispatchCopyEvent(event) {
            let hit = this.get('hit'),
                $result = this._$element,
                map = {$result, event, hit};
            this.getWebComponent().dispatchCustomEvent('result.copy', map);
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            this._$element.focus();
            this._$element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            return true;
        }

        /**
         * render
         * 
         * @note    Ordered
         * @access  public
         * @return  Boolean
         */
        render() {
            let hit = this.get('hit');
            if (hit === undefined) {
                return false;
            }
            this.#__renderTemplateVariables();
            this.#__setIndexAttribute();
            this.#__setTabindex();
            this.#__addEvents();
            return true;
        }

        /**
         * simulateClick
         * 
         * @access  public
         * @param   Object originEvent
         * @return  Boolean
         */
        simulateClick(originEvent) {
            let event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                shiftKey: originEvent.shiftKey,
                metaKey: originEvent.metaKey,
                ctrlKey: originEvent.ctrlKey
            });
            this._$element.dispatchEvent(event);
            return true;
        }
    }
});

/**
 * /src/js/views/body/results/Results.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ResultsBodyView = window.annexSearch.ResultsBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="ResultsBodyView">
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__drawEmpty
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawEmpty() {
            let view = window.annexSearch.ElementUtils.renderTemplate('emptyResultsBody', this._$element);
            this.setView('empty', view);
            return true;
        }

        /**
         * #__drawFound
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawFound() {
            let view = window.annexSearch.ElementUtils.renderTemplate('foundResultsBody', this._$element);
            this.setView('found', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawEmpty();
            this.#__drawFound();
            return true;
        }
    }
});

/**
 * /src/js/views/common/Toast.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ToastView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ToastView = window.annexSearch.ToastView || class extends window.annexSearch.BaseView {

        /**
         * #__hideTimeoutDuration
         * 
         * @access  private
         * @var     Number (default: 5000)
         */
        #__hideTimeoutDuration = 5000;

        /**
         * #__hideTimeoutReference
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__hideTimeoutReference = null;

        /**
         * #__message
         * 
         * @access  private
         * @var     String (default: '(message)')
         */
        #__message = '(message)';

        /**
         * #__title
         * 
         * @access  private
         * @var     String (default: '(title)')
         */
        #__title = '(title)';

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="ToastView">
    <div class="title"></div>
    <div class="message"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let $element = this._$element,
                handler = this.#__handleClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            if (this.#__title === null) {
                return false;
            }
            this.#__addClickEventListener();
            return true;
        }

        /**
         * #__destroy
         * 
         * @access  private
         * @return  Boolean
         */
        #__destroy() {
            // let $webComponent = this.getWebComponent();
            this._$element.remove();
            // window.annexSearch.ToastUtils.remove($webComponent, this);
            window.annexSearch.ToastUtils.remove(this);
            return true;
        }

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            this.hide();
            return true;
        }

        /**
         * #__hideOpenToasts
         * 
         * @access  private
         * @return  Boolean
         */
        #__hideOpenToasts() {
            let $annexSearchWidget = this.getWebComponent(),
                toasts = window.annexSearch.ToastUtils.get($annexSearchWidget);
            for (let toast of toasts) {
                if (toast === this) {
                    continue;
                }
                toast.hide();
            }
            return true;
        }

        /**
         * #__setTimeout
         * 
         * @access  private
         * @return  Boolean
         */
        #__setTimeout() {
            let handler = this.hide.bind(this),
                timeout = this.#__hideTimeoutDuration,
                reference = setTimeout(handler, timeout);
            this.#__hideTimeoutReference = reference;
            return true;
        };

        /**
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        hide() {
            this._$element.classList.remove('visible');
            clearTimeout(this.#__hideTimeoutReference);
            var handler = this.#__destroy.bind(this);
            this._$element.addEventListener('transitionend', handler);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__addEvents();
            return true;
        }

        /**
         * setHideTimeoutDuration
         * 
         * @access  public
         * @param   null|Number hideTimeoutDuration (default: null)
         * @return  Boolean
         */
        setHideTimeoutDuration(hideTimeoutDuration = null) {
            this.#__hideTimeoutDuration = hideTimeoutDuration || this.#__hideTimeoutDuration;
            return true;
        }

        /**
         * setMessage
         * 
         * @access  public
         * @param   String message
         * @return  Boolean
         */
        setMessage(message) {
            let $element = this.first('.message');
            $element.innerHTML = message;
            return true;
        }

        /**
         * setTitle
         * 
         * @access  public
         * @param   String title
         * @return  Boolean
         */
        setTitle(title) {
            let $element = this.first('.title');
            $element.innerHTML = title;
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            this.#__hideOpenToasts();
            this.#__setTimeout();
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.classList.add('visible');
            });
            return true;
        }
    }
});

/**
 * /src/js/views/footer/BrandingBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.BrandingBarFooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.BrandingBarFooterView = window.annexSearch.BrandingBarFooterView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="BrandingBarFooterView">
    Powered by <a href="https://annexsearch.com/" target="_blank">Annex Search</a>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            return true;
        }
    }
});

/**
 * /src/js/views/footer/Footer.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FooterView = window.annexSearch.FooterView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div class="clearfix" data-view-name="FooterView">
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__drawBrandingBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawBrandingBar() {
            let view = window.annexSearch.ElementUtils.renderTemplate('brandingBarFooter', this._$element);
            this.setView('brandingBar', view);
            return true;
        }

        /**
         * #__drawStatusBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawStatusBar() {
            let view = window.annexSearch.ElementUtils.renderTemplate('statusBarFooter', this._$element);
            this.setView('statusBar', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawBrandingBar();
            this.#__drawStatusBar();
            return true;
        }
    }
});

/**
 * /src/js/views/footer/StatusBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.StatusBarFooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.StatusBarFooterView = window.annexSearch.StatusBarFooterView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="StatusBarFooterView">
    <div class="message truncate"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__setMessage
         * 
         * @access  private
         * @return  Boolean
         */
        #__setMessage() {
            let value = this.getHelper('config').get('copy').statusBar.message;
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            this.first('.message').innerHTML = value;
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__setMessage();
            return true;
        }
    }
});

/**
 * /src/js/views/header/Field.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FieldHeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FieldHeaderView = window.annexSearch.FieldHeaderView || class extends window.annexSearch.BaseView {

        /**
         * #__lastTypesenseSearchRequest
         * 
         * @access  private
         * @var     null|window.annexSearch.TypesenseSearchRequest (default: null)
         */
        // #__lastTypesenseSearchRequest = null;

        /**
         * #__lastTypesenseSearchResponse
         * 
         * @access  private
         * @var     null|Object (default: null)
         */
        #__lastTypesenseSearchResponse = null;

        /**
         * #__loadingMore
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__loadingMore = false;

        /**
         * #__searchDebounceDelay
         * 
         * @access  private
         * @var     Number (default: 60)
         */
        // #__searchDebounceDelay = 600;
        #__searchDebounceDelay = 60;

        /**
         * #__timeout
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__timeout = null;

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div class="clearfix" data-view-name="FieldHeaderView">
    <div class="label"></div>
    <div class="input">
        <input type="search" name="query" id="query" spellcheck="false" autocapitalize="off" autocorrect="off" />
    </div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
// console.log('a');
            this.#__addInputInputEventListener();
            return true;
        }

        /**
         * #__addInputInputEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addInputInputEventListener() {
            let handler = this.#__handleInputInputEvent.bind(this),
                $element = this.first('input');
            $element.addEventListener('input', handler);
            return true;
        };

        /**
         * #__getKeyboardShortcut
         * 
         * @access  private
         * @return  null|String
         */
        #__getKeyboardShortcut() {
            let value = this.getHelper('config').get('keyboardShortcut');
            if (value === null) {
                return null;
            }
            value = value.trim().toLowerCase();
            return value;
        }

        /**
         * #__handleFailedTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleFailedTypesenseSearchEvent(options, typesenseSearchRequest) {
            let error = typesenseSearchRequest.getError(),
                key = error.key;
            if (key === 'abort') {
                return false;
            }
            this.getWebComponent().dispatchCustomEvent('results.error', {error});
            let header = this.getView('root.header');
            header.hideSpinner();
            let response = typesenseSearchRequest.getResponse();
            this.#__lastTypesenseSearchResponse = response;
            this.setStateKey('error');
            typesenseSearchRequest.logFailedEvent();
            return true;
        };

        /**
         * #__handleInputInputEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleInputInputEvent(event) {
// console.log('ummm');
            let value = this.first('input').value.trim();
            if (value === '') {
                this.nullifyLastTypesenseSearchResponse();
                this.clear();
                this.setStateKey('idle');
                this.getWebComponent().dispatchCustomEvent('results.idle');
                return false;
            }
            if (value === this.#__lastTypesenseSearchResponse?.request_params?.q) {
                return false;
            }
            this.nullifyLastTypesenseSearchResponse();
            this.#__loadingMore = false;
            let found = this.getView('root.body.results.found');
            found.scrollToTop();
            clearTimeout(this.#__timeout);
            this.#__timeout = setTimeout(this.#__searchTypesense.bind(this), this.#__searchDebounceDelay);
            return true;
        };

        /**
         * #__handleLoadMoreSuccessfulTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleLoadMoreSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest) {
            let response = typesenseSearchRequest.getResponse();
            this.getWebComponent().dispatchCustomEvent('results.loaded', {response});
            this.#__lastTypesenseSearchResponse = response;
            this.#__loadingMore = false;
            if (response.hits.length === 0) {
                return false;
            }
            let found = this.getView('root.body.results.found');
            found.drawResults(response);
            this.#__updateMetaBar();
            return true;
        }

        /**
         * #__handleSuccessfulTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest) {
            let response = typesenseSearchRequest.getResponse();
            if (this.#__loadingMore === true) {
                let loadMoreResponse = this.#__handleLoadMoreSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest),
                    found = this.getView('root.body.results.found'),
                    containsScrollbar = found.containsScrollbar();
    // console.log(containsScrollbar);
                if (containsScrollbar === true) {
                    return true;
                }
                this.loadMore();
                return loadMoreResponse;
            }
            this.#__lastTypesenseSearchResponse = response;
            this.getView('root.body.results.found').clearResults();
            if (response.hits.length === 0) {
                this.getWebComponent().dispatchCustomEvent('results.empty');
                this.setStateKey('empty');
                return false;
            }
            this.getWebComponent().dispatchCustomEvent('results.loaded', {response});
            this.setStateKey('results');
            let found = this.getView('root.body.results.found');
            found.drawResults(response);
            found.resetFocusedIndex();
            this.#__updateMetaBar();
            let containsScrollbar = found.containsScrollbar();
// console.log(containsScrollbar);
            if (containsScrollbar === true) {
                return true;
            }
            this.loadMore();
            return true;
        };

        /**
         * #__handleTypesenseSearchResponse
         * 
         * @access  private
         * @param   Object options (default: {})
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleTypesenseSearchResponse(options = {}, typesenseSearchRequest) {
            // this.#__lastTypesenseSearchRequest = typesenseSearchRequest;
            let error = typesenseSearchRequest.getError();
            if (error === null) {
                let header = this.getView('root.header');
                header.hideSpinner();
                let response = this.#__handleSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest);
                return response;
            }
            let response = this.#__handleFailedTypesenseSearchEvent(options, typesenseSearchRequest);
            return response;
        }

        /**
         * #__searchTypesense
         * 
         * @access  private
         * @param   Object options (default: {})
         * @return  Promise
         */
        #__searchTypesense(options = {}) {
            let header = this.getView('root.header');
            header.showSpinner();
            let value = this.first('input').value.trim(),
                handler = this.#__handleTypesenseSearchResponse.bind(this, options),
                promise = this.getHelper('typesense').search(value, options).then(handler);
            return promise;
        }

        /**
         * #__setInputPlaceholder
         * 
         * @access  private
         * @return  Boolean
         */
        #__setInputPlaceholder() {
            let placeholder = this.getHelper('config').get('copy').placeholder;
            if (placeholder === null) {
                return false;
            }
            if (placeholder === undefined) {
                return false;
            }
            this.first('input').setAttribute('placeholder', placeholder);
            return true;
        };

        /**
         * #__setKeyboardShortcutLabel
         * 
         * @access  private
         * @return  Boolean
         */
        #__setKeyboardShortcutLabel() {
            let keyboardShortcut = this.#__getKeyboardShortcut();
            if (keyboardShortcut === null) {
                return false;
            }
            this.first('.label').innerHTML = keyboardShortcut.toUpperCase();
            return true;
        }

        /**
         * #__updateMetaBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__updateMetaBar() {
            let typesenseSearchResponse = this.#__lastTypesenseSearchResponse,
                metaBar = this.getView('root.header.metaBar');
            metaBar.set('typesenseSearchResponse', typesenseSearchResponse);
            metaBar.render();
            return true;
        }

        /**
         * append
         * 
         * @access  public
         * @param   String value
         * @return  Boolean
         */
        append(value) {
            let $input = this.first('input');
            $input.value = ($input.value) + (value);
            return true;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let $input = this.first('input');
            $input.blur();
            return true;
        }

        /**
         * clear
         * 
         * @access  public
         * @return  Boolean
         */
        clear() {
            // this.nullifyLastTypesenseSearchResponse();
            // this.#__lastTypesenseSearchResponse = null;
            let $input = this.first('input');
            $input.value = '';
            return true;
        }

        /**
         * nullifyLastTypesenseSearchResponse
         * 
         * @access  public
         * @return  Boolean
         */
        nullifyLastTypesenseSearchResponse() {
            this.#__lastTypesenseSearchResponse = null;
            return true;
        }

        /**
         * decrement
         * 
         * @access  public
         * @return  Boolean
         */
        decrement() {
            let $input = this.first('input');
            $input.value = $input.value.slice(0, -1);
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let $input = this.first('input');
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $input.focus();
            })
            return true;
        }

        /**
         * loadMore
         * 
         * @access  public
         * @return  Boolean
         */
        loadMore() {
            if (this.#__loadingMore === true) {
                return false;
            }
            this.#__loadingMore = true;
            let found = this.getView('root.body.results.found'),
                results = found.getResults();
            if (results.length >= this.#__lastTypesenseSearchResponse.found) {
                return false;
            }
            let page = this.#__lastTypesenseSearchResponse?.page ?? null;
            if (page === null) {
                return false;
            }
            page = parseInt(page, 10);
            ++page;
            let options = {};
            options.page = page;
            this.#__searchTypesense(options);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__addEvents();
            this.#__setInputPlaceholder();
            this.#__setKeyboardShortcutLabel();
            return true;
        }

        /**
         * select
         * 
         * @access  public
         * @return  Boolean
         */
        select() {
            let $input = this.first('input');
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $input.select();
            })
            return true;
        }

        /**
         * setCaret
         * 
         * Moves the caret to the end of the input.
         * 
         * @access  public
         * @return  Boolean
         */
        setCaret() {
            let $input = this.first('input'),
                value = $input.value;
            $input.setSelectionRange(value.length, value.length);
            return true;
        }
    }
});

/**
 * /src/js/views/header/Header.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.HeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.HeaderView = window.annexSearch.HeaderView || class extends window.annexSearch.BaseView {

        /**
         * #__showingSpinner
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showingSpinner = false;

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="HeaderView">
    <div class="hide icon icon-plus icon-size-14"></div>
    <div class="spinner spinning icon icon-spinner"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this),
                $element = this._$element;
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            this.#__addHideClickEventListener();
            return true;
        }

        /**
         * #__addHideClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addHideClickEventListener() {
            let handler = this.#__handleHideClickEvent.bind(this),
                $element = this.first('.hide');
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__drawField
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawField() {
            let view = window.annexSearch.ElementUtils.renderTemplate('fieldHeader', this._$element);
            this.setView('field', view);
            return true;
        }

        /**
         * #__drawMetaBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawMetaBar() {
            let view = window.annexSearch.ElementUtils.renderTemplate('metaBarHeader', this._$element);
            this.setView('metaBar', view);
            return true;
        }

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let $target = event.target,
                $hide = this.first('.hide');
            if ($target === $hide) {
                return false;
            }
            this.focus();
            return true;
        };

        /**
         * #__handleHideClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleHideClickEvent(event) {
            this.hideWebComponent();
            return false;
        };

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let response = this.getView('field').blur();
            return response;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('field').focus();
            return response;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawField();
            this.#__drawMetaBar();
            this.#__addEvents();
            return true;
        }

        /**
         * hideSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        hideSpinner() {
            if (this.#__showingSpinner === false) {
                return false;
            }
            this.#__showingSpinner = false;
            this.getView('root').setAttribute('data-searching', '0');
            return true;
        }

        /**
         * showSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        showSpinner() {
            if (this.#__showingSpinner === true) {
                return false;
            }
            this.#__showingSpinner = true;
            this.getView('root').setAttribute('data-searching', '1');
            return true;
        }

        /**
         * toggleSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        // toggleSpinner() {
        //     if (this.#__showingSpinner === true) {
        //         let response = this.hideSpinner();
        //         return response;
        //     }
        //     let response = this.showSpinner();
        //     return response;
        // }
    }
});

/**
 * /src/js/views/header/MetaBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.MetaBarHeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.MetaBarHeaderView = window.annexSearch.MetaBarHeaderView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="MetaBarHeaderView">
    Showing
    <span class="showing">xx</span> of
    <span class="found">yy</span>
    matching results
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__setContent
         * 
         * @access  private
         * @return  Boolean
         */
        #__setContent() {
            let typesenseSearchResponse = this.get('typesenseSearchResponse'),
                found = this.getView('root.body.results.found'),
                results = found.getResults(),
                showing = results.length;
            this.first('.showing').innerHTML = showing;
            this.first('.found').innerHTML = typesenseSearchResponse.found;
            // this.first('.total').innerHTML = typesenseSearchResponse.out_of;
            // this.first('.duration').innerHTML = (typesenseSearchResponse.search_time_ms) + 'ms';
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            let typesenseSearchResponse = this.get('typesenseSearchResponse');
            if (typesenseSearchResponse === undefined) {
                return false;
            }
            this.#__setContent();
            return true;
        }
    }
});

/**
 * /src/js/views/Root.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.RootView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.RootView = window.annexSearch.RootView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="RootView" data-state-key="idle">
    <div class="content"></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            // window.annexSearch.KeyboardShortcutUtils.setup();
            this.#__addOverlayClickEventListener();
            return true;
        }

        /**
         * #__addOverlayClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addOverlayClickEventListener() {
            let $element = this._$element,
                handler = this.#__handleOverlayClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__drawBody
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawBody() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('body', $content);
            this.setView('body', view);
            return true;
        }

        /**
         * #__drawFooter
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawFooter() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('footer', $content);
            this.setView('footer', view);
            return true;
        }

        /**
         * #__drawHeader
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawHeader() {
            let $content = this.first('.content'),
                view = window.annexSearch.ElementUtils.renderTemplate('header', $content);
            this.setView('header', view);
            return true;
        }

        /**
         * #__handleOverlayClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleOverlayClickEvent(event) {
            let $target = event.target;
            if ($target === this._$element) {
                this.getWebComponent().hide();
                return true;
            }
            return false;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let response = this.getView('header').blur();
            return response;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('header').focus();
            return response;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawHeader();
            this.#__drawBody();
            this.#__drawFooter();
            this.#__addEvents();
            this.setStateKey('idle');
            this.getWebComponent().dispatchCustomEvent('results.idle');
            return true;
        }

        /**
         * setStateKey
         * 
         * @access  public
         * @param   String stateKey
         * @return  Boolean
         */
        setStateKey(stateKey) {
            this._$element.setAttribute('data-state-key', stateKey);
            return true;
        }
    }
});

/**
 * /src/js/web-components/AnnexSearchWidget.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearchWidgetWebComponent
     * 
     * @see     https://chatgpt.com/c/68952fc2-4a9c-8323-9de9-8857960241d8
     * @extends HTMLElement
     */
    window.annexSearch.AnnexSearchWidgetWebComponent = window.annexSearch.AnnexSearchWidgetWebComponent || class extends HTMLElement {

        /**
         * #__helpers
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__helpers = {};

        /**
         * #__index
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__index = null;

        /**
         * #__maxZIndexValue
         * 
         * @access  private
         * @var     Number (default: 2147483647)
         */
        #__maxZIndexValue = 2147483647;

        /**
         * #__mounted
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__mounted = false;

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

        /**
         * #__uuid
         * 
         * @access  private
         * @var     null|String (default: null)
         */
        #__uuid = null;

        /**
         * #__views
         * 
         * @access  private
         * @var     Object (default: {})
         */
        #__views = {};

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
            this.#__index = window.annexSearch.AnnexSearch.getRegistered().length;
            window.annexSearch.AnnexSearch.register(this);
            this.#__setupShadow();
            this.#__setupHelpers();
            this.#__setUUID();
            this.#__render();
        }

        /**
         * #__setStyles
         * 
         * @access  private
         * @return  Boolean
         */
        #__setStyles() {
            // let showing = window.annexSearch.AnnexSearch.getShowing();
            // if (showing.length === 0) {
            //     return false;
            // }
            // if (showing.length === 1) {
            //     return false;
            // }
            let zIndex = this.#__maxZIndexValue - this.#__index;
// console.log(zIndex);
            return true;
        }

        /**
         * #__drawRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawRoot() {
            let $shadow = this.shadow,
                view = window.annexSearch.ElementUtils.renderTemplate('root', $shadow, this),
                layout = this.getConfig('layout'),
                overlay = String(+this.getConfig('showOverlay')),
                index = this.#__index;
// console.log(overlay);
            if (this.getConfig('layout') === 'inline') {
                overlay = 0;
            }
            this.#__views.root = view;
            this.setAttribute('id', this.#__uuid);
            let mode = this.getConfig('mode');
            this.setAttribute('data-annex-search-mode', mode);
            this.setAttribute('data-annex-search-layout', layout);
            this.setAttribute('data-annex-search-overlay', overlay);
            this.setAttribute('data-annex-search-ready', '1');
            this.setAttribute('data-annex-search-index', index);
            this.setAttribute('data-annex-search-open', '0');
            if (this.getConfig('name') !== null) {
                let name = this.getConfig('name');
                this.setAttribute('data-annex-search-name', name);
            }
            if (this.getConfig('layout') === 'inline') {
                this.show();
            }
            return true;
        }

        /**
         * #__render
         * 
         * @access  private
         * @return  Promise
         */
        #__render() {
            let helper = this.getHelper('config'),
                handler = this.#__drawRoot.bind(this),
                promise = helper.loadStylesheets(this)
                    // .then(helper.loadTemplates.bind(helper))
                    .then(handler)
                    .catch(function(error) {
                        console.log(error);
                    });
            return promise;
        }

        /**
         * #__setupHelpers
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupHelpers() {
            this.#__helpers.config = new window.annexSearch.ConfigHelper();
            this.#__helpers.typesense = new window.annexSearch.TypesenseHelper();
            return true;
        }

        /**
         * #__setupShadow
         * 
         * @access  private
         * @return  Boolean
         */
        #__setupShadow() {
            this.shadow = this.attachShadow({
                mode: 'closed'
            });
            return true;
        }

        /**
         * #__setUUID
         * 
         * @access  private
         * @return  Boolean
         */
        #__setUUID() {
            this.#__uuid = window.annexSearch.StringUtils.generateUUID();
            return true;
        }

        /**
         * clear
         * 
         * @access  public
         * @return  Boolean
         */
        clear() {
            // if (this.#__showing === true) {
            //     return false;
            // }
// console.log('clearing');
            let field = this.getView('root').getView('root.header.field'),
                found = this.getView('root').getView('body.results.found');
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            // field.append(query);
            // found.smoothScrollToTop();
            found.resetFocusedIndex();
            // window.annexSearch.ElementUtils.waitForAnimation().then(function() {
            //     field.setCaret();
            // });
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * dispatchCustomEvent
         * 
         * @see     https://chatgpt.com/c/68942c36-15a0-8328-a9aa-a0a5e682af61
         * @access  public
         * @param   String eventName
         * @param   Object map (default: {})
         * @return  Boolean
         */
        dispatchCustomEvent(eventName, map = {}) {

            // CustomEvent
            map.$annexSearchWidget = this;
            let event = new CustomEvent(eventName, {
                detail: map
            });

            // Callback
            let reference = this.getConfig('callbacks') || {},
                pieces = eventName.split('.');
            for (var piece of pieces) {
                reference = reference[piece] ?? null;
                if (reference === null) {
                    break;
                }
            }
            reference && reference && reference.apply(this, [event]);

            // Dispatching
            this.dispatchEvent(event);
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('root').focus();
            return response;
        }

        /**
         * getConfig
         * 
         * @access  public
         * @param   String key
         * @return  Boolean
         */
        getConfig(key) {
            let value = this.getHelper('config').get(key);
            return value;
        }

        /**
         * getHelper
         * 
         * @access  public
         * @param   String key
         * @return  window.annexSearch.BaseView
         */
        getHelper(key) {
            let helper = this.#__helpers[key];
            return helper;
        }

        /**
         * getView
         * 
         * @access  public
         * @param   String viewKey
         * @return  window.annexSearch.BaseView
         */
        getView(viewKey) {
            let view = this.#__views[viewKey];
            return view;
        }

        /**
         * hide
         * 
         * @see     https://chatgpt.com/c/688faa3b-3b2c-832c-a55b-96d1ab15acbe
         * @access  public
         * @return  Boolean
         */
        hide() {
            if (this.getConfig('layout') === 'inline') {
                return false;
            }
            if (this.#__showing === false) {
                return false;
            }
            window.annexSearch.AnnexSearch.clearActive();
            this.dispatchCustomEvent('root.hide');
            this.#__showing = false;
            this.#__views.root.blur();
            this.setAttribute('data-annex-search-open', '0');
            this.setAttribute('inert', '');
            return true;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container (default: null)
         * @return  Boolean
         */
        mount($container = null) {
            $container = $container || this.getConfig('$container') || null;
            if ($container === null) {
                if (this.getConfig('layout') === 'inline') {
                    return false;
                }
                $container = (document.body || document.head || document.documentElement);
            }
            $container.appendChild(this);
            this.#__mounted = true;
            return true;
        }

        /**
         * query
         * 
         * @access  public
         * @param   String query
         * @return  Boolean
         */
        query(query) {
            let field = this.getView('root').getView('root.header.field'),
                found = this.getView('root').getView('body.results.found');
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(query);
            found.smoothScrollToTop();
            found.resetFocusedIndex();
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                field.setCaret();
            });
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * ready
         * 
         * @access  public
         * @return  Promise
         */
        ready() {
            if (this.#__mounted === false) {
                let promise = new Promise(function(resolve, reject) {
                    reject();
                });
                return promise;
            }
            let $annexSearchWidget = this,
                ready = this.getAttribute('data-annex-search-ready');
            if (ready === null) {
                let promise = new Promise(function(resolve, reject) {
                    let interval = setInterval(function() {
// console.log('eff');
                        let ready = $annexSearchWidget.getAttribute('data-annex-search-ready');
                        if (ready !== null) {
                            clearInterval(interval);
                            resolve($annexSearchWidget);
                        }
                    }, 10);
                });
                return promise;
            }
            let promise = new Promise(function(resolve, reject) {
                resolve();
            });
            return promise;
        }

        /**
         * setConfig
         * 
         * @access  public
         * @param   String key
         * @param   mixed value
         * @return  Boolean
         */
        setConfig(key, value) {
            if (typeof key === 'object') {
                let response = this.getHelper('config').setData(key);
                return response;
            }
            let response = this.getHelper('config').set(key, value);
            return response;
        }

        /**
         * show
         * 
         * @note    The logic below is to ensure state is preserved between
         *          openings.
         * @access  public
         * @return  Boolean
         */
        show() {
            if (this.#__showing === true) {
                return false;
            }
// console.log('eff');
// console.trace();
            window.annexSearch.AnnexSearch.setActive(this);
            this.dispatchCustomEvent('root.show');
            this.#__showing = true;
            this.#__setStyles();
            this.setAttribute('data-annex-search-open', '1');
            this.removeAttribute('inert');
            let found = this.#__views.root.getView('root.body.results.found'),
                results = found.getResults();
// console.log(results);
            if (results.length === 0) {
// console.log('a');
                this.#__views.root.focus();
                return true;
            }
            let focusedIndex = found.getFocusedIndex();
            if (focusedIndex === null) {
                focusedIndex = 0;
            }
            let result = results[focusedIndex];
            if (result === undefined) {
                return true;
            }
            result.focus();
            return true;
        }

        /**
         * showing
         * 
         * @access  public
         * @return  Boolean
         */
        showing() {
            let showing = this.#__showing;
            return showing;
        }

        /**
         * showToast
         * 
         * @access  public
         * @param   String title
         * @param   String message
         * @param   null|Number hideTimeoutDuration (default: null)
         * @return  Boolean
         */
        showToast(title, message, hideTimeoutDuration = null) {
            let options = {title, message, hideTimeoutDuration},
                response = window.annexSearch.ToastUtils.show(this, options);
            return response;
        }

        /**
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            this.dispatchCustomEvent('root.toggle');
            if (this.#__showing === true) {
                let response = this.hide();
                return response;
            }
            let response = this.show();
            return response;
        }
    }
});

/**
 * /src/js/runtime/contentScript.js
 * 
 */
window.annexSearch.DependencyLoader.load(function() {
    window.annexSearch.AnnexSearch.setup();
});
