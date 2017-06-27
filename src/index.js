import * as React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

export default class TextEllipsis extends React.Component {
  constructor(props) {
    super(props);

    this.isSupportNativeClamp = this.props.useJsOnly ? false : 'webkitLineClamp' in document.body.style;
    this.truncate = this.truncate.bind(this);
    this.throttleProcess = debounce(this.process, this.props.debounceTimeoutOnResize);
  }

  componentDidMount() {
    this.text = this.container.innerHTML;

    this.process();

    window.addEventListener('resize', this.throttleProcess, false);
  }

  componentDidUpdate() {
    this.process();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleProcess, false);
  }

  getTextWithEllipsis(start, end) {
    this.currentText = this.text.slice(start, end);
    return this.currentText + this.props.ellipsisChars;
  }

  getLineHeight() {
    const lineHeight = this.computedStyle("line-height");

    if (lineHeight === 'normal') {
      // Normal line heights vary from browser to browser. The spec recommends
      // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
      return Math.ceil(parseFloat(this.computedStyle('font-size')) * 1.2);
    }
    return Math.ceil(parseFloat(lineHeight));
  }

  populateIsTuncated() {
    if (this.props.isTruncated && (elem.scrollWidth > elem.clientWidth || elem.scrollHeight > elem.clientHeight)) {
      this.props.isTruncated();
    }
  }

  truncate() {
    if (this.container.offsetHeight > this.lineHeight * this.props.lines) {
      this.container.innerHTML = this.getTextWithEllipsis(0, this.end - 1);
      this.props.isTruncated && this.props.isTruncated();
    } else if (this.end >= this.textLength) {
      this.container.innerHTML = this.currentText;
    } else {
      this.container.innerHTML = this.getTextWithEllipsis(this.start, ++this.end);
      this.truncate();
    }
  }

  process() {
    if (this.isSupportNativeClamp) {
      const sty = this.container.style;
      sty.overflow = 'hidden';
      sty.textOverflow = 'ellipsis';
      sty.webkitBoxOrient = 'vertical';
      sty.display = '-webkit-box';
      sty.webkitLineClamp = this.props.lines;

      this.container.innerHTML = this.text;
      this.populateIsTuncated();
    } else {
      this.textLength = this.text.length;
      this.currentText = '';
      this.start = 0;
      this.end = this.text.length > 0 ? 1 : 0;
      this.lineHeight = this.getLineHeight();
      this.container.innerHTML = '';

      this.truncate();
    }
  }

  computedStyle(name) {
    return document.defaultView.getComputedStyle(this.container, null).getPropertyValue(name);
  }

  render() {
    return (
      React.createElement(this.props.tag, {
          ref: (node) => {
            this.container = node;
          },
          className: this.props.tagClass ? this.props.tagClass : '',
          style: { 'width': '100%', 'word-wrap': 'break-word' },
        },
        this.props.children,
      )
    );
  }
}

TextEllipsis.propTypes = {
  lines: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  tag: PropTypes.string,
  ellipsisChars: PropTypes.string,
  tagClass: PropTypes.string,
  debounceTimeoutOnResize: PropTypes.number,
  useJsOnly: PropTypes.bool,
  isTruncated: PropTypes.func,
};

TextEllipsis.defaultProps = {
  tag: 'div',
  ellipsisChars: '...',
  tagClass: '',
  debounceTimeoutOnResize: 200,
  useJsOnly: false,
  isTruncated: null,
};
