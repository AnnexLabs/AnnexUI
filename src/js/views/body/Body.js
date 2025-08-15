
/**
 * /src/js/views/body/Body.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.BodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.BodyView = window.annexSearch.BodyView || class BodyView extends window.annexSearch.BaseView {

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="BodyView" part="body">
</div>`;

        /**
         * #__mountError
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountError() {
            let view = new window.annexSearch.ErrorBodyView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('error', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountIdle
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountIdle() {
            let view = new window.annexSearch.IdleBodyView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('idle', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountResults
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountResults() {
            let view = new window.annexSearch.ResultsBodyView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('results', view);
            view.mount($container);
            return true;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container
         * @return  Boolean
         */
        mount($container) {
            super.mount($container);
            this.#__mountError();
            this.#__mountIdle();
            this.#__mountResults();
            return true;
        }
    }
});
