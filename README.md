
# React multi-line ellipsis
[![Build Status](https://travis-ci.org/tjindapitak/react-text-ellipsis.svg?branch=master)](https://travis-ci.org/tjindapitak/react-text-ellipsis)

# Install
```bash
npm install react-text-ellipsis
```

# Usage
Require TextEllipsis to wrap text (not any component!) and parent element must have width, height, overflow: hidden well set!, span tag is not working (div, p works)

## Build react-text-ellipsis:
```bash
npm run build
```

## Build example
```bash
npm run example
```
then see `example/index.html`

## Example usage: 
```js
import TextEllipsis from 'react-text-ellipsis';

<label>
    <TextEllipsis 
        lines={2} 
        tag={'p'} 
        ellipsisChars={'...'} 
        tagClass={'className'} 
        debounceTimeoutOnResize={200} 
        useJsOnly={true} 
        onResult={(result) => { 
            if (result === TextEllipsis.RESULT.TRUNCATED)
                console.log('text get truncated');
            else 
                console.log('text does not get truncated');
            }}>
        Hello world
    </TextEllipsis>
</label>
 