import React, { Component } from "react";

import { TimelineLite, TweenLite } from 'gsap';
import _ from 'lodash';

import { compose } from "../../services/functional"

import SolarSystem from "./svg/solar-system.svg";

export default class AboveTheFold extends Component {

	constructor(props) {
		super(props);
		this.state = {
			transitionState: this.props.transitionState,
			elementsAnimationSteps: {
				sun: { scale: { initial: 0, in: 1, out: 0 }},
				planets: {
					venus: { rotate: { initial: -90, in: 90, end: 90 }},
					earth: { rotate: { initial: -90, in: 90, end: 90 }},
					saturn: { rotate: { initial: -90, in: 90, end: 90 }},
					jupiter: { rotate: { initial: -90, in: 90, end: 90 }},
					pluto: { rotate: { initial: -90, in: 90, end: 90 }}
				}
			}
		}
		this.solarSystemSvgRef = React.createRef()

		this.svgAnimationElements = {}
	}

	/* Helper functions for parsing SVG. They are needed because SVGO is intent on removing unused IDs.
	/* Even after setting this option to false it still strips them. Check svgo npm library for updates
	/* NOTE: Trying to go functional, revision and refactoring is inevitable
	/* TODO: Fully decouple this code and create a separate container (es6 module || react Component || ...) for handling all our SVGs */
	getSvgById = id => this.solarSystemSvgRef.current.querySelector(id)
	domToElementsObject = attribute => domElement => domElement.querySelectorAll(attribute)
	objectToArray = object => typeof object === 'object' ? Object.values(object) : {}
	findItemById = id => array => array.filter(element => element.dataset.id === id)[0]

	/* Helper functions for animating SVGs */
	/* TODO: Trying to go functional, revision and refactoring is inevitable */
	getElementAbsoluteCenter = (el) => { /* Calculate elements center relative to viewport */
		const rect = el.getBoundingClientRect()
		return {x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2)}
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.transitionState === `entering` || nextProps.transitionState === `exiting`) {
			/* I only need to track toggle between (something and entering) and (something and exiting) to trigger enter or exit animation  */
			this.setState({transitionState: nextProps.transitionState})
			// setState is async function. If I wish to do something based on the changed state I have to use callback. Example:
			// this.setState({transitionState: this.props.transitionState}, () => {})
			// TODO: ... then call the appropriate function (animateEnter() || animateExit()).
			// NOTE: I think only exit is really viable since animateEnter is triggered on component mount
			if (nextProps.transitionState === `exiting`) this.animateExit(this.svgAnimationElements)
		}
	}

	componentDidMount() {

		/* Create array of components svg internal elements based on their data-id */
		const svgItems = compose(
			this.getSvgById,
			this.domToElementsObject("[data-id]"),
			this.objectToArray
		)("#solar-system")

		const sun = this.findItemById('sun')(svgItems)
		const planets = this.objectToArray(this.getSvgById(`#solar-system`).getElementsByClassName(`planet`))

		/* Define components animations elements and make them available anytime anywhere inside the component */
		this.svgAnimationElements = {sun, planets}

		this.initializeAnimationElements(this.svgAnimationElements)
		this.animateEnter(this.svgAnimationElements)
	}

	initializeAnimationElements = ({sun, planets}) => {
		const solarCenter = this.getElementAbsoluteCenter(sun);
		TweenLite.set(sun, {scale: 0, transformOrigin:"center center"})
		planets.map((planet, index, array) => {
			const planetCoordinates = {x: Math.round(planet.getBoundingClientRect().left), y: planet.getBoundingClientRect().top}
			TweenLite.set(planet, {
				transformOrigin:`-${planetCoordinates.x - solarCenter.x}px -${planetCoordinates.y - solarCenter.y}px`,
				rotation: -90
			})
		})
	}

	animateEnter = ({sun, planets}) => {
		planets.map((planet) => {
			TweenLite.to(planet, 1, {rotation: 0})
		})
		TweenLite.to(sun, 1, {scale: 1, transformOrigin:"center center"})

		/* Example of sun animation */
		// const animationTimeline = new TimelineLite()
		// animationTimeline.set(sun, {scale: 0, transformOrigin:"center center"})
		// animationTimeline.to(sun, 2, {scale: 1, transformOrigin:"center center"})
	};

	animateExit = ({sun, planets}) => {
		planets.map((planet) => {
			TweenLite.to(planet, 1, {rotation: 90})
		})
		TweenLite.to(sun, 1, {scale: 0, transformOrigin:"center center"})
	};

	render() {
		return (
			<div id={"above-the-fold"} className={`section`} ref={this.solarSystemSvgRef}>
				<SolarSystem id={"solar-system"}/>
			</div>
		);
	}
}