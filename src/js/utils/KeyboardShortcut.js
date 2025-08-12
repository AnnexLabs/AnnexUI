
/**
 * /src/js/utils/KeyboardShortcut.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.KeyboardShortcutUtils
     * 
     * @access  public
     */
    window.annexSearch.KeyboardShortcutUtils = window.annexSearch.KeyboardShortcutUtils || class extends window.annexSearch.BaseUtils {

        /**
         * #__active
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__active = {

            /**
             * documentCatchAll
             * 
             * Whether any keyboard keydown event against the document should be
             * "caught" and processed as if it was entered into the $input
             * field.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            documentCatchAll: true,

            /**
             * documentDelete
             * 
             * Whether the delete key should be caught and processed as the user
             * wanting to delete the last entered character.
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

            /**
             * resultCopy
             * 
             * Keyboard detection for the Command+c / Ctrl+c keyboard
             * combination, which when detected, will dispatch an event for the
             * corresponding ResultFoundResultsBodyView.
             * 
             * @static
             * @access  private
             * @var     Boolean (default: true)
             */
            resultCopy: true,
        };

        /**
         * #__addDocumentCopyEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        // static #__addDocumentCopyEventListener() {
        //     let $element = document,
        //         handler = this.__handleDocumentCopyKeydownEvent.bind(this);
        //     $element.addEventListener('copy', handler);
        //     return true;
        // }

        /**
         * #__addDocumentPasteEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addDocumentPasteEventListener() {
            let $element = document,
                handler = this.#__handleDocumentPasteEvent.bind(this);
            $element.addEventListener('paste', handler);
            return true;
        }

        /**
         * #__addKeydownEventListener
         * 
         * @access  private
         * @static
         * @return  Boolean
         */
        static #__addKeydownEventListener() {
            let $element = document,
                handler = this.#__handleKeydownEvent.bind(this);
            $element.addEventListener('keydown', handler);
            return true;
        }

        /**
         * #__getActiveWebComponent
         * 
         * @access  private
         * @static
         * @return  null|window.annexSearch.AnnexSearchWidgetWebComponent
         */
        static #__getActiveWebComponent() {
            let $active = window.annexSearch.AnnexSearch.getActive();
            return $active;
        }

        /**
         * #__getRegisteredWebComponents
         * 
         * @access  private
         * @static
         * @return  Array
         */
        static #__getRegisteredWebComponents() {
            let registered = window.annexSearch.AnnexSearch.getRegistered();
            return registered;
        }

        /**
         * #__getField
         * 
         * @access  private
         * @static
         * @return  window.annexSearch.BaseView
         */
        static #__getField() {
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                field = $annexSearchWidget.getView('root').getView('header.field');
            return field;
        }

        /**
         * #__getFound
         * 
         * @access  private
         * @static
         * @return  window.annexSearch.BaseView
         */
        static #__getFound() {
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                found = $annexSearchWidget.getView('root').getView('body.results.found');
            return found;
        }

        /**
         * #__handleDocumentCatchAllKeydownEvent
         * 
         * @note    The key length check is to handle things like the "Meta" key
         *          etc.
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentCatchAllKeydownEvent(event) {
            if (this.#__active.documentCatchAll === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget === null) {
                return false;
            }
            if ($annexSearchWidget.showing() === false) {
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
            let $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(key);
                found.smoothScrollToTop();
                found.resetFocusedIndex();
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
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
                shiftKey: event.shiftKey
            }));
            return true;
        }

        /**
         * #__handleDocumentCopyKeydownEvent
         * 
         * @see     https://chatgpt.com/c/68993510-aa98-832b-bdd6-2356a4452616
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentCopyKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'resultCopy', 'c') === false) {
                return false;
            }
            if (this.#__isModifierCombo(event) === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            let found = this.#__getFound(),
                results = found.getResults();
            for (let result of results) {
                if (result.getElement() === $activeElement) {
                    result.dispatchCopyEvent(event);
                    return true;
                }
            }
            return false;
        }

        /**
         * #__handleDocumentDeleteKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentDeleteKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentDelete', 'backspace') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.decrement();
                field.nullifyLastTypesenseSearchResponse();
                found.smoothScrollToTop();
                found.resetFocusedIndex();
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
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true
            }));
            return true;
        }

        /**
         * #__handleDocumentEscapeKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentEscape', 'escape') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
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
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentKeyboardNavigationKeydownEvent(event) {
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
            found.previous() || this.#__getActiveWebComponent().getView('root').focus();
            return true;
        }

        /**
         * #__handleDocumentKeyboardShortcutKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentKeyboardShortcutKeydownEvent(event) {
            if (this.#__active.documentKeyboardShortcut === false) {
                return false;
            }
            let registered = this.#__getRegisteredWebComponents();
            for (let $annexSearchWidget of registered) {
                if ($annexSearchWidget.getConfig('layout') === 'inline') {
                    continue;
                }
                let keyboardShortcut = $annexSearchWidget.getHelper('config').get('keyboardShortcut');
                if (keyboardShortcut === null) {
                    continue
                }
                if (keyboardShortcut === undefined) {
                    continue
                }
                keyboardShortcut = keyboardShortcut.trim().toLowerCase();
                if (keyboardShortcut.charAt(0) !== '⌘') {
                    continue
                }
                if (this.#__isModifierCombo(event) === false) {
                    continue;
                }
                let key = event.key.toLowerCase(),
                    character = keyboardShortcut.charAt(1);
                if (key === character) {
                    event.preventDefault();
                    $annexSearchWidget.toggle();
                    return true;
                }
            }
            return false;
        }

        /**
         * #__handleDocumentPasteEvent
         * 
         * @see     https://chatgpt.com/c/688abab5-f678-8330-9aff-e43c24768100
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentPasteEvent(event) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            if (this.#__getActiveWebComponent() === null) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget.showing() === false) {
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
            let $activeElement = $annexSearchWidget.shadow.activeElement,
                field = this.#__getField(),
                found = this.#__getFound();
            if ($activeElement === null) {
                field.focus();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                field.append(pastedText);
                found.smoothScrollToTop();
                found.resetFocusedIndex();
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
            found.resetFocusedIndex();
            field.first('input').dispatchEvent(new Event('input', {
                bubbles: true,
            }));
            return true;
        }

        /**
         * #__handleDocumentSelectAllKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentSelectAllKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSelectAll', 'a') === false) {
                return false;
            }
            if (this.#__isModifierCombo(event) === false) {
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
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleDocumentSlashKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'documentSlash', '/') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement,
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
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleFieldEnterKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEnter', 'enter') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
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
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleFieldEscapeKeydownEvent(event) {
            if (this.#__validKeydownEvent(event, 'fieldEscape', 'escape') === false) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent(),
                $activeElement = $annexSearchWidget.shadow.activeElement;
            if ($activeElement === null) {
                return false;
            }
            if ($activeElement.matches('input') === true) {
                event.preventDefault();
                event.stopPropagation();
                let value = $activeElement.value.trim(),
                    found = this.#__getFound();
                if (value === '') {
                    $annexSearchWidget.hide();
                    return true;
                }
                let field = this.#__getField();
                field.clear();
                field.nullifyLastTypesenseSearchResponse();
                found.clearResults();
                found.getView('root').setStateKey('idle');
                $annexSearchWidget.dispatchCustomEvent('results.idle');
                return true;
            }
            return false;
        }

        /**
         * #__handleKeydownEvent
         * 
         * @note    Ordered
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__handleKeydownEvent(event) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            if (this.#__handleDocumentCopyKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentKeyboardShortcutKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentKeyboardNavigationKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentEscapeKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleFieldEscapeKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleFieldEnterKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentSlashKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentSelectAllKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentDeleteKeydownEvent(event) === true) {
                return true;
            }
            if (this.#__handleDocumentCatchAllKeydownEvent(event) === true) {
                return true;
            }
            return true;
        }

        /**
         * #__isModifierCombo
         * 
         * @access  private
         * @static
         * @param   Object event
         * @return  Boolean
         */
        static #__isModifierCombo() {
            let mac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            if (mac === true) {
                if (event.metaKey === true) {
                    return true;
                }
                return false;
            }
            if (event.ctrlKey === true) {
                return true;
            }
            return false;
        }

        /**
         * #__validKeydownEvent
         * 
         * @access  private
         * @static
         * @param   Object event
         * @param   String configKey
         * @param   String|Array validKeys
         * @return  Boolean
         */
        static #__validKeydownEvent(event, configKey, validKeys) {
            if (this.#__getRegisteredWebComponents().length === 0) {
                return false;
            }
            let $annexSearchWidget = this.#__getActiveWebComponent();
            if ($annexSearchWidget === null) {
                return false;
            }
            if ($annexSearchWidget === undefined) {
                return false;
            }
            if ($annexSearchWidget.showing() === false) {
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
         * @static
         * @return  Boolean
         */
        static setup() {
            let response = super.setup();
            if (response === true) {
                this.#__addDocumentPasteEventListener();
                this.#__addKeydownEventListener();
                return true;
            }
            let handler = window.annexSearch.KeyboardShortcutUtils.setup.bind(window.annexSearch.KeyboardShortcutUtils);
            document.addEventListener('DOMContentLoaded', handler);
            return true;
        }
    }
});
