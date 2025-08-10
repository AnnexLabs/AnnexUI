
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
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let hit = this.get('hit');
            this.getWebComponent().dispatchCustomEvent('result.click', {event, hit});
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
            let hit = this.get('hit');
            this.getWebComponent().dispatchCustomEvent('result.focus', {event, hit});
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            return true;
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
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this.#__addClickEventListener();
            this.#__addFocusEventListener();
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
            this._$element.dispatchEvent(event);
            return true;
        }
    }
});
