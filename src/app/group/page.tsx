'use client'
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import NavMenu from '../components/NavMenu';
import { Form, Input, InputNumber, Popconfirm, Typography, Button } from 'antd';
import type { ColumnType } from 'antd/es/table';
import React, { useEffect, useState, useActionState } from 'react';

interface DataType {
  id : number
  numberGroup	: number
  nameGroup	: string
  pibs : string
  address	: string
  area : number
  isAlert	: boolean
  dateCloseDepartment	: Date
  isNew?: boolean;
  isEdited?: boolean;
}
  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
}
interface EditableColumnType extends ColumnType<DataType> {
  editable?: boolean;
}
function Group()
{
  const[data, setData] = useState<DataType[]>([])
  const[newData, setNewData] = useState<DataType[]>([])
  const[updateData, setUpdateData] = useState<DataType[]>([])

  const [editingKey, setEditingKey] = useState(0);
  const [form] = Form.useForm();

    const isEditing = (record: DataType) => record.id === editingKey;
      const cancel = () => {
      setEditingKey(0);
    };

    const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
          isEdited: !item.isNew,
        });
        setData(newData);
        setEditingKey(0);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = (record: Partial<DataType> & { id:number }) => {
    form.setFieldsValue({
      numberGroup: '',
      nameGroup: '',
      pibs: '',
      address: '',
      area: '',
      isAlert: '',
      dateCloseDepartment: '',
      ...record
    });
    setEditingKey(record.id || 0);
  };

  const columns: EditableColumnType[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hidden:true,
      editable: true,
    },
    {
      title: 'Номер',
      dataIndex: 'numberGroup',
      showSorterTooltip: { target: 'full-header' },
      editable: true,
    },
    {
      title: 'Назва',
      dataIndex: 'nameGroup',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
      title: 'ПІП',
      dataIndex: 'pibs',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
      title: 'Адреса',
      dataIndex: 'address',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
      title: 'Площа',
      dataIndex: 'area',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
      title: 'Підкреслення',
      dataIndex: 'isAlert',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
      title: 'Дата закриття',
      dataIndex: 'dateCloseDepartment',
      defaultSortOrder: 'descend',
      editable: true,
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, record: DataType) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link onClick={() => save(record.id)} style={{ marginInlineEnd: 8 }}>
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      },
  ];

  const mergedColumns = columns.map((col) => {
  if (!col.editable) {
    return col;
  }

  return {
    ...col,
    onCell: (record: DataType) => ({
      record,
      inputType: typeof record[col.dataIndex as keyof DataType] === 'number' ? 'number' : 'text',
      dataIndex: col.dataIndex!,
      title: String(col.title),
      editing: isEditing(record),
    }),
  };
});
 const handleAdd = () => {
  const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    const newData: DataType = {
      id : maxId + 1,
      numberGroup	: 0,
      nameGroup	: '',
      pibs : '',
      address	: '',
      area : 0,
      isAlert	: false,
      dateCloseDepartment	: new Date(),
      isNew: true
    };
    setData(prev => [...prev, newData]);
    edit(newData)
  };

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect( () =>  {
    async function GetData() {
      try{
        const response = await fetch('http://localhost:5294/api/group/GETcontollerGroup');
        const data = await response.json()
        setData(data);
      }
      catch(error)
      {
        console.warn(error)
      }
    }
    GetData()
  }, [])

  return(
     <div className='mg-20'>
     <NavMenu /> 
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
     <Form form={form} component={false}>
      <Table<DataType> 
         rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-md rounded-2xl p-4 mt-15"
      />
    </Form>
</div>
  )
}

export default Group;