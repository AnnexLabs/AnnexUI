
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
         * _focusedIndex
         * 
         * @access  protected
         * @var     null|Number (default: null)
         */
        _focusedIndex = null;

        /**
         * _results
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _results = [];

        /**
         * _scrollDebounceDelay
         * 
         * @access  protected
         * @var     Number (default: 60)
         */
        _scrollDebounceDelay = 60;

        /**
         * _scrollRatio
         * 
         * @access  protected
         * @var     Number (default: 0.65)
         */
        _scrollRatio = 0.65;

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
            this._addScrollEventListener();
            return true;
        }

        /**
         * _addScrollEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addScrollEventListener() {
            let $element = this._$element,
                handler = this._handleScrollEvent.bind(this),
                scrollDebounceDelay = this._scrollDebounceDelay,
                debounced = window.annexSearch.FunctionUtils.debounce(handler, scrollDebounceDelay);
            $element.addEventListener('scroll', debounced);
            return true;
        }

        /**
         * _drawResult
         * 
         * @access  protected
         * @param   Object hit
         * @return  Boolean
         */
        _drawResult(hit) {
            let view = window.annexSearch.ElementUtils.renderTemplate('resultFoundResultsBody', this._$element);
            view.set('hit', hit);
            view.render();
            this._results.push(view);
            return true;
        }

        /**
         * _handleScrollEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleScrollEvent(event) {
            let scrollPosition = this._$element.scrollTop + this._$element.clientHeight,
                threshold = this._$element.scrollHeight * this._scrollRatio;
            if (scrollPosition < threshold) {
                return false;
            }
            this.getWebComponent().getView('root').getView('header').getView('field').loadMore();
            return true;
        }

        /**
         * clearResults
         * 
         * @access  public
         * @return  Boolean
         */
        clearResults() {
            this._results = [];
            while (this._$element.firstChild) {
                this._$element.removeChild(this._$element.firstChild);
            }
            this._$element.scrollTop = 0;
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
                this._drawResult(hit);
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
            let focusedIndex = this._focusedIndex;
            return focusedIndex;
        }

        /**
         * getResults
         * 
         * @access  public
         * @return  Array
         */
        getResults() {
            let results = this._results;
            return results;
        }

        /**
         * next
         * 
         * @access  public
         * @return  Boolean
         */
        next() {
            if (this._results.length === 0) {
                return false;
            }
            if (this._focusedIndex === null) {
                this._focusedIndex = 0;
                let result = this._results[this._focusedIndex];
                result.focus();
                return true;
            }
            if (this._focusedIndex === (this._results.length - 1)) {
                return false;
            }
            ++this._focusedIndex;
            let result = this._results[this._focusedIndex];
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
            if (this._results.length === 0) {
                return false;
            }
            if (this._focusedIndex === null) {
                return false;
            }
            if (this._focusedIndex === 0) {
                this._focusedIndex = null;
                return false;
            }
            --this._focusedIndex;
            let result = this._results[this._focusedIndex];
            result.focus();
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
            this._focusedIndex = focusedIndex;
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
            let index = this._results.indexOf(result);
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
            this._$element.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return true;
        }
    }
});
