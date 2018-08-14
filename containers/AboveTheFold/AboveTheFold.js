import React, { Component } from "react";

export default class AboveTheFold extends Component {

	constructor(props) {
		super(props);
		this.state = {
			svgAnimationStyle: {}
		};
	}

	/* Triggered when component loads */
	componentDidMount() {}

	componentWillUnmount() {}

	componentWillUpdate () {}

	render() {
		return (
			<div id={"above-the-fold"}>
			</div>
		);
	}
}