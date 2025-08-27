
/**
 * /src/js/views/common/Timer.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.TimerView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.TimerView = window.annexSearch.TimerView || class TimerView extends window.annexSearch.BaseView {

        /**
         * #__interval
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__interval = null;

        /**
         * #__showing
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__showing = false;

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="TimerView" part="timer">
    <div class="remaining" part="timer-remaining"><%= (data.remaining) %></div>
</div>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Number seconds
         * @return  void
         */
        constructor($annexSearchWidget, seconds) {
            super($annexSearchWidget);
            this.set('seconds', seconds);
            this.set('remaining', seconds);
            this.#__addCustomEventListener()
        }

        /**
         * #__addCustomEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addCustomEventListener() {
            let handler = this.render.bind(this);
            this.addCustomEventListener('data.set.remaining', handler);
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
            window.annexSearch.TimerUtils.remove(this);
            return true;
        }

        /**
         * #__handleTickEvent
         * 
         * @access  private
         * @return  Boolean
         */
        #__handleTickEvent() {
            if (this.get('remaining') === 0) {
                this.hide();
                return true;
            }
            if (this.get('remaining') === 1) {
                this.dispatchCustomEvent('complete');
            }
            let remaining = this.get('remaining');
            remaining = remaining - 1;
            this.set('remaining', remaining);
            return true;
        }

        /**
         * #__setInterval
         * 
         * @access  private
         * @return  Boolean
         */
        #__setInterval() {
            let handler = this.#__handleTickEvent.bind(this),
                duration = 1000,
                reference = setInterval(handler, duration);
            this.#__interval = reference;
            return true;
        }

        /**
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        hide() {
            this.#__showing = false;
            this._$element.classList.remove('visible');
            clearTimeout(this.#__interval);
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
            return true;
        }

        /**
         * show
         * 
         * @access  public
         * @return  Promise
         */
        show() {
            if (this.#__showing === true) {
                return false;
            }
            this.#__showing = true;
            this.#__setInterval();
            let $element = this._$element;
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $element.classList.add('visible');
            });
            let that = this,
                promise = new Promise(function(resolve, reject) {
                    that.addCustomEventListener('complete', resolve, true);
                });
            return promise;
        }
    }
});
