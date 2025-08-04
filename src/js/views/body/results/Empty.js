
/**
 * /src/js/views/body/results/Empty.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.EmptyResultsBodyView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.EmptyResultsBodyView = window.typesenseInstantSearch.EmptyResultsBodyView || class EmptyResultsBodyView extends window.typesenseInstantSearch.BaseView {

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
         * _setMessage
         * 
         * @access  protected
         * @return  Boolean
         */
        _setMessage() {
            let value = window.typesenseInstantSearch.ConfigUtils.get('copy').empty.message;
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            this.first('.message').innerHTML = value;
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this._setMessage();
            super.render();
            return true;
        }
    }
});
