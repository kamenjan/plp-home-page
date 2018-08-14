import React, { Component } from "react";

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
		window.addEventListener("scroll", this.updateOnScroll);
		window.addEventListener('resize', this.updateOnResize);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.updateOnScroll);
		window.removeEventListener('resize', this.updateOnResize);
	}

	updateOnScroll = () => {
		const documentElement = document.scrollingElement || document.documentElement;
		this.setState({ fromTop: documentElement.scrollTop });
	}

	updateOnResize = () => {
		this.setState({ width: window.innerWidth });
	}

	render() {

		return (
			<div>{(this.state.width <= 768) ? ( <Mobile /> ) : ( <Desktop /> )}</div>
		)
	}
}