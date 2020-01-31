import React from 'react';
import Validator from 'validatorjs';
import './utils/classSet';
import ProgressElement from './components/Progress';
import FormElement from './components/Form';
import './styles.css';


class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputDatas: [],
      progressPercent: 0
    }
    
    
    this._initialInputVerification = this._initialInputVerification.bind(this);
    this._setAndValidateInput = this._setAndValidateInput.bind(this);
    this._calculatePercent = this._calculatePercent.bind(this);
    
    this._resetInputDatas = this._resetInputDatas.bind(this);
    this._onSubmitFormHandler = this._onSubmitFormHandler.bind(this);
    this._onChangeInputHandler = this._onChangeInputHandler.bind(this);
  }

  _setAndValidateInput (index, value, noMorePristine) {
    let pristine = noMorePristine ? false : true;
    let inputDatas = this.state.inputDatas;
    let item = inputDatas[index];
    let data = {};
    let validation;

    inputDatas[index].value = value;
    inputDatas[index].pristine = pristine;
    inputDatas[index].hasError = false;
    inputDatas[index].errorMessage = '';

    data[item.id] = value || '';

    validation = new Validator( data, item.validation.rules, item.validation.messages );
    if( validation.fails() ) {
      inputDatas[index].hasError = true;
      inputDatas[index].errorMessage  = validation.errors.first( item.id );
    }
    this.setState({ inputDatas: inputDatas });
  }

  _calculatePercent () {
    let total = this.state.inputDatas.length;
    let done = 0;
    let progressPercent;
    this.state.inputDatas.forEach( function( item ) {
      if( item.hasError === false ) {
        done += 1;
      }
    });
    progressPercent = done/total*100;
    this.setState( { progressPercent: progressPercent } );
  }

  _initialInputVerification () {
    let self = this;
    this.state.inputDatas.forEach( function (item, index) {
      self._setAndValidateInput( index, item.value );
    });
    this._calculatePercent();
  }

  _onChangeInputHandler (index, value) {
    this._setAndValidateInput(index, value, true);
    this._calculatePercent();
  }

  _onSubmitFormHandler () {
    if ( this.state.progressPercent >= 100 ) {
      this._resetInputDatas();
      this._calculatePercent();
    }
  } 

    _resetInputDatas () {
      let inputDatas = this.state.inputDatas.map( function ( item ) {
        item.value = '';
        item.pristine = true;
        item.hasError = false;
        return item;
      });
      this.setState( { inputDatas: inputDatas } );
      this._initialInputVerification();
    }

 componentDidMount() {
    let inputDatas1 = this.props.inputDatas;
    this.setState({ inputDatas: inputDatas1 });
    this._initialInputVerification();
  }

  render() {
    return (
      <div>
        <ProgressElement percent={this.state.progressPercent} />
        <FormElement
          inputs={this.state.inputDatas}
          onChangeInputHandler={this._onChangeInputHandler}
          onSubmitFormHandler={this._onSubmitFormHandler}
          percent={this.state.progressPercent} />
      </div>
    );
  }
}


export default Content
