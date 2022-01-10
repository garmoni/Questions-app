import React from 'react';
import { connect } from 'react-redux';
import { fetchData, getAnswers, getTitleAnswers } from '../redux/actions';
import { Navigate } from 'react-router-dom';
import { Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Filter from './Filter';

interface StateProps {
  data: any;
  totalSize: number;
  isLoading: boolean;
}

interface DispatchProps {
  fetchData: () => void;
  getAnswers: (id: number) => void;
  getTitleAnswers: (id: any) => void;
}

type State = {
  rowId: boolean,
  searchText: string,
  searchedColumn: string,
}

class Questions extends React.Component<StateProps & DispatchProps, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      rowId: false,
      searchText: '',
      searchedColumn: '',
    }
  }

  componentDidMount() {
    this.props.fetchData()
  }

  onClickRow = (record: any) => {
    return {
      onClick: () => {
        this.props.getAnswers(record.question_id);
        this.props.getTitleAnswers(record.question_id)
        this.setState({ rowId: true })
      },
    };
  }

  render() {

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 400,
        render: (title: any) => <span dangerouslySetInnerHTML={{ __html: title }} />
      },
      {
        title: 'Answer count',
        dataIndex: 'answer_count',
        key: 'answer_count',
        width: 150,
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        width: 300,
        render: (tags: any) => tags.map((item: string, key: number) => <Tag color={colorTags[key]} key={key}>{item}</Tag>)
      },
      {
        title: 'Name',
        dataIndex: 'owner',
        key: 'display_name',
        width: 200,
        render: (owner: any) => <span dangerouslySetInnerHTML={{ __html: owner.display_name }} />
      },
    ];

    const colorTags = ["magenta", "purple", "red", "volcano", "gold", "orange", "geekblue"]

    const { data, totalSize, isLoading } = this.props
    const { rowId } = this.state

    return (
      <div>
        <Filter />
        {data && !rowId ?
          <>
            <Table
              onRow={this.onClickRow}
              loading={isLoading}
              dataSource={data}
              columns={columns as any}
              rowKey={record => record.question_id}
              pagination={{
                total: totalSize,
                defaultPageSize: 20,
                onChange: () => {
                  this.props.fetchData()
                },
              }}
            />
          </>
          : rowId
            ? <Navigate to="/answer" replace />
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any): StateProps => {
  return {
    data: state.questions.questions.items,
    totalSize: state.questions.questions.total,
    isLoading: state.questions.loading,
  }
}
const mapDispatchToProps: DispatchProps = {
  fetchData,
  getAnswers,
  getTitleAnswers,
}

export default connect<StateProps, DispatchProps, any, State>(mapStateToProps, mapDispatchToProps)(Questions)