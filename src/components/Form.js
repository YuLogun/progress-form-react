import React from 'react';
import InputElement from './Input';
import SubmitElement from './Submit';

class FormElement extends React.Component {
  constructor(props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit (e) {
    e.preventDefault();
    this.props.onSubmitFormHandler(); // можетб тут можно просто пропс
  }  
  render() {
    let props = this.props;
    let inputNodes = props.inputs.map((item, index) => {
      return <InputElement key={index} index={index} item={item} onChangeInputHandler={props.onChangeInputHandler} />;});
    return (
      <form className="form clearfix" onSubmit={this._onSubmit}>
        {inputNodes}
        <SubmitElement percent={this.props.percent}/>
      </form>
    );  
  }
}

export default FormElement;
