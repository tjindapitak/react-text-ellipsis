
# React multi-line ellipsis
=======
# react-text-ellipsis
React multiline ellipsis

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
    <TextEllipsis lines={2} tag={'p'} ellipsisChars={'...'} tagClass={'className'} debounceTimeoutOnResize={200} useJsOnly={true}>
        Hello world
    </TextEllipsis>
</label>
 