
/**
 * window.typesenseInstantSearch.ElementUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.ElementUtils = window.typesenseInstantSearch.ElementUtils || class ElementUtils {

    /**
     * getEscapedString
     * 
     * @access  public
     * @static
     * @param   String str
     * @return  String
     */
    // static getEscapedString(str) {
    //     str = str.replace(/&/g, '&amp;');
    //     str = str.replace(/</g, '&lt;');
    //     str = str.replace(/>/g, '&gt;');
    //     str = str.replace(/"/g, '&quot;');
    //     str = str.replace(/'/g, '&#039;');
    //     return str;
    // }

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
     * getTruncatedMarkup
     * 
     * @see     https://chatgpt.com/c/688faca2-fb24-832b-b697-b0f6798ea2fc
     * @see     https://claude.ai/chat/1dad02d3-0082-47b2-9de5-99eaa6cdf1e2
     * @see     https://claude.ai/chat/ea8d2a52-e656-46a7-b8fa-69611fe50061
     * @access  public
     * @static
     * @param   String escaped
     * @param   Number limit
     * @return  String
     */
    // static getTruncatedMarkup(escaped, limit) {
    //     let visibleCount = 0,
    //         result = '',
    //         insideTag = false;
    //     for (let i = 0; i < escaped.length; i++) {
    //         let char = escaped[i];

    //         // Handle entities: if '&', consume until ';'
    //         if (char === '&') {
    //             let semiIndex = escaped.indexOf(';', i);
    //             if (semiIndex !== -1) {
    //                 let entity = escaped.slice(i, semiIndex + 1);
    //                 result += entity;
    //                 if (!insideTag) visibleCount++;  // count entity as one char
    //                 i = semiIndex; // skip ahead
    //                 continue;
    //             }
    //         }

    //         // Detect tag start/end
    //         if (char === '<') insideTag = true;
    //         if (!insideTag) visibleCount++;
    //         result += char;
    //         if (char === '>') insideTag = false;

    //         if (visibleCount >= limit) {
    //             result += '…';
    //             break;
    //         }
    //     }


    //     // Close any open <mark> tags
    //     let openMarks = (result.match(/<mark>/g) || []).length;
    //     let closeMarks = (result.match(/<\/mark>/g) || []).length;
    //     if (openMarks > closeMarks) result += '</mark>';

    //     return result;



//   // If string is shorter than max length, return as is
//   if (str.length <= maxLength) {
//     return str;
//   }
  
//   // Get the character at the truncation point
//   const charAtPos = str.charAt(maxLength);
  
//   // Check if we're in the middle of &lt; or &gt;
//   const beforePos = str.substring(0, maxLength);
//   const afterPos = str.substring(maxLength);
  
//   // Look for incomplete &lt; or &gt; sequences
//   const lastAmpersand = beforePos.lastIndexOf('&');
//   const lastSemicolon = beforePos.lastIndexOf(';');
  
//   // If we have an & after the last ; (or no ; at all), we might be in an entity
//   if (lastAmpersand > lastSemicolon) {
//     // Check if this could be the start of &lt; or &gt;
//     const partialEntity = beforePos.substring(lastAmpersand);
    
//     if ('&lt;'.startsWith(partialEntity) || '&gt;'.startsWith(partialEntity)) {
//       // We're in the middle of &lt; or &gt;, find the next &gt; to complete it
//       const nextGtIndex = str.indexOf('&gt;', maxLength);
      
//       if (nextGtIndex !== -1) {
//         // Insert ... after the complete &gt; entity
//         const endOfEntity = nextGtIndex + 4; // &gt; is 4 characters
//         return str.substring(0, endOfEntity) + '...';
//       }
//     }
//   }
  
//   // Standard truncation - not in the middle of an entity
//   return str.substring(0, maxLength) + '...';

// console.log(input);
//         let count = 0,
//             result = '',
//             insideMark = false,
//             insideEntity = false;
//         for (let i = 0; i < input.length; i++) {
//             let char = input[i];

//             // Detect &lt;mark&gt; or &lt;/mark&gt;
// // console.log(input.substring(i, i + 12));
//             if (input.substring(i, i + 12) === '&lt;mark&gt;') {
//                 insideMark = true;
//             } else if (input.substring(i, i + 13) === '&lt;/mark&gt;') {
// // console.log('outside');
//                 insideMark = false;
//             }

//             // Detect start/end of an HTML entity
//             if (char === '&') {
//                 insideEntity = true;
//             } else if (char === ';' && insideEntity) {
//                 insideEntity = false;
//             }

//             result += char;

//             // Count visible characters (not inside entities or mark)
//             if (!insideEntity && !insideMark && char !== '&') {
//                 count++;
//             }

//             // Stop at limit outside mark/entity
//             if (count >= limit && !insideMark && !insideEntity) {
//                 if (i < input.length - 1) {
//                     result += '...';
//                 }
//                 break;
//             }
//         }
//         return result;
    // }

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
     * getEscapedValue
     * 
     * @access  public
     * @static
     * @param   String str
     * @return  String
     */
    static getEscapedValue(str) {
        let $div = document.createElement('div');
        $div.textContent = str;
        $div.innerHTML = $div.innerHTML.replace(/&lt;mark&gt;/g, '<mark>');
        $div.innerHTML = $div.innerHTML.replace(/&lt;\/mark&gt;/g, '</mark>');
        return $div.innerHTML;
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
        let resultTruncationLimit = window.typesenseInstantSearch.ConfigUtils.get('resultTruncationLimit');
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
                    // value = window.typesenseInstantSearch.ElementUtils.getEscapedString(value);
                    value = window.typesenseInstantSearch.ElementUtils.getEscapedValue(value);
                    // value = value.replace(/&lt;mark&gt;/g, '<mark>');
                    // value = value.replace(/&lt;\/mark&gt;/g, '</mark>');
                    // value = window.typesenseInstantSearch.ElementUtils.getTruncatedMarkup(value, resultTruncationLimit);
                    return value;
                }
                return '';
            }
            expression = expression.trim();
            let value = window.typesenseInstantSearch.ElementUtils.getValueFromPath(expression, map);
            if (value === null) {
                return '';
            }
            // value = window.typesenseInstantSearch.ElementUtils.getEscapedString(value);
            value = window.typesenseInstantSearch.ElementUtils.getEscapedValue(value);
            // value = value.replace(/&lt;mark&gt;/g, '<mark>');
            // value = value.replace(/&lt;\/mark&gt;/g, '</mark>');
            // value = window.typesenseInstantSearch.ElementUtils.getTruncatedMarkup(value, resultTruncationLimit);
            return value;
        });
        return html;
    }
}
