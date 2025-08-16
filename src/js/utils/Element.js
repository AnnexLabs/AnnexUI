
/**
 * /src/js/utils/Element.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ElementUtils
     * 
     * @see     https://claude.ai/chat/617b9369-2714-47bf-9992-60f43718d2c5
     * @see     https://github.com/advisories/GHSA-35jh-r3h4-6jhm
     * @see     https://www.npmjs.com/package/lodash.template
     * @see     https://socket.dev/npm/package/eta
     * @access  public
     */
    window.annexSearch.ElementUtils = window.annexSearch.ElementUtils || class ElementUtils extends window.annexSearch.BaseUtils {

        /**
         * #__options
         * 
         * @see     https://claude.ai/chat/617b9369-2714-47bf-9992-60f43718d2c5
         * @note    A number of the below properties appear to be the Lodash
         *          defaults.
         * @access  private
         * @var     Object
         */
        static #__options = {

            /**
             * escape
             * 
             * Add support for escaped interpolation <%- %>
             * 
             * @access  private
             * @var     RegExp
             */
            escape: /<%-([\s\S]+?)%>/g,

            /**
             * evaluate
             * 
             * Keep the default evaluate syntax for <% %>
             * 
             * @access  private
             * @var     RegExp
             */
            evaluate: /<%([\s\S]+?)%>/g,

            /**
             * interpolate
             * 
             * Keep the default interpolate syntax for <%= %>
             * 
             * @access  private
             * @var     RegExp
             */
            interpolate: /<%=([\s\S]+?)%>/g,

            /**
             * variable
             * 
             * Add custom interpolation for {{ }}
             * 
             * @access  private
             * @var     String (default: 'data')
             */
            variable: 'data'
        };

        /**
         * #__getCompilerData
         * 
         * @access  private
         * @static
         * @param   window.annexSearch.BaseView view
         * @return  Object
         */
        static #__getCompilerData(view) {
            let data = Object.assign({}, view.get());
            data.config = view.getHelper('config').get();
            return data;
        }

        /**
         * #__getConfigTemplateKey
         * 
         * @access  private
         * @static
         * @param   window.annexSearch.BaseView view
         * @return  String
         */
        static #__getConfigTemplateKey(view) {
            let key = view.constructor.name;
            key = key.replace(/View$/, '');
            key = key.charAt(0).toLowerCase() + key.slice(1);
            return key;
        }

        /**
         * #__getProcessedMarkup
         * 
         * @access  private
         * @static
         * @param   window.annexSearch.BaseView view
         * @param   null|Function mutator
         * @return  HTMLElement
         */
        static #__getProcessedMarkup(view, mutator) {
            mutator = mutator || window.annexSearch.FunctionUtils.getPassThrough();
            let markup = this.#__getTemplateMarkup(view),
                compiled = window.annexSearch.libs._.template(
                    this.#__replaceMarkupVariables(markup),
                    this.#__options
                ),
                data = this.#__getCompilerData(view),
                response = compiled.apply(view, [data]),
                mutated = mutator(response);
            return mutated;
        }

        /**
         * #__getTemplateMarkup
         * 
         * @see     https://chatgpt.com/c/68990349-0238-832f-bf0f-3bf14d1a7377
         * @access  private
         * @static
         * @param   window.annexSearch.BaseView view
         * @param   null|Function mutator (default: null)
         * @return  null|String
         */
        static #__getTemplateMarkup(view, mutator = null) {
            let $annexSearchWidget = view.getWebComponent(),
                key = this.#__getConfigTemplateKey(view),
                markup = $annexSearchWidget.getHelper('config').get('templates')[key] || view.getMarkup();
            if (typeof markup === 'function') {
                let data = this.#__getCompilerData(view);
                markup = markup.apply(view, [data]);
            }
            markup = markup || view.getMarkup();
            return markup;
        }

        /**
         * #__replaceMarkupVariables
         * 
         * @note    Ordered
         * @access  private
         * @static
         * @param   String markup
         * @return  String
         */
        static #__replaceMarkupVariables(markup) {
            let response = markup;
            response = response.replace(/\{\{\{([\s\S]+?)\}\}\}/g, '<%- $1 %>');
            response = response.replace(/\{\{([\s\S]+?)\}\}/g, '<%= $1 %>');
            return response;
        }

        /**
         * renderViewElement
         * 
         * @see     https://chatgpt.com/c/689a37b9-9910-8321-8138-5db0e4cbdff2
         * @see     https://chatgpt.com/c/689a5071-f5b0-8321-9bb7-ae06e22a473d
         * @see     https://claude.ai/chat/617b9369-2714-47bf-9992-60f43718d2c5
         * @access  public
         * @static
         * @param   window.annexSearch.BaseView view
         * @param   null|Function mutator (default: null)
         * @return  HTMLElement
         */
        static renderViewElement(view, mutator = null) {
            let markup = this.#__getProcessedMarkup(view, mutator),
                parser = new DOMParser(),
                $document = parser.parseFromString(markup, 'text/html'),
                $element = $document.body.firstElementChild;
            $element.uuid = window.annexSearch.StringUtils.generateUUID();
            return $element;
        }

        /**
         * touchDevice
         *
         * @see     https://chatgpt.com/c/68a00e40-f680-8330-92bc-978befdd0db6
         * @access  public
         * @static
         * @return  Boolean
         */
        static touchDevice($eventTarget) {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
        }

        /**
         * visible
         *
         * @see     https://chatgpt.com/c/689f96f3-20fc-8332-b530-e8693299801b
         * @access  public
         * @static
         * @param   EventTarget $eventTarget
         * @return  Boolean
         */
        static visible($eventTarget) {
            let rect = $eventTarget.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.bottom > 0 &&
                rect.left < window.innerWidth &&
                rect.right > 0
            );
        }

        /**
         * waitForAnimation
         *
         * @see     https://chatgpt.com/c/682a39f4-d464-800f-bd7c-9793d2bf0349
         * @access  public
         * @static
         * @return  Promise
         */
        static waitForAnimation() {
            let promise = new Promise(function(resolve, reject) {
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        resolve();
                    });
                });
            });
            return promise;
        }

        /**
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            return true;
        }
    }
});
