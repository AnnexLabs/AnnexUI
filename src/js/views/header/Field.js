
/**
 * /src/js/views/header/Field.js
 * 
 */
window.typesenseInstantSearch.DependencyLoader.push(['window.typesenseInstantSearch.BaseView'], function() {

    /**
     * window.typesenseInstantSearch.FieldHeaderView
     * 
     * @access  public
     * @extends window.typesenseInstantSearch.BaseView
     */
    window.typesenseInstantSearch.FieldHeaderView = window.typesenseInstantSearch.FieldHeaderView || class FieldHeaderView extends window.typesenseInstantSearch.BaseView {

        /**
         * _debounceInterval
         * 
         * @access  protected
         * @var     Number (default: 60)
         */
        _debounceInterval = 60;

        /**
         * _lastTypesenseResponse
         * 
         * @access  protected
         * @var     null|Object (default: null)
         */
        _lastTypesenseResponse = null;

        /**
         * _loadingMore
         * 
         * @access  protected
         * @var     Boolean (default: false)
         */
        _loadingMore = false;

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
            let value = window.typesenseInstantSearch.ConfigUtils.get('keyboardShortcut');
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
         * _handleInputEscapeKeydownEvent
         * 
         * @access  protected
         * @param   Object event
         * @return  Boolean
         */
        _handleInputEscapeKeydownEvent(event) {
            let key = event.key.toLowerCase();
            if (key === 'escape') {
                event.preventDefault();
                event.stopPropagation();
                let value = this.first('input').value.trim();
                if (value === '') {
                    this.hideWebComponent();
                    return true;
                }
                this.first('input').value = '';
                this.getWebComponent().getView('root').getView('body').getView('results').getView('found').clearResults();
                this.setState('idle');
                return true;
            }
            return false;
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
console.log('_handleFailedTypesenseSearchEvent', response);
            this._lastTypesenseResponse = response;
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
// console.log(value);
            if (value === '') {
                this.setState('idle');
                // this.setState('idle');
                return false;
            }
            if (value === this._lastTypesenseResponse?.request_params?.q) {
                return false;
            }
            clearTimeout(this._timeout);
            this._timeout = setTimeout(this._searchTypesense.bind(this), this._debounceInterval);
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
console.log('_handleLoadMoreSuccessfulTypesenseSearchEvent', response);
            this._lastTypesenseResponse = response;
            if (response.hits.length === 0) {
                this._loadingMore = false;
                return false;
            }
            this._loadingMore = false;
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
// console.log('_handleSuccessfulTypesenseSearchEvent', response);
            if (this._loadingMore === true) {
                let loadMoreResponse = this._handleLoadMoreSuccessfulTypesenseSearchEvent(options, response);
                return loadMoreResponse;
            }
            this._lastTypesenseResponse = response;
// console.log('a22')
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
                promise = window.typesenseInstantSearch.TypesenseUtils.search(value, options).then(function(json) {
                    header.hideSpinner();
                    return successful(json);
                }).catch(failed);
            return promise;
        }

        /**
         * _setPlaceholder
         * 
         * @access  protected
         * @return  Boolean
         */
        _setPlaceholder() {
            let placeholder = window.typesenseInstantSearch.ConfigUtils.get('copy').placeholder;
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
            window.typesenseInstantSearch.DataUtils.waitForAnimation().then(function() {
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
// console.log('ummm');
            let found = this.getWebComponent().getView('root').getView('body').getView('results').getView('found'),
                results = found.getResults();
            if (results.length >= this._lastTypesenseResponse.found) {
                return false;
            }
            let page = this._lastTypesenseResponse?.page ?? null;
            if (page === null) {
                return false;
            }
            ++page;
            let options = {};
            options.page = page;
// console.log(this._lastTypesenseResponse);
            this._searchTypesense(options).then(function() {
                // requestAnimationFrame(function() {
                    // found.unfreezeScrolling();
                // });
            });
            return true;
        }

        /**
         * render
         * 
         * @access  public
         * @return  Boolean
         */
        render($element) {
            super.render();
            let keyboardShortcut = this._getKeyboardShortcut();
            if (keyboardShortcut === null) {
                return false;
            }
            this.first('.label').innerHTML = keyboardShortcut.toUpperCase();
            this._setPlaceholder();
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
            window.typesenseInstantSearch.DataUtils.waitForAnimation().then(function() {
                $input.select();
            })
            return true;
        }
    }
});
