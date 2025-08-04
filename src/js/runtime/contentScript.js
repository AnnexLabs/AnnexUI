window.typesenseInstantSearch.DependencyLoader.load(function() {
    window.typesenseInstantSearch.ConfigUtils.setup().then(function() {
        let $annexSearchWidget = document.createElement('annex-search-widget'),
            $parent = window?.typesenseInstantSearchConfig?.$parent || (document.body || document.head || document.documentElement);
        $parent && $parent.appendChild($annexSearchWidget);
        if ($parent === undefined) {
            console.log && console.log('Could not find valid $parent element');
            return false;
        }
        window.typesenseInstantSearch.ElementUtils.registerComponent('annex-search-widget', window.typesenseInstantSearch.AnnexSearchWidgetWebComponent);
        return true;
    });
});
