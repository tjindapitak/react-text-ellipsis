/* eslint react/forbid-prop-types: "off" */
import { PureComponent, createElement } from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

class TextEllipsis extends PureComponent {
  constructor(props) {
    super(props);

    this.isSupportNativeClamp = this.props.useJsOnly ? false : 'webkitLineClamp' in document.body.style;
    this.truncate = this.truncate.bind(this);
    this.process = this.process.bind(this);
    this.debounceProcess = debounce(this.process, this.props.debounceTimeoutOnResize);

    this.text = '';
    this.lineHeight = 0;

    this.splitOnChars = ['.', '-', '–', '—', ' '];
    this.splitChar = this.splitOnChars[0];
    this.chunks = null;
    this.lastChunk = null;
  }

  componentDidMount() {
    this.text = this.container.innerHTML;
    this.process();

    window.addEventListener('resize', this.debounceProcess, false);
  }

  componentDidUpdate() {
    this.text = this.container.innerHTML;
    this.process();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceProcess, false);
  }

  onResult() {
    if (this.container.scrollWidth > this.container.clientWidth || this.container.scrollHeight > this.container.clientHeight) {
      this.props.onResult(TextEllipsis.RESULT.TRUNCATED);
    } else {
      this.props.onResult(TextEllipsis.RESULT.NOT_TRUNCATED);
    }
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

  /**
   * @see https://github.com/josephschmitt/Clamp.js/blob/master/clamp.js#L135
   */
  truncate() {
    // Grab the next chunks.
    if (!this.chunks) {
      // If there are more characters to try, grab the next one.
      if (this.splitOnChars.length > 0) {
        this.splitChar = this.splitOnChars.shift();
      } else {
        // No characters to chunk by. Go character-by-character.
        this.splitChar = '';
      }

      this.chunks = this.container.innerHTML.split(this.splitChar);
    }

    // If there are chunks left to remove, remove the last one and see if
    // the nodeValue fits.
    if (this.chunks.length > 1) {
      this.lastChunk = this.chunks.pop();
      this.container.innerHTML = this.chunks.join(this.splitChar) + this.props.ellipsisChars;
    } else {
      // No more chunks can be removed using this character.
      this.chunks = null;
    }
    // Search produced valid chunks
    if (this.chunks) {
      // It fits
      if (this.container.offsetHeight <= this.lineHeight * this.props.lines) {
        // There's still more characters to try splitting on, not quite done yet
        if (this.splitOnChars.length >= 0 && this.splitChar !== '') {
          this.container.innerHTML = this.chunks.join(this.splitChar) + this.splitChar + this.lastChunk;
          this.chunks = null;
        } else {
          // We have split by letter already.
        return;
        }
      }
    } else if (this.splitChar === '') {
      // No valid chunks even when splitting by letter, just return original value.
      return;
    }

    this.truncate();
  }

  process() {
    if (this.isSupportNativeClamp) {
      const sty = this.container.style;
      sty.overflow = 'hidden';
      sty.textOverflow = 'ellipsis';
      sty.webkitBoxOrient = 'vertical';
      sty.display = '-webkit-box';
      sty.webkitLineClamp = this.props.lines;
      this.onResult();
    } else {
      this.lineHeight = this.getLineHeight();

      if (this.container.offsetHeight < this.lineHeight * this.props.lines) {
        this.onResult();
      } else {
        this.truncate();
      }
    }
  }

  computedStyle(name) {
    return document.defaultView.getComputedStyle(this.container, null).getPropertyValue(name);
  }

  render() {
    return (
      createElement(this.props.tag, {
          ref: (node) => {
            this.container = node;
          },
          className: this.props.tagClass,
          style: Object.assign({
            width: '100%',
            wordWrap: 'break-word',
          }, this.props.style),
        },
        this.props.children,
      )
    );
  }
}

TextEllipsis.RESULT = {
  TRUNCATED: "TRUNCATED",
  NOT_TRUNCATED: "NOT_TRUNCATED",
};

TextEllipsis.propTypes = {
  lines: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  tag: PropTypes.string,
  ellipsisChars: PropTypes.string,
  tagClass: PropTypes.string,
  debounceTimeoutOnResize: PropTypes.number,
  useJsOnly: PropTypes.bool,
  onResult: PropTypes.func,
  style: PropTypes.object,
};

TextEllipsis.defaultProps = {
  tag: 'div',
  ellipsisChars: '...',
  tagClass: '',
  debounceTimeoutOnResize: 200,
  useJsOnly: false,
  style: {},
  onResult: () => {},
};

export default TextEllipsis;