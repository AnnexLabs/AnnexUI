
/**
 * /src/js/views/header/MetaBar.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.MetaBarHeaderView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.MetaBarHeaderView = window.typesenseInstantSearch.MetaBarHeaderView || class MetaBarHeaderView extends window.typesenseInstantSearch.BaseView {

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
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            let typesenseResponse = this.get('typesenseResponse');
            if (typesenseResponse === undefined) {
                return false;
            }
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found'),
                results = found.getResults(),
                showing = results.length;
            this.first('.showing').innerHTML = showing;
            this.first('.found').innerHTML = typesenseResponse.found;
            // this.first('.total').innerHTML = typesenseResponse.out_of;
            // this.first('.duration').innerHTML = (typesenseResponse.search_time_ms) + 'ms';
            return true;
        }
    }
});
