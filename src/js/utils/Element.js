
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
         * #__templateOptions
         * 
         * @see     https://claude.ai/chat/617b9369-2714-47bf-9992-60f43718d2c5
         * @note    A number of the below properties appear to be the Lodash
         *          defaults.
         * @access  private
         * @var     Object
         */
        static #__templateOptions = {

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
         * @return  String
         */
        static #__getProcessedMarkup(view, mutator) {
            mutator = mutator || window.annexSearch.FunctionUtils.getPassThrough();
            let markup = this.#__getTemplateMarkup(view),
                compiled = window.annexSearch.libs._.template(
                    this.#__replaceMarkupVariables(markup),
                    this.#__templateOptions
                ),
                data = this.#__getCompilerData(view),
                response = compiled.apply(view, [data]),
                $mutated = mutator(response);
            return $mutated;
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
                markup = $annexSearchWidget.getHelper('config').get('templates')[key]
                    || window.annexSearch.TemplateUtils.getTemplate('auto-v0.1.0', key)
                    || view.getMarkup();
            if (typeof markup === 'function') {
                let data = this.#__getCompilerData(view);
                markup = markup.apply(view, [data]);
            }
            markup = markup || view.getMarkup();
            return markup;
        }

        /**
         * #__getVisibleElementsByTag
         * 
         * @see     https://chatgpt.com/c/68a61095-5688-8326-adac-5ab8e7f0fb08
         * @access  private
         * @static
         * @param   String tagName
         * @param   Boolean fullyVisible (default: true)
         * @return  Array
         */
        static #__getVisibleElementsByTag(tagName, fullyVisible = true) {
            let $elements = document.getElementsByTagName(tagName),
                $visible = [];
            for (let $element of $elements) {
                if (fullyVisible === true && this.fullyVisible($element) === false) {
                    continue;
                }
                if (fullyVisible === false && this.partiallyVisible($element) === false) {
                    continue;
                }
                $visible.push($element);
            }
            return $visible;
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
         * focus
         * 
         * @access  public
         * @static
         * @param   mixed $eventTarget
         * @return  Promise
         */
        static focus($eventTarget) {
            if ($eventTarget === null) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            if ($eventTarget === undefined) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            if (window.annexSearch.ElementUtils.partiallyVisible($eventTarget) === false) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            if (window.annexSearch.ClientUtils.isTouchDevice() === true) {
                let promise = window.annexSearch.FunctionUtils.getEmptyPromise(false);
                return promise;
            }
            let promise = window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $eventTarget.focus({
                    preventScroll: true
                });
                return true;
            });
            return promise;
        }

        /**
         * fullyVisible
         *
         * @see     https://chatgpt.com/c/689f96f3-20fc-8332-b530-e8693299801b
         * @access  public
         * @static
         * @param   EventTarget $eventTarget
         * @return  Boolean
         */
        static fullyVisible($eventTarget) {
            let rect = $eventTarget.getBoundingClientRect(),
                fullyVisible = (
                    rect.top >= 0
                    && rect.right <= window.innerWidth
                    && rect.bottom <= window.innerHeight
                    && rect.left >= 0
                );
            return fullyVisible;
        }

        /**
         * getVisibleWebComponents
         * 
         * @access  public
         * @static
         * @param   Boolean fullyVisible (default: true)
         * @return  Array
         */
        static getVisibleWebComponents(fullyVisible = true) {
            let tagName = 'annex-search-widget',
                $webComponents = this.#__getVisibleElementsByTag(tagName, fullyVisible),
                $visible = [];
            for (let $webComponent of $webComponents) {
                if ($webComponent.showing() === false) {
                    continue;
                }
                if ($webComponent.disabled() === true) {
                    continue;
                }
                $visible.push($webComponent);
            }
            return $visible;
        }

        /**
         * partiallyVisible
         *
         * @see     https://chatgpt.com/c/689f96f3-20fc-8332-b530-e8693299801b
         * @access  public
         * @static
         * @param   EventTarget $eventTarget
         * @return  Boolean
         */
        static partiallyVisible($eventTarget) {
            let rect = $eventTarget.getBoundingClientRect(),
                visible = (
                    rect.top < window.innerHeight
                    && rect.right > 0
                    && rect.bottom > 0
                    && rect.left < window.innerWidth
                );
            return visible;
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
         * @return  EventTarget
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
         * setup
         * 
         * @access  public
         * @static
         * @return  Boolean
         */
        static setup() {
            return true;
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
    }
});
