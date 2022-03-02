import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import TagsList from './TagsList';

const QuestionListItem = ({ title, tags, question_id }) => (
    <div className='mb-3'>
        <h3>{title}</h3>
        <div className='mb-2'>
            <TagsList tags={tags} />
        </div>
        <div>
            <Link to={`/questions/${question_id}`}>
                <button>More Info!</button>
            </Link>
        </div>
    </div>
)

const QuestionList = ({ questions }) => (
    <div>
        {questions && questions.length ?
            <div>
                {questions.map(
                    questions =>
                        <QuestionListItem
                            key={questions.question_id}
                            {...questions}
                        />
                )}
            </div> :
            <div>
                ... Loading questions
            </div>
        }
    </div>
)

const mapStateToProps = ({ questions }) => ({
    questions
});

export default connect(mapStateToProps)(QuestionList);