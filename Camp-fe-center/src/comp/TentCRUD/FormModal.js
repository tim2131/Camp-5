import React from 'react';
import { Modal, Form } from 'antd';
import Factory from './Factory';

const FormItem = Form.Item;

export default class FormModal extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {
      formModalTitle,
      formConfigs,
      formValues,
      showFormModal,
      submitFormModal,
      cancelFormModal,
      confirmLoading,
      onChange,
    } = this.props;

    return (
      <Modal
        title={formModalTitle}
        visible={showFormModal}
        onOk={submitFormModal}
        onCancel={cancelFormModal}
        confirmLoading={confirmLoading}
      >
        <Form horizontal>
          {formConfigs.map(items => (
            <FormItem
              key={items.tableKey}
              label={items.name}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Factory
                type={items.type}
                target={formValues}
                keyName={items.tableKey}
                onChange={onChange.inputOnChange} />
            </FormItem>
          ))}
        </Form>
      </Modal>
    );
  }
}
