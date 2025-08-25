
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
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<a data-view-name="ResultFoundResultsBodyView" part="result">
    <div class="content" part="result-content">
        <div class="title" part="result-content-title">(no valid template defined)</div>
        <div class="body" part="result-content-body">(no valid template defined)</div>
        <div class="uri truncate" part="result-content-uri">(no valid template defined)</div>
    </div>
</a>`;

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this);
            this.click(handler);
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
            this.#__addImageLoadEventListener();
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
            let handler = this.#__handleFocusEvent.bind(this);
            this.event('focus', handler);
            return true;
        }

        /**
         * #__addImageLoadEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addImageLoadEventListener() {
            let $element = this.first('img');
            if ($element === null) {
                return false;
            }
            let handler = this.#__handleImageLoadEvent.bind(this);
            $element.addEventListener('load', handler);
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
            let handler = this.#__handleKeydownEvent.bind(this);
            this.event('keydown', handler);
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
                detail = {$result, event, hit};
            this._$annexSearchWidget.getHelper('config').triggerCallback('result.click', detail);
            this._$annexSearchWidget.dispatchCustomEvent('result.click', detail);
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
                detail = {$result, event, hit};
            this._$annexSearchWidget.getHelper('config').triggerCallback('result.focus', detail);
            this._$annexSearchWidget.dispatchCustomEvent('result.focus', detail);
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            this.getView('root.body.results.found').clearFocused();
// console.log(this._$element);
            this._$element.classList.add('focused');
            return true;
        }

        /**
         * #__handleImageLoadEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleImageLoadEvent(event) {
            let $element = this.first('img');
            $element.parentNode.classList.add('loaded');
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
                detail = {$result, event, hit};
            this._$annexSearchWidget.getHelper('config').triggerCallback('result.copy', detail);
            this._$annexSearchWidget.dispatchCustomEvent('result.copy', detail);
            this.getView('root.body.results.found').setFocusedIndexByResultView(this);
            return true;
        }

        // /**
        //  * _remo
        //  * 
        //  * @access  public
        //  * @return  Boolean
        //  */
        // _remo() {
        // }

        /**
         * focus
         * 
         * @see     https://chatgpt.com/c/689f9790-47b8-8324-8ae6-8ac464a5e0c5
         * @access  public
         * @return  Boolean
         */
        focus() {
            this._$element.focus();
            // this._$element.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'center',
            //     inline: 'nearest'
            // });
            let $element = this._$element,
                $container = this.getView('root.body.results.found').getElement();
            $container.scrollTo({
                top: $element.offsetTop - $container.offsetTop - ($container.clientHeight / 2),
                behavior: 'smooth'
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
