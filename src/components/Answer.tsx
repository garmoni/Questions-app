import React from 'react';
import { connect } from 'react-redux';
import { getAnswers, getTitleAnswers } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Button, Spin, Collapse, Comment, Tooltip, Avatar, Alert } from 'antd';
import moment from 'moment';

interface StateProps {
    answer: any;
    title: any;
    isLoading: boolean;
}

interface DispatchProps {
    getAnswers: () => void;
    getTitleAnswers: () => void;
}
class Answer extends React.Component<StateProps & DispatchProps> {

    render() {
        const { answer, title, isLoading } = this.props
        const { Panel } = Collapse;

        return (
            <div>
                <Button title='Back to questions'><Link to='/'>Back to questions</Link></Button>
                {!isLoading ?
                    <>
                        <h3 dangerouslySetInnerHTML={{ __html: title.items[0].title }} />
                        <p dangerouslySetInnerHTML={{ __html: title.items[0].body }} />
                        {answer.items.length ?
                            <Collapse accordion>
                                {answer.items.map((item: any, key: number) =>
                                    <Panel header={`Answer: ${key + 1}`} key={key}>
                                        <Comment

                                            author={<span dangerouslySetInnerHTML={{ __html: item.owner.display_name }} />}
                                            avatar={<Avatar src={item.owner.profile_image} alt={item.owner.display_name} />}
                                            content={
                                                <p className='answer-text'><span dangerouslySetInnerHTML={{ __html: item.body }} /></p>
                                            }
                                            datetime={
                                                <Tooltip title={moment.unix(item.creation_date).format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{moment.unix(item.creation_date).fromNow()}</span>
                                                </Tooltip>
                                            }
                                        />
                                    </Panel>
                                )}
                            </Collapse>
                            : <Alert message="No answer yet" type="error" />
                        }
                    </>
                    : <Spin size="large" />}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        answer: state.questions.answers,
        title: state.questions.title,
        isLoading: state.questions.loading,
    }
}
const mapDispatchToProps = {
    getAnswers,
    getTitleAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer as any);
