import React from 'react';
import { connect } from 'react-redux';
import { getNameSort, getOrderType, getSearchData } from '../redux/actions';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
} from 'antd';

interface DispatchProps {
    getNameSort: (name: string) => void;
    getOrderType: (name: string) => void;
    getSearchData: (search: any) => void;
}

type State = {
    nameSort: Array<string>,
    nameFilter: string,
    searchText: string,
}

class Filter extends React.Component<DispatchProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            nameFilter: '',
            searchText: '',
            nameSort: ['activity', 'votes', 'creation', 'relevance']
        };
    }
    onСlear = () => {
        this.props.getSearchData('')
        this.setState({ nameFilter: '' })
        this.setState({ searchText: '' })
    };

    render() {
        const { nameSort, nameFilter, searchText } = this.state
        
        return (
            <>
                <Form className='form-wrapper'>
                    <Form.Item label="Sort by" name="sort">
                        <Radio.Group
                            defaultValue={'activity'}
                        >
                            {
                                nameSort.map((item: any, key: number) =>
                                    <Radio.Button
                                        value={item}
                                        key={key}
                                        onChange={(item) => {
                                            this.props.getNameSort(item.target.value)
                                        }}>
                                        {item}
                                    </Radio.Button>
                                )
                            }
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Order by" name="order">
                        <Radio.Group
                            defaultValue={'desc'}
                        >
                            <Radio.Button
                                value={'desc'}
                                onChange={(e) => {
                                    this.props.getOrderType('desc')
                                }}>
                                desc
                            </Radio.Button>
                            <Radio.Button
                                value={'asc'}
                                onChange={(e) => {
                                    this.props.getOrderType('asc')
                                }}>
                                asc
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <Form className='form-wrapper'>
                    <Form.Item label="Search">
                        <Input
                            value={searchText}
                            onChange={(e) => {
                                this.setState({ searchText: e.target.value })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Search by">
                        <Select
                            placeholder="Enter search type"
                            onChange={(e) => {
                                this.setState({ nameFilter: e })
                            }}
                        >
                            <Select.Option value="title">Title</Select.Option>
                            <Select.Option value="answers">Answer count</Select.Option>
                            <Select.Option value="tagged">Tags</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button 
                            type="primary"
                            onClick={() => this.props.getSearchData(`&${nameFilter}=${searchText}`)}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button 
                            onClick={this.onСlear}
                        >
                            Сlear
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapDispatchToProps: DispatchProps = {
    getNameSort,
    getOrderType,
    getSearchData
}

export default connect<any, DispatchProps, any, State>(null, mapDispatchToProps)(Filter)