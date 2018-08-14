module.exports = {
	compose: (...fns) => (arg) => fns.reduce((composed, f) => f(composed), arg),
	logValue: (value) => {
		console.log(value)
		return value
	}
};