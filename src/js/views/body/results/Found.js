
/**
 * /src/js/views/body/results/Found.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FoundResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FoundResultsBodyView = window.annexSearch.FoundResultsBodyView || class FoundResultsBodyView extends window.annexSearch.BaseView {

        /**
         * #__focusedIndex
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__focusedIndex = null;

        /**
         * #__results
         * 
         * @access  private
         * @var     Array (default: [])
         */
        #__results = [];

        /**
         * #__scrollDebounceDelay
         * 
         * @access  private
         * @var     Number (default: 60)
         */
        #__scrollDebounceDelay = 60;

        /**
         * #__scrollRatio
         * 
         * @access  private
         * @var     Number (default: 0.65)
         */
        #__scrollRatio = 0.65;

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="FoundResultsBodyView" part="found">
</div>`;

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addScrollEventListener();
            return true;
        }

        /**
         * #__addScrollEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addScrollEventListener() {
            let handler = this.#__handleScrollEvent.bind(this),
                scrollDebounceDelay = this.#__scrollDebounceDelay,
                debounced = window.annexSearch.FunctionUtils.debounce(handler, scrollDebounceDelay);
            this.event('scroll', handler)
            return true;
        }

        /**
         * #__handleScrollEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleScrollEvent(event) {
            let scrollPosition = this._$element.scrollTop + this._$element.clientHeight,
                threshold = this._$element.scrollHeight * this.#__scrollRatio;
            if (scrollPosition < threshold) {
                return false;
            }
            this.getView('root.header.field').loadMore();
            return true;
        }

        /**
         * #__mountResult
         * 
         * @note    Ordered
         * @access  private
         * @param   Object hit
         * @return  Boolean
         */
        #__mountResult(hit) {
            let view = new window.annexSearch.ResultFoundResultsBodyView(this._$annexSearchWidget),
                $container = this._$element;
            view.set('hit', hit);
            this.#__results.push(view);
            view.mount($container);
            return true;
        }

        /**
         * clearFocused
         * 
         * @access  public
         * @return  Boolean
         */
        clearFocused() {
            let $focused = this.find('.focused');
            for (let $result of $focused) {
                $result.classList.remove('focused');
            }
            return true;
        }

        /**
         * clearResults
         * 
         * @access  public
         * @return  Boolean
         */
        clearResults() {
            this.#__results = [];
            while (this._$element.firstChild) {
                this._$element.removeChild(this._$element.firstChild);
            }
            this.scrollToTop();
            return true;
        }

        /**
         * containsScrollbar
         * 
         * @see     https://chatgpt.com/c/6897db9a-a3c8-8327-a22d-e1db1187c914
         * @access  public
         * @return  Boolean
         */
        containsScrollbar() {
            let $element = this._$element,
                response = $element.scrollHeight > $element.clientHeight;
            return response;
        }

        /**
         * mountResults
         * 
         * @access  public
         * @param   Object typesenseResponse
         * @return  Boolean
         */
        mountResults(typesenseResponse) {
            let hits = typesenseResponse.hits || [];
            if (hits.length === 0) {
                return false;
            }
            for (var hit of hits) {
                this.#__mountResult(hit);
            }
            return true;
        }

        /**
         * getFocusedIndex
         * 
         * @access  public
         * @return  null|Number
         */
        getFocusedIndex() {
            let focusedIndex = this.#__focusedIndex;
            return focusedIndex;
        }

        /**
         * getResults
         * 
         * @access  public
         * @return  Array
         */
        getResults() {
            let results = this.#__results;
            return results;
        }

        /**
         * next
         * 
         * @access  public
         * @return  Boolean
         */
        next() {
            if (this.#__results.length === 0) {
                return false;
            }
            if (this.#__focusedIndex === null) {
                this.#__focusedIndex = 0;
                let result = this.#__results[this.#__focusedIndex];
                result.focus();
                return true;
            }
            if (this.#__focusedIndex === (this.#__results.length - 1)) {
                return false;
            }
            ++this.#__focusedIndex;
            let result = this.#__results[this.#__focusedIndex];
            result.focus();
            return true;
        }

        /**
         * previous
         * 
         * @access  public
         * @return  Boolean
         */
        previous() {
            if (this.#__results.length === 0) {
                return false;
            }
            if (this.#__focusedIndex === null) {
                return false;
            }
            if (this.#__focusedIndex === 0) {
                this.#__focusedIndex = null;
                return false;
            }
            --this.#__focusedIndex;
            let result = this.#__results[this.#__focusedIndex];
            result.focus();
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            super.render();
            this.#__addEvents();
            return true;
        }

        /**
         * resetFocusedIndex
         * 
         * @access  public
         * @return  Boolean
         */
        resetFocusedIndex() {
            let response = this.setFocusedIndex(null);
            return response;
        }

        /**
         * scrollToTop
         * 
         * @access  public
         * @return  Boolean
         */
        scrollToTop() {
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.scrollTop = 0;
            });
            return true;
        }

        /**
         * setFocusedIndex
         * 
         * @access  public
         * @param   null|Number focusedIndex
         * @return  Boolean
         */
        setFocusedIndex(focusedIndex) {
            this.#__focusedIndex = focusedIndex;
            return true;
        }

        /**
         * setFocusedIndexByResultView
         * 
         * @access  public
         * @param   window.annexSearch.ResultFoundResultsBodyView result
         * @return  Boolean
         */
        setFocusedIndexByResultView(result) {
            let index = this.#__results.indexOf(result);
            this.setFocusedIndex(index);
            return true;
        }

        /**
         * smoothScrollToTop
         * 
         * @access  public
         * @return  Boolean
         */
        smoothScrollToTop() {
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            return true;
        }
    }
});
