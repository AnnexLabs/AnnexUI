
/**
 * /src/js/views/header/MetaBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.MetaBarHeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.MetaBarHeaderView = window.annexSearch.MetaBarHeaderView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @var     String
         */
        static markup = `
<div data-view-name="MetaBarHeaderView">
    Showing
    <span class="showing">xx</span> of
    <span class="found">yy</span>
    matching results
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
         * #__setContent
         * 
         * @access  private
         * @return  Boolean
         */
        #__setContent() {
            let typesenseSearchResponse = this.get('typesenseSearchResponse'),
                found = this.getView('root.body.results.found'),
                results = found.getResults(),
                showing = results.length;
            this.first('.showing').innerHTML = showing;
            this.first('.found').innerHTML = typesenseSearchResponse.found;
            // this.first('.total').innerHTML = typesenseSearchResponse.out_of;
            // this.first('.duration').innerHTML = (typesenseSearchResponse.search_time_ms) + 'ms';
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            let typesenseSearchResponse = this.get('typesenseSearchResponse');
            if (typesenseSearchResponse === undefined) {
                return false;
            }
            this.#__setContent();
            return true;
        }
    }
});
