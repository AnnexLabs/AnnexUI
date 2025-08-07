
/**
 * /src/js/core/AnnexSearch.js
 * 
 * @todo    - instantiation
 * 
 * @todo    - external trigger to show/hide/toggle
 * @todo    - bug with multiple open and query-ing
 * @todo    - external trigger to show w/ query
 * @todo    - inline layout
 * 
 * @todo    - variable templating
 * @todo    - custom templates
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
         * #__registered
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__registered = [];

        /**
         * #__parseAnnexSearchWidgets
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__parseAnnexSearchWidgets() {
            return true;
        }

        /**
         * #__setupUtils
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__setupUtils() {
            window.annexSearch.DataUtils.setup();
            window.annexSearch.DebuggingUtils.setup();
            window.annexSearch.ElementUtils.setup();
            window.annexSearch.ErrorUtils.setup();
            window.annexSearch.FunctionUtils.setup();
            window.annexSearch.KeyboardShortcutUtils.setup();
            window.annexSearch.LoggingUtils.setup();
            window.annexSearch.StringUtils.setup();
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
            this.#__parseAnnexSearchWidgets();
            window.customElements.define('annex-search-widget', window.annexSearch.AnnexSearchWidgetWebComponent);
            return true;
        }
    }
});
