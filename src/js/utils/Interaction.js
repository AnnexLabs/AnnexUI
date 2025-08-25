
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
         * #__controls
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__controls = {

            /**
             * scrollFocus
             * 
             * Whether a scroll event on the document should attempt to focus
             * on an $annexSearchWidget.
             * 
             * It attempts to do this safely to prevent unintended behaviour.
             * This includes (not is not limited to):
             * - Not executing on touch devices
             * - Not executing when another valid $element has focus
             * - The $annexSearchWidget is visible within the viewport
             * - config.autoFocusOnScroll is set to true
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            scrollFocus: true,
        };

        /**
         * #__windowScrollDebounceDelay
         * 
         * @access  private
         * @static
         * @var     Number (default: 40)
         */
        static #__windowScrollDebounceDelay = 40;

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
         * #__addWindowScrollClickEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addWindowScrollClickEventListener() {
            let $eventTarget = window,
                handler = this.#__handleWindowScrollEvent.bind(this),
                delay = this.#__windowScrollDebounceDelay,
                debounced = window.annexSearch.FunctionUtils.debounce(handler, delay);
            ['touchmove', 'wheel'].forEach(function(type) {
                $eventTarget.addEventListener(type, debounced);
            });
            return true;
        }

        /**
         * #__getAttributeDefinedId
         * 
         * @access  private
         * @static
         * @param   String attributeValue
         * @return  null|String
         */
        static #__getAttributeDefinedId(attributeValue) {
            let pieces = attributeValue.split(':');
            if (pieces.length === 0) {
                return null;
            }
            if (pieces.length === 1) {
                return null;
            }
            let id = pieces[0];
            return id;
        }

        /**
         * #__getBehaviorInteractionKey
         * 
         * @access  private
         * @static
         * @param   String attributeValue
         * @return  String
         */
        static #__getBehaviorInteractionKey(attributeValue) {
            let pieces = attributeValue.split(':'),
                interactionKey = attributeValue;
            if (pieces.length === 0) {
                return interactionKey;
            }
            if (pieces.length === 1) {
                return interactionKey;
            }
            pieces.shift();
            interactionKey = pieces.join('');
            return interactionKey;
        }

        /**
         * #__getQueryValue
         * 
         * @access  private
         * @static
         * @param   String attributeValue
         * @return  String
         */
        static #__getQueryValue(attributeValue) {
            let pieces = attributeValue.split(':'),
                query = attributeValue;
            if (pieces.length === 0) {
                return query;
            }
            if (pieces.length === 1) {
                return query;
            }
            pieces.shift();
            query = pieces.join('');
            return query;
        }

        /**
         * #__getRegisteredById
         * 
         * @access  private
         * @static
         * @param   String str
         * @return  null|window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static #__getRegisteredById(str) {
            let pieces = str.split(':');
            if (pieces.length === 0) {
                return null;
            }
            if (pieces.length === 1) {
                return null;
            }
            let id = pieces[0],
                $annexSearchWidget = window.annexSearch.AnnexSearch.getRegisteredById(id);
            return $annexSearchWidget;
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

            // Invalid layout (clear is always supported)
            let $target = event.target,
                value = $target.getAttribute('data-annex-search'),
                $annexSearchWidget = this.#__getRegisteredById(value) || window.annexSearch.AnnexSearch.getRegistered()[0],
                interactionKey = this.#__getBehaviorInteractionKey(value);
            if ($annexSearchWidget.getConfig('layout') === 'inline') {
                if (interactionKey !== 'clear' && interactionKey !== 'disable' && interactionKey !== 'enable' && interactionKey !== 'focus') {
                    return false;
                }
            }

            // Unsupported interaction key
            let validBehaviorInteractions = ['clear', 'disable', 'enable', 'focus', 'hide', 'show', 'toggle'];
            if (validBehaviorInteractions.includes(interactionKey) === false) {
                return false;
            }

            // Processing
            if (interactionKey === 'clear') {
                if ($annexSearchWidget.disabled() === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.disabled');
                    window.annexSearch.LoggingUtils.error(message);
                    return false;
                }
                let response = $annexSearchWidget.clear();
                return response;
            }
            if (interactionKey === 'disable') {
                if ($annexSearchWidget.disabled() === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.disabled');
                    window.annexSearch.LoggingUtils.error(message);
                    return false;
                }
                let response = $annexSearchWidget.disable();
                return response;
            }
            if (interactionKey === 'enable') {
                let response = $annexSearchWidget.enable();
                return response;
            }
            if (interactionKey === 'focus') {
                if ($annexSearchWidget.disabled() === true) {
                    let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.disabled');
                    window.annexSearch.LoggingUtils.error(message);
                    return false;
                }
                let response = $annexSearchWidget.focus();
                return response;
            }
            if (interactionKey === 'hide') {
                let promise = $annexSearchWidget.hide();
                return true;
            }
            if (interactionKey === 'show') {
                let promise = $annexSearchWidget.show();
                return true;
            }
            if (interactionKey === 'toggle') {
                let promise = $annexSearchWidget.toggle();
                return true;
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
                $annexSearchWidget = this.#__getRegisteredById(value) || window.annexSearch.AnnexSearch.getRegistered()[0];
            if ($annexSearchWidget.disabled() === true) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.disabled');
                window.annexSearch.LoggingUtils.error(message);
                return false;
            }
            let query = this.#__getQueryValue(value);
            $annexSearchWidget.show();
            $annexSearchWidget.query(query);
            return true;
        }

        /**
         * #__handleWindowScrollEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleWindowScrollEvent(event) {
            if (window.annexSearch.ClientUtils.isTouchDevice() === true) {
                return false;
            }
            if (this.#__controls.scrollFocus === false) {
                return false;
            }
            let $activeElement = document.activeElement || null,
                handler = function() {
                    let fullyVisible = false,
                        $visible = window.annexSearch.ElementUtils.getVisibleWebComponents(fullyVisible);
                    if ($visible.length === 0) {
                        return false;
                    }
                    let $focused = window.annexSearch.AnnexSearch.getFocused();
                    if ($focused !== null && $focused.getConfig('layout') === 'modal' && $focused.showing() === true) {
                        return false;
                    }
                    if ($focused !== null && $focused.getConfig('layout') === 'panel-left' && $focused.showing() === true) {
                        return false;
                    }
                    if ($focused !== null && $focused.getConfig('layout') === 'panel-right' && $focused.showing() === true) {
                        return false;
                    }
                    let $annexSearchWidget = $visible[0];
                    if ($annexSearchWidget.getConfig('autoFocusOnScroll') === false) {
                        return false;
                    }
                    if ($annexSearchWidget.getConfig('layout') === 'inline') {
                        $annexSearchWidget.focus();
                        return true;
                    }
                    return false;
                };
            if ($activeElement === null) {
                let response = handler();
                return response;
            }
            if ($activeElement.matches('button, input, select, textarea') === true) {
                return false;
            }
            let response = handler();
            return response;
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

            // Invalid $target
            let $target = event.target || null;
            if ($target === null) {
                return false;
            }
            let selector = '[' + (attributeName) + ']';
            if ($target.matches(selector) === false) {
                return false;
            }
            if ($target.matches('annex-search-widget') === true) {
                return false;
            }

            // Valid target; prevent event
            event.preventDefault();

            // Nothing registered
            let $registered = window.annexSearch.AnnexSearch.getRegistered();
            if ($registered.length === 0) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.zeroRegistered');
                window.annexSearch.LoggingUtils.error(message);
                return false;
            }

            // Value checks (existence)
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

            // No id defined
            let id = this.#__getAttributeDefinedId(value);
            if (id === null) {

                // Valid (since only one that could be the target)
                if ($registered.length === 1) {
                    return true;
                }

                // Invalid
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.multipleRegistered');
                window.annexSearch.LoggingUtils.error(message);
                return false;
            }

            // Id defined; invalid
            let $annexSearchWidget = window.annexSearch.AnnexSearch.getRegisteredById(id);
            if ($annexSearchWidget === null) {
                let message = window.annexSearch.ErrorUtils.getMessage('interactionUtils.unknownId');
                window.annexSearch.LoggingUtils.error(message);
                return false;
            }

            // Valid
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
                this.#__addWindowScrollClickEventListener();
                return true;
            }
            let handler = window.annexSearch.InteractionUtils.setup.bind(window.annexSearch.InteractionUtils);
            document.addEventListener('DOMContentLoaded', handler);
            return true;
        }
    }
});
