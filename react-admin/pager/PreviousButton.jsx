var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');

export default React.createClass({

    mixins: [Router.Navigation, Router.State],

    propTypes: {
        index: React.PropTypes.string.isRequired,
        query: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        page: React.PropTypes.number.isRequired
    },

    render () {
        if (this.props.page <= 1) {
            return null;
        }

        return (
            <li className="previous">
                <Router.Link to={this.props.index} query={this.props.query} onClick={this.props.onClick}>&larr; Previous Page</Router.Link>
            </li>
        );
    }
});