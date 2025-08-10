
/**
 * /src/js/utils/Toast.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.ToastUtils
     * 
     * @access  public
     */
    window.annexSearch.ToastUtils = window.annexSearch.ToastUtils || class {

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
        static all() {
            let toasts = this.#__toasts;
            return toasts;
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
         * #__getParent
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  Boolean
         */
        static #__getParent($annexSearchWidget) {
            let $parent = $annexSearchWidget.shadow;
            // if ($annexSearchWidget.getConfig('layout') === 'inline') {
            //     $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            // }
            // if ($annexSearchWidget.getConfig('layout') === 'panel-left') {
            //     $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            // }
                $parent = $parent.querySelector('[data-view-name="RootView"] > div.content');
            return $parent;
        }

        /**
         * show
         * 
         * @access  public
         * @static
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  Boolean
         */
        static show($annexSearchWidget, options) {
            let $parent = this.#__getParent($annexSearchWidget),
                view = window.annexSearch.ElementUtils.renderTemplate('toast', $parent);
            this.#__toasts.push(view);
            options.hideTimeoutDuration && view.setHideTimeoutDuration(options.hideTimeoutDuration);
            options.message && view.setMessage(options.message);
            options.title && view.setTitle(options.title);
            view.show();
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
