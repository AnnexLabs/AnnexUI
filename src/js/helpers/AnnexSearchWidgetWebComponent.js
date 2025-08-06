
/**
 * /src/js/helpers/AnnexSearchWidgetWebComponent.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.AnnexSearchWidgetWebComponent
     * 
     * @todo    - loadMore bug re:adding and not clearing
     * 
     * @todo    - typesense query param (e.g. w/o preset)
     * 
     * @todo    - config functions re:modifications
     * @todo    - variable templating
     * @todo    - custom templates
     * 
     * @todo    - thumbnails (?)
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
     * @extends HTMLElement
     */
    window.annexSearch.AnnexSearchWidgetWebComponent = window.annexSearch.AnnexSearchWidgetWebComponent || class AnnexSearchWidgetWebComponent extends HTMLElement {

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

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
            window.annexSearch.webComponent = this;
            this.shadow = this.attachShadow({
                mode: 'closed'
            });
            this.#__render();
        }

        /**
         * #__drawRoot
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawRoot() {
            let $shadow = this.shadow,
                view = window.annexSearch.ElementUtils.renderTemplate('root', $shadow),
                mode = window.annexSearch.ConfigUtils.get('mode'),
                overlay = String(+window.annexSearch.ConfigUtils.get('overlay'));
            this.#__views.root = view;
            this.setAttribute('data-mode', mode);
            this.setAttribute('data-overlay', overlay);
            this.setAttribute('data-ready', '1');
this.show();
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
            let msg = 'Could not load stylesheet.';
            window.annexSearch.LoggingUtils.message(msg, event);
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
         * @return  Boolean
         */
        #__loadStylesheets() {
            let $shadow = this.shadow,
                errorHandler = this.#__handleStylesheetErrorLoadEvent.bind(this),
                successfulHandler = this.#__handleStylesheetSuccessfulLoadEvent.bind(this),
                paths = Array.from(
                    new Set(window.annexSearch.ConfigUtils.get('paths').css)
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
                });
            return Promise.all(promises).then(function() {
                return new Promise(function(resolve) {
                    successfulHandler(resolve);
                });
            })
        }

        /**
         * #__render
         * 
         * @access  private
         * @return  Promise
         */
        #__render() {
            let handler = this.#__drawRoot.bind(this),
                promise = this.#__loadStylesheets().then(handler).catch(function() {});
            return promise;
        }

        /**
         * getView
         * 
         * @throws  Error
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
            if (this.#__showing === false) {
                return false;
            }
            this.#__showing = false;
            this.#__views.root.blur();
            this.setAttribute('data-open', '0');
            this.setAttribute('inert', '');
            return true;
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
            this.#__showing = true;
            this.setAttribute('data-open', '1');
            this.removeAttribute('inert');
            let found = window.annexSearch.webComponent.getView('root').getView('body').getView('results').getView('found'),
                results = found.getResults();
            if (results.length === 0) {
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
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            if (this.#__showing === true) {
                let response = this.hide();
                return response;
            }
            let response = this.show();
            return response;
        }
    }
});
