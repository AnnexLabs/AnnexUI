
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
    window.annexSearch.HeaderView = window.annexSearch.HeaderView || class extends window.annexSearch.BaseView {

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
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this),
                $element = this._$element;
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__addHideClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addHideClickEventListener() {
            let handler = this.#__handleHideClickEvent.bind(this),
                $element = this.first('.hide');
            $element.addEventListener('click', handler);
            return true;
        };

        /**
         * #__drawField
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawField() {
            let view = window.annexSearch.ElementUtils.renderTemplate('fieldHeader', this._$element);
            this.setView('field', view);
            return true;
        }

        /**
         * #__drawMetaBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__drawMetaBar() {
            let view = window.annexSearch.ElementUtils.renderTemplate('metaBarHeader', this._$element);
            this.setView('metaBar', view);
            return true;
        }

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
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this.#__addClickEventListener();
            this.#__addHideClickEventListener();
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
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            this.#__drawField();
            this.#__drawMetaBar();
            super.render();
            return true;
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
         * toggleSpinner
         * 
         * @access  public
         * @return  Boolean
         */
        // toggleSpinner() {
        //     if (this.#__showingSpinner === true) {
        //         let response = this.hideSpinner();
        //         return response;
        //     }
        //     let response = this.showSpinner();
        //     return response;
        // }
    }
});
