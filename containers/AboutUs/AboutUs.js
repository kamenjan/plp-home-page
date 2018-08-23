import React, { Component } from "react";

export default class AboutUs extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(`AboutUs mounted`);
	}

	render() {
		return (
			<div id={"about-us"}>
				about us
			</div>
		);
	}
}