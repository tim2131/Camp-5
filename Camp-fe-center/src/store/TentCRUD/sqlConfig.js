export default [
  {
    tableName: 'Users',
    name: '帳篷搜尋',
    headers: [
      {
        tableKey: 'id',
        name: 'ID',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'name',
        name: '帳篷名稱',
        type: 'text',
        width: 80,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'number',
        name: '帳篷人數',
        type: 'text',
        width: 50,
      },
      {
        tableKey: 'price',
        name: '帳篷價格',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'image',
        name: '帳篷圖片',
        type: 'img',
        width: 50,
        height: 50,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'date',
        name: '上架時間',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'intro',
        name: '帳篷簡述',
        type: 'text',
        width: 200,
        validators: [
          'required',
        ],
      },
    ],
  },
  {
    tableName: 'None',
    name: '模擬異常',
    headers: [
      {
        tableKey: 'id',
        name: 'id',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'name',
        name: '帳篷名稱',
        type: 'text',
        width: 80,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'number',
        name: '帳篷人數',
        type: 'text',
        width: 200,
        validators: [
          '',
        ],
      },
      {
        tableKey: 'price',
        name: '帳篷價格',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'date',
        name: '上架時間',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
    ],
  }];
