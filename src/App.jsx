
import React from 'react';
import { connect } from 'redux-saga';
import { Route, Link } from 'react-router-dom';

import QuestionsList from './components/QuestionsList';
import QuestionDetails from './components/QuestionDetails';

const App = () => (
    <div>
        <Link to={`/`}>
            <h1>Isomorphic React {test}</h1>
        </Link>
        <div>
            {/* <QuestionsList/> */}
            <Route exact path="/" render={() => <QuestionsList />} />
            <Route exact path="/questions/:id" render={({ match }) => <QuestionDetails question_id={match.params.id} />} />
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(App);