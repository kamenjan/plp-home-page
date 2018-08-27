import React, { Component } from "react";

import "./containers/global.scss";

import Mobile from "./containers/Mobile.js";
import Desktop from "./containers/Desktop";

export default class Main extends Component {

	constructor() {
		super();
		this.state = {
			fromTop: 0,
			width: window.innerWidth
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateOnResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateOnResize);
	}

	updateOnResize = () => {
		this.setState({ width: window.innerWidth });
	}

	render() {
		return (
			<div>{ this.state.width <= 768 ? <Mobile /> : <Desktop /> }</div>
		)
	}
}