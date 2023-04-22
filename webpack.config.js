// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);
	// Customize the config before returning it.
	config.resolve.alias["@stripe/stripe-react-native"] = "null-loader"; // ADD THIS LINE
	return config;
};