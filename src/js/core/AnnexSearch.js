
/**
 * /src/js/core/AnnexSearch.js
 * 
 * @todo    - Add in logic to prevent accidental infinite XHR when scrollbar is missing but shouldn't be?
 * @todo    -- Toast to kill UI?
 * @todo    -- Throw error whenever needed (of specific type?) and catch it; then kill?
 * 
 * @todo    - Bug with focus not coming back (related to found.results not being cleared)
 * 
 * @todo    - Bug with multiple open and query-ing
 * @todo    - Multiple bugs (various)
 * 
 * @todo    - Typesense collection retrieval (for smart templates?)
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
 * @todo    [DONE] - Further cleanup of error handling (e.g. don't define messages in TypesenseHelper?)
 * @todo    [PUNT] - UI for customizing and storing it on a server
 * @todo    [DONE] - Arch cleanup to ensure object instances are directly tied to the respective $annexSearchWidget
 * @todo    [DONE] -- Right now, this is messy. Should be standardized
 * @todo    [DONE] - Error logging cleanup
 * @todo    [DONE] - Re-architect things so that config template functions receive data object(s)
 * @todo    [PUNT] - CacheUtils for /css and /templates lookups to speed things up (?)
 * @todo    [PUNT] -- Only for /templates since /css is direct linked (?)
 * @todo    [PUNT] - Hook escape key to toasts (introduce escape utils class)
 * @todo    [DONE] - Problem w/ css dist file (min.css but maybe also non-min?)
 * @todo    [DONE] -- Possible issue w/ vars not being defined at top?
 * @todo    [DONE] - custom templates
 * @todo    [DONE] - variable templating
 * @todo    [DONE] - State management for updating data while toast is showing
 * @todo    [NOPE] - ensure multiple instantiations happen sequentially (to allow for /templates caching)
 * @todo    [NOPE] -- Not required if /templates no longer used?
 * @todo    [DONE] - CSS vars re:mode
 * @todo    [DONE] - Toast bug re:destroying
 * @todo    [PUNT] - When hovering over toast, don't allow to hide
 * @todo    [PUNT] -- Don't pause timer; wait until after mouseout and then close if appropriate
 * @todo    [PUNT] - Handle $input history preservation w/ respect to keyboard shortcuts
 * @todo    [PUNT] -- https://416.io/ss/f/5vo5uq
 * @todo    [PUNT] -- https://chatgpt.com/c/689ac399-9424-8320-943f-6327140b2045
 * @todo    [PUNT] -- https://claude.ai/chat/9ae0dab1-7637-4705-879d-65d62656b64a
 * @todo    [PUNT] -- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 * @todo    [PUNT] -- https://chatgpt.com/c/689ac1bd-644c-8321-9ee6-faa588d56ed1
 * @todo    [PUNT] - Cleanup dirty classes functions (e.g. https://416.io/ss/f/2e6vyo)
 * @todo    [DONE] - Look into event handling / foundational (e.g. toast set)
 * @todo    [DONE] - Look into config updates properly trigger attribute changes?
 * @todo    [DONE] -- Event related?
 * @todo    [DONE] -- e.g. changing color scheme should do it live
 * @todo    [DONE] - $annexSearchWidget mount/render logic
 * @todo    [PUNT] - SchemaUtils which provides template logic according to schemas?
 * @todo    [PUNT] -- Define yaml, html or tmpl files for each schema type?
 * @todo    [PUNT] - Revert to .tmpl files and include them in build script?
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearch
     * 
     * @access  public
     */
    window.annexSearch.AnnexSearch = window.annexSearch.AnnexSearch || class AnnexSearch {

        /**
         * #__$active
         * 
         * @access  private
         * @static
         * @var     null|window.annexSearch.AnnexSearchWidgetWebComponent (default: null)
         */
        static #__$active = null;

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
            window.customElements.define('annex-search-widget', window.annexSearch.AnnexSearchWidgetWebComponent);
            return true;
        }
    }
});
