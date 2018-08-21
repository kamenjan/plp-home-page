import React, { Component } from "react";
import { Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import _ from 'lodash';

import history from 'services/history';

import AboveTheFold from "./AboveTheFold/AboveTheFold";
import AboutUs from "./AboutUs/AboutUs";
import Work from "./Work/Work";

export default class Desktop extends Component {

	constructor() {
		super();
		this.state = {
			path: "/"
		};
	}

	componentDidMount() {
		window.addEventListener("wheel", this.updateOnScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("wheel", this.updateOnScroll);
	}

	// Desktop scroll behaviour is implemented so that we redirect react route (ie. section of the site)
	// and animate the transition using react transition
	updateOnScroll = (event) => {
		if (Math.abs(event.deltaY) > 30) {

			// Remove listener to lock the transition so the animation can load
			window.removeEventListener("wheel", this.updateOnScroll);

			// Check and set users scroll direction
			const direction = (event.deltaY)/Math.abs(event.deltaY);

			// Iterate over link array
			this.links().forEach( (link, i, arr) => {
				// Check for current location in links array and check if previous/next path relative to current exists
				if (link.path === this.state.path && typeof arr[i+direction] !== 'undefined') {
					// Set previous/next path in state ...
					this.setState({path: arr[i+direction].path});
					// ... and redirect/transition user
					history.replace(arr[i+direction].path)
				}
			})
			// After 1 second add the listener again and unlock navigation
			setTimeout(() => { window.addEventListener("wheel", this.updateOnScroll ) }, 2000);
		}
	}

	// TODO: Define routes/scenes the proper way
	links = () => [
			{path: "/", component: AboveTheFold},
			{path: "/AboutUs", component: AboutUs},
			{path: "/Work", component: Work}
		]

	render() {

		return (
			<Router history={history}>
				<div id={"app-container"}>
					<Switch>
						<Route exact path="/" component={AboveTheFold} />
						<Route path="/AboutUs" component={AboutUs} />
						<Route path="/Work" component={Work} />
					</Switch>
				</div>
			</Router>
		);
	}
}