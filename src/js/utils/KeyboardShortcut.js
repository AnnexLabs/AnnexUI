
/**
 * window.typesenseInstantSearch.KeyboardShortcutUtils
 * 
 * @access  public
 */
window.typesenseInstantSearch.KeyboardShortcutUtils = window.typesenseInstantSearch.KeyboardShortcutUtils || class KeyboardShortcutUtils {

    /**
     * _active
     * 
     * @static
     * @access  protected
     * @var     Object
     */
    static _active = {
        catchAll: true,
        delete: true,
        documentPaste: true,
        escapeDocument: true,
        escapeField: true,
        enterField: true,
        keyboardNavigation: true,
        keyboardShortcut: true,
        selectAll: true,
        slash: true,
    };

    /**
     * __validKeydownEvent
     * 
     * @access  private
     * @param   Object event
     * @param   String configKey
     * @param   String|Array validKeys
     * @return  Boolean
     */
    static __validKeydownEvent(event, configKey, validKeys) {
        if (window.typesenseInstantSearch.webComponent.showing() === false) {
            return false;
        }
        if (this._active[configKey] === false) {
            return false;
        }
        validKeys = [].concat(validKeys);
        let key = event.key.toLowerCase();
        if (validKeys.includes(key) === false) {
            return false;
        }
        return true;
    }

    /**
     * _addDocumentPasteEventListener
     * 
     * @access  protected
     * @static
     * @return  Boolean
     */
    static _addDocumentPasteEventListener() {
        let $element = document,
            handler = this._handleDocumentPasteEvent.bind(this);
        $element.addEventListener('paste', handler);
        return true;
    }

    /**
     * _addKeydownEventListener
     * 
     * @access  protected
     * @static
     * @return  Boolean
     */
    static _addKeydownEventListener() {
        let $element = document,
            handler = this._handleKeydownEvent.bind(this);
        $element.addEventListener('keydown', handler);
        return true;
    }

    /**
     * _getKeyboardShortcut
     * 
     * @access  protected
     * @static
     * @return  null|String
     */
    static _getKeyboardShortcut() {
        let value = window.typesenseInstantSearch.ConfigUtils.get('keyboardShortcut');
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return null;
        }
        value = value.trim().toLowerCase();
        return value;
    }

    /**
     * _handleDocumentCatchAllKeydownEvent
     * 
     * @note    The key length check is to handle things like the "Meta" key
     *          etc.
     * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentCatchAllKeydownEvent(event) {
        if (this._active.catchAll === false) {
            return false;
        }
        if (window.typesenseInstantSearch.webComponent.showing() === false) {
            return false;
        }
        if (event.metaKey === true) {
            return false;
        }
        if (event.ctrlKey === true) {
            return false;
        }
        let key = event.key;//.toLowerCase();
        if (key.length > 1) {
            return false;
        }
        if (key === ' ') {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement,
            field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field');
        if ($activeElement === null) {
            field.focus();
console.log('clearing');
            field.clear();
            field.append(event.key);
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
                shiftKey: event.shiftKey
            }));
            return true;
        }
        if ($activeElement.matches('input') === true) {
            return false;
        }
console.log('clearing2');
        field.focus();
        field.clear();
        field.append(key);
        field.first('input').dispatchEvent(new Event('input', {
            bubbles: true,
            shiftKey: event.shiftKey
        }));
        return true;
    }

    /**
     * _handleDocumentDeleteKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentDeleteKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'delete', 'backspace') === false) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement,
            field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field');
        if ($activeElement === null) {
            field.focus();
            field.decrement();
            // field.clear();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }
        if ($activeElement.matches('input') === true) {
            return false;
        }
        field.focus();
        field.decrement();
        // field.clear();
        field.first('input').dispatchEvent(new Event('input', {
            bubbles: true
        }));
        return true;
    }

    /**
     * _handleDocumentEscapeKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentEscapeKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'escapeDocument', 'escape') === false) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement;
        if ($activeElement === null) {
            window.typesenseInstantSearch.webComponent.hide();
            return true;
        }
        if ($activeElement.matches('input') === true) {
            return false;
        }
        let field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field'),
            $inut = field.first('input'),
            value = $inut.value.trim();
        if (value === '') {
            window.typesenseInstantSearch.webComponent.hide();
            return true;
        }
        field.focus();
        return true;
    }

    /**
     * _handleDocumentKeyboardNavigationKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentKeyboardNavigationKeydownEvent(event) {
        let validKeys = ['tab', 'arrowdown', 'arrowup'];
        if (this.__validKeydownEvent(event, 'keyboardNavigation', validKeys) === false) {
            return false;
        }
        let key = event.key.toLowerCase();
        event.preventDefault();
        let direction = 'previous';
        if (key === 'arrowdown') {
            direction = 'next';
        }
        if (key === 'tab') {
            if (event.shiftKey === false) {
                direction = 'next';
            }
        }
        let found = window.typesenseInstantSearch.webComponent.getView('root').getView('body').getView('results').getView('found');
        if (direction === 'next') {
            found.next();
            return true;
        }
        found.previous() || window.typesenseInstantSearch.webComponent.getView('root').focus();
        return true;
    }

    /**
     * _handleDocumentKeyboardShortcutKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentKeyboardShortcutKeydownEvent(event) {
        if (this._active.keyboardShortcut === false) {
            return false;
        }
        let keyboardShortcut = this._getKeyboardShortcut();
        if (keyboardShortcut === null) {
            return false;
        }
        if (keyboardShortcut.charAt(0) !== '⌘') {
            return false;
        }
        let character = keyboardShortcut.charAt(1),
            isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        if (
            (isMac && event.metaKey && event.key.toLowerCase() === character) ||
            (!isMac && event.ctrlKey && event.key.toLowerCase() === character)
        ) {
            event.preventDefault();
            window.typesenseInstantSearch.webComponent.toggle();
            return true;
        }
        return false;
    }

    /**
     * _handleDocumentPasteEvent
     * 
     * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentPasteEvent(event) {
        if (window.typesenseInstantSearch.webComponent.showing() === false) {
            return false;
        }
        let configKey = 'documentPaste';
        if (this._active[configKey] === false) {
            return false;
        }
        let pastedText = event.clipboardData.getData('text');
        if (pastedText.length === 0) {
            return false;
        }
        pastedText = pastedText.trim();
        if (pastedText.length === 0) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement;
        if ($activeElement === null) {
            let field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field');
            field.focus();
            field.clear();
            field.append(pastedText);
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
                shiftKey: event.shiftKey
            }));
            return true;
        }
        if ($activeElement.matches('input') === true) {
            return false;
        }
        let field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field');
        field.focus();
        field.clear();
        field.append(pastedText);
        field.first('input').dispatchEvent(new Event('input', {
            bubbles: true,
            shiftKey: event.shiftKey
        }));
        return true;
    }

    /**
     * _handleDocumentSelectAllKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentSelectAllKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'selectAll', 'a') === false) {
            return false;
        }
        if (event.metaKey === false) {
            return false;
        }
        window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field').focus();
        window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field').select();
        return true;
    }

    /**
     * _handleDocumentSlashKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleDocumentSlashKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'slash', '/') === false) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement;
        if ($activeElement === null) {
            window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field').focus();
            return true;
        }
        if ($activeElement.matches('input') === true) {
            return false;
        }
        window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field').focus();
        return true;
    }

    /**
     * _handleFieldEnterKeydownEvent
     * 
     * @access  protected
     * @param   Object event
     * @return  Boolean
     */
    static _handleFieldEnterKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'enterField', 'enter') === false) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement;
        if ($activeElement === null) {
            return false;
        }
        if ($activeElement.matches('input') === true) {
            let found = window.typesenseInstantSearch.webComponent.getView('root').getView('body').getView('results').getView('found'),
                focusedIndex = found.getFocusedIndex();
            if (focusedIndex === null) {
                let results = found.getResults(),
                    result = results[0];
                if (result === undefined) {
                    return false;
                }
                event.stopPropagation();
                result.focus();
                result.simulateClick(event);
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * _handleFieldEscapeKeydownEvent
     * 
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleFieldEscapeKeydownEvent(event) {
        if (this.__validKeydownEvent(event, 'escapeField', 'escape') === false) {
            return false;
        }
        let $activeElement = window.typesenseInstantSearch.webComponent.shadow.activeElement;
        if ($activeElement === null) {
            return false;
        }
        if ($activeElement.matches('input') === true) {
            event.preventDefault();
            event.stopPropagation();
            let value = $activeElement.value.trim(),
                found = window.typesenseInstantSearch.webComponent.getView('root').getView('body').getView('results').getView('found');
            if (value === '') {
                found.hideWebComponent();
                return true;
            }
            let field = window.typesenseInstantSearch.webComponent.getView('root').getView('header').getView('field');
            field.clear();
            // $activeElement.value = '';
            found.clearResults();
            found.setState('idle');
            return true;
        }
        return false;
    }

    /**
     * _handleKeydownEvent
     * 
     * @note    Ordered
     * @access  protected
     * @static
     * @param   Object event
     * @return  Boolean
     */
    static _handleKeydownEvent(event) {
        if (this._handleDocumentKeyboardShortcutKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentKeyboardNavigationKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentEscapeKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleFieldEscapeKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleFieldEnterKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentSlashKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentSelectAllKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentDeleteKeydownEvent(event) === true) {
            return true;
        }
        if (this._handleDocumentCatchAllKeydownEvent(event) === true) {
            return true;
        }
        return true;
    }

    /**
     * setup
     * 
     * @access  public
     * @static
     * @return  Promise
     */
    static setup() {
        this._addDocumentPasteEventListener();
        this._addKeydownEventListener();
        return true;
    }
}
