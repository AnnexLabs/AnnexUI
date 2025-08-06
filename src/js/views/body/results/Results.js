
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
         * #__drawEmpty
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawEmpty() {
            let view = window.annexSearch.ElementUtils.renderTemplate('emptyResultsBody', this._$element);
            this.setView('empty', view);
            return true;
        }

        /**
         * #__drawFound
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawFound() {
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
            this.#__drawEmpty();
            this.#__drawFound();
            super.render();
            return true;
        }
    }
});
