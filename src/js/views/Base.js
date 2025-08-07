
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
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super();
            this._$element = $element;
        }

        /**
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            return false;
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
         * hide
         * 
         * @access  public
         * @return  Boolean
         */
        // hide() {
        //     this._$element.classList.add('hidden');
        //     return true;
        // }

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
         * @return  Boolean
         */
        render() {
            this._addEvents();
            // this.show();
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
         * @param   BaseView view
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

        /**
         * show
         * 
         * @access  public
         * @return  Boolean
         */
        // show() {
        //     // this._$element.classList.remove('hidden');
        //     return true;
        // }
    }
});
