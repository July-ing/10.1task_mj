import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let ErrorMessage = (props) => {
    return (
        props.errorMessage ?
            <div>
                <p className="error">{props.errorMessage}</p>
            </div>
            : <div></div>
    );
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
    errorMessage: state.user.errorMessage
});

export default connect(mapStateToProps)(ErrorMessage);