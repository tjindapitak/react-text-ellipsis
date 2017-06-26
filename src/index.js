import * as React from 'react';
import {debounce} from 'lodash';
import PropTypes from 'prop-types';

/**
 * Require TextEllipsis to wrap text (not any component!),
 * and parent element must have width, height, overflow: hidden well set!
 * 
 * span is not working (div, p works)
 * 
 * Example usage: 
 * <label>
 *   <TextEllipsis lines={2} tag={'p'} ellipsisChars={'...'}>
 *      Hello world
 *   </TextEllipsis>
 * </label>
 */

export class TextEllipsis extends React.Component {        
    constructor(props) {
        super(props);

        this.truncate = this.truncate.bind(this);
        this.throttleProcess = debounce(this.process, 200);
    }

    componentDidMount() {
        this.text = this.container.innerHTML;

        this.process();

        window.addEventListener('resize', this.throttleProcess, false);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.throttleProcess, false);
    }

    componentDidUpdate (){
        this.process();
    }

    process(){
        if(this.supportsNativeClamp()){
            let sty = this.container.style;
            sty.overflow = 'hidden';
            sty.textOverflow = 'ellipsis';
            sty.webkitBoxOrient = 'vertical';
            sty.display = '-webkit-box';
            sty.webkitLineClamp = this.props.lines;

            this.container.innerHTML = this.text;

            return;
        }else{
            this.textLength = this.text.length;
            this.currentText = '';
            this.start = 0;
            this.end = this.text.length > 0 ? 1 : 0;
            this.lineHeight = this.getLineHeight();
            this.container.innerHTML = '';

            this.truncate();
        }
    }
    
    truncate() {
        if(this.container.offsetHeight > this.lineHeight * this.props.lines){
            this.container.innerHTML = this.getTextWithEllipsis(0, this.end - 1);
        }else if(this.end >= this.textLength){
            this.container.innerHTML = this.currentText;
        }else{
            this.container.innerHTML = this.getTextWithEllipsis(this.start, ++this.end);
            this.truncate();
        }
    };

    getTextWithEllipsis (start, end) {
        this.currentText = this.text.slice(start, end);
        return  this.currentText + this.ellipsis;
    }

    supportsNativeClamp () {
        return 'webkitLineClamp' in document.body.style 
    };

    getLineHeight() {        
        let lineHeight = this.computedStyle("line-height");
        
        if(lineHeight == 'normal'){
            // Normal line heights vary from browser to browser. The spec recommends
            // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
            return parseInt(this.computedStyle('font-size')) * 1.2;
        }
        return parseInt(lineHeight);
    };

    computedStyle(name) {
        return document.defaultView.getComputedStyle(this.container, null).getPropertyValue(name);
    };

    render() {
        return (
            React.createElement(this.tag, {
                    ref: (node) => {
                        this.container = node;
                    },
                    className: this.props.tagClass ? this.props.tagClass : '',
                    style: {width: '100%', 'word-wrap': 'break-word'},
                },
                this.props.children,
            )
        );
    }
}

TextEllipsis.propTypes = {
    lines: PropTypes.number.isRequired,
    tag: PropTypes.string,
    ellipsisChars: PropTypes.string,
    tagClass: PropTypes.string
}

TextEllipsis.defaultProps = {
  tag: 'div',
  ellipsisChars: '...'
};