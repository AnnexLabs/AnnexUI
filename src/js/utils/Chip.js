
/**
 * /src/js/utils/Chip.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ChipUtils
     * 
     * @access  public
     */
    window.annexSearch.ChipUtils = window.annexSearch.ChipUtils || class ChipUtils extends window.annexSearch.BaseUtils {

        /**
         * #__chips
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__chips = [];

        /**
         * build
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  window.annexSearch.ChipView
         */
        static build($annexSearchWidget, options) {
            let copy = options.copy,
                href = options.href,
                view = new window.annexSearch.ChipView($annexSearchWidget, copy),
                $container = $annexSearchWidget.shadow.querySelector('div.content');
            this.#__chips.push(view);
            view.mount($container);
            return view;
        }

        /**
         * remove
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.ChipView chip
         * @return  Boolean
         */
        static remove(chip) {
            let index = this.#__chips.indexOf(chip);
            if (index === -1) {
                return false;
            }
            this.#__chips.splice(index, 1);
            return true;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            return true;
        }
    }
});
