
# React multi-line ellipsis
[![Build Status](https://travis-ci.org/tjindapitak/react-text-ellipsis.svg?branch=master)](https://travis-ci.org/tjindapitak/react-text-ellipsis)

# Install
```bash
npm install react-text-ellipsis
```

# Usage
Require TextEllipsis to wrap text (not any component!) and parent element must have width, height, overflow: hidden well set!, span tag is not working (div, p works)

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
        isTruncated={() => { console.log('text got truncated'); }}>
        Hello world
    </TextEllipsis>
</label>
 