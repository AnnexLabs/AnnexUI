
/**
 * /src/js/runtime/contentScript.js
 * 
 */
window.annexSearch.DependencyLoader.load(function() {
    window.annexSearch.ConfigUtils.setup().then(function() {
        let $annexSearchWidget = document.createElement('annex-search-widget'),
            $parent = window?.annexSearchConfig?.$parentContainer || (document.body || document.head || document.documentElement);
        $parent && $parent.appendChild($annexSearchWidget);
        if ($parent === undefined) {
            console.log && console.log('Could not find valid $parent element');
            return false;
        }
        window.annexSearch.ElementUtils.registerComponent('annex-search-widget', window.annexSearch.AnnexSearchWidgetWebComponent);
        return true;
    });
});
