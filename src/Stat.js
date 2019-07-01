import React, {Component} from 'react';

export default class Stat extends Component {
    render() {
        const {done,total} = this.props;

        return (
            <div>
                <span>Done: {done}</span>
                <span>Total: {total}</span>
            </div>
        );
    }
}
