
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
         * #__uuid
         * 
         * @access  private
         * @var     null|String (default: null)
         */
        #__uuid = null;

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
         * #__setNameAttribute
         * 
         * @access  private
         * @return  Boolean
         */
        #__setNameAttribute() {
            let name = this.getHelper('config').get('name');
            if (name === null) {
                return false;
            }
            let $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.setAttribute('data-annex-search-name', name);
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
            return true;
        }

        /**
         * kill
         * 
         * @access  public
         * @return  Boolean
         */
        kill() {
            let $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.setAttribute('data-annex-search-dead', '1');
            let toast = $annexSearchWidget.showToast('Search disabled', 'Apologies but search has been disabled for the time being.', null);
            toast.setUnescapable();
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
                index = window.annexSearch.AnnexSearch.getRegistered().indexOf($annexSearchWidget),
                layout = this.getHelper('config').get('layout');
            $annexSearchWidget.setAttribute('data-annex-search-color-scheme', colorScheme);
            $annexSearchWidget.setAttribute('data-annex-search-index', index);
            $annexSearchWidget.setAttribute('data-annex-search-layout', layout);
            $annexSearchWidget.setAttribute('data-annex-search-ready', '1');
            this.#__setNameAttribute();
            this.#__setShowingAttribute();
            this.#__setOverlayAttribute();
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
            helper.addCustomEventListener('data.set.name', function(customEvent) {
                let detail = customEvent.detail,
                    $annexSearchWidget = detail.$annexSearchWidget;
                $annexSearchWidget.getHelper('webComponentUI').setAttributes();
                return true;
            });
        }

        /**
         * setUUID
         * 
         * @access  public
         * @return  Boolean
         */
        setUUID() {
            this.#__uuid = window.annexSearch.StringUtils.generateUUID();
            this.getWebComponent().setAttribute('id', this.#__uuid);
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            let $annexSearchWidget = this.getWebComponent();
            this.getHelper('config').triggerCallback('root.show');
            $annexSearchWidget.dispatchCustomEvent('root.show');
            this.#__setShowingAttribute();
            this.#__removeInertAttribute();
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
