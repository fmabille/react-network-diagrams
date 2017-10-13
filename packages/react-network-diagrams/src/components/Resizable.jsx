/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
// import createReactClass from "create-react-class";

/**
 * This takes a single child and inserts a prop 'width' on it that is the
 * current width of the this container. This is handy if you want to surround
 * a diagram and have this drive the width.
 */
export default class Resizable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
    }

    handleResize() {
        this.setState({width: this.refs.container.offsetWidth});
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);  //eslint-disable-line
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);  //eslint-disable-line
    }

    render() {
        const props = {width: this.state.width};
        if (this.props.aspect) {
            props.height = this.state.width / this.props.aspect;
        }
        const child = React.Children.only(this.props.children);
        const childElement = this.state.width ?
            React.cloneElement(child, props) : null;
        return (
            <div ref="container" style={this.props.style}>
                {childElement}
            </div>
        );
    }
};
