
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
         * #__lastTypesenseSearchRequest
         * 
         * @access  private
         * @var     null|window.annexSearch.TypesenseSearchRequest (default: null)
         */
        // #__lastTypesenseSearchRequest = null;

        /**
         * #__lastTypesenseSearchResponse
         * 
         * @access  private
         * @var     null|Object (default: null)
         */
        #__lastTypesenseSearchResponse = null;

        /**
         * #__loadingMore
         * 
         * @access  private
         * @var     Boolean (default: false)
         */
        #__loadingMore = false;

        /**
         * #__searchDebounceDelay
         * 
         * @access  private
         * @var     Number (default: 60)
         */
        // #__searchDebounceDelay = 600;
        #__searchDebounceDelay = 60;

        /**
         * #__timeout
         * 
         * @access  private
         * @var     null|Number (default: null)
         */
        #__timeout = null;

        /**
         * #__markup
         * 
         * @access  public
         * @static
         * @var     String
         */
        static markup = `
<div class="clearfix" data-view-name="FieldHeaderView">
    <%
        let label = data?.config?.keyboardShortcut ?? '';
        label = label.toUpperCase();
        let placeholder = data?.config?.copy?.field?.placeholder ?? 'Search...';
    %>
    <div class="label"><%- (label) %></div>
    <div class="input">
        <input type="search" name="query" id="query" spellcheck="false" autocapitalize="off" autocorrect="off" placeholder="<%- (placeholder) %>" />
    </div>
</div>`;

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addInputInputEventListener();
            return true;
        }

        /**
         * #__addInputInputEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addInputInputEventListener() {
            let $element = this.first('input'),
                handler = this.#__handleInputInputEvent.bind(this);
            $element.addEventListener('input', handler);
            return true;
        };

        /**
         * #__handleFailedTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleFailedTypesenseSearchEvent(options, typesenseSearchRequest) {
            let error = typesenseSearchRequest.getError(),
                key = error.key;
            if (key === 'abort') {
                return false;
            }
            this.getWebComponent().dispatchCustomEvent('results.error', {error});
            let header = this.getView('root.header');
            header.hideSpinner();
            let response = typesenseSearchRequest.getResponse();
            this.#__lastTypesenseSearchResponse = response;
            this.setStateKey('error');
            typesenseSearchRequest.logFailedEvent();
            return true;
        };

        /**
         * #__handleInputInputEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleInputInputEvent(event) {
// console.log('ummm');
            let value = this.first('input').value.trim();
            if (value === '') {
                this.nullifyLastTypesenseSearchResponse();
                this.clear();
                this.setStateKey('idle');
                this.getWebComponent().dispatchCustomEvent('results.idle');
                return false;
            }
            if (value === this.#__lastTypesenseSearchResponse?.request_params?.q) {
                return false;
            }
            this.nullifyLastTypesenseSearchResponse();
            this.#__loadingMore = false;
            let found = this.getView('root.body.results.found');
            found.scrollToTop();
            clearTimeout(this.#__timeout);
            this.#__timeout = setTimeout(this.#__searchTypesense.bind(this), this.#__searchDebounceDelay);
            return true;
        };

        /**
         * #__handleLoadMoreSuccessfulTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleLoadMoreSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest) {
            let response = typesenseSearchRequest.getResponse();
            this.getWebComponent().dispatchCustomEvent('results.loaded', {response});
            this.#__lastTypesenseSearchResponse = response;
            this.#__loadingMore = false;
            if (response.hits.length === 0) {
                return false;
            }
            let found = this.getView('root.body.results.found');
            found.mountResults(response);
            this.#__updateMetaBar();
            return true;
        }

        /**
         * #__handleSuccessfulTypesenseSearchEvent
         * 
         * @access  private
         * @param   Object options
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest) {
            let response = typesenseSearchRequest.getResponse();
            if (this.#__loadingMore === true) {
                let loadMoreResponse = this.#__handleLoadMoreSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest),
                    found = this.getView('root.body.results.found'),
                    containsScrollbar = found.containsScrollbar();
    // console.log(containsScrollbar);
                if (containsScrollbar === true) {
                    return true;
                }
                this.loadMore();
                return loadMoreResponse;
            }
            this.#__lastTypesenseSearchResponse = response;
            this.getView('root.body.results.found').clearResults();
            if (response.hits.length === 0) {
                this.getWebComponent().dispatchCustomEvent('results.empty');
                this.setStateKey('empty');
                return false;
            }
            this.getWebComponent().dispatchCustomEvent('results.loaded', {response});
            this.setStateKey('results');
            let found = this.getView('root.body.results.found');
            found.mountResults(response);
            found.resetFocusedIndex();
            this.#__updateMetaBar();
            let containsScrollbar = found.containsScrollbar();
// console.log(containsScrollbar);
            if (containsScrollbar === true) {
                return true;
            }
            this.loadMore();
            return true;
        };

        /**
         * #__handleTypesenseSearchResponse
         * 
         * @access  private
         * @param   Object options (default: {})
         * @param   window.annexSearch.TypesenseSearchRequest typesenseSearchRequest
         * @return  Boolean
         */
        #__handleTypesenseSearchResponse(options = {}, typesenseSearchRequest) {
            // this.#__lastTypesenseSearchRequest = typesenseSearchRequest;
            let error = typesenseSearchRequest.getError();
            if (error === null) {
                let header = this.getView('root.header');
                header.hideSpinner();
                let response = this.#__handleSuccessfulTypesenseSearchEvent(options, typesenseSearchRequest);
                return response;
            }
            let response = this.#__handleFailedTypesenseSearchEvent(options, typesenseSearchRequest);
            return response;
        }

        /**
         * #__searchTypesense
         * 
         * @access  private
         * @param   Object options (default: {})
         * @return  Promise
         */
        #__searchTypesense(options = {}) {
            let header = this.getView('root.header');
            header.showSpinner();
            let value = this.first('input').value.trim(),
                handler = this.#__handleTypesenseSearchResponse.bind(this, options),
                promise = this.getHelper('typesense').search(value, options).then(handler);
            return promise;
        }

        /**
         * #__updateMetaBar
         * 
         * @access  private
         * @return  Boolean
         */
        #__updateMetaBar() {
            let typesenseSearchResponse = this.#__lastTypesenseSearchResponse,
                metaBar = this.getView('root.header.metaBar');
            metaBar.set('typesenseSearchResponse', typesenseSearchResponse);
            metaBar.render();
            return true;
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
            // this.nullifyLastTypesenseSearchResponse();
            // this.#__lastTypesenseSearchResponse = null;
            let $input = this.first('input');
            $input.value = '';
            return true;
        }

        /**
         * nullifyLastTypesenseSearchResponse
         * 
         * @access  public
         * @return  Boolean
         */
        nullifyLastTypesenseSearchResponse() {
            this.#__lastTypesenseSearchResponse = null;
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
         * @return  Boolean
         */
        focus() {
            let $input = this.first('input');
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $input.focus();
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
            if (this.#__loadingMore === true) {
                return false;
            }
            this.#__loadingMore = true;
            let found = this.getView('root.body.results.found'),
                results = found.getResults();
            if (results.length >= this.#__lastTypesenseSearchResponse.found) {
                return false;
            }
            let page = this.#__lastTypesenseSearchResponse?.page ?? null;
            if (page === null) {
                return false;
            }
            page = parseInt(page, 10);
            ++page;
            let options = {};
            options.page = page;
            this.#__searchTypesense(options);
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
            this.#__addEvents();
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
            window.annexSearch.ElementUtils.waitForAnimation().then(function() {
                $input.select();
            })
            return true;
        }

        /**
         * setCaret
         * 
         * Moves the caret to the end of the input.
         * 
         * @access  public
         * @return  Boolean
         */
        setCaret() {
            let $input = this.first('input'),
                value = $input.value;
            $input.setSelectionRange(value.length, value.length);
            return true;
        }
    }
});
