
/**
 * /src/js/utils/Timer.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.TimerUtils
     * 
     * @access  public
     */
    window.annexSearch.TimerUtils = window.annexSearch.TimerUtils || class TimerUtils extends window.annexSearch.BaseUtils {

        /**
         * #__timers
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__timers = [];

        /**
         * build
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  window.annexSearch.TimerView
         */
        static build($annexSearchWidget, options) {
            let seconds = options.seconds,
                view = new window.annexSearch.TimerView($annexSearchWidget, seconds),
                $container = $annexSearchWidget.shadow.querySelector('div.content');
            this.#__timers.push(view);
            view.mount($container);
            return view;
        }

        /**
         * remove
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.TimerView timer
         * @return  Boolean
         */
        static remove(timer) {
            let index = this.#__timers.indexOf(timer);
            if (index === -1) {
                return false;
            }
            this.#__timers.splice(index, 1);
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
