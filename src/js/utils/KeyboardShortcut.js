
/**
 * /src/js/utils/KeyboardShortcuts.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.KeyboardShortcutUtils
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.KeyboardShortcutUtils = window.annexSearch.KeyboardShortcutUtils || class KeyboardShortcutUtils extends window.annexSearch.BaseView {

        /**
         * #__active
         * 
         * @access  private
         * @var     Object
         */
        #__active = {

            /**
             * documentCatchAll
             * 
             * Whether any keyboard keydown event against the document should be
             * "caught" and processed as if it was entered into the $input field.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentCatchAll: true,

            /**
             * documentDelete
             * 
             * Whether any keyboard keydown event against the document should be
             * "caught" and processed as if it was entered into the $input field.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentDelete: true,

            /**
             * documentPaste
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentPaste: true,

            /**
             * documentEscape
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentEscape: true,

            /**
             * documentKeyboardNavigation
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentKeyboardNavigation: true,

            /**
             * documentKeyboardShortcut
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentKeyboardShortcut: true,

            /**
             * documentSelectAll
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentSelectAll: true,

            /**
             * documentSlash
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentSlash: true,

            /**
             * fieldEnter
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            fieldEnter: true,

            /**
             * fieldEscape
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            fieldEscape: true,
        };

        /**
         * #__addDocumentPasteEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addDocumentPasteEventListener() {
            let $element = document,
                handler = this.#__handleDocumentPasteEvent.bind(this);
            $element.addEventListener('paste', handler);
            return true;
        }

        /**
         * #__addKeydownEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addKeydownEventListener() {
            let $element = document,
                handler = this.#__handleKeydownEvent.bind(this);
            $element.addEventListener('keydown', handler);
            return true;
        }

        /**
         * #__getField
         * 
         * @access  private
         * @return  BaseView
         */
        #__getField() {
            let field = this.getView('root.header.field');
            return field;
        }

        /**
         * #__getFound
         * 
         * @access  private
         * @return  BaseView
         */
        #__getFound() {
            let found = this.getView('root.body.results.found');
            return found;
        }

        /**
         * #__getKeyboardShortcut
         * 
         * @access  private
         * @return  null|String
         */
        #__getKeyboardShortcut() {
            let value = window.annexSearch.ConfigUtils.get('keyboardShortcut');
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
         * #__handleDocumentCatchAllKeydownEvent
         * 
         * @note    The key length check is to handle things like the "Meta" key
         *          etc.
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentCatchAllKeydownEvent(event) {
            if (this.#__active.documentCatchAll === false) {
                return false;
            }
            if (window.annexSearch.webComponent.showing() === false) {
                return false;
            }
            if (event.metaKey === true) {
                return false;
            }
            if (event.ctrlKey === true) {
                return false;
            }
            let key = event.key;
            if (key.length > 1) {
                return false;
            }
            if (key === ' ') {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(key);
                found.smoothScrollToTop();
                found.reetFocusedIndex();
                field.first('input').dispatchEvent(new Event('input', {
                    bubbles: true,
                    shiftKey: event.shiftKey
                }));
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(key);
            found.smoothScrollToTop();
            found.reetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
                shiftKey: event.shiftKey
            }));
            return true;
        }

        /**
         * #__handleDocumentDeleteKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentDeleteKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentDelete', 'backspace') === false) {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.decrement();
                field.nullifyLastTypesenseSearchResponse();
                found.smoothScrollToTop();
                found.reetFocusedIndex();
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
            field.nullifyLastTypesenseSearchResponse();
            found.smoothScrollToTop();
            found.reetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * #__handleDocumentEscapeKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentEscape', 'escape') === false) {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement;
            if ($activeElement === null) {
                let field = this.#__getField();
                field.focus();
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            let field = this.#__getField();
            field.focus();
            return true;
        }

        /**
         * #__handleDocumentKeyboardNavigationKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentKeyboardNavigationKeydownEvent(event) {
            let validKeys = ['tab', 'arrowdown', 'arrowup'];
            if (this.#__validKeydownEvent(event, 'documentKeyboardNavigation', validKeys) === false) {
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
            let found = this.#__getFound();
            if (direction === 'next') {
                found.next();
                return true;
            }
            found.previous() || this.getView('root').focus();
            return true;
        }

        /**
         * #__handleDocumentKeyboardShortcutKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentKeyboardShortcutKeydownEvent(event) {
            if (this.#__active.documentKeyboardShortcut === false) {
                return false;
            }
            let keyboardShortcut = this.#__getKeyboardShortcut();
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
                window.annexSearch.webComponent.toggle();
                return true;
            }
            return false;
        }

        /**
         * #__handleDocumentPasteEvent
         * 
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentPasteEvent(event) {
            if (window.annexSearch.webComponent.showing() === false) {
                return false;
            }
            let configKey = 'documentPaste';
            if (this.#__active[configKey] === false) {
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
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(pastedText);
                found.smoothScrollToTop();
                found.reetFocusedIndex();
                field.first('input').dispatchEvent(new Event('input', {
                    bubbles: true,
                }));
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            field.clear();
            field.nullifyLastTypesenseSearchResponse();
            field.append(pastedText);
            found.smoothScrollToTop();
            found.reetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
            }));
            return true;
        }

        /**
         * #__handleDocumentSelectAllKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentSelectAllKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSelectAll', 'a') === false) {
                return false;
            }
            if (event.metaKey === false) {
                return false;
            }
            let field = this.#__getField();
            field.focus();
            field.select();
            return true;
        }

        /**
         * #__handleDocumentSlashKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleDocumentSlashKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSlash', '/') === false) {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement,
                field = this.#__getField();
            if ($activeElement === null) {
                field.focus();
                return true;
            }
            if ($activeElement.matches('input') === true) {
                return false;
            }
            field.focus();
            return true;
        }

        /**
         * #__handleFieldEnterKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleFieldEnterKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEnter', 'enter') === false) {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            if ($activeElement.matches('input') === true) {
                let found = this.#__getFound(),
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
         * #__handleFieldEscapeKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleFieldEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEscape', 'escape') === false) {
                return false;
            }
            let $activeElement = window.annexSearch.webComponent.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            if ($activeElement.matches('input') === true) {
                event.preventDefault();
                event.stopPropagation();
                let value = $activeElement.value.trim(),
                    found = this.#__getFound();
                if (value === '') {
                    this.hideWebComponent();
                    return true;
                }
                let field = this.#__getField();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                found.clearResults();
                found.setStateKey('idle');
                return true;
            }
            return false;
        }

        /**
         * #__handleKeydownEvent
         * 
         * @note    Ordered
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleKeydownEvent(event) {
            if (this.#__handleDocumentKeyboardShortcutKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleDocumentKeyboardNavigationKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleDocumentEscapeKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleFieldEscapeKeydownEvent(event) === true) {// Clear results
                return true;
            }
            if (this.#__handleFieldEnterKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleDocumentSlashKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleDocumentSelectAllKeydownEvent(event) === true) {// Nothing
                return true;
            }
            if (this.#__handleDocumentDeleteKeydownEvent(event) === true) {// Don't clear results + new search
                return true;
            }
            if (this.#__handleDocumentCatchAllKeydownEvent(event) === true) {// Clear results
                return true;
            }
            return true;
        }

        /**
         * #__validKeydownEvent
         * 
         * @access  private
         * @param   Object event
         * @param   String configKey
         * @param   String|Array validKeys
         * @return  Boolean
         */
        #__validKeydownEvent(event, configKey, validKeys) {
            if (window.annexSearch.webComponent.showing() === false) {
                return false;
            }
            if (this.#__active[configKey] === false) {
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
         * setup
         * 
         * @access  public
         * @return  Promise
         */
        setup() {
            this.#__addDocumentPasteEventListener();// Don't clear results + new search
            this.#__addKeydownEventListener();
            return true;
        }
    }
    window.annexSearch.KeyboardShortcutUtils = new window.annexSearch.KeyboardShortcutUtils();
});
