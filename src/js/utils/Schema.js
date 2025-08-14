
/**
 * /src/js/utils/Schema.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.SchemaUtils
     * 
     * @access  public
     */
    window.annexSearch.SchemaUtils = window.annexSearch.SchemaUtils || class SchemaUtils extends window.annexSearch.BaseUtils {

        /**
         * #__markup
         * 
         * @access  protected
         * @static
         * @var     Object
         */
        static #__markup = {
            'sku-v0.1.0': {
                result: `
                    <div data-view-name="ResultFoundResultsBodyView" class="clearfix">
                        <%
                            let imageUrl = data.hit.document.imageUrl || '',
                                validImage = window.annexSearch.StringUtils.validURL(imageUrl);
                            if (validImage === true) {
                        %>
                            <div class="image" part="result-image">
                                <img src="<%- (imageUrl) %>" part="result-image-img" />
                            </div>
                        <%
                            }
                        %>
                        <div class="content" part="result-content">
                            <div class="title" part="result-title">{{{data?.hit?.highlight?.name?.snippet || data?.hit?.document?.name || '(unknown name)'}}}</div>
                            <div class="body" part="result-body">{{{data?.hit?.highlight?.description?.snippet || data?.hit?.document?.description || '(unknown description)'}}}</div>
                            <div class="price badge" part="result-price">\${{{data?.hit?.document?.price.toLocaleString() || '(unknown price)'}}}</div>
                        </div>
                    </div>`,
            },
            'webResource-v0.1.0': {
                result: `
                    <a data-view-name="ResultFoundResultsBodyView" href="{{data.hit.document.uri}}" class="clearfix">
                        <%
                            let imageUrl = data.hit.document.imageUrl || '',
                                validImage = window.annexSearch.StringUtils.validURL(imageUrl);
                            if (validImage === true) {
                        %>
                            <div class="image" part="result-image">
                                <img src="<%- (imageUrl) %>" part="result-image-img" />
                            </div>
                        <%
                            }
                        %>
                        <div class="content" part="result-content">
                            <div class="title" part="result-title">{{{data?.hit?.highlight?.title?.snippet || data?.hit?.document?.title || '(unknown title)'}}}</div>
                            <div class="body" part="result-body">{{{data?.hit?.highlight?.body?.snippet || data?.hit?.document?.body || '(unknown body)'}}}</div>
                            <div class="uri truncate" part="result-uri">{{data.hit.document.uri}}</div>
                        </div>
                    </a>`
            }
        };

        /**
         * getMarkup
         * 
         * @access  public
         * @static
         * @param   String key
         * @param   window.annexSearch.BaseView view
         * @return  null|String
         */
        static getMarkup(key, view) {
            let $annexSearchWidget = view.getWebComponent(),
                schemaKey = $annexSearchWidget.getHelper('config').get('schemaKey');
            if (this.#__markup[schemaKey] === undefined) {
                return null;
            }
            let markup = this.#__markup[schemaKey][key];
            return markup;
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
