
/**
 * /src/js/views/header/Header.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.HeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.HeaderView = window.annexSearch.HeaderView || class HeaderView extends window.annexSearch.BaseView {

        /**
         * #__showingSpinner
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showingSpinner = false;

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div data-view-name="HeaderView">
    <div class="hide icon icon-plus icon-size-14"></div>
    <div class="spinner spinning icon icon-spinner"></div>
</div>`;

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this);
            this.click(handler);
            return true;
        };

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            this.#__addHideClickEventListener();
            return true;
        }

        /**
         * #__addHideClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addHideClickEventListener() {
            let $element = this.first('.hide'),
                handler = this.#__handleHideClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            let $target = event.target,
                $hide = this.first('.hide');
            if ($target === $hide) {
                return false;
            }
            this.focus();
            return true;
        };

        /**
         * #__handleHideClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleHideClickEvent(event) {
            this.hideWebComponent();
            return false;
        };

        /**
         * #__mountField
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountField() {
            let view = new window.annexSearch.FieldHeaderView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('field', view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountMetaBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__mountMetaBar() {
            let view = new window.annexSearch.MetaBarHeaderView(this._$annexSearchWidget),
                $container = this._$element;
            this.setView('metaBar', view);
            view.mount($container);
            return true;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let response = this.getView('field').blur();
            return response;
        }

        /**
         * focus
         * 
         * @access  public
         * @return  Boolean
         */
        focus() {
            let response = this.getView('field').focus();
            return response;
        }

        /**
         * hideSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        hideSpinner() {
            if (this.#__showingSpinner === false) {
                return false;
            }
            this.#__showingSpinner = false;
            this.getView('root').setAttribute('data-searching', '0');
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            super.render();
            this.#__addEvents();
            return true;
        }

        /**
         * showSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        showSpinner() {
            if (this.#__showingSpinner === true) {
                return false;
            }
            this.#__showingSpinner = true;
            this.getView('root').setAttribute('data-searching', '1');
            return true;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container
         * @return  Boolean
         */
        mount($container) {
            super.mount($container);
            this.#__mountField();
            this.#__mountMetaBar();
            return true;
        }
    }
});
