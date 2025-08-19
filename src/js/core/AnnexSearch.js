
/**
 * /src/js/core/AnnexSearch.js
 * 
 * @todo    - Cleaner /css loading based on hostname of JS?
 * @todo    -- Or update dist.sh file for more correct things?
 * 
 * @todo    - Timer UI not working on bundled up js/css? (cdn)
 * 
 * @todo    - Add clear option; important for mobile
 * @todo    -- Complicated: does the X then close modal _after_ $input is cleared?
 * 
 * @todo    - Prevent auto focus due to page jacking..
 * @todo    - Auto focus on scrolling and it becoming visible
 * 
 * @todo    - [Keyboard Shortcut]
 * @todo    -- Allow for keyboard shortcuts with inline (to focus)?
 * @todo    --- But don't show field.label?
 * @todo    -- Track order of "showing" modals in registered?
 * @todo    -- Fundametally need to get this sorted, and then revisit keyboard shortcut toggle work
 * @todo    -- Multiple-modal stacking (w/ offsets)
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
 * @todo    [PUNT] -- This is important to reinforce statefulness and UX focus
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
 * @todo    [PUNT] - Hook up all config properties with respective custom event listeners (e.g. placeholder swapping)
 * @todo    [PUNT] -- This will require re-rendering of views (which should be fine now..)
 * @todo    [PUNT] - Test CSS vars (see panel-right.inc.php)
 * @todo    [DONE] - Add in logic to prevent accidental infinite XHR when scrollbar is missing but shouldn't be?
 * @todo    [DONE] - Kill logic/UX/UI
 * @todo    [DONE] -- Toast to kill UI?
 * @todo    [PUNT] - try/catch blocks
 * @todo    [DONE] - Look into copyToClipboard catch
 * @todo    [PUNT] - Cleaner error throwing? https://416.io/ss/f/njj7y3
 * @todo    [PUNT] - Throw error whenever needed (of specific type?) and catch it; then kill?
 * @todo    [PUNT] - Give users ability to hide a result (via keyboard shortcut?)
 * @todo    [DONE] - Bug with focus not coming back (related to found.results not being cleared)
 * @todo    [DONE] -- See here: https://416.io/ss/f/93p03u
 * @todo    [PUNT] - Define custom results that are always inserted (at top initially)
 * @todo    [PUNT] - setConfig on global window.annexSearch.AnnexSearch class, which trickles down (but can be overridden) to web components
 * @todo    [PUNT] - Attempting to re-focus when multiple web components is limited to the $this itself; can't focus in on $result
 * @todo    [PUNT] -- Would need to internally track this, and pass it down via $annexWebComponent.focus call
 * @todo    [DONE] - Bug with multiple open and query-ing
 * @todo    [DONE] - Multiple bugs (various)
 * @todo    [DONE] -- Focus/click
 * @todo    [DONE] -- z-indexing
 * @todo    [PUNT] - Error handling for multiple panel-left / panel-right instances?
 * @todo    [PUNT] -- Possible to support with offset (translateX) animations?
 * @todo    [DONE] - Prevent blur when click on $result
 * @todo    [DONE] -- Instead added .focused class
 * @todo    [PUNT] - Command + delete to clear entire input value (from non-input focused $element)
 * @todo    [PUNT] - Better logic for image/container "height flashing" re:content sibling $div
 * @todo    [DONE] - Image support for demo (see setMutator)
 * @todo    [DONE] -- Image fading in after load
 * @todo    [DONE] - When multiple open, have keyboard shortcut "bring to front" an already open web component that has a lower z-index value
 * @todo    [DONE] -- See: https://416.io/ss/f/b8x7qp
 * @todo    [PUNT] - Add support for more than > 2 showing with toggling/hiding
 * @todo    [PUNT] -- See: https://416.io/ss/f/zl6bct
 * @todo    [PUNT] - Allow for Command+up/down, which should go to top of scrollable area
 * @todo    [DONE] - Thumbs broken on tall images: https://416.io/ss/f/26alrd
 * @todo    [DONE] -- I thought this was fixed, but new issues with stupid flex box
 * @todo    [DONE] -- Likely better to just go back to original
 * @todo    [DONE] - Schemas (for Typesense demos)
 * @todo    [DONE] - New problem w/ clicking $result and losing focused class.. ach..
 * @todo    [DONE] -- Problem with new $webComponent click/focus handlers and propagatong up to focus on $input?
 * @todo    [DONE] - Image bug: https://416.io/ss/f/juxbd9
 * @todo    [DONE] - Typesense collection retrieval (for smart templates?)
 * @todo    [DONE] -- Settled (for now) on an 'auto' schema which looks for property keys. See here: https://416.io/ss/f/y0l1kg
 * @todo    [DONE] - Timer UI
 * @todo    [PUNT] - Have mobile modal stacking be transform/zoom based?
 * @todo    [PUNT] -- Possibly also for desktop?
 * @todo    [PUNT] - What to do w/ defined/default keyboard shortcuts on touch devices?
 * @todo    [PUNT] -- At least hide the label?
 * @todo    [PUNT] - Should root.{type} event be moved to $webComponent?
 * @todo    [PUNT] - Add support for $idle $chips keyboard navigation
 * @todo    [DONE] - Hide keyboard shortcut label on mobile (since can't be triggered)
 * @todo    [DONE] - Kill doesn't work
 * @todo    [DONE] - Prevent mobile "return" key from triggering init click
 * @todo    [DONE] - Sometimes clearing out input on mobile doesn't trigger idle state
 * @todo    [DONE] -- Also happening on desktop
 * @todo    [DONE] -- Required aborting when empty $input value. See: https://416.io/ss/f/t27dr4
 * @todo    [DONE] - Allow for disable messaging override
 * @todo    [DONE] - When disabled, if focus command, prevent focus
 * @todo    [DONE] - When disabled, if escape key, hide modal
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearch
     * 
     * @access  public
     */
    window.annexSearch.AnnexSearch = window.annexSearch.AnnexSearch || class AnnexSearch {

        /**
         * #__$focused
         * 
         * @access  private
         * @static
         * @var     null|window.annexSearch.AnnexSearchWidgetWebComponent (default: null)
         */
        static #__$focused = null;

        /**
         * #__env
         * 
         * @access  private
         * @static
         * @var     String (default: 'local')
         */
        static #__env = 'local';

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
         * @var     String (default: '0.1.0-dev')
         */
        static #__version = '0.1.0-dev';

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
         * clearFocused
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static clearFocused() {
            this.#__$focused = null;
            return true;
        }

        /**
         * getEnv
         * 
         * @access  public
         * @static
         * @return  String
         */
        static getEnv() {
            let env = this.#__env;
            return env;
        }

        /**
         * getFocused
         * 
         * @access  public
         * @static
         * @return  window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static getFocused() {
            let $focused = this.#__$focused;
            return $focused;
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
         * getRegisteredById
         * 
         * @access  public
         * @static
         * @param   String id
         * @return  null|window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static getRegisteredById(id) {
            let registered = this.#__registered;
            for (let $annexSearchWidget of registered) {
                if ($annexSearchWidget.getAttribute('data-annex-search-id') === id) {
                    return $annexSearchWidget;
                }
            }
            return null;
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
         * @see     https://chatgpt.com/c/689d593e-6478-8323-bf55-a6bdc876ad22
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static register($annexSearchWidget) {
            if (this.#__registered.includes($annexSearchWidget) === false) {
                this.#__registered.push($annexSearchWidget);
                return true;
            }
            this.#__registered = this.#__registered.filter(function(item) {
                return item !== $annexSearchWidget;
            });
            this.#__registered.push($annexSearchWidget);
            return true;
        }

        /**
         * setActive
         * 
         * @access  public
         * @static
         * @param   null|window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static setFocused($annexSearchWidget) {
// console.log('focusing: ' + $annexSearchWidget.getAttribute('data-annex-search-id'));
// console.trace();
            this.#__$focused = $annexSearchWidget;
            if ($annexSearchWidget === null) {
                return false;
            }
            this.register($annexSearchWidget);
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
            this.#__setupUtils();
            window.customElements.define('annex-search-widget', window.annexSearch.AnnexSearchWidgetWebComponent);
            return true;
        }
    }
});
