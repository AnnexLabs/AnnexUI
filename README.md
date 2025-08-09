# AnnexUI
AnnexUI is a MIT licensed UI library for [Typesense](https://typesense.org/).
It's designed to be a clean, UX focused library that gets developers up and
running in a few minutes. Just include a link the JS, set your Typesense cluster
settings, and then press `⌘k` to see Annex up and running against your Typesense
cluster.

It's currently in early-development.

### Quick preview
![](https://416.io/ss/f/x43xuv/r)


### Quick Intro (for devs)
Annex uses [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
to encapsulate and restrict JavaScript and CSS scope. The fundamental concepts
to understand are:

- The UI will be encapsulated within a `<annex-search-widget>` HTML tag
- Public methods to modify any "instance" will be through that custom HTMLElement


### Quickstart
Below you'll find a few lines to get up and running quickly. Just swap out your
Typesense cluster settings.

``` html
<script type="text/javascript" src="https://local.annexsearch.com/ts/js"></script>
<script type="text/javascript">
    (function() {
        let $annexSearchWidget = document.createElement('annex-search-widget');
        $annexSearchWidget.setConfig({
            cluster: {
                apiKey: '606o4DjqwBhFNZ2NKgSiqFsqdMNCbcKx',
                collectionName: 'prod:::tpclwpqz62hq:::crawlerResourceSearch:::v0.1.0',
                hostname: 'b3487cx0hrdu1y6kp-1.a1.typesense.net',
            },
            searchOptions: {
                highlight_full_fields: 'title,body',
                highlight_affix_num_tokens: '10',
                query_by: 'title,body',
                snippet_threshold: '20',
            }
        });
        $annexSearchWidget.mount();
        $annexSearchWidget.ready().then(function($annexSearchWidget) {
            // $annexSearchWidget.show();
        });
    })();
</script>
```


### Config
Below you'll find a high-level breakdown of configuration options that can be
customized. See [#config-overriding] for details on how to do so.s

| Key                       | Type              | Required   | Default value        | Description                                                                                           |
| --------------------------| ------------------| ---------- | -------------------- | ----------------------------------------------------------------------------------------------------- |
| $container                | HTMLElement       | ❌         | `null`                | The HTMLElement that the $annexSearchWidget element should be appended to.                            |
| callbacks                 | Object            | ❌         | (see ...)             | Map of callback functions that will be triggered upon certain events.                                 |
| cluster                   | Object            | ✅         | (see ...)             | Map of Typesense related cluster auth properties.                                                     |
| cluster.apiKey            | String            | ✅         | null                  | Typesense cluster search API key.                                                                     |
| cluster.collectionName    | String            | ✅         | null                  | Typesense cluster collection name.                                                                    |
| cluster.hostname          | String            | ✅         | null                  | Typesense cluster hostname.                                                                           |
| cluster.presetName        | null \|\| String  | ❌         | null                  | Typesense cluster search preset name.                                                                 |
| copy                      | Object            | ❌         | (see ...)             | Map of copy used in different `templates`.                                                            |
| debug                     | Boolean           | ❌         | `false`               | Whether debugging information should be logged to console.                                            |
| keyboardShortcut          | null \|\| String  | ❌         | `⌘k`                  | The keyboard shortcut that should be used to toggle Annex (does not apply to `inline` instances).     |
| highlightTagName          | String            | ❌         | `MARK`                | The HTMLElement that should be rendered around query matches.                                         |
| layout                    | String            | ❌         | `modal`               | The layout for Annex. Can be: `inline`, `modal`, `panel-left` or `panel-right`.                       |
| name                      | String            | ❌         | `null`                | The name of the instance. Useful for differentiating between multiple $annexSearchWidget instances.   |
| paths                     | Object            | ❌         | (see ...)             | Map of `css` and `template` URLs that are loaded for an $annexSearchWidget.                           |
| schema                    | String            | ❌         | `webResource-v0.1.0`  | Name of the schema associated with the Typesense cluster.                                             |
| searchOptions             | Object            | ✅         | (see ...)             | Map of search options that are passed in a Typesense search query.                                    |
| searchRequestMethod       | String            | ❌         | `lifo`                | The type of search handling. Currently limited to just `lifo` (last in first out)                     |
| showOverlay               | Boolean           | ❌         | `true`                | Whether the overlay HTMLElement should be rendered.                                                   |
| templates                 | Object            | ❌         | (see ...)             | Map of templates that should be used in Annex rendering.                                              |



### HTMLElement Interactions
Below are examples of elements that trigger various actions when the loaded page
has a single $annexSearchWidget running on the page.

``` html
<a href="#test" data-annex-search="open">open $annexSearchWidget</a>
<a href="#test" data-annex-search="close">close $annexSearchWidget</a>
<a href="#test" data-annex-search="toggle">toggle $annexSearchWidget</a>
<a href="#test" data-annex-search="clear">clear $annexSearchWidget $input</a>
<a href="#test" data-annex-search-query="search query">open $annexSearchWidget, insert query and search</a>
````


### Config overriding
Below are examples of code that can be executed against a `$annexSearchWidget`
which overrides and/or defines config values.

``` javascript
$('annex-search-widget').setConfig('$container', document.body);
$('annex-search-widget').setConfig('searchOptions.snippet_threshold', 20);
$('annex-search-widget').setConfig('searchOptions', {
    snippet_threshold: 20
});
```


### Supported callbacks
`result.click`  
`result.focus`  
`results.empty`  
`results.error`  
`results.idle`  
`results.loaded`  
`root.hide`  
`root.show`  
`root.toggle`


### Supported callback handling
``` javascript
function(...args) {
    console.log(arguments);
}
```


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



### Supported $annexSearchWidget event handling
``` javascript
$('annex-search-widget').addEventListener('root.show', function(customEvent) {
    console.log(customEvent);
    console.log(customEvent.detail);
});
```


### Template variables
- `{{response.found}}`
- `{{response.out_of}}`
- `{{response.page}}`
- `{{response.search_time_ms}}`
