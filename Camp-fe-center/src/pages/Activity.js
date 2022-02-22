import React from 'react';
import { Menu } from 'antd';
import Content from '../comp/Activity/Content';
import sqlData from '../store/Activity/sqlConfig';
import { Divider, Typography,} from 'antd';
const { Title } = Typography;

const MenuItem = Menu.Item;

export default class Activity extends React.Component {
  constructor() {
    super();
    this.state = {
      tableName: 'Users',
    };

    this.openTable = this.openTable.bind(this);
  }

  openTable({ key }) {
    this.setState({
      tableName: key,
    });
  }

  render() {
    return (
      <div className="body">
         <Divider style={{ marginBottom: 60 }}>
        <Title
          level={3}
          style={{
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          活動管理
        </Title>
      </Divider>
        <Menu
          style={{ backgroundColor: '#f3f3f4' }}
          defaultSelectedKeys={[this.state.tableName]}
          mode="horizontal"
          onClick={this.openTable}
        >
          {
            sqlData.map(data => (
              <MenuItem key={data.tableName}>
                {data.name}
              </MenuItem>
            ))
          }
        </Menu>
        <Content tableName={this.state.tableName} />
      </div>
    );
  }
}
