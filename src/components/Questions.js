import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions'
import { Table } from 'antd';

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
      }
      
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        this.props.fetchData()
            .then((json) => {
                json.items.map((item) => {
                   return this.setState({dataSource: [...this.state.dataSource, item]})
                })
            })
            .catch((e) => {
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
                render: title => <span>{title}</span>
            },
            {
                title: 'Answer count',
                dataIndex: 'answer_count',
                key: 'answer_count',
                width: 100,
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 250,
                render: tags => {return tags.join(', ')}
            },
            {
                title: 'Name',
                dataIndex: 'owner',
                key: 'display_name',
                width: 200,
                render: owner => <span>{owner.display_name}</span>
            }
        ];
        return (
            <div>
                <Table 
                    loading={!this.state.dataSource} 
                    dataSource={this.state.dataSource} 
                    columns={columns}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchData
}

export default connect(null, mapDispatchToProps)(Questions);