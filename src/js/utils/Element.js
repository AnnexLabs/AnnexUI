
/**
 * window.typesenseInstantSearch.ElementUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.ElementUtils = window.typesenseInstantSearch.ElementUtils || class ElementUtils {

    /**
     * getEscapedHTML
     * 
     * @see     https://chatgpt.com/c/68911e4d-9784-8330-b358-a52ba952426b
     * @access  public
     * @static
     * @param   String str
     * @return  String
     */
    static getEscapedHTML(str) {
        let $div = document.createElement('div');
        $div.textContent = str;
        $div.innerHTML = $div.innerHTML.replace(/&lt;mark&gt;/g, '<mark>');
        $div.innerHTML = $div.innerHTML.replace(/&lt;\/mark&gt;/g, '</mark>');
        let html = $div.innerHTML;
        return html;
    }

    /**
     * getTemplateElement
     * 
     * @see     https://chatgpt.com/c/6828cebf-a638-800f-bdf2-3e8642c89de6
     * @access  public
     * @static
     * @param   String templateId
     * @return  HTMLElement
     */
    static getTemplateElement(templateId) {
        let templateContent = window.typesenseInstantSearch.ConfigUtils.get('templates')[templateId],
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
     * registerComponent
     * 
     * @access  public
     * @static
     * @param   String tagName
     * @param   Function componentClass
     * @return  Boolean
     */
    static registerComponent(tagName, componentClass) {
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
     * @static
     * @param   String templateId
     * @param   EventTarget $parent
     * @return  window.typesenseInstantSearch.BaseView
     */
    static renderTemplate(templateId, $parent) {
        let $element = this.getTemplateElement(templateId);
        $parent.appendChild($element);
        let viewName = $element.getAttribute('data-view-name'),
            view = new window.typesenseInstantSearch[viewName]($element);
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
                    let value = window.typesenseInstantSearch.ElementUtils.getValueFromPath(path, map);
                    if (value === null) {
                        continue;
                    }
                    value = window.typesenseInstantSearch.ElementUtils.getEscapedHTML(value);
                    return value;
                }
                return '';
            }
            expression = expression.trim();
            let value = window.typesenseInstantSearch.ElementUtils.getValueFromPath(expression, map);
            if (value === null) {
                return '';
            }
            value = window.typesenseInstantSearch.ElementUtils.getEscapedHTML(value);
            return value;
        });
        return html;
    }
}
