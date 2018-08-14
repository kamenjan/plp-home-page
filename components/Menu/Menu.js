import React, { Component } from 'react';

export default class Menu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	render() {

		return (
			<div id={"menu-container"}></div>
		);
	}
}