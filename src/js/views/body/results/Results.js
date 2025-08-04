
/**
 * /src/js/views/body/results/Results.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.ResultsBodyView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.ResultsBodyView = window.typesenseInstantSearch.ResultsBodyView || class ResultsBodyView extends window.typesenseInstantSearch.BaseView {

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
         * _drawEmpty
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawEmpty() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('emptyResultsBody', this._$element);
            this.setView('empty', view);
            return true;
        }

        /**
         * _drawFound
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawFound() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('foundResultsBody', this._$element);
            this.setView('found', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this._drawEmpty();
            this._drawFound();
            super.render();
            return true;
        }
    }
});
