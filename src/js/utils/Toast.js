
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
    window.annexSearch.ToastUtils = window.annexSearch.ToastUtils || class extends window.annexSearch.BaseUtils {

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
         * build
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
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
