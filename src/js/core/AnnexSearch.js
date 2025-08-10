
/**
 * /src/js/core/AnnexSearch.js
 * 
 * @todo    - Error logging cleanup
 * @todo    - bug with focus not coming back (related to found.results not being cleared)
 * 
 * @todo    - ensure multiple instantiations happen sequentially (to allow for /templates caching)
 * 
 * @todo    - bug with multiple open and query-ing
 * @todo    - multiple bugs (various)
 * 
 * @todo    - variable templating
 * @todo    - custom templates
 * @todo    - collection retriveal (for smart templates?)
 * 
 * @todo    - CacheUtils for /css and /templates lookups to speed things up (?)
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
                if (propertyName.endsWith('Utils') === false) {
                    continue;
                }
                window.annexSearch[propertyName].setup && window.annexSearch[propertyName].setup();
            }
            // window.annexSearch.CacheUtils.setup();
            // window.annexSearch.DataUtils.setup();
            // // window.annexSearch.DebuggingUtils.setup();
            // window.annexSearch.ElementUtils.setup();
            // window.annexSearch.ErrorUtils.setup();
            // window.annexSearch.FunctionUtils.setup();
            // window.annexSearch.InteractionUtils.setup();
            // window.annexSearch.KeyboardShortcutUtils.setup();
            // window.annexSearch.LoggingUtils.setup();
            // window.annexSearch.StringUtils.setup();
            // window.annexSearch.ToastUtils.setup();
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
