
/**
 * /src/js/helpers/WebComponentUI.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseHelper'], function() {

    /**
     * window.annexSearch.WebComponentUIHelper
     * 
     * @see     https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
     * @access  public
     * @extends window.annexSearch.BaseHelper
     */
    window.annexSearch.WebComponentUIHelper = window.annexSearch.WebComponentUIHelper || class WebComponentUIHelper extends window.annexSearch.BaseHelper {

        /**
         * #__$activeElement
         * 
         * @access  private
         * @var     null|EventTarget (default: null)
         */
        #__$activeElement = null;

        /**
         * #__$focused
         * 
         * @access  private
         * @var     null|EventTarget (default: null)
         */
        #__$focused = null;

        /**
         * #__maxZIndex
         * 
         * @access  private
         * @var     Number (default: 2147483647)
         */
        #__maxZIndex = 2147483647;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  void
         */
        constructor($annexSearchWidget) {
            super($annexSearchWidget);
        }

        /**
         * #__handleFocusinEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleFocusinEvent(event) {
            let $target = event.target;
            this.#__$focused = $target || null;
            return true;
        }

        /**
         * #__removeInertAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__removeInertAttribute() {
            let $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.removeAttribute('inert');
            return true;
        }

        /**
         * #__setInertAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setInertAttribute() {
            let $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.setAttribute('inert', '');
            return true;
        }

        /**
         * #__setModalAlignmentAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setModalAlignmentAttribute() {
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                return false;
            }
            if (registered.length === 1) {
                return false;
            }
            let $annexSearchWidget = this.getWebComponent();
            for (let index in registered) {
                let $webComponent = registered[index];
                $webComponent.removeAttribute('data-annex-search-modal-alignment');
                if ($webComponent.getHelper('config').get('layout') !== 'modal') {
                    continue;
                }
                let modalAlignment = $annexSearchWidget.getConfig('modalAlignment');
                $webComponent.setAttribute('data-annex-search-modal-alignment', modalAlignment);
            }
            return true;
        }

        /**
         * #__setModalOrderAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setModalOrderAttribute() {
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                return false;
            }
            if (registered.length === 1) {
                return false;
            }
            let $annexSearchWidget = this.getWebComponent(),
                order = 0;
            for (let index in registered.reverse()) {
                let $webComponent = registered[index];
                $webComponent.removeAttribute('data-annex-search-modal-order');
                // if ($webComponent === $annexSearchWidget) {
                //     continue;
                // }
                if ($webComponent.getHelper('config').get('layout') !== 'modal') {
                    continue;
                }
                if ($webComponent.showing() === false) {
                    continue;
                }
                $webComponent.setAttribute('data-annex-search-modal-order', order);
                order++;
// console.log(order);
// console.log($annexSearchWidget);
                // let zIndex = maxZIndex - index - 1;
                // $webComponent.style.zIndex = zIndex;
            }
            return true;
        }

        /**
         * #__setOverlayAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setOverlayAttribute() {
            let $annexSearchWidget = this.getWebComponent(),
                layout = this.getHelper('config').get('layout');
            if (layout === 'inline') {
                $annexSearchWidget.setAttribute('data-annex-search-overlay', '0');
                return true;
            }
            let showOverlay = this.getHelper('config').get('showOverlay');
            if (showOverlay === false) {
                $annexSearchWidget.setAttribute('data-annex-search-overlay', '0');
                return true;
            }
            $annexSearchWidget.setAttribute('data-annex-search-overlay', '1');
            return true;
        }

        /**
         * #__setShowingAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setShowingAttribute() {
            let $annexSearchWidget = this.getWebComponent(),
                showing = $annexSearchWidget.showing();
            showing = Number(showing);
            $annexSearchWidget.setAttribute('data-annex-search-showing', showing);
            return true;
        }

        /**
         * addFocusinEventListener
         * 
         * @access  public
         * @return  Boolean
         */
        addFocusinEventListener() {
            let $element = this._$annexSearchWidget.shadow,
                handler = this.#__handleFocusinEvent.bind(this);
            $element.addEventListener('focusin', handler);
            return true;
        }

        /**
         * autoShow
         * 
         * @access  public
         * @return  Boolean
         */
        autoShow() {
            let layout = this.getHelper('config').get('layout');
            if (layout === 'inline') {
                let $annexSearchWidget = this.getWebComponent();
                $annexSearchWidget.show();
                return true;
            }
            return false;
        }

        /**
         * disable
         * 
         * @access  public
         * @return  Boolean
         */
        disable() {
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.disable');
            $annexSearchWidget.dispatchCustomEvent('root.disable');
            $annexSearchWidget.setAttribute('data-annex-search-disabled', '1');
            let title = this.getHelper('config').get('copy.disabled.title'),
                message = this.getHelper('config').get('copy.disabled.message'),
                toast = $annexSearchWidget.showToast(title, message, null);
            toast.setUnescapable();
            return true;
        }

        /**
         * enable
         * 
         * @access  public
         * @return  Boolean
         */
        enable() {
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.enable');
            $annexSearchWidget.dispatchCustomEvent('root.enable');
            $annexSearchWidget.removeAttribute('data-annex-search-disabled');
            window.annexSearch.ToastUtils.hideAll($annexSearchWidget);
            return true;
        }

        /**
         * getFocused
         * 
         * @access  public
         * @return  null|EventTarget
         */
        getFocused() {
            let $focused = this.#__$focused;
            return $focused;
        }

        /**
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        hide() {
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.hide');
            $annexSearchWidget.dispatchCustomEvent('root.hide');
            $annexSearchWidget.getView('root').blur();
            this.#__setShowingAttribute();
            this.#__setInertAttribute();
            this.#__setModalOrderAttribute();
            let $activeElement = this.#__$activeElement;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $activeElement
                    && window.annexSearch.ElementUtils.visible($activeElement)
                    && $activeElement.focus();
            });
            return true;
        }

        /**
         * setAttributes
         * 
         * @access  public
         * @return  Boolean
         */
        setAttributes() {
            let $annexSearchWidget = this.getWebComponent(),
                colorScheme = this.getHelper('config').get('colorScheme'),
                id = this.getHelper('config').get('id'),
                // index = window.annexSearch.AnnexSearch.getRegistered().indexOf($annexSearchWidget),
                layout = this.getHelper('config').get('layout');
                // schemaKey = this.getHelper('config').get('schemaKey');
            $annexSearchWidget.setAttribute('data-annex-search-color-scheme', colorScheme);
            $annexSearchWidget.setAttribute('data-annex-search-id', id);
            // $annexSearchWidget.setAttribute('data-annex-search-index', index);
// console.log(index, $annexSearchWidget);
            $annexSearchWidget.setAttribute('data-annex-search-layout', layout);
            $annexSearchWidget.setAttribute('data-annex-search-ready', '1');
            // $annexSearchWidget.setAttribute('data-annex-search-schema-key', schemaKey);
            this.#__setModalAlignmentAttribute();
            this.#__setOverlayAttribute();
            this.#__setShowingAttribute();
            return true;
        }

        /**
         * setQueryAttribute
         * 
         * @access  public
         * @return  Boolean
         */
        setQueryAttribute() {
            let $annexSearchWidget = this.getWebComponent(),
                field = $annexSearchWidget.getView('root').getView('header.field'),
                query = field.first('input').value;
            query = query.trim();
            $annexSearchWidget.setAttribute('data-annex-search-query', query);
            return true;
        }

        /**
         * setupConfigHelperCustomEventListeners
         * 
         * @access  public
         * @return  Boolean
         */
        setupConfigHelperCustomEventListeners() {
            let helper = this.getHelper('config');
            helper.addCustomEventListener('data.set.colorScheme', function(customEvent) {
                let detail = customEvent.detail,
                    $annexSearchWidget = detail.$annexSearchWidget;
                $annexSearchWidget.getHelper('webComponentUI').setAttributes();
                return true;
            });
            helper.addCustomEventListener('data.set.id', function(customEvent) {
                let detail = customEvent.detail,
                    $annexSearchWidget = detail.$annexSearchWidget;
                $annexSearchWidget.getHelper('webComponentUI').setAttributes();
                return true;
            });
            helper.addCustomEventListener('data.set.layout', function(customEvent) {
                let detail = customEvent.detail,
                    $annexSearchWidget = detail.$annexSearchWidget;
                $annexSearchWidget.getHelper('webComponentUI').setAttributes();
                return true;
            });
            helper.addCustomEventListener('data.set.overlay', function(customEvent) {
                let detail = customEvent.detail,
                    $annexSearchWidget = detail.$annexSearchWidget;
                $annexSearchWidget.getHelper('webComponentUI').setAttributes();
                return true;
            });
            return true;
        }

        /**
         * setZIndex
         * 
         * @access  public
         * @return  Boolean
         */
        setZIndex() {
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            if (registered.length === 0) {
                return false;
            }
            if (registered.length === 1) {
                return false;
            }
            let maxZIndex = this.#__maxZIndex,
                $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.style.zIndex = maxZIndex;
            for (let index in registered) {
                let $webComponent = registered[index];
                if ($webComponent === $annexSearchWidget) {
                    continue;
                }
                if ($webComponent.showing() === false) {
                    continue;
                }
                let zIndex = maxZIndex - index - 1;
                $webComponent.style.zIndex = zIndex;
            }
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            this.#__$activeElement = document.activeElement || null;
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.show');
            $annexSearchWidget.dispatchCustomEvent('root.show');
            this.#__setShowingAttribute();
            this.#__removeInertAttribute();
            this.#__setModalOrderAttribute();
            this.setZIndex();
            let found = $annexSearchWidget.getView('root').getView('root.body.results.found'),
                results = found.getResults();
            if (results.length === 0) {
                $annexSearchWidget.getView('root').focus();
                return true;
            }
            let focusedIndex = found.getFocusedIndex();
            if (focusedIndex === null) {
                focusedIndex = 0;
            }
            let result = results[focusedIndex];
            if (result === undefined) {
                return true;
            }
            result.focus();
            return true;
        }

        /**
         * toggle
         * 
         * @access  public
         * @return  Boolean
         */
        toggle() {
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.toggle');
            $annexSearchWidget.dispatchCustomEvent('root.toggle');
            return true;
        }
    }
});
