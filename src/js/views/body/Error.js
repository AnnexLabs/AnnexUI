
/**
 * /src/js/views/body/Error.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.ErrorBodyView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.ErrorBodyView = window.typesenseInstantSearch.ErrorBodyView || class ErrorBodyView extends window.typesenseInstantSearch.BaseView {

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
            let value = window.typesenseInstantSearch.ConfigUtils.get('copy').error.message;
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
