
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
            let view = window.annexSearch.ElementUtils.renderTemplate('errorBody', this._$element);
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
            let view = window.annexSearch.ElementUtils.renderTemplate('idleBody', this._$element);
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
            let view = window.annexSearch.ElementUtils.renderTemplate('resultsBody', this._$element);
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
