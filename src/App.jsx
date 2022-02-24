
import React from 'react';
import { connect } from 'redux-saga';
import QuestionsList from './components/QuestionsList';

const App = ({test}) => (
    <div>
        <h1>Isomorphic React {test}</h1>
        <div>
            <QuestionsList/>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(App);