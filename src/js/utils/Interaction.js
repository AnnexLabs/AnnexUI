
/**
 * /src/js/utils/Interaction.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.InteractionUtils
     * 
     * @access  public
     */
    window.annexSearch.InteractionUtils = window.annexSearch.InteractionUtils || class InteractionUtils extends window.annexSearch.BaseUtils {

        /**
         * #__addDocumentClickEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addDocumentClickEventListener() {
            let $element = (document.body || document.head || document.documentElement),
                handler = this.#__handleDocumentClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * #__handleBehaviorInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleBehaviorInteraction(event) {

            // Broadly invalid
            if (this.#__validEventTarget(event, 'data-annex-search') === false) {
                return false;
            }
// console.log('s');
            // Invalid layout (clear is always supported)
            let $target = event.target,
                value = $target.getAttribute('data-annex-search'),
                registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0];
            if ($annexSearchWidget.getConfig('layout') === 'inline') {
                if (value !== 'clear' && value !== 'focus') {
                    return false;
                }
            }

            // Unsupported value
            let validBehaviorInteractions = ['clear', 'focus', 'hide', 'show', 'toggle'];
            if (validBehaviorInteractions.includes(value) === false) {
                return false;
            }

            // Processing
            if (value === 'clear') {
                let response = $annexSearchWidget.clear();
                return response;
            }
            if (value === 'focus') {
                let response = $annexSearchWidget.focus();
                return response;
            }
            if (value === 'hide') {
                let response = $annexSearchWidget.hide();
                return response;
            }
            if (value === 'show') {
                let response = $annexSearchWidget.show();
                return response;
            }
            if (value === 'toggle') {
                let response = $annexSearchWidget.toggle();
                return response;
            }
            return false;
        }

        /**
         * #__handleBlurInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleBlurInteraction(event) {
            let $target = event.target;
            if ($target.constructor === window.annexSearch.AnnexSearchWidgetWebComponent) {
                return false;
            }
            window.annexSearch.AnnexSearch.setFocused(null);
            return false;
        }

        /**
         * #__handleDocumentClickEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentClickEvent(event) {
            if (this.#__handleBehaviorInteraction(event) === true) {
                return true;
            }
            if (this.#__handleBlurInteraction(event) === true) {
                return true;
            }
            if (this.#__handleQueryInteraction(event) === true) {
                return true;
            }
            return false;
        }

        /**
         * #__handleQueryInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleQueryInteraction(event) {

            // Broadly invalid
            if (this.#__validEventTarget(event, 'data-annex-search-query') === false) {
                return false;
            }

            // Invalid value
            let $target = event.target,
                value = $target.getAttribute('data-annex-search-query'),
                registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0],
                query = value;
            $annexSearchWidget.show();
            $annexSearchWidget.query(query);
            return true;
        }

        /**
         * #__validEventTarget
         * 
         * @access  private
         * @static
         * @param   Object event
         * @param   String attributeName
         * @return  Boolean
         */
        static #__validEventTarget(event, attributeName) {
            let $target = event.target || null;
            if ($target === null) {
                return false;
            }
            let selector = '[' + (attributeName) + ']';
            if ($target.matches(selector) === false) {
                return false;
            }
            event.preventDefault();
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.zeroRegistered');
                window.annexSearch.LoggingUtils.error(message);
                // this.#__logDevModeMessage('interactionUtils.zeroRegistered');
                return false;
            }
            if (registered.length > 1) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.multipleRegistered');
                window.annexSearch.LoggingUtils.error(message);
                // this.#__logDevModeMessage('interactionUtils.multipleRegistered');
                return false;
            }

            // Invalid value
            let value = $target.getAttribute(attributeName);
            if (value === null) {
                return false;
            }
            if (value === undefined) {
                return false;
            }
            value = value.trim();
            if (value === '') {
                return false;
            }

            // All good..
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
            let response = super.setup();
            if (response === true) {
                this.#__addDocumentClickEventListener();
                return true;
            }
            let handler = window.annexSearch.InteractionUtils.setup.bind(window.annexSearch.InteractionUtils);
            document.addEventListener('DOMContentLoaded', handler);
            return true;
        }
    }
});
