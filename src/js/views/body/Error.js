
/**
 * /src/js/views/body/Error.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ErrorBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ErrorBodyView = window.annexSearch.ErrorBodyView || class extends window.annexSearch.BaseView {

        /**
         * #__markup
         * 
         * @access  public
         * @var     String
         */
        static markup = `
<div data-view-name="ErrorBodyView">
    <div class="graphic"></div>
    <div class="message"></div>
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
            let value = this.getHelper('config').get('copy').error.message;
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
