import React from 'react';
import ReactDOM from'react-dom';
import classSet from '../utils/classSet';

class ProgressElement extends React.Component {
  componentDidUpdate() {
    let percent = parseInt(this.props.percent);
    let deg = 360*percent/100 ;
    let element = ReactDOM.findDOMNode(this.refs.progress);
    element.style.transform = 'rotate(-'+ deg +'deg)';
  }
  render() {
    let percent = Math.floor(this.props.percent);
    console.log(percent)
    let classes = classSet({
      "progress-pie-chart": true,
      "gt-50": percent > 50
    });
    return(
      <div className="progress clearfix">
        <div className={classes}>
          <div className="ppc-progress">
            <div className="ppc-progress-fill" ref="progress"></div>
          </div>
          <div className="ppc-percents">
            <div className="pcc-percents-wrapper">
              <span>{percent + '%'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressElement;
