
/**
 * /src/js/utils/Template.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseUtils'], function() {

    /**
     * window.annexSearch.TemplateUtils
     * 
     * @access  public
     */
    window.annexSearch.TemplateUtils = window.annexSearch.TemplateUtils || class TemplateUtils extends window.annexSearch.BaseUtils {

        /**
         * #__markup
         * 
         * @access  private
         * @static
         * @var     Object
         */
        static #__markup = {

            /**
             * auto-v0.1.0
             * 
             * @access  private
             * @static
             * @var     Object
             */
            'auto-v0.1.0': {
                templates: {
                    resultFoundResultsBody: this.#__getAutoSchemaKeyMarkup()
                }
            },

            /**
             * sku-v0.1.0
             * 
             * @access  private
             * @static
             * @var     Object
             */
            'sku-v0.1.0': {
                templates: {
                    resultFoundResultsBody: `
                        <div data-view-name="ResultFoundResultsBodyView" part="result" class="clearfix">
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
                                <div class="title" part="result-content-title">{{{data?.hit?.highlight?.name?.snippet || data?.hit?.document?.name || '(unknown name)'}}}</div>
                                <div class="body" part="result-content-body">{{{data?.hit?.highlight?.description?.snippet || data?.hit?.document?.description || '(unknown description)'}}}</div>
                                <div class="price badge" part="result-content-price">\${{{data?.hit?.document?.price.toLocaleString() || '(unknown price)'}}}</div>
                            </div>
                        </div>`
                }
            },

            /**
             * webResource-v0.1.0
             * 
             * @access  private
             * @static
             * @var     Object
             */
            'webResource-v0.1.0': {
                templates: {
                    resultFoundResultsBody: `
                        <a data-view-name="ResultFoundResultsBodyView" href="{{data.hit.document.uri}}" part="result" class="clearfix">
                            <%
                                let imageUrl = data.hit.document.imageUrl || '',
                                    validImage = window.annexSearch.StringUtils.validURL(imageUrl);
                                if (validImage === true) {
                            %>
                                <div class="image" part="result-content-image">
                                    <img src="<%- (imageUrl) %>" part="result-content-image-img" />
                                </div>
                            <%
                                }
                            %>
                            <div class="content" part="result-content">
                                <div class="title" part="result-content-title">{{{data?.hit?.highlight?.title?.snippet || data?.hit?.document?.title || '(unknown title)'}}}</div>
                                <div class="body" part="result-content-body">{{{data?.hit?.highlight?.body?.snippet || data?.hit?.document?.body || '(unknown body)'}}}</div>
                                <div class="uri truncate" part="result-content-uri">{{data.hit.document.uri}}</div>
                            </div>
                        </a>`
                }
            }
        };

        /**
         * #__getAutoSchemaKeyMarkup
         * 
         * @see     https://chatgpt.com/c/689e966b-6b58-832d-a312-14e72ca1df28
         * @access  private
         * @static
         * @return  Function
         */
        static #__getAutoSchemaKeyMarkup() {
            return function(data) {
                let hit = data.hit,
                    imageURLKeys = [
                        'asset',
                        'assetUrl',
                        'assetUrl',

                        'image_path',
                        'imagePath',
                        'img_path',
                        'imgPath',

                        'image',
                        'imageUri',
                        'imageUrl',

                        'img',
                        'imgUri',
                        'imgUrl',

                        'openGraph',
                        'openGraphUri',
                        'openGraphUrl',

                        'openGraphThumb',
                        'openGraphThumbUri',
                        'openGraphThumbUrl',

                        'openGraphImage',
                        'openGraphImageUri',
                        'openGraphImageUrl',

                        'photo',
                        'photoUri',
                        'photoUrl',

                        'picture',
                        'pictureUri',
                        'pictureUrl',

                        'thumb',
                        'thumbUri',
                        'thumbUrl',

                        'thumbnail',
                        'thumbnailUri',
                        'thumbnailUrl',
                    ],
                    titleKeys = [
                        'articleTitle',
                        'caption',
                        'contentTitle',
                        'displayName',
                        'documentTitle',
                        'header',
                        'heading',
                        'headline',
                        'label',
                        'listingTitle',
                        'metaTitle',
                        'name',
                        'nameText',
                        'pageTitle',
                        'shortTitle',
                        'subject',
                        'term',
                        'title',
                        'titleText',
                    ],
                    bodyKeys = [
                        'article',
                        'articleBody',
                        'body',
                        'content',
                        'description',
                        'details',
                        'excerpt',
                        'mainText',
                        'message',
                        'note',
                        'paragraph',
                        'post',
                        'snippet',
                        'story',
                        'summary',
                        'text',
                    ],
                    uriKeys = [
                        'canonical',
                        'canonicalUri',
                        'canonicalUrl',

                        'endpoint',
                        'endpointUri',
                        'endpointUrl',

                        'fullUri',
                        'fullUrl',

                        'href',

                        'link',
                        'linkUri',
                        'linkUrl',

                        'pageUri',
                        'pageUrl',

                        'permalink',
                        'permalinkUri',
                        'permalinkUrl',

                        'redirectUri',
                        'redirectUrl',

                        'sourceUri',
                        'sourceUrl',

                        'targetUri',
                        'targetUrl',
                        
                        'uri',
                        'url',
                    ],
                    imageUrl,
                    title,
                    body,
                    uri;
                for (let key of imageURLKeys) {
                    imageUrl = imageUrl
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.highlight, key)?.snippet
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.document, key)
                        || null;
                }
                for (let key of titleKeys) {
                    title = title
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.highlight, key)?.snippet
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.document, key)
                        || null;
                }
                for (let key of bodyKeys) {
                    body = body
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.highlight, key)?.snippet
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.document, key)
                        || null;
                }
                for (let key of uriKeys) {
                    uri = uri
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.highlight, key)?.snippet
                        || window.annexSearch.DataUtils.findKeyInsensitiveValue(data?.hit?.document, key)
                        || null;
                }
                return `
                <%
                    let validUri = window.annexSearch.StringUtils.validURL('` + (uri) + `');
                    if (validUri === true) {
                %>
                    <a data-view-name="ResultFoundResultsBodyView" class="clearfix" part="result" href="` + (uri) + `">
                <% } else { %>
                    <div data-view-name="ResultFoundResultsBodyView" class="clearfix" part="result">
                <% } %>
                    <%
                        let validImage = window.annexSearch.StringUtils.validURL('` + (imageUrl) + `');
                        if (validImage === true) {
                    %>
                        <div class="image" part="result-image">
                            <img src="` + (imageUrl) + `" part="result-image-img" />
                        </div>
                    <% } %>
                    <div class="content" part="result-content">
                        <div class="title" part="result-content-title">` + (title || '(no title found)') + `</div>
                        <div class="body" part="result-content-body">` + (body || '(no body found)') + `</div>
                        <%
                            if (validUri === true) {
                                // let uri = 
                                // uri = uri.replace(/^https?:\/\//, '');
                                // replace(/^https?:\/\/(www\.)?/, '');
                        %>
                            <div class="uri truncate" part="result-content-uri">` + (uri) + `</div>
                        <% } %>
                    </div>
                <% if (validUri === true) { %>
                    </a>
                <% } else { %>
                    </div>
                <% } %>`;
            };
        }

        /**
         * getTemplate
         * 
         * @access  public
         * @static
         * @param   String templateSetKey
         * @param   String viewKey
         * @return  null|String
         */
        static getTemplate(templateSetKey, viewKey) {
            let template = this.#__markup[templateSetKey]?.templates?.[viewKey] || null;
            return template;
        }

        /**
         * getTemplates
         * 
         * @access  public
         * @static
         * @param   String templateSetKey
         * @param   Object templates (default: {})
         * @return  Object
         */
        static getTemplates(templateSetKey, templates = {}) {
            window.annexSearch.DataUtils.deepMerge(
                templates,
                this.#__markup[templateSetKey]?.templates || {}
            );
            return templates;
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
