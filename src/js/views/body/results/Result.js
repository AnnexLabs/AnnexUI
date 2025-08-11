
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
    window.annexSearch.ResultFoundResultsBodyView = window.annexSearch.ResultFoundResultsBodyView || class ResultFoundResultsBodyView extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<a data-view-name="ResultFoundResultsBodyView" href="https://{{data.hit.document.hostname}}{{data.hit.document.relativeURL}}">
    <div class="title">{{{data?.hit?.highlight?.title?.snippet || data?.hit?.document?.title || '(unknown title)'}}}</div>
    <div class="body">{{{data?.hit?.highlight?.body?.snippet || data?.hit?.document?.body || '(unknown body)'}}}</div>
    <div class="uri truncate">https://{{data.hit.document.hostname}}{{data.hit.document.relativeURL}}</div>
</a>`;

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
        // #__renderTemplateVariables() {
        //     let html = this._$element.outerHTML,
        //         hit = this.get('hit'),
        //         map = {
        //             hit: hit
        //         };
        //     html = window.annexSearch.ElementUtils.renderTemplateVariables(html, map);
        //     html = this.getHelper('typesense').replaceHightlightTags(html);
        //     this._$element = this.#__replaceOuterHTML(html);
        //     return true;
        // }

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
         * #__replaceHightlightTags
         * 
         * @access  private
         * @param   String markup
         * @return  String
         */
        #__replaceHightlightTags(markup) {
            markup = this.getHelper('typesense').replaceHightlightTags(markup);
            return markup;
        }

        /**
         * render
         * 
         * @note    Ordered
         * @access  public
         * @return  Boolean
         */
        render() {
            let mutator = this.#__replaceHightlightTags.bind(this);
            super.render(mutator);
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
