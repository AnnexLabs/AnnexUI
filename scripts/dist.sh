#!/bin/bash

## 
## Init
## 
## @see     https://claude.ai/chat/fdcd3fb0-fa74-4b5f-abcd-4f12147a0df0
## @see     https://claude.ai/chat/4bb6ae71-0ee9-488e-b415-ecf79bb74824
## @see     https://claude.ai/chat/b8618404-247b-4ed5-a0af-c13f3fb27743
## @see     https://www.toptal.com/developers/cssminifier
## @see     https://www.toptal.com/developers/javascript-minifier
## 
## Usage:
## 
##     ./build/dist.sh


## 
## Config
## 
## 
SOURCE_DIR="./src"
UNMINIFIED_CSS_FILEPATH="./dist/bundle.css"
MINIFIED_CSS_FILEPATH="./dist/bundle.min.css"
UNMINIFIED_JS_FILEPATH="./dist/bundle.js"
MINIFIED_JS_FILEPATH="./dist/bundle.min.js"
CSS_FILES=(
    "src/css/variables.css"
    "src/css/animations.css"
    "src/css/icons.css"
    "src/css/common.css"
    "src/css/host.css"
    "src/css/scrollbars.css"
    "src/css/root.css"
    "src/css/body/body.css"
    "src/css/body/error.css"
    "src/css/body/idle.css"
    "src/css/body/results/results.css"
    "src/css/body/results/empty.css"
    "src/css/body/results/found.css"
    "src/css/body/results/result.css"
    "src/css/common/toast.css"
    "src/css/footer/footer.css"
    "src/css/footer/brandingBar.css"
    "src/css/footer/statusBar.css"
    "src/css/header/header.css"
    "src/css/header/field.css"
    "src/css/header/metaBar.css"
    "src/css/layouts/inline.css"
    "src/css/layouts/inline.responsive.css"
    "src/css/layouts/modal.css"
    "src/css/layouts/modal.responsive.css"
    "src/css/layouts/panel.css"
    "src/css/layouts/panel.responsive.css"
)


## 
## Cleanup
## 
## 
rm -f "$UNMINIFIED_CSS_FILEPATH" "$MINIFIED_CSS_FILEPATH"
rm -f "$UNMINIFIED_JS_FILEPATH" "$MINIFIED_JS_FILEPATH"


## 
## Unminified CSS
## 
## 

## Logging
echo "Creating bundle.css (unminified)..."

## Compile CSS
for css_file in "${CSS_FILES[@]}"; do
    if [ -f "$css_file" ]; then
        cat "$css_file" >> "$UNMINIFIED_CSS_FILEPATH"
    fi
done


## 
## Minified CSS
## 
## 

## Logging
echo "Creating bundle.min.css (minified)..."
echo "Minifying CSS via API..."

## Minification
curl -s -X POST https://www.toptal.com/developers/cssminifier/api/raw \
    --data-urlencode "input@$UNMINIFIED_CSS_FILEPATH" \
    -o "$MINIFIED_CSS_FILEPATH"
echo "Done"
echo ""


## 
## Unminified JS
## 
## 

## Logging
echo "Creating bundle.js (unminified)..."

## DependencyLoader.js prepending
DEPENDENCY_LOADER=$(find "$SOURCE_DIR" -name "DependencyLoader.js" -type f | head -1)
if [ -n "$DEPENDENCY_LOADER" ]; then
    cat "$DEPENDENCY_LOADER" >> "$UNMINIFIED_JS_FILEPATH"
fi

## All non-ordered files
find "$SOURCE_DIR" -name "*.js" -type f ! -name "DependencyLoader.js" ! -name "contentScript.js" | sort | while read -r file; do
    cat "$file" >> "$UNMINIFIED_JS_FILEPATH"
done

## contentScript.js appending
CONTENT_SCRIPT=$(find "$SOURCE_DIR" -name "contentScript.js" -type f | head -1)
if [ -n "$CONTENT_SCRIPT" ]; then
    cat "$CONTENT_SCRIPT" >> "$UNMINIFIED_JS_FILEPATH"
fi


## 
## Unminified JS (CSS URL replacement)
## 
## 

## Logging
echo "Applying post-compilation modifications to JS..."

# Extract version from the compiled JS
VERSION=$(grep -o "static #__version = '[^']*'" "$UNMINIFIED_JS_FILEPATH" | sed "s/static #__version = '\([^']*\)'/\1/")
if [ -n "$VERSION" ]; then
    echo "Found version: $VERSION"
    sed -i.bak "s|https://local\.annexsearch\.com/ts/css|https://website.com/$VERSION/bundle.min.css|g" "$UNMINIFIED_JS_FILEPATH"
    rm -f "$UNMINIFIED_JS_FILEPATH.bak"
    echo "Replaced URL with: http://website.com/$VERSION/bundle.min.js"
else
    echo "Warning: Could not find version string in compiled JS"
fi


## 
## Minified JS
## 
## 

## Logging
echo "Creating bundle.min.js (minified)..."
echo "Minifying JS via API..."

## Minification
curl -s -X POST https://www.toptal.com/developers/javascript-minifier/api/raw \
    --data-urlencode "input@$UNMINIFIED_JS_FILEPATH" \
    -o "$MINIFIED_JS_FILEPATH"
echo "Done"
echo ""
