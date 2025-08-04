
/**
 * /src/js/views/body/Body.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.BodyView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.BodyView = window.typesenseInstantSearch.BodyView || class BodyView extends window.typesenseInstantSearch.BaseView {

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
         * _drawError
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawError() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('errorBody', this._$element);
            this.setView('error', view);
            return true;
        }

        /**
         * _drawIdle
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawIdle() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('idleBody', this._$element);
            this.setView('idle', view);
            return true;
        }

        /**
         * _drawResults
         * 
         * @access  protected
         * @return  Boolean
         */
        _drawResults() {
            let view = window.typesenseInstantSearch.ElementUtils.renderTemplate('resultsBody', this._$element);
            this.setView('results', view);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this._drawError();
            this._drawIdle();
            this._drawResults();
            super.render();
            return true;
        }
    }
});
