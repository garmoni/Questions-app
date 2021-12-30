import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions'
import { Spin, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import Answer from './Answer'
class Questions extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            dataSource: [],
            rowId: null
        }
    }

    componentDidMount() {
        this.props.fetchData()
    }

    render() {

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 400,
                render: (title: any) => <NavLink to='/answer'
                ><p dangerouslySetInnerHTML={{ __html: title }} /></NavLink>
            },
            {
                title: 'Answer count',
                dataIndex: 'answer_count',
                key: 'answer_count',
                width: 150,
                sorter: (a: any, b: any) => a.answer_count - b.answer_count,
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
       
        const { data, rowId } = this.props
        console.log(this.props.data)
        console.log(this.state.rowId)
        return (
            <div>
                {data ?
                    <Table
                        onRow={(record, rowIndex:any) => {
                            return {
                                onClick: record => this.setState({rowId: data[rowIndex].question_id})
                            };
                        }}
                        dataSource={data}
                        columns={columns}
                        rowKey={record => record.title}
                        pagination={{ pageSizeOptions: ['10', '20', '30'], showSizeChanger: true }}
                    />
                    : <Spin size="large" />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        data: state.questions.questions.items
    }
}
const mapDispatchToProps = {
    fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);