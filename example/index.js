import React from 'react';
import ReactDOM from 'react-dom';
import TextEllipsis from '../dist/bundle';

class Demo extends React.Component{
    constructor(props){
        super(props);     

        this.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    }

    render() {
        return (
            <div>
                <h1>Example: <pre>react-text-ellipsis</pre></h1>
                <hr />
                <h3>1 line clamping</h3>
                <div style={{width: '500px', height: '20px', 'border': '1px dashed', 'backgroundColor':'#f1f1f1'}}>
                    <TextEllipsis lines={1}>{this.text}</TextEllipsis>
                </div>
                <hr />
                <h3>1 line clamping (useJsOnly)</h3>
                <div style={{width: '500px', height: '20px', 'border': '1px dashed', 'backgroundColor':'#f1f1f1'}}>
                    <TextEllipsis lines={1} useJsOnly={true}>{this.text}</TextEllipsis>
                </div>
                <hr />
                <h3>2 lines clamping</h3>
                <div style={{width: '200px', height: '40px', 'border': '1px dashed', 'backgroundColor':'#f1f1f1'}}>
                    <TextEllipsis lines={2}>{this.text}</TextEllipsis>
                </div>
                <hr />
                <h3>2 lines clamping (useJsOnly)</h3>
                <div style={{width: '200px', height: '40px', 'border': '1px dashed', 'backgroundColor':'#f1f1f1'}}>
                    <TextEllipsis lines={2} useJsOnly={true}>{this.text}</TextEllipsis>
                </div>
                <hr />
                <h3>1 lines clamping (custom ellipsisChars)</h3>
                <div style={{width: '200px', height: '40px', 'border': '1px dashed', 'backgroundColor':'#f1f1f1'}}>
                    <TextEllipsis lines={2} useJsOnly={true} ellipsisChars={'->'}>{this.text}</TextEllipsis>
                </div>
            </div>
        );
    }
};

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
