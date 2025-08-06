window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ElementUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ElementUtils = window.annexSearch.ElementUtils || class ElementUtils extends window.annexSearch.BaseView {

        /**
         * getEscapedHTML
         * 
         * @see     https://chatgpt.com/c/68911e4d-9784-8330-b358-a52ba952426b
         * @access  public
         * @param   String str
         * @return  String
         */
        getEscapedHTML(str) {
            let $div = document.createElement('div'),
                tagName = window.annexSearch.ConfigUtils.get('highlightTagName'),
                tagNameLowerCase = tagName.toLowerCase(),
                startTag = '<' + (tagNameLowerCase) + '>',
                endTag = '</' + (tagNameLowerCase) + '>',
                escapedStartTag = startTag.replace('<', '&lt;').replace('>', '&gt;'),
                escapedEndTag = endTag.replace('<', '&lt;').replace('>', '&gt;');
            $div.textContent = str;
            $div.innerHTML = $div.innerHTML.replaceAll(escapedStartTag, startTag);
            $div.innerHTML = $div.innerHTML.replaceAll(escapedEndTag, endTag);
            let html = $div.innerHTML;
            return html;
        }

        /**
         * getTemplateElement
         * 
         * @see     https://chatgpt.com/c/6828cebf-a638-800f-bdf2-3e8642c89de6
         * @access  public
         * @param   String templateId
         * @return  HTMLElement
         */
        getTemplateElement(templateId) {
            let templateContent = window.annexSearch.ConfigUtils.get('templates')[templateId],
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
         * getValueFromPath
         * 
         * @access  public
         * @param   String path
         * @param   Object map
         * @return  String
         */
        getValueFromPath(path, map) {
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
         * registerComponent
         * 
         * @access  public
         * @param   String tagName
         * @param   Function componentClass
         * @return  Boolean
         */
        registerComponent(tagName, componentClass) {
            if (window.customElements.get(tagName) === true) {
                return false;
            }
            window.customElements.define(tagName, componentClass);
            return true;
        }

        /**
         * renderTemplate
         * 
         * @access  public
         * @param   String templateId
         * @param   EventTarget $parent
         * @return  window.annexSearch.BaseView
         */
        renderTemplate(templateId, $parent) {
            let $element = this.getTemplateElement(templateId);
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
         * @param   String html
         * @param   Object map
         * @return  String
         */
        renderTemplateVariables(html, map) {
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
         * @return  Promise
         */
        waitForAnimation() {
            let promise = new Promise(function(resolve, reject) {
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        resolve();
                    });
                });
            });
            return promise;
        }
    }
    window.annexSearch.ElementUtils = new window.annexSearch.ElementUtils();
});
