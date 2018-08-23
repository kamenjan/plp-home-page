import React, { Component } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

// import _ from 'lodash';

import history from 'services/history';

import AboveTheFold from "./AboveTheFold/AboveTheFold";
import AboutUs from "./AboutUs/AboutUs";
import Work from "./Work/Work";

export default class Desktop extends Component {

	constructor() {
		super();
		this.state = {
			path: "/",
			show: false,
			entered: false
		};
	}

	componentDidMount() {
		// window.addEventListener("wheel", this.updateOnScroll);
	}

	componentWillUnmount() {
		// window.removeEventListener("wheel", this.updateOnScroll);
	}

	// TODO: Define routes/scenes the proper way
	links = () => [
		{path: "/", component: AboveTheFold},
		{path: "/AboutUs", component: AboutUs},
		{path: "/Work", component: Work}
	]

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

	render() {
		return (
			<BrowserRouter>
				<div>
					<section>
						<nav>
							<ul>
								<li><Link to="/">Home</Link></li>
								<li><Link to="/about-us">About Us</Link></li>
								<li><Link to="/work">Work</Link></li>
							</ul>
						</nav>
						<hr />
					</section>
					<Route path="/" render={(props) => (
						<TransitionGroup>
							<Transition
								// For transitions API to work, transition key has to be set and unique!
								key={props.location.key}
								mountOnEnter={true}
								unmountOnExit={true}
								timeout={1000}
								// onEnter={el => { console.log('enter', el) }} // I have state available in my transition components ...
								// onExit={el => { console.log('exit', el) }} // ... so do I really need these? Leave for reference
							>
								{ state =>
									<Switch location={props.location}>
										<Route exact path="/" render={(props) => (
											<AboveTheFold {...props} transition-state={state}/>
										)}/>
										<Route exact path="/about-us" render={(props) => (
											<AboutUs {...props} transition-state={state}/>
										)}/>
										<Route exact path="/work" render={(props) => (
											<Work {...props} transition-state={state}/>
										)}/>
									</Switch>
								}
							</Transition>
						</TransitionGroup>
					)}/>
				</div>
			</BrowserRouter>
		);
	}
}