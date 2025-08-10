
/**
 * /src/js/views/common/Toast.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ToastView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ToastView = window.annexSearch.ToastView || class extends window.annexSearch.BaseView {

        /**
         * #__hideTimeoutDuration
         * 
         * @access  private
         * @var     Number (default: 5000)
         */
        #__hideTimeoutDuration = 5000;

        /**
         * #__hideTimeoutReference
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__hideTimeoutReference = null;

        /**
         * #__message
         * 
         * @access  private
         * @var     String (default: '(message)')
         */
        #__message = '(message)';

        /**
         * #__title
         * 
         * @access  private
         * @var     String (default: '(title)')
         */
        #__title = '(title)';

        /**
         * #__markup
         * 
         * @access  public
         * @var     String
         */
        static markup = `
<div data-view-name="ToastView">
    <div class="title"></div>
    <div class="message"></div>
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
            let $element = this._$element,
                handler = this.#__handleClickEvent.bind(this);
            $element.addEventListener('click', handler);
            return true;
        }

        /**
         * #__destroy
         * 
         * @access  private
         * @return  Boolean
         */
        #__destroy() {
            // let $webComponent = this.getWebComponent();
            this._$element.remove();
            // window.annexSearch.ToastUtils.remove($webComponent, this);
            window.annexSearch.ToastUtils.remove(this);
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
            this.hide();
            return true;
        }

        /**
         * #__hideOpenToasts
         * 
         * @access  private
         * @return  Boolean
         */
        #__hideOpenToasts() {
            let $annexSearchWidget = this.getWebComponent(),
                toasts = window.annexSearch.ToastUtils.get($annexSearchWidget);
            for (let toast of toasts) {
                if (toast === this) {
                    continue;
                }
                toast.hide();
            }
            return true;
        }

        /**
         * #__setTimeout
         * 
         * @access  private
         * @return  Boolean
         */
        #__setTimeout() {
            let handler = this.hide.bind(this),
                timeout = this.#__hideTimeoutDuration,
                reference = setTimeout(handler, timeout);
            this.#__hideTimeoutReference = reference;
            return true;
        };

        /**
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            if (this.#__title === null) {
                return false;
            }
            this.#__addClickEventListener();
            return true;
        }

        /**
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        hide() {
            this._$element.classList.remove('visible');
            clearTimeout(this.#__hideTimeoutReference);
            var handler = this.#__destroy.bind(this);
            this._$element.addEventListener('transitionend', handler);
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
            return true;
        }

        /**
         * setHideTimeoutDuration
         * 
         * @access  public
         * @param   null|Number hideTimeoutDuration (default: null)
         * @return  Boolean
         */
        setHideTimeoutDuration(hideTimeoutDuration = null) {
            this.#__hideTimeoutDuration = hideTimeoutDuration || this.#__hideTimeoutDuration;
            return true;
        }

        /**
         * setMessage
         * 
         * @access  public
         * @param   String message
         * @return  Boolean
         */
        setMessage(message) {
            let $element = this.first('.message');
            $element.innerHTML = message;
            return true;
        }

        /**
         * setTitle
         * 
         * @access  public
         * @param   String title
         * @return  Boolean
         */
        setTitle(title) {
            let $element = this.first('.title');
            $element.innerHTML = title;
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            this.#__hideOpenToasts();
            this.#__setTimeout();
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.classList.add('visible');
            });
            return true;
        }
    }
});
