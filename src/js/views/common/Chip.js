
/**
 * /src/js/views/common/Chip.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseView'], function() {

    /**
     * window.annexSearch.ChipView
     * 
     * @access  public
     * @extends window.annexSearch.BaseView
     */
    window.annexSearch.ChipView = window.annexSearch.ChipView || class ChipView extends window.annexSearch.BaseView {

        /**
         * _markup
         * 
         * @access  protected
         * @static
         * @var     String
         */
        _markup = `
<a data-view-name="ChipView" href="#" part="chip">
    <span class="copy" part-chip-copy"><%= (data.chip.copy) %></span>
</a>`;

        /**
         * constructor
         * 
         * @access  public
         * @param   window.annexSearch.AnnexSearchWidgetWebComponent $annexSearchWidget
         * @param   Object options
         * @return  void
         */
        constructor($annexSearchWidget, options) {
            super($annexSearchWidget);
        }

        /**
         * #__addClickEventListener
         * 
         * @access  private
         * @return  Boolean
         */
        #__addClickEventListener() {
            let handler = this.#__handleClickEvent.bind(this);
            this.click(handler);
            return true;
        }

        /**
         * #__addEvents
         * 
         * @access  private
         * @return  Boolean
         */
        #__addEvents() {
            this.#__addClickEventListener();
            return true;
        }

        /**
         * #__handleClickEvent
         * 
         * @access  private
         * @param   Object event
         * @return  Boolean
         */
        #__handleClickEvent(event) {
            event.preventDefault();
            let chip = this.get('chip'),
                query = chip.query,
                $annexSearchWidget = this.getWebComponent();
            $annexSearchWidget.query(query);
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
// console.log(this.get('chip'));
            return true;
        }
    }
});
