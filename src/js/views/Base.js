
/**
 * /src/js/views/Base.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.Base'], function() {

    /**
     * window.annexSearch.BaseView
     * 
     * @access  public
     * @extends window.annexSearch.Base
     */
    window.annexSearch.BaseView = window.annexSearch.BaseView || class extends window.annexSearch.Base {

        /**
         * _$element
         * 
         * @access  protected
         * @var     null|HTMLElement (default: null)
         */
        _$element = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  void
         */
        constructor($annexSearchWidget) {
            super($annexSearchWidget);
            this._$element = document.createElement('template');
        }

        /**
         * click
         * 
         * @access  public
         * @param   Function handler
         * @return  Boolean
         */
        click(handler) {
            this.event('click', handler);
            return true;
        }

        /**
         * event
         * 
         * @access  public
         * @param   String type
         * @param   Function handler
         * @param   Boolean once (default: false)
         * @return  Boolean
         */
        event(type, handler, once = false) {
            this._$element.addEventListener(type, handler, {
                once: once
            });
            return true;
        }

        /**
         * find
         * 
         * @access  public
         * @param   String selector
         * @return  Array
         */
        find(selector) {
            let $element = this._$element,
                nodeList = $element.querySelectorAll(selector),
                $elements = Array.from(nodeList);
            return $elements;
        }

        /**
         * first
         * 
         * @access  public
         * @param   String selector
         * @return  null|HTMLElement
         */
        first(selector) {
            let $element = this._$element,
                $found = $element.querySelector(selector);
            return $found;
        }

        /**
         * getElement
         * 
         * @access  public
         * @return  HTMLElement
         */
        getElement() {
            let $element = this._$element;
            return $element;
        }

        /**
         * mount
         * 
         * @access  public
         * @param   HTMLElement $container
         * @return  Boolean
         */
        mount($container) {
            this.render();
            let $element = this._$element;
            $container.appendChild($element);
            return true;
        }

        /**
         * once
         * 
         * @access  public
         * @param   String type
         * @param   Function handler
         * @return  Boolean
         */
        once(type, handler) {
            this.event(type, handler, true);
            return true;
        }

        /**
         * removeAttribute
         * 
         * @access  public
         * @param   String key
         * @return  Boolean
         */
        removeAttribute(key) {
            this._$element.removeAttribute(key);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @parma   null|Function mutator (default: null)
         * @return  Boolean
         */
        render(mutator = null) {
            let $element = window.annexSearch.ElementUtils.renderViewElement(this, mutator);
            this._$element.replaceWith($element);
            this._$element = $element;
            return true;
        }

        /**
         * setAttribute
         * 
         * @access  public
         * @param   String key
         * @param   String value
         * @return  Boolean
         */
        setAttribute(key, value) {
            this._$element.setAttribute(key, value);
            return true;
        }

        /**
         * setView
         * 
         * @access  public
         * @param   String key
         * @param   window.annexSearch.BaseView view
         * @return  Boolean
         */
        setView(key, view) {
            let views = this.get('views');
            if (views === undefined) {
                views = {};
            }
            views[key] = view;
            this.set('views', views);
            return true;
        }
    }
});
