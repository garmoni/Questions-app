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
                const data = json.items.map((item) => {
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
                //title: 'Name',
                dataIndex: 'display_name',
                key: 'display_name',
                width: '30%',
            },
            {
                //title: 'Age',
                dataIndex: 'link',
                key: 'link',
                width: '30%',
            },
            {
                //title: 'Address',
                dataIndex: 'location',
                key: 'location',
                width: '30%',
            },
        ];
        return (
            <div>
                <Table loading={!this.state.dataSource} dataSource={this.state.dataSource} columns={columns} />
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchData
}

export default connect(null, mapDispatchToProps)(Questions);