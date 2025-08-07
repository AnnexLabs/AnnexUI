# Typesense-InstantSearch


### Variables
- `{{response.found}}`
- `{{response.out_of}}`
- `{{response.page}}`
- `{{response.search_time_ms}}`

### Config
- $parent
- callbacks
- cluster
- copy
- keyboardShortcut
- logging
- mode
- overlay
- paths
- searchRequestMethod
- templates

### Setup
``` javascript
let $annexSearchWidget = new window.annexSearch.AnnexSearchWidgetWebComponent();
$annexSearchWidget.mount();
```

### Config
``` javascript
$('annex-search-widget').setConfig('$parentContainer', document.body);
$('annex-search-widget').setConfig('debug', true);
$('annex-search-widget').setConfig('searchOptions.snippet_threshold', 20);
$('annex-search-widget').setConfig('searchOptions', {
    snippet_threshold: 20
});
```

### Events (config and event listeners)
`callbacks.result.click`  
`callbacks.result.focus`  
`callbacks.results.empty`  
`callbacks.results.error`  
`callbacks.results.idle`  
`callbacks.results.loaded`  
`callbacks.root.hide`  
`callbacks.root.show`  
`callbacks.root.toggle`  

``` javascript
$('annex-search-widget').addEventListener('root.show', function(event) {
    console.log(event, event.detail);// Describe event.detail array entries
});
```
