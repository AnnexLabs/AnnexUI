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


### Quick Setup
``` javascript
let $annexSearchWidget = document.createElement('annex-search-widget');
$annexSearchWidget.setConfig({
    cluster: {
        apiKey: '606o4DjqwBhFNZ2NKgSiqFsqdMNCbcKx',
        collectionName: 'prod:::tpclwpqz62hq:::crawlerResourceSearch:::v0.1.0',
        hostname: 'b3487cx0hrdu1y6kp-1.a1.typesense.net',
        presetName: 'prod:::tcprkee8nnvp:::crawlerResourceSearch:::v0.1.0',
    },
    searchOptions: {
        highlight_full_fields: 'title,body',
        highlight_affix_num_tokens: '10',
        snippet_threshold: '20',
    }
});
$annexSearchWidget.mount();
$annexSearchWidget.ready().then(function($annexSearchWidget) {
    $annexSearchWidget.show();
});
```


### HTML Attributes
``` html
<a href="#test" data-annex-search="open">open $annexSearchWidget</a>
````
``` html
<a href="#test" data-annex-search="close">close $annexSearchWidget</a>
````
``` html
<a href="#test" data-annex-search="toggle">toggle $annexSearchWidget</a>
````
``` html
<a href="#test" data-annex-search="clear">clear $annexSearchWidget $input</a>
````
``` html
<a href="#test" data-annex-search-query="search query">open $annexSearchWidget, insert query and search</a>
````



### Config
``` javascript
$('annex-search-widget').setConfig('$parentContainer', document.body);
$('annex-search-widget').setConfig('debug', true);
$('annex-search-widget').setConfig('searchOptions.snippet_threshold', 20);
$('annex-search-widget').setConfig('searchOptions', {
    snippet_threshold: 20
});
```


### Supported config callbacks
`callbacks.result.click`  
`callbacks.result.focus`  
`callbacks.results.empty`  
`callbacks.results.error`  
`callbacks.results.idle`  
`callbacks.results.loaded`  
`callbacks.root.hide`  
`callbacks.root.show`  
`callbacks.root.toggle`


### Supported $annexSearchWidget events
`result.click`  
`result.focus`  
`results.empty`  
`results.error`  
`results.idle`  
`results.loaded`  
`root.hide`  
`root.show`  
`root.toggle`


### Sample event handling
``` javascript
$('annex-search-widget').addEventListener('root.show', function(customEvent) {
    console.log(customEvent);
    console.log(customEvent.detail);
});
```
