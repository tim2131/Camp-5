import React from "react";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Tent() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTent, setEditingTent] = useState(null);
  const [dataSource, setDataSource] = useState([

    {
        id: 1,
        帳篷名稱: "狩獵帳",
        帳篷人數: "3~4人",
        帳篷價格: "NT$1200(人)",
        上架日期: "2/19~2/20",
    },
    {
        id: 2,
        帳篷名稱: "TEEPEE",
        帳篷人數: "4~6人",
        帳篷價格: "NT$1500(人)",
        上架日期: "2/19~2/20",
    },
    {
        id: 3,
        帳篷名稱: "露營車",
        帳篷人數: "4~6人",
        帳篷價格: "NT$2500(人)",
        上架日期: "2/19~2/20",
    },
    {
        id: 4,
        帳篷名稱: "星空帳",
        帳篷人數: "2~4人",
        帳篷價格: "NT$1500(人)",
        上架日期: "2/19~2/20",
    },
    {
        id: 5,
        帳篷名稱: "泡泡帳",
        帳篷人數: "2~4人",
        帳篷價格: "NT$1600(人)",
        上架日期: "2/19~2/20",
    },
    {
        id: 6,
        帳篷名稱: "鐘型帳",
        帳篷人數: "4~6人",
        帳篷價格: "NT$2200(人)",
        上架日期: "2/19~2/20",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "帳篷名稱",
      dataIndex: "帳篷名稱",
    },
    {
      key: "3",
      title: "帳篷人數",
      dataIndex: "帳篷人數",
    },
    {
      key: "4",
      title: "帳篷價格",
      dataIndex: "帳篷價格",
    },
    {
        key: "5",
        title: "上架日期",
        dataIndex: "上架日期",
      },
    {
      key: "6",
      title: "帳篷編輯",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddTent = () => {
    const nextNumber = parseInt(Math.random() * 1000);
    const newTent = {
      id: nextNumber,
      帳篷名稱: "狩獵帳 ",
      帳篷人數: "3~4人",
      帳篷價格: "NT$1200(人)",
      上架日期: "2/19~2/20",
    };
    setDataSource((pre) => {
      return [...pre, newTent];
    });
  };
  const onDeleteTent = (record) => {
    Modal.confirm({
      title: "確定刪除此帳篷?",
      okText: "刪除",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((tent) => tent.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingTent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddTent}>新增帳篷</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="編輯帳篷"
          visible={isEditing}
          okText="儲存"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((tent) => {
                if (tent.id === editingTent.id) {
                  return editingTent;
                } else {
                  return tent;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingTent?.帳篷名稱}
            onChange={(e) => {
              setEditingTent((pre) => {
                return { ...pre, 帳篷名稱: e.target.value };
              });
            }}
          />
          <Input
            value={editingTent?.帳篷人數}
            onChange={(e) => {
              setEditingTent((pre) => {
                return { ...pre, 帳篷人數: e.target.value };
              });
            }}
          />
          <Input
            value={editingTent?.帳篷價格}
            onChange={(e) => {
              setEditingTent((pre) => {
                return { ...pre, 帳篷價格: e.target.value };
              });
            }}
          />
          <Input
            value={editingTent?.上架日期}
            onChange={(e) => {
              setEditingTent((pre) => {
                return { ...pre, 上架日期: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default Tent;