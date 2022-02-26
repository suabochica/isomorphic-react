import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TagsList from './TagsList';

const QuestionDetailDisplay = ({ title, body, answer_count, tags }) => {
    <div>
        <h3 className="mb-2">{title}</h3>
        {body ?
            <div>
                <div className="mb-3">
                    <TagsList tags={tags} />
                </div>
                <Markdown source={body} />
                <div>
                    {answer_count} Answers
                </div>
            </div> : <div>
                <h4>Loading Questions</h4>
            </div>
        }
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    ...state.questions.find(({ questions_id }) => question_id == ownProps.question_id)
});

export default connect(mapStateToProps)(QuestionDetailDisplay);