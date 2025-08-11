
/**
 * /src/js/views/footer/StatusBar.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.StatusBarFooterView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.StatusBarFooterView = window.annexSearch.StatusBarFooterView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="StatusBarFooterView">
    <div class="message truncate"></div>
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
         * #__setMessage
         * 
         * @access  private
         * @return  Boolean
         */
        #__setMessage() {
            let value = this.getHelper('config').get('copy').statusBar.message;
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
            this.#__setMessage();
            super.render();
            return true;
        }
    }
});
