import React, { Component } from "react"
import PropTypes from 'prop-types'
import { TimelineLite, TweenLite } from 'gsap'
import _ from 'lodash'
import { compose } from "../../services/functional"
import SolarSystem from "./svg/solar-system.svg"

export default class AboveTheFold extends Component {

	constructor(props) {
		super(props);
		this.state = {
			transitionState: this.props.transitionState
		}
		this.solarSystemSvgRef = React.createRef()
		this.elementsAnimationSteps = {
			sun: { scale: { initial: 0, in: 1, out: 0 }},
			planets: {
				venus:   { rotate: { initial: -90,  in: 0,  end:  90 }},
				earth:   { rotate: { initial:  50,  in: 0,  end: -50 }},
				saturn:  { rotate: { initial: -40,  in: 0,  end:  40 }},
				jupiter: { rotate: { initial:  30,  in: 0,  end: -30 }},
				pluto:   { rotate: { initial: -20,  in: 0,  end:  20 }}
			}
		}
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
	extractRectFromDOMElement = el => el.getBoundingClientRect()
	roundCoordinates = ({x, y}) => ({ x: Math.round(x), y: Math.round(y) })
	rectRelativeCenterCoordinates = rect => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2})
	// one way of going functional (also see functions above):
	elementsCenterCoordinates = compose(this.extractRectFromDOMElement, this.rectRelativeCenterCoordinates, this.roundCoordinates)
	// other way to go functional (less overhead, but also less DRY):
	elementsTopLeftCoordinates = compose(
		el => el.getBoundingClientRect(),
		rect => ({x: rect.left, y: rect.top}),
		({x, y}) => ({ x: Math.round(x), y: Math.round(y) })
	);

	/* By checking newly received props we can determine if component is about to exit */
	componentWillReceiveProps(nextProps) {
		/* I only need to track toggle between (something and entering) and (something and exiting) to trigger enter or exit animation */
		if (nextProps.transitionState === `entering` || nextProps.transitionState === `exiting`) {
			// setState is async function. If I wish to do something based on the changed state I have to use callback. Example:
			// this.setState({transitionState: this.props.transitionState}, () => {})
			this.setState({transitionState: nextProps.transitionState})
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

		/* TODO: I disabled SVGOs removeIDs functionality. Refactor this so it ueses plain ids. */
		const sun = this.findItemById('sun')(svgItems)
		const planets = this.objectToArray(this.getSvgById(`#solar-system`).getElementsByClassName(`planet`))

		/* Define components animations elements and make them available anytime anywhere inside the component */
		this.svgAnimationElements = {sun, planets}
		this.animateEnter(this.svgAnimationElements)
	}

	animateEnter = ({sun, planets}) => {
		/* NOTE: Sections fade-outs and fade-ins are asynchronous. Stagger enter animation if need be */
		const solarCenter = this.elementsCenterCoordinates(sun)
		const animation = new TimelineLite()
		animation.add(`start`, `+=${this.props.transitionTimeout}`)
		planets.map((planet, index) => {
			const planetAnimationData = this.elementsAnimationSteps.planets[planet.dataset.id]
			const planetCoordinates = this.elementsTopLeftCoordinates(planet)
			TweenLite.set(planet, { transformOrigin:`-${planetCoordinates.x - solarCenter.x}px -${planetCoordinates.y - solarCenter.y}px` })
			animation.from(planet, 1, {
						rotation: planetAnimationData.rotate.initial,
						opacity: 0
					}, `start+=${index/5}`
				)
		})
		animation.from(sun, 1, {
				transformOrigin:"center center",
				opacity: 0,
				scale: 0
			}, `start`
		)
	};

	animateExit = ({sun, planets}) => {
		const animation = new TimelineLite()
		animation.add("start")
		const sunTween = TweenLite.to(sun, 1, {
			scale: 0.5,
			transformOrigin:"center center",
			opacity: 0
		})
		animation.add(sunTween, "start+=0.3")
		planets.map((planet, index) => {
			const planetAnimationData = this.elementsAnimationSteps.planets[planet.dataset.id]
			animation.to(planet, 1, {
						rotation: planetAnimationData.rotate.end,
						opacity: 0
					}, `start+=${index/5}`
				)
		})
	}

	render() {
		return (
			<div id={"above-the-fold"} className={`section`} ref={this.solarSystemSvgRef}>
				<SolarSystem id={"solar-system"}/>
			</div>
		)
	}
}

AboveTheFold.propTypes = {
    transitionState: PropTypes.string,
    transitionTimeout: PropTypes.number
};