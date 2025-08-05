
/**
 * /src/js/views/header/Field.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.FieldHeaderView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.FieldHeaderView = window.annexSearch.FieldHeaderView || class FieldHeaderView extends window.annexSearch.BaseView {

        /**
         * _lastTypesenseSearchResponse
         * 
         * @access  protected
         * @var     null|Object (default: null)
         */
        _lastTypesenseSearchResponse = null;

        /**
         * _loadingMore
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _loadingMore = false;

        /**
         * _searchDebounceDuration
         * 
         * @access  protected
         * @var     Number (default: 60)
         */
        _searchDebounceDuration = 60;

        /**
         * _timeout
         * 
         * @access  protected
         * @var     null|Number (default: null)
         */
        _timeout = null;

        /**
         * constructor
         * 
         * @access  public
         * @param   HTMLElement $element
         * @return  void
         */
        constructor($element) {
            super($element);
        }

        /**
         * _addEvents
         * 
         * @access  protected
         * @return  Boolean
         */
        _addEvents() {
            this._addInputFocusEventListener();
            this._addInputInputEventListener();
            return true;
        }

        /**
         * _addInputFocusEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addInputFocusEventListener() {
            let handler = this._handleInputFocusEvent.bind(this),
                $element = this.first('input');
            $element.addEventListener('focus', handler);
            return true;
        };

        /**
         * _addInputInputEventListener
         * 
         * @access  protected
         * @return  Boolean
         */
        _addInputInputEventListener() {
            let handler = this._handleInputInputEvent.bind(this),
                $element = this.first('input');
            $element.addEventListener('input', handler);
            return true;
        };

        /**
         * _getKeyboardShortcut
         * 
         * @access  protected
         * @return  null|String
         */
        _getKeyboardShortcut() {
            let value = window.annexSearch.ConfigUtils.get('keyboardShortcut');
            if (value === null) {
                return null;
            }
            value = value.trim().toLowerCase();
            return value;
        }

        /**
         * _handleInputFocusEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleInputFocusEvent(event) {
            this.getWebComponent().getView('root').getView('body').getView('results').getView('found').setFocusedIndex(null);
            return true;
        };

        /**
         * _handleFailedTypesenseSearchEvent
         * 
         * @access  protected
         * @param   Object options
         * @param   Object response
         * @return  Boolean
         */
        _handleFailedTypesenseSearchEvent(options, response) {
            this.log('_handleFailedTypesenseSearchEvent', response, arguments);
            this._lastTypesenseSearchResponse = response;
            this.setState('error');
            return true;
        };

        /**
         * _handleInputInputEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleInputInputEvent(event) {
            let value = this.first('input').value.trim();
            if (value === '') {
                this.clear();
                this.setState('idle');
                return false;
            }
            if (value === this._lastTypesenseSearchResponse?.request_params?.q) {
                return false;
            }
            clearTimeout(this._timeout);
            this._timeout = setTimeout(this._searchTypesense.bind(this), this._searchDebounceDuration);
            return true;
        };

        /**
         * _handleLoadMoreSuccessfulTypesenseSearchEvent
         * 
         * @access  protected
         * @param   Object options
         * @param   Object response
         * @return  Boolean
         */
        _handleLoadMoreSuccessfulTypesenseSearchEvent(options, response) {
            this.log('_handleLoadMoreSuccessfulTypesenseSearchEvent', response);
            this._lastTypesenseSearchResponse = response;
            this._loadingMore = false;
            if (response.hits.length === 0) {
                return false;
            }
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found');
            found.drawResults(response);
            let metaBar = this.getWebComponent().getView('root').getView('header').getView('metaBar');
            metaBar.set('typesenseResponse', response);
            metaBar.render();
            return true;
        }

        /**
         * _handleSuccessfulTypesenseSearchEvent
         * 
         * @access  protected
         * @param   Object options
         * @param   Object response
         * @return  Boolean
         */
        _handleSuccessfulTypesenseSearchEvent(options, response) {
            this.log('_handleSuccessfulTypesenseSearchEvent', response);
            if (this._loadingMore === true) {
console.log('wtf');
                let loadMoreResponse = this._handleLoadMoreSuccessfulTypesenseSearchEvent(options, response);
                return loadMoreResponse;
            }
            this._lastTypesenseSearchResponse = response;
console.log('ummm.');
            this.getWebComponent().getView('root').getView('body').getView('results').getView('found').clearResults();
            if (response.hits.length === 0) {
                this.setState('empty');
                return false;
            }
            this.setState('results');
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found');
            found.drawResults(response);
            found.setFocusedIndex(null);
            let metaBar = this.getWebComponent().getView('root').getView('header').getView('metaBar');
            metaBar.set('typesenseResponse', response);
            metaBar.render();
            return true;
        };

        /**
         * _renderKeyboardShortcutLabel
         * 
         * @access  public
         * @return  Boolean
         */
        _renderKeyboardShortcutLabel() {
            let keyboardShortcut = this._getKeyboardShortcut();
            if (keyboardShortcut === null) {
                return false;
            }
            this.first('.label').innerHTML = keyboardShortcut.toUpperCase();
            return true;
        }

        /**
         * _renderPlaceholder
         * 
         * @access  protected
         * @return  Boolean
         */
        _renderPlaceholder() {
            let placeholder = window.annexSearch.ConfigUtils.get('copy').placeholder;
            if (placeholder === null) {
                return false;
            }
            if (placeholder === undefined) {
                return false;
            }
            this.first('input').setAttribute('placeholder', placeholder);
            return true;
        };

        /**
         * _searchTypesense
         * 
         * @access  protected
         * @param   Object options (default: {})
         * @return  Promise
         */
        _searchTypesense(options = {}) {
            let header = this.getWebComponent().getView('root').getView('header');
            header.showSpinner();
            let value = this.first('input').value.trim(),
                successful = this._handleSuccessfulTypesenseSearchEvent.bind(this, options),
                failed = this._handleFailedTypesenseSearchEvent.bind(this, options),
                promise = window.annexSearch.TypesenseUtils.search(value, options).then(function(json) {
                    header.hideSpinner();
                    return successful(json);
                }).catch(failed);
            return promise;
        }

        /**
         * append
         * 
         * @access  public
         * @param   String value
         * @return  Boolean
         */
        append(value) {
            let $input = this.first('input');
            $input.value = ($input.value) + (value);
            return true;
        }

        /**
         * blur
         * 
         * @access  public
         * @return  Boolean
         */
        blur() {
            let $input = this.first('input');
            $input.blur();
            return true;
        }

        /**
         * clear
         * 
         * @access  public
         * @return  Boolean
         */
        clear() {
            this._lastTypesenseSearchResponse = null;
            let $input = this.first('input');
            $input.value = '';
            return true;
        }

        /**
         * decrement
         * 
         * @access  public
         * @return  Boolean
         */
        decrement() {
            let $input = this.first('input');
            $input.value = $input.value.slice(0, -1);
            return true;
        }

        /**
         * focus
         * 
         * @access  public
         * @param   Boolean scrollToTop (default: true)
         * @return  Boolean
         */
        focus() {//scrollToTop = true) {
            let $input = this.first('input'),
                found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found');
            window.annexSearch.DataUtils.waitForAnimation().then(function() {
                $input.focus();
                // scrollToTop && found.smoothScrollToTop();
                found.smoothScrollToTop();
            })
            return true;
        }

        /**
         * loadMore
         * 
         * @access  public
         * @return  Boolean
         */
        loadMore() {
            if (this._loadingMore === true) {
                return false;
            }
            this._loadingMore = true;
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found'),
                results = found.getResults();
            if (results.length >= this._lastTypesenseSearchResponse.found) {
                return false;
            }
            let page = this._lastTypesenseSearchResponse?.page ?? null;
            if (page === null) {
                return false;
            }
            page = parseInt(page, 10);
            ++page;
            let options = {};
            options.page = page;
            this._searchTypesense(options);
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render() {
            super.render();
            this._renderPlaceholder();
            this._renderKeyboardShortcutLabel();
            return true;
        }

        /**
         * select
         * 
         * @access  public
         * @return  Boolean
         */
        select() {
            let $input = this.first('input');
            window.annexSearch.DataUtils.waitForAnimation().then(function() {
                $input.select();
            })
            return true;
        }
    }
});
