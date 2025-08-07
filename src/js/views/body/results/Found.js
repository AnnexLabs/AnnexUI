
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
         * #__addScrollEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addScrollEventListener() {
            let $element = this._$element,
                handler = this.#__handleScrollEvent.bind(this),
                scrollDebounceDelay = this.#__scrollDebounceDelay,
                debounced = window.annexSearch.FunctionUtils.debounce(handler, scrollDebounceDelay);
            $element.addEventListener('scroll', debounced);
            return true;
        }

        /**
         * #__drawResult
         * 
         * @note    Ordered
         * @access  private
         * @param   Object hit
         * @return  Boolean
         */
        #__drawResult(hit) {
            let view = window.annexSearch.ElementUtils.renderTemplate('resultFoundResultsBody', this._$element);
            view.set('hit', hit);
            this.#__results.push(view);
            view.render();
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
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this.#__addScrollEventListener();
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
         * drawResults
         * 
         * @access  public
         * @param   Object typesenseResponse
         * @return  Boolean
         */
        drawResults(typesenseResponse) {
            let hits = typesenseResponse.hits || [];
            if (hits.length === 0) {
                return false;
            }
            for (var hit of hits) {
                this.#__drawResult(hit);
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
         * reetFocusedIndex
         * 
         * @access  public
         * @return  Boolean
         */
        reetFocusedIndex() {
            let response = this.setFocusedIndex(null);
            return response;
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
