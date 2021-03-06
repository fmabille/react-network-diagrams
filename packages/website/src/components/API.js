/**
 *  Copyright (c) 2015-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint max-len:0 */

import React, {Component} from "react";
import { Link } from "react-router-dom";
import _ from "underscore";
import Flexbox from 'flexbox-react';

import APIDoc from "./APIDoc";
import Meta from "../examples/catalog.json";
import Examples from "../examples_entry";
import docsFile from "../api/docs.json";

class Example extends Component {
    render() {
        const style = {
            display: "inline-block",
            margin: 5,
            padding: 20,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#DDD",
            width: 160,
            height: 160
        };
        const { example } = this.props;
        const name = example.key;
        const imgName = `${name}_thumbnail`;
        const img = Examples[imgName];
        const link = (
            <Link to={`../../example/${name}`}>{example.value.title}</Link>
        );
        return (
            <Flexbox  flexDirection="column" minWidth="220px" >
                <div style={style}>
                    <img src={img} alt={`${name}`}/>
                </div>
                <div style={{paddingLeft: 5, fontSize: "smaller"}}>
                {link}
                </div>
            </Flexbox>
        );
    }
}

class TaggedExamples extends Component {
    render() {
        const exampleList = [];
        _.forEach(Meta, (value, key) => {
            const tags = value.tags;
            if (_.contains(tags, this.props.tag)) {
                exampleList.push({key, value});
            }
        });
        const examples = exampleList.map((example, i) => {
            return (
                <Example key={i} example={example} />
            );
        });
        
        if (examples.length > 0) {
            return (
                <div>
                <Flexbox flexDirection="row" flexWrap="wrap">
                    {examples}
                </Flexbox>
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }
}

export default class extends Component {

    render() {
        const component = this.props.match.params.component;
        const path = `src/components/${component}.js`;

        if (!_.has(docsFile, path)) {
            return (
                <div>API could not be found</div>
            );
        }
        const title = docsFile[path].displayName;
        const titleStyle = {
            color: "#317eac",
            fontSize: 32,
            fontFamily: "monospace",
            fontWeight: 100
        };
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <h2 style={titleStyle}>{`<${title}>`}</h2>
                        <TaggedExamples tag={component} />
                        <APIDoc file={path}/>
                    </div>
                </div>
            </div>
        );
    }
};
