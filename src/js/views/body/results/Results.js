
/**
 * /src/js/views/body/results/Results.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ResultsBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ResultsBodyView = window.annexSearch.ResultsBodyView || class ResultsBodyView extends window.annexSearch.BaseView {

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
            let view = window.annexSearch.ElementUtils.renderTemplate('emptyResultsBody', this._$element);
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
            let view = window.annexSearch.ElementUtils.renderTemplate('foundResultsBody', this._$element);
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
