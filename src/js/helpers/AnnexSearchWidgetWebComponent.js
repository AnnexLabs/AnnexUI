
/**
 * /src/js/helpers/AnnexSearchWidgetWebComponent.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push([], function() {

    /**
     * window.typesenseInstantSearch.AnnexSearchWidgetWebComponent
     * 
     * @todo    - pdf search (long body)
     * 
     * @todo    - debouncing of requests (and/or throttling)
     * @todo    -- TypesenseSearchQueryHelper
     * 
     * @todo    - bug where previous search doesn't get triggered (when changed)
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
     * @extends HTMLElement
     */
    window.typesenseInstantSearch.AnnexSearchWidgetWebComponent = window.typesenseInstantSearch.AnnexSearchWidgetWebComponent || class AnnexSearchWidgetWebComponent extends HTMLElement {

        /**
         * _showing
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _showing = false;

        /**
         * _views
         * 
         * @access  protected
         * @var     Object (default: {})
         */
        _views = {};

        /**
         * constructor
         * 
         * @access  public
         * @return  void
         */
        constructor() {
            super();
            window.typesenseInstantSearch.webComponent = this;
            this.shadow = this.attachShadow({
                mode: 'closed'
            });
            this._render();
        }

        /**
         * _drawRoot
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawRoot() {
            let $shadow = this.shadow,
                view = window.typesenseInstantSearch.ElementUtils.renderTemplate('root', $shadow),
                mode = window.typesenseInstantSearch.ConfigUtils.get('mode'),
                overlay = String(+window.typesenseInstantSearch.ConfigUtils.get('overlay'));
            this._views.root = view;
            this.setAttribute('data-mode', mode);
            this.setAttribute('data-overlay', overlay);
            this.setAttribute('data-ready', '1');
this.show();
            return true;
        }

        /**
         * _handleStylesheetErrorLoadEvent
         * 
         * @access  protected
         * @param   Function reject
         * @param   Object event
         * @return  Boolean
         */
        _handleStylesheetErrorLoadEvent(reject, event) {
            var msg = 'Could not load stylesheet.';
            console && console.log(msg, event);
            reject();
            return true;
        }

        /**
         * _handleStylesheetSuccessfulLoadEvent
         * 
         * @access  protected
         * @param   Function resolve
         * @return  Boolean
         */
        _handleStylesheetSuccessfulLoadEvent(resolve) {
            window.typesenseInstantSearch.DataUtils.waitForAnimation().then(resolve);
            return true;
        }

        /**
         * _loadStylesheets
         * 
         * @see     https://claude.ai/chat/3683f5e2-b3b9-4cbb-846f-ac1a2d2cb64b
         * @access  protected
         * @return  Boolean
         */
        _loadStylesheets() {
            let $shadow = this.shadow,
                errorHandler = this._handleStylesheetErrorLoadEvent.bind(this),
                successfulHandler = this._handleStylesheetSuccessfulLoadEvent.bind(this),
                paths = Array.from(
                    new Set(window.typesenseInstantSearch.ConfigUtils.get('paths').css)
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
         * _render
         * 
         * @access  protected
         * @return  Promise
         */
        _render() {
            let handler = this._drawRoot.bind(this),
                promise = this._loadStylesheets().then(handler).catch(function() {});
            return promise;
        }

        /**
         * getView
         * 
         * @throws  Error
         * @access  public
         * @param   String viewKey
         * @return  window.typesenseInstantSearch.BaseView
         */
        getView(viewKey) {
            let view = this._views[viewKey];
            // if (view !== undefined) {
                return view;
//             }
//             let keys = viewKey.split('.'),
//                 value = this._views;
//             for (const key of keys) {
// console.log(key, value);
//                 if (value && typeof value === 'object' && key in value) {
//                     value = value[key];
//                     continue;
//                 }
//                 let msg = 'Invaild view';
//                 throw new Error(msg);
//             }
//             return value;
        }

        /**
         * hide
         * 
         * @see     https://chatgpt.com/c/688faa3b-3b2c-832c-a55b-96d1ab15acbe
         * @access  public
         * @return  Boolean
         */
        hide() {
            if (this._showing === false) {
                return false;
            }
            this._showing = false;
            this._views.root.blur();
            this.setAttribute('data-open', '0');
            this.setAttribute('inert', '');
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            if (this._showing === true) {
                return false;
            }
            this._showing = true;
            this.setAttribute('data-open', '1');
            this.removeAttribute('inert');
            let found = window.typesenseInstantSearch.webComponent.getView('root').getView('body').getView('results').getView('found'),
                results = found.getResults();
            if (results.length === 0) {
                this._views.root.focus();
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
            let showing = this._showing;
            return showing;
        }

        /**
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            if (this._showing === true) {
                let response = this.hide();
                return response;
            }
            let response = this.show();
            return response;
        }
    }
});
