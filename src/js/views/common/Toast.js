
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
    window.annexSearch.ToastView = window.annexSearch.ToastView || class ToastView extends window.annexSearch.BaseView {

        /**
         * #__duration
         * 
         * @access  private
         * @var     Number (default: window.annexSearch.ToastUtils.getDuration())
         */
        #__duration = window.annexSearch.ToastUtils.getDuration();

        /**
         * #__escapable
         * 
         * @access  private
         * @var     Boolean (default: true)
         */
        #__escapable = true;

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

        /**
         * #__timeout
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__timeout = null;

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="ToastView">
    <div class="title"><%= (data?.title ?? '(no title)') %></div>
    <div class="message"><%= (data?.message ?? '(no message)') %></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   null|String title (default: null)
         * @param   null|String message (default: null)
         * @return  void
         */
        constructor($annexSearchWidget, title = null, message = null) {
            super($annexSearchWidget);
            this.set('title', title);
            this.set('message', message);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this);
            this.click(handler)
            return true;
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            this.addCustomEventListener('data.set.message', this.render.bind(this));
            this.addCustomEventListener('data.set.title', this.render.bind(this));
            return true;
        }

        /**
         * #__destroy
         * 
         * @access  private
         * @return  Boolean
         */
        #__destroy() {
            this._$element.remove();
            window.annexSearch.ToastUtils.remove(this);
// console.log('removing');
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
            if (this.#__escapable === false) {
                return false;
            }
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
            if (this.#__duration === null) {
// console.log('a');
                return false;
            }
            let handler = this.hide.bind(this),
                duration = this.#__duration,
                reference = setTimeout(handler, duration);
            this.#__timeout = reference;
            return true;
        };

        /**
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        hide() {
            this.#__showing = false;
            this._$element.classList.remove('visible');
            clearTimeout(this.#__timeout);
            var handler = this.#__destroy.bind(this);
            this.once('transitionend', handler);
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
            if (this.#__showing === true) {
                this._$element.classList.add('visible');
            }
            this.#__addEvents();
            return true;
        }

        /**
         * setDuration
         * 
         * @access  public
         * @param   null|Number duration (default: null)
         * @return  Boolean
         */
        setDuration(duration = null) {
            this.#__duration = duration;
            return true;
        }

        /**
         * setUnescapable
         * 
         * @access  public
         * @return  Boolean
         */
        setUnescapable() {
            this.#__escapable = false;
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        show() {
            if (this.#__showing === true) {
                return false;
            }
            this.#__showing = true;
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
