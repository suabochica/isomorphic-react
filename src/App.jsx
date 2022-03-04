
import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import QuestionList from './components/QuestionList';
import QuestionDetails from './components/QuestionDetails';

const AppDisplay = () => (
    <div>
        <div>
            <Link to={`/`}>
                <h1>Isomorphic React</h1>
            </Link>
        </div>
        <Route exact path="/" render={() => <QuestionList />} />
        <Route exact path="/questions/:id" render={({ match }) => <QuestionDetails question_id={match.params.id} />} />
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(AppDisplay);