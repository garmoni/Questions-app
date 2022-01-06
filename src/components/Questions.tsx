import React from 'react';
import { connect } from 'react-redux';
import { fetchData, getAnswers, getTitleAnswers } from '../redux/actions';
import { Navigate } from 'react-router-dom';
import { Spin, Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

interface StateProps {
    data: any;
    totalSize: number;
    isLoading: boolean;
}

interface DispatchProps {
    fetchData: (currentPage: number, pageSize: number) => void;
    getAnswers: (id: number) => void;
    getTitleAnswers: (title: string) => void;
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
        this.props.fetchData(1, 20)
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
    getColumnSearchProps = (dataIndex:any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } 
            : { setSelectedKeys: any, selectedKeys: any, confirm: any, clearFilters: any }) => (
          <div style={{ padding: 8 }}>
            <Input
            //   ref={node => {
            //     this.searchInput = node;
            //   }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered:any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value:string, record: any) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        // onFilterDropdownVisibleChange: (visible:any) => {
        //   if (visible) {
        //     setTimeout(() => this.searchInput.select(), 100);
        //   }
        // },
        render: (text:string) =>
          this.state.searchedColumn === dataIndex ? (
            dataIndex
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys: any, confirm: any, dataIndex:string) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = (clearFilters:any) => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 400,
                ...this.getColumnSearchProps('title'),
                render: (title: any) => <span dangerouslySetInnerHTML={{ __html: title }} />
            },
            {
                title: 'Answer count',
                dataIndex: 'answer_count',
                key: 'answer_count',
                width: 150,
                //sorter: 
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 300,
                render: (tags: any) => tags.map((item:string, key:number) => <Tag color={colorTags[key]} key={key}>{item}</Tag>)
            },
            {
                title: 'Name',
                dataIndex: 'owner',
                key: 'display_name',
                width: 200,
                render: (owner: any) => owner.display_name
            },
        ];

        const colorTags = ["magenta", "purple", "red", "volcano", "gold", "orange", "geekblue"]

        const { data, totalSize, isLoading } = this.props
        const { rowId } = this.state

        return (
            <div>
                { data && !rowId ?
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
                                onChange: (pageNumber: number, defaultPageSize: number) => {
                                    this.props.fetchData(pageNumber, defaultPageSize)
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
        isLoading: state.questions.loading
    }
}
const mapDispatchToProps: DispatchProps = {
    fetchData,
    getAnswers,
    getTitleAnswers,
}

export default connect<StateProps, DispatchProps, any, State>(mapStateToProps, mapDispatchToProps )(Questions)