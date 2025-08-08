
/**
 * /src/js/utils/Interaction.js
 * 
 */
window.annexSearch.DependencyLoader.push([], function() {

    /**
     * window.annexSearch.InteractionUtils
     * 
     * @access  public
     */
    window.annexSearch.InteractionUtils = window.annexSearch.InteractionUtils || class {

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
         * #__handleDocumentClickEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentClickEvent(event) {
            if (this.#__handleQueryInteraction(event) === true) {
                return true;
            }
            if (this.#__handleVisibilityInteraction(event) === true) {
                return true;
            }
            return false;
        }

        /**
         * #__handleMutationObserverObserveEvent
         * 
         * @access  private
         * @static
         * @param   Array mutations
         * @return  Boolean
         */
        // static #__handleMutationObserverObserveEvent(mutations) {
        //     mutations.forEach(function(mutation) {
        //         mutation.addedNodes.forEach(function(node) {
        //             if (node.nodeType === 1 && node.hasAttribute('data-test')) {
        //                 console.log('New element with data-test:', node);
        //                 // Your code here
        //             }
        //         });
        //     });
        //     return true;
        // }

        /**
         * #__handleQueryInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleQueryInteraction(event) {
            if (this.#__validEventTarget(event, '[data-annex-search-query]') === false) {
                return false;
            }
            // event.preventDefault();
            let $target = event.target,
                value = $target.getAttribute('data-annex-search-query');
            value = value.trim()
            if (value === '') {
                return false;
            }
            let registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0],
                query = value;
            $annexSearchWidget.show();
            $annexSearchWidget.query(query);
            return true;
        }

        /**
         * #__handleVisibilityInteraction
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleVisibilityInteraction(event) {
            if (this.#__validEventTarget(event, '[data-annex-search]') === false) {
                return false;
            }
            // event.preventDefault();
            let registered = window.annexSearch.AnnexSearch.getRegistered(),
                $annexSearchWidget = registered[0];
            if ($annexSearchWidget.getConfig('layout') === 'inline') {
                return false;
            }
            let $target = event.target,
                value = $target.getAttribute('data-annex-search');
            if (value === null) {
                return false
            }
            if (value === undefined) {
                return false
            }
            value = value.trim();
            if (value === '') {
                return false
            }
            let validVisbilityInteractions = ['show', 'hide', 'toggle'];
            if (validVisbilityInteractions.includes(value) === false) {
                return false;
            }
            if (value === 'show') {
                let response = $annexSearchWidget.show();
                return response;
            }
            if (value === 'hide') {
                let response = $annexSearchWidget.hide();
                return response;
            }
            if (value === 'toggle') {
                let response = $annexSearchWidget.toggle();
                return response;
            }
            return false;
        }

        /**
         * #__setupMutationObserver
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        // static #__setupMutationObserver() {
        //     let handler = this.#__handleMutationObserverObserveEvent.bind(this),
        //         observer = new MutationObserver(handler),
        //         $target = (document.body || document.head || document.documentElement);
        //     observer.observe($target, {
        //         childList: true,
        //         subtree: true
        //     });
        //     return true;
        // }

        /**
         * #__logDevModeMessage
         * 
         * @access  private
         * @static
         * @param   String messageKey
         * @return  Boolean
         */
        static #__logDevModeMessage(messageKey) {
            let message = window.annexSearch.ErrorUtils.getMessage(messageKey);
            window.annexSearch.LoggingUtils.error(message, event);
            return true;
        }

        /**
         * #__validEventTarget
         * 
         * @access  private
         * @static
         * @param   Object event
         * @param   String selector
         * @return  Boolean
         */
        static #__validEventTarget(event, selector) {
            let $target = event.target || null;
            if ($target === null) {
                return false;
            }
            if ($target.matches(selector) === false) {
                return false;
            }
            event.preventDefault();
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                this.#__logDevModeMessage('interactionUtils.zeroRegistered');
                return false;
            }
            if (registered.length > 1) {
                this.#__logDevModeMessage('interactionUtils.multipleRegistered');
                return false;
            }
            return true;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Promise
         */
        static setup() {
            // this.#__setupMutationObserver();
            this.#__addDocumentClickEventListener();
            return true;
        }
    }
});
