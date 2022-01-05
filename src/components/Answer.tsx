import React from 'react';
import { connect } from 'react-redux';
import { getAnswers, titleAnswers } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Button, Spin } from 'antd';

interface StateProps {
    answer: any;
    title: any;
}

interface DispatchProps {
    getAnswers: () => void;
    titleAnswers: () => void;
}
class Answer extends React.Component<StateProps & DispatchProps> {

    render() {
        const { answer, title } = this.props
        
        return (
            <div>
                <Button title='Back to questions'><Link to='/'>Back to questions</Link></Button>
                {answer.items && title.items ?
                <>
                <h3 dangerouslySetInnerHTML={{ __html: title.items[0].title }} />
                <p dangerouslySetInnerHTML={{ __html: title.items[0].body }} />
                <ul> 
                    {answer.items.map((item:any, key:number) => 
                        <li key={key}>
                            <b className='answer-num'>Answer: {key + 1}</b>
                            <p className='answer-text'><span dangerouslySetInnerHTML={{ __html: item.body }} /></p>
                        </li>
                        )}
                    </ul>
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
    }
}
const mapDispatchToProps = {
    getAnswers,
    titleAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer as any);
