import React from 'react';
import { connect } from 'react-redux';
import { fetchData, getAnswers, titleAnswers } from '../redux/actions';
import { Navigate } from 'react-router-dom';
import { Spin, Table } from 'antd';

interface StateProps {
    data: any;
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalSize: number;
}

interface DispatchProps {
    fetchData: (currentPage: number, pageSize: number, totalSize: number) => void;
    getAnswers: (id: number) => void;
    titleAnswers: (title: string) => void;
   //paginationChange: (pageNumber: number, pageSize: number) => void;
}

type State = {
    rowId: boolean
}

class Questions extends React.Component<StateProps & DispatchProps, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            rowId: false
        }
    }

    componentDidMount() {
        this.props.fetchData(1, 20, 100)
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
                //sorter: (a: any, b: any) => a.answer_count - b.answer_count,
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 250,
                render: (tags: any) => tags.join(', ')
            },
            {
                title: 'Name',
                dataIndex: 'owner',
                key: 'display_name',
                width: 200,
                render: (owner: any) => owner.display_name
            },
        ];

        const { data, currentPage, pageSize, totalSize } = this.props
        const { rowId } = this.state
        console.log(data)
        return (
            <div>
                {data && !rowId ?
                    <>
                        <Table
                            onRow={(record, rowIndex: any) => {
                                return {
                                    onClick: record => {
                                        this.props.getAnswers(data[rowIndex].question_id);
                                        this.props.titleAnswers(data[rowIndex].question_id)
                                        this.setState({ rowId: true })
                                    }
                                };
                            }}
                            dataSource={data}
                            columns={columns}
                            rowKey={record => record.title}
                            pagination={{
                                current: currentPage,
                                total: totalSize,
                                showSizeChanger: true
                                // onChange: (pageNumber: number, pageSize: number) => {
                                //     this.props.paginationChange(pageNumber, pageSize)
                                // },
                            }}
                        //pagination={{ pageSizeOptions: ['10', '20', '30'], showSizeChanger: true }}
                        />
                    </>
                    : rowId
                    ? <Navigate to="/answer" replace />
                    : <Spin size="large" />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        data: state.questions.questions.items,
    }
}
const mapDispatchToProps = {
    fetchData,
    getAnswers,
    titleAnswers,
    //paginationChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions as any);