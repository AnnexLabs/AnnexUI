
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
    window.annexSearch.BodyView = window.annexSearch.BodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @var     String
         */
        static markup = `
<div data-view-name="BodyView">
</div>`;

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
         * #__drawError
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawError() {
            let view = window.annexSearch.ElementUtils.renderTemplate('errorBody', this._$element);
            this.setView('error', view);
            return true;
        }

        /**
         * #__drawIdle
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawIdle() {
            let view = window.annexSearch.ElementUtils.renderTemplate('idleBody', this._$element);
            this.setView('idle', view);
            return true;
        }

        /**
         * #__drawResults
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawResults() {
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
            this.#__drawError();
            this.#__drawIdle();
            this.#__drawResults();
            super.render();
            return true;
        }
    }
});
