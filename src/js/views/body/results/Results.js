
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
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="ResultsBodyView" part="results">
</div>`;

        /**
         * #__mountEmpty
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountEmpty() {
            let view = new window.annexSearch.EmptyResultsBodyView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('empty', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountFound
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountFound() {
            let view = new window.annexSearch.FoundResultsBodyView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('found', view);
            view.mount($container);
            return true;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   EventTarget $container
         * @return  Boolean
         */
        mount($container) {
            super.mount($container);
            this.#__mountEmpty();
            this.#__mountFound();
            return true;
        }
    }
});
