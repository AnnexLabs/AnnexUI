
/**
 * /src/js/views/body/Idle.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.IdleBodyView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.IdleBodyView = window.annexSearch.IdleBodyView || class IdleBodyView extends window.annexSearch.BaseView {

        /**
         * #__chips
         * 
         * @access  private
         * @var     Array (default: [])
         */
        #__chips = [];

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<div data-view-name="IdleBodyView" part="idle">
    <%
        let message = data?.config?.copy?.idle?.message ?? 'Start typing to begin your search...';
        message = message.trim();
    %>
    <div class="chips">
        <div class="label"><%- (data?.config?.copy?.idle?.chips) %></div>
        <div class="list clearfix"></div>
    </div>
    <div class="content" part="idle-content">
        <div class="graphic" part="idle-content-graphic"></div>
        <div class="message" part="idle-content-message"><%- (message) %></div>
    </div>
</div>`;

        /**
         * #__mountChip
         * 
         * @note    Ordered
         * @access  private
         * @param   Object chip
         * @return  Boolean
         */
        #__mountChip(chip) {
            let view = new window.annexSearch.ChipView(this._$annexSearchWidget),
                $container = this.first('.chips .list');
            view.set('chip', chip);
            this.#__chips.push(view);
            view.mount($container);
            return true;
        }

        /**
         * #__mountChips
         * 
         * @access  protected
         * @return  Boolean
         */
        #__mountChips() {
            let chips = this.getHelper('config').get('chips.idle') || [];
            if (chips.length === 0) {
                this.first('.chips').remove();
                return false;
            }
            for (var chip of chips) {
                this.#__mountChip(chip);
            }
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
            this.#__mountChips();
            return true;
        }
    }
});
