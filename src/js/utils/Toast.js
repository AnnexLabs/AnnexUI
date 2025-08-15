
/**
 * /src/js/utils/Toast.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ToastUtils
     * 
     * @access  public
     */
    window.annexSearch.ToastUtils = window.annexSearch.ToastUtils || class ToastUtils extends window.annexSearch.BaseUtils {

        /**
         * #__duration
         * 
         * @access  private
         * @static
         * @var     Number (default: 5000)
         */
        static #__duration = 5000;

        /**
         * #__toasts
         * 
         * @access  private
         * @static
         * @var     Array (default: [])
         */
        static #__toasts = [];

        /**
         * all
         * 
         * @access  public
         * @static
         * @return  Array
         */
        // static all() {
        //     let toasts = this.#__toasts;
        //     return toasts;
        // }

        /**
         * build
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  window.annexSearch.ToastView
         */
        static build($annexSearchWidget, options) {
            let title = options.title,
                message = options.message,
                view = new window.annexSearch.ToastView($annexSearchWidget, title, message),
                $container = $annexSearchWidget.shadow.querySelector('div.content');
            this.#__toasts.push(view);
            view.mount($container);
            return view;
        }

        /**
         * get
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Array
         */
        static get($annexSearchWidget) {
            let toasts = [];
            for (let toast of this.#__toasts) {
                if (toast.getWebComponent() === $annexSearchWidget) {
                    toasts.push(toast);
                }
            }
            return toasts;
        }

        /**
         * getDuration
         * 
         * @access  public
         * @static
         * @return  Number
         */
        static getDuration() {
            let duration = this.#__duration;
            return duration;
        }

        /**
         * hideAll
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static hideAll($annexSearchWidget) {
            let toasts = this.get($annexSearchWidget);
            for (let toast of toasts) {
                toast.hide();
            }
            return true;
        }

        /**
         * remove
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.ToastView toast
         * @return  Boolean
         */
        static remove(toast) {
            let index = this.#__toasts.indexOf(toast);
            if (index === -1) {
                return false;
            }
            this.#__toasts.splice(index, 1);
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
