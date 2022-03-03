import React from "react";
import { Table, Button, Icon, notification, message, Modal } from "antd";
import Search from "./Search";
import FormModal from "./FormModal";
import getSqlData from "../../api/Activity/sqlData";
import { findIndexByKey } from "../../libs/Activity/util";
import sqlData from "../../store/Activity/sqlConfig";
import Image1 from "../../images/camp12.jpg";
import Image2 from "../../images/camp13.jpg";
import Image3 from "../../images/camp9.jpg";
import Image4 from "../../images/camp8.jpg";
import Image5 from "../../images/camp16.jpg";
import Image6 from "../../images/camp1.jpg";
import "../../style/content.css";
import axios from "axios";

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

export default class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      searchForms: {},
      selectedRowKeys: [],
      lists: [],
      // 默認table 首為空
      columns: [
        {
          title: "",
          key: "initial",
        },
      ],
      loading: false,
      showFormModal: false,
      confirmLoading: false,
      formModalTitle: "新增",
      formModalType: "add", // add, edit, editMul
      formConfigs: [],
      formValues: {},
      addNum: 0,
    };
  }

  componentDidMount() {
    this.renderLists(this.props.tableName);
  }

  componentWillReceiveProps({ tableName }) {
    if (this.props.tableName === tableName) return;
    this.renderLists(tableName);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 獲取數據
  getLists = async (tableName) => {
    let result = await getSqlData[`getTable${tableName}`]();
    console.log('result',result)
    return result.map((item, index) => {
      item.key = item.id;
      return item;
    });
  };

  formOnChange = {
    inputOnChange: (event, key) => {
      const formValues = { ...this.state.formValues };
      console.log('event.target.value.trim()',event.target.value.trim().indexOf("C:\\fakepath\\"));
      let nowValue = event.target.value.trim();
      if(nowValue.indexOf("C:\\fakepath\\") != -1){
        nowValue = nowValue.replace("C:\\fakepath\\","");
        formValues['img'] = nowValue;
        formValues[key] = <img src={'http://localhost:3005/images/'+nowValue} alt="Activity" width={70} height={60} />;
      }
      else{
        formValues[key] = nowValue;
      }
      
      this.setState({ formValues });
    },
  };

  searchOnChange = {
    inputOnChange: (event, key) => {
      const searchForms = { ...this.state.searchForms };
      searchForms[key] = event.target.value.trim();
      this.setState({ searchForms });
    },
  };

  submitSearch = () => {
    const forms = Object.entries({ ...this.state.searchForms }).filter(
      (item) => !item[1] === false
    );
    if (!forms.length) return;

    this.setState({ loading: true });
    const hideMsg = message.loading("搜尋中...", 0);

    this.getLists(this.props.tableName)
      .then((data) => {
        const lists = data.filter((item) =>
          forms.every((arr) => String(item[arr[0]]) === String(arr[1]))
        );
        this.setState(
          {
            selectedRowKeys: [],
            lists,
            loading: false,
          },
          hideMsg
        );
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          hideMsg
        );
      });
  };

  resetSearch = () => {
    const forms = Object.entries({ ...this.state.searchForms }).filter(
      (item) => !item[1] === false
    );
    if (!forms.length) return;

    this.setState({ loading: true });
    const hideMsg = message.loading("重置中...", 0);

    this.getLists(this.props.tableName)
      .then((lists) => {
        this.setState(
          {
            searchForms: {},
            lists,
            selectedRowKeys: [],
            loading: false,
          },
          hideMsg
        );
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          hideMsg
        );
      });
  };

  addRows = () => {
    this.setState({
      showFormModal: true,
      formModalTitle: "新增",
      formModalType: "add",
    });
  };

  editRows = () => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const lists = [...this.state.lists];
    const currentRows = lists[findIndexByKey("key", selectedRowKeys[0], lists)];
    const isSingle = selectedRowKeys.length === 1;
    this.setState({
      showFormModal: true,
      formModalTitle: isSingle ? "修改" : "全部修改",
      formModalType: isSingle ? "edit" : "editMul",
      formValues: isSingle ? currentRows : {},
    });
  };

  delConfirm = () => {
    const selectedRowKeys = this.state.selectedRowKeys;

    confirm({
      title: "確定刪除活動嗎?",
      content: `ID：【${selectedRowKeys.join(", ")}】`,
      onOk: () => {
        this.setState({ loading: true });
        const hideMsg = message.loading("删除中...", 0);

        const lists = [...this.state.lists];

        selectedRowKeys.forEach((val) => {
          lists.splice(findIndexByKey("key", val, lists), 1);
        });

        axios.post('http://localhost:3005/ActDel',{delID:selectedRowKeys.join(", ")})
        .then(res=>{console.log('res',res);})
        .catch(err=>{console.log('err',err);})

        setTimeout(() => {
          this.setState(
            {
              loading: false,
              lists,
              selectedRowKeys: [],
            },
            () => {
              hideMsg();
              notification.success({
                message: "成功",
                description: "删除活動成功",
              });
            }
          );
        }, 1000);
      },
    });
  };

  submitFormModal = () => {
    this.setState({ confirmLoading: true });
    const hideMsg = message.loading("提交中...", 0);

    const formValues = { ...this.state.formValues };
    const lists = [...this.state.lists];
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const type = this.state.formModalType;
    let addNum = this.state.addNum;

    if (type === "add") {
      addNum = this.state.addNum + 1;
      formValues.id = formValues.id || lists[lists.length - 1].id + addNum;
      formValues.key = formValues.id;
      lists.unshift(formValues);

      axios.post('http://localhost:3005/ActAdd',formValues)
      .then(res=>{console.log('tentadd',res);})
      .catch(err=>{console.log('tentadd',err);})
    } else {
      console.log('selectedRowKeys',selectedRowKeys);
      console.log('formValues',formValues);

      axios.post('http://localhost:3005/ActUpdate',formValues)
      .then(res=>{console.log(res);})
      .catch(err=>{console.log(err);})

      selectedRowKeys.forEach((key) => {
        const index = findIndexByKey("key", key, lists);
        lists[index] = { ...lists[index], ...formValues };
      });
    }

    setTimeout(() => {
      this.setState(
        {
          lists,
          addNum,
          formValues: {},
          confirmLoading: false,
          showFormModal: false,
        },
        () => {
          hideMsg();
          notification.success({
            message: "成功",
            description: `${type === "add" ? "新增" : "修改"}完成`,
          });
        }
      );
    }, 1000);
  };

  cancelFormModal = () => {
    this.setState({
      showFormModal: false,
      formValues: {},
    });
  };

  renderLists(tableName) {
    const conf = sqlData[findIndexByKey("tableName", tableName, sqlData)];

    const columns = conf.headers.map((header) => ({
      title: header.name,
      dataIndex: header.tableKey,
      width: header.width,
    }));

    this.setState({
      columns,
      loading: true,
      formConfigs: conf.headers,
    });
    const hideMsg = message.loading("正在查詢...", 0);

    this.getLists(tableName)
      .then((lists) => {
        this.setState(
          {
            lists,
            loading: false,
          },
          hideMsg
        );
      })
      .catch(() => {
        this.setState(
          {
            lists: [],
            loading: false,
          },
          hideMsg
        );
      });
  }

  render() {
    const {
      searchForms,
      selectedRowKeys,
      columns,
      lists,
      loading,
      showFormModal,
      confirmLoading,
      formModalTitle,
      formConfigs,
      formValues,
    } = this.state;
    const selectedLen = selectedRowKeys.length;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <Search
          configs={formConfigs}
          values={searchForms}
          onChange={this.searchOnChange}
          resetSearch={this.resetSearch}
          submitSearch={this.submitSearch}
        />
        <div style={{ margin: "10px 0" }}>
          <ButtonGroup size="small">
            <Button type="primary" onClick={this.addRows}>
              <Icon type="plus-circle-o" />
              新增
            </Button>
            <Button
              type="primary"
              disabled={selectedLen < 1}
              onClick={this.editRows}
            >
              <Icon type="edit" />
              {selectedLen > 1 ? "全部修改" : "修改"}
            </Button>
            <Button
              type="primary"
              disabled={selectedLen < 1}
              onClick={this.delConfirm}
            >
              <Icon type="delete" />
              {selectedLen > 1 ? "全部删除" : "删除"}
            </Button>
          </ButtonGroup>
          <span style={{ marginLeft: 8 }}>
            {selectedLen > 0 && `共選擇了 ${selectedLen} 個項目`}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={lists}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "40", "50"],
            showTotal(total) {
              return `共 ${total} 筆`;
            },
          }}
          loading={loading}
        />
        <FormModal
          formModalTitle={formModalTitle}
          formConfigs={formConfigs}
          formValues={formValues}
          showFormModal={showFormModal}
          submitFormModal={this.submitFormModal}
          cancelFormModal={this.cancelFormModal}
          confirmLoading={confirmLoading}
          onChange={this.formOnChange}
        />
      </div>
    );
  }
}
