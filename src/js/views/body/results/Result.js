
/**
 * /src/js/views/body/results/Result.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.ResultFoundResultsBodyView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.ResultFoundResultsBodyView = window.typesenseInstantSearch.ResultFoundResultsBodyView || class ResultFoundResultsBodyView extends window.typesenseInstantSearch.BaseView {

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
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this._addClickEventListener();
            this._addFocusEventListener();
            return true;
        }

        /**
         * _addClickEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addClickEventListener() {
            let $element = this._$element,
                handler = this._handleClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * _addFocusEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addFocusEventListener() {
            let $element = this._$element,
                handler = this._handleFocusEvent.bind(this);
            $element.addEventListener('focus', handler);
            return true;
        }

        /**
         * _handleClickEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleClickEvent(event) {
            let callback = window.typesenseInstantSearch.ConfigUtils.get('callbacks')?.results?.click,
                hit = this.get('hit');
            callback && callback(event, hit);
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found');
            found.setFocusedIndexByResultView(this);
            return true;
        }

        /**
         * _handleFocusEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleFocusEvent(event) {
            let callback = window.typesenseInstantSearch.ConfigUtils.get('callbacks')?.results?.focus,
                hit = this.get('hit');
            callback && callback(event, hit);
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found');
            found.setFocusedIndexByResultView(this);
            return true;
        }

        /**
         * _renderTemplateVariables
         * 
         * @access  protected
         * @return  Boolean
         */
        _renderTemplateVariables() {
            let html = this._$element.outerHTML,
                hit = this.get('hit'),
                map = {
                    hit: hit
                };
            html = window.typesenseInstantSearch.ElementUtils.renderTemplateVariables(html, map);
            this._$element = this._replaceOuterHTML(html);
            return true;
        }

        /**
         * _replaceOuterHTML
         * 
         * @see     https://chatgpt.com/c/68886a45-7668-8328-84b2-40f3673282e3
         * @access  protected
         * @param   String html
         * @return  HTMLElement
         */
        _replaceOuterHTML(html) {
            let $template = document.createElement('template');
            $template.innerHTML = html.trim();
            let $new = $template.content.firstChild,
                data = this._$element.data || {};
            this._$element.replaceWith($new);
            $new.data = data;
            return $new;
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
                // block: 'end',
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
            this._renderTemplateVariables();
            super.render();
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
            this.getElement().dispatchEvent(event);
            return true;
        }
    }
});
