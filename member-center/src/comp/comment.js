import { Comment, Avatar, Form, Button, List, Input } from "antd";
import React from "react";
import { useState, useEffect } from "react";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    {/* <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item> */}
  </>
);


const InputComment = ({ }) => {
  const [words, SetWords] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [state, setState] = useState("");
  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue(false);
      SetWords([...words,{}
      
      ])
     },1000)
  }
  const handleChange = (e) => {
    setState({
      // value: e.target.value,
    });
  };

  return (
    <>
      <Comment
        content={
          <Editor
            onChange={() => handleChange()}
            onSubmit={() => handleSubmit()}
            submitting={() => submitting()}
            value={value}
          />
        }
      />
    </>
  );
};
    


export default InputComment
