# AnnexUI
AnnexUI is a MIT licensed UI library for [Typesense](https://typesense.org/).
It's designed to be a clean, UX focused library that gets developers up and
running in a few minutes. Just include a link to the JS, set your Typesense
cluster settings, and then press `⌘k` to see Annex up and running.

It's currently in early-development.


<hr />

### Quick links
1. Quick demos
2. Quick preview
3. Quick intro
3. Quick start
4. Config
5. Debugging
6. `$annexSearchWidget` interactions
7. Config overriding
8. Events


<hr />

### Quick demos
1. Inline: <a href="https://local.annexsearch.com/demos/inline" target="_blank">https://local.annexsearch.com/demos/inline</a>
2. Modal: <a href="https://local.annexsearch.com/demos/modal" target="_blank">https://local.annexsearch.com/demos/modal</a>
3. Panel (left): <a href="https://local.annexsearch.com/demos/panel-left" target="_blank">https://local.annexsearch.com/demos/panel-left</a>
4. Panel (right): <a href="https://local.annexsearch.com/demos/panel-right" target="_blank">https://local.annexsearch.com/demos/panel-right</a>


<hr />

### Quick preview
![](https://416.io/ss/f/x43xuv/r)


<hr />

### Quick intro
Annex uses [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
to encapsulate and restrict JavaScript and CSS scope. The fundamental concepts
to understand are:

- The UI will be encapsulated within a `<annex-search-widget>` HTML tag
  - In docs, this will often be referenced as the `$annexSearchWidget` variable
- Public methods to modify any "instance" will be through that custom
`HTMLElement`

💪 Out the box, Annex supports the following:
- Four (4) different layouts (`'inline'`, `'modal'`, `'panel-left'` and `'panel-right'`)
- Dark mode
- Responsive layouts
- Event handling

🎨 Style considerations:
- There are currently 65+ CSS variables that can be overriden
- These control layouts, dimensions, colors, fonts and more

🔒 Privacy and data considerations:
- No data is stored in cookies or localStorage
- Queries are only sent to your Typesense cluster; no middleware is present
- Images are base64-encoded and not requested remotely
- The remote CDN used is [UNPKG](https://unpkg.com/)

⚡️ Performance considerations:
- Annex currently employs a "Last in, first out" approach to queries
  - This means that if users type quickly, previous searches will be aborted to lower server and bandwidth burden
- Analytics can be facilitate through Events


<hr />

### Quick start
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


<hr />

### Config
Below you'll find a high-level breakdown of configuration options that can be
customized. See [Config overriding](#config-overriding) for details on how to do
so.

| Key                       | Type                  | Required   | Default value            | Description                                                                                               |
| --------------------------| ----------------------| -----------| -------------------------| ----------------------------------------------------------------------------------------------------------|
| $container                | `HTMLElement`         | ❌         | `null`                    | The `HTMLElement` that the `$annexSearchWidget` element should be appended to.                            |
| callbacks                 | `Object`              | ❌         | (see ...)                 | Map of callback functions that will be triggered upon certain events.                                     |
| cluster                   | `Object`              | ✅         | (n/a)                     | Map of Typesense related cluster auth properties.                                                         |
| cluster.apiKey            | `String`              | ✅         | `null`                    | Typesense cluster search API key.                                                                         |
| cluster.collectionName    | `String`              | ✅         | `null`                    | Typesense cluster collection name.                                                                        |
| cluster.hostname          | `String`              | ✅         | `null`                    | Typesense cluster hostname.                                                                               |
| cluster.presetName        | `null` \|\| `String`  | ❌         | `null`                    | Typesense cluster search preset name.                                                                     |
| copy                      | `Object`              | ❌         | (see ...)                 | Map of copy used in different `templates`.                                                                |
| debug                     | `Boolean`             | ❌         | `false`                   | Whether debugging information should be logged to console.                                                |
| keyboardShortcut          | `null` \|\| `String`  | ❌         | `'⌘k'`                    | The keyboard shortcut that should be used to toggle Annex (does not apply to `inline` instances).         |
| highlightTagName          | `String`              | ❌         | `'MARK'`                  | The `HTMLElement` that should be rendered around query matches.                                           |
| layout                    | `String`              | ❌         | `'modal'`                 | The layout for Annex. Can be: `inline`, `modal`, `panel-left` or `panel-right`.                           |
| name                      | `String`              | ❌         | `null`                    | The name of the instance. Useful for differentiating between multiple `$annexSearchWidget` instances.     |
| paths                     | `Object`              | ❌         | (see ...)                 | Map of `css` and `template` URLs that are loaded for an `$annexSearchWidget`.                             |
| schema                    | `String`              | ❌         | `'webResource-v0.1.0'`    | Name of the schema associated with the Typesense cluster.                                                 |
| searchOptions             | `Object`              | ✅         | (see ...)                 | Map of search options that are passed in a Typesense search query.                                        |
| searchRequestMethod       | `String`              | ❌         | `'lifo'`                  | The type of search handling. Currently limited to just `lifo` (last in first out)                         |
| showOverlay               | `Boolean`             | ❌         | `true`                    | Whether the overlay `HTMLElement` should be rendered.                                                     |
| templates                 | `Object`              | ❌         | (see ...)                 | Map of templates that should be used in Annex rendering.                                                  |


<hr />

### Debugging
Annex tries to communicate installation and instantiation errors clealy through
DevTools console. During integration, ensure you have your console open to view
tips on how to get your integration working properly.


<hr />

### `$annexSearchWidget` interactions
Below is a list of supported actions which can be bound to elements on a page.
When found, Annex will process them.

**Notes**:
1. Interactions will not work if there is more than one `$annexSearchWidget` instance instantiated on a page.
2. Not all layouts support all interactions. For example, an `inline` `$annexSearchWidget` cannot be "shown" or "hidden"

Note #2: 

| Interaction name      | Example                                       | Layout Support            | Description                                                                   |
| ----------------------|-----------------------------------------------|---------------------------|-------------------------------------------------------------------------------|
| clear                 | `<a data-annex-search="clear">test</a>`       | All                       | Clears the search query input value from the `$annexSearchWidget`.            |
| focus                 | `<a data-annex-search="focus">test</a>`       | All                       | Focuses on `$annexSearchWidget` if it's currently showing.                    |
| hide                  | `<a data-annex-search="hide">test</a>`        | All except `'inline'`     | Hides the `$annexSearchWidget` if it's not currently hidden.                   |
| show                  | `<a data-annex-search="show">test</a>`        | All except `'inline'`     | Shows the `$annexSearchWidget` if it's currently hidden.                      |
| toggle                | `<a data-annex-search="toggle">test</a>`      | All except `'inline'`     | Shows or hides the `$annexSearchWidget` depending on it's current state.      |


``` html
<a href="#test" data-annex-search="clear">clear the $annexSearchWidget $input</a>
<a href="#test" data-annex-search="focus">focus on the $annexSearchWidget</a>
<a href="#test" data-annex-search="hide">hide the $annexSearchWidget</a>
<a href="#test" data-annex-search="show">show the $annexSearchWidget</a>
<a href="#test" data-annex-search="toggle">toggle the $annexSearchWidget</a>
<a href="#test" data-annex-search-query="search query">show the $annexSearchWidget, insert query and search</a>
````


<hr />

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


<hr />

### Events
Events can be processed either through the config options passed in during
instantiation, or via native event listeners (e.g.
`$annexSearchWidget.addEventListener('result.click', handler)`). Below you'll
find a list of supported events.

When events are processed through native event listeners, arguments are
accessible via the `event.detail` property.

| Event Name            | Description                                                                                                               |
| ----------------------| --------------------------------------------------------------------------------------------------------------------------|
| `result.click`        | Dispatched when a result is clicked.                                                                                      |
| `result.focus`        | Dispatched when a result is focused.                                                                                      |
| `results.empty`       | Dispatched when a search results in an empy state (no results found).                                                     |
| `results.error`       | Dispatched when a search results in an error.                                                                             |
| `results.idle`        | Dispatched when the idle state for results is shown (e.g. the user deletes a previously searched query from the input).   |
| `results.loaded`      | Dispatched when a search results in an results being shown.                                                               |
| `root.hide`           | Dispatched when the `$annexSearchWidget` is hidden.                                                                       |
| `root.show`           | Dispatched when the `$annexSearchWidget` is shown.                                                                        |
| `root.toggle`         | Dispatched when the `$annexSearchWidget` is toggled.                                                                      |


<hr />


### Methods
Below you'll find methods that can be called against an `$annexSearchWidget`
reference. While you'll find other public events available when inspecting the
element, only the ones below are currently supported.

| Method name       | Return value      | Description                                                                                                       |
| ------------------| ------------------|-------------------------------------------------------------------------------------------------------------------| 
| `focus`           | `Boolean`         | Focuses on the `$annexSearchWidget` search query input.                                                           |
| `getConfig`       | `Boolean`         | Returns an object representing the config options for the `$annexSearchWidget`.                                   |
| `hide`            | `Boolean`         | Hides the `$annexSearchWidget` if it's currently showing.                                                         |
| `mount`           | `Boolean`         | Mounts the `$annexSearchWidget` to the `$container` config option.                                                |
| `query`           | `Boolean`         | Shows the `$annexSearchWidget` if it's currently hidden, and performs a query (based on the passed in value).     |
| `ready`           | `Promise`         | Returns a promise when the `$annexSearchWidget` is ready for interaction.                                         |
| `setConfig`       | `Boolean`         | Sets `$annexSearchWidget` config options.                                                                         |
| `show`            | `Boolean`         | Shows the `$annexSearchWidget` if it's currently hidden.                                                          |
| `showing`         | `Boolean`         | Returns whether or not the `$annexSearchWidget` is currently showing.                                             |
| `toggle`          | `Boolean`         | Shows or hides the `$annexSearchWidget` depending on it's currently state.                                        |


<hr />

### Supported callback handling
``` javascript
function(...args) {
    console.log(arguments);
}
```


<hr />

### Supported `$annexSearchWidget` event handling
``` javascript
$('annex-search-widget').addEventListener('root.show', function(customEvent) {
    console.log(customEvent);
    console.log(customEvent.detail);
});
```


<hr />

### Template variables
- `{{response.found}}`
- `{{response.out_of}}`
- `{{response.page}}`
- `{{response.search_time_ms}}`


<hr />

### Common problems / gotchas
Below are a list of possible issues developers may run into, along with possible
causes.

- You've defined your cluster settings correctly, but your searches are failing
  - Ensure your `cluster.apiKey` is associated with an `apiKey` that has permission to perform queries
