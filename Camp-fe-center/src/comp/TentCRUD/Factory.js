import React from 'react';
import { Input } from 'antd';

export default class Factory extends React.Component {
  render() {
    const { type, target, keyName, onChange } = this.props;
    switch (type) {
      case 'img':
        return <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple onChange={e => onChange(e, keyName)}/>
      case 'text':
        return <Input value={target[keyName]} onChange={e => onChange(e, keyName)} />;
      case 'display':
        return !target[keyName] ? <Input disabled /> : (
            <span>{target[keyName]}</span>
          );
      default:
        return null;
    }
  }
};