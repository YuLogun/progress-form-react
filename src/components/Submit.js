import React from 'react';
import classSet from '../utils/classSet';

class SubmitElement extends React.Component {
  render() {
    let done = this.props.percent >= 100;
    let classes = classSet({
      'form--submit': true,
      'form--submit-disabled': !done
    });
    let label = done ? 'Submit Now!' : 'You Cannot Yet!';
    return(
      <div className="form--group">
        <button type="submit" className={classes}>{label}</button>
      </div>
    )
  }
}

export default SubmitElement;
