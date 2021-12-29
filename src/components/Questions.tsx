import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions'
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import Answer from './Answer';

class Questions extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        this.state = {
            dataSource: [],
        }
      }
      
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        this.props.fetchData()
            .then((json:any) => {
                json.items.map((item:any) => {
                   return this.setState({dataSource: [...this.state.dataSource, item]})
                })
            })
            .catch((e:String) => {
                return console.log(e)
            })
    }
    render() {

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 400,
                render: (title:any) => <NavLink  to='/answer' 
                ><p dangerouslySetInnerHTML={{ __html: title }} /></NavLink>
            },
            // {
            //     title: 'Description',
            //     dataIndex: 'body',
            //     key: 'body',
            //     width: 600,
            //     render: (body:any) => <p className='body-wrap' dangerouslySetInnerHTML={{ __html: body }} />
            // },
            {
                title: 'Answer count',
                dataIndex: 'answer_count',
                key: 'answer_count',
                width: 150,
                sorter: (a:any, b:any) => a.answer_count - b.answer_count,
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 250,
                render: (tags:any) => tags.join(', ')
            },
            {
                title: 'Name',
                dataIndex: 'owner',
                key: 'display_name',
                width: 200,
                render: (owner:any) => owner.display_name
            }
        ];

        return (
            <div>
                <Table 
                    loading={!this.state.dataSource} 
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowKey={record => record.title}
                    pagination={{pageSizeOptions : ['10', '20', '30'], showSizeChanger : true}}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchData
}

export default connect(null, mapDispatchToProps)(Questions);