
/**
 * /src/js/utils/Element.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.ElementUtils
     * 
     * @access  public
     */
    window.annexSearch.ElementUtils = window.annexSearch.ElementUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__getTemplateElement
         * 
         * @see     https://chatgpt.com/c/6828cebf-a638-800f-bdf2-3e8642c89de6
         * @access  private
         * @static
         * @param   String templateId
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @return  HTMLElement
         */
        static #__getTemplateElement(templateId, $annexSearchWidget) {
            let templateContent = $annexSearchWidget.getHelper('config').get('templates')[templateId],
                parser = new DOMParser(),
                $document = parser.parseFromString(templateContent, 'text/html'),
                $script = $document.querySelector('script[type]'),
                $element;
            templateContent = $script.textContent.trim(),
            $document = parser.parseFromString(templateContent, 'text/html');
            $element = $document.body.firstElementChild;
            return $element;
        }

        /**
         * getEscapedHTML
         * 
         * @see     https://chatgpt.com/c/68911e4d-9784-8330-b358-a52ba952426b
         * @see     https://chatgpt.com/c/68952ba0-eb34-8326-8389-f043ba0261be
         * @access  public
         * @static
         * @param   String str
         * @return  String
         */
        static getEscapedHTML(str) {
            let escaped = str
                .replace(/&(?!(?:[a-z\d]+|#\d+|#x[a-f\d]+);)/gi, '&amp;')
                // .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            return escaped;
        }

        /**
         * getValueFromPath
         * 
         * @access  public
         * @static
         * @param   String path
         * @param   Object map
         * @return  String
         */
        static getValueFromPath(path, map) {
            let keys = path.split('.'),
                value = map;
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                    continue;
                }
                return null;
            }
            if (value === null) {
                return null;
            }
            if (value === undefined) {
                return null;
            }
            value = value.trim();
            if (value === '') {
                return null;
            }
            value = String(value);
            return value;
        }

        /**
         * renderTemplate
         * 
         * @access  public
         * @static
         * @param   String templateId
         * @param   HTMLElement $parent
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget (default: null)
         * @return  window.annexSearch.BaseView
         */
        static renderTemplate(templateId, $parent, $annexSearchWidget = null) {
            $annexSearchWidget = $annexSearchWidget || $parent.getRootNode().host;
            let $element = this.#__getTemplateElement(templateId, $annexSearchWidget);
            $parent.appendChild($element);
            let viewName = $element.getAttribute('data-view-name'),
                view = new window.annexSearch[viewName]($element);
            $element.data = $element.data || {};
            $element.data.view = view;
            view.render();
            return view;
        }

        /**
         * renderTemplateVariables
         * 
         * @note    Ordered
         * @access  public
         * @static
         * @param   String html
         * @param   Object map
         * @return  String
         */
        static renderTemplateVariables(html, map) {
            html = html.replace(/\{\{([^}]+)\}\}/g, function(match, expression) {
                if (expression.includes('||') === true) {
                    const paths = expression.split('||').map(function(piece) {
                        return piece.trim();
                    });
                    for (const path of paths) {
                        let value = window.annexSearch.ElementUtils.getValueFromPath(path, map);
                        if (value === null) {
                            continue;
                        }
                        value = window.annexSearch.ElementUtils.getEscapedHTML(value);
                        return value;
                    }
                    return '';
                }
                expression = expression.trim();
                let value = window.annexSearch.ElementUtils.getValueFromPath(expression, map);
                if (value === null) {
                    return '';
                }
                value = window.annexSearch.ElementUtils.getEscapedHTML(value);
                return value;
            });
            return html;
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
