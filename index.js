/**
 * @author Kasper Siig
 * @license AGPL-3.0-or-later
 */

const fs = require('fs-extra');

class Parser {
	/**
	 * @param config Allows for global configuration
	 */
	constructor(config = { headers: true, delimiter: ',' }) {
		this.config = config;
	}

	/**
	 * Parses a string
	 * @param csv String to parse
	 * @param config Allows for local configuration
	 */
	parseString(csv, config) {
		// Overwrites keys from global config, with values given in local config
		config = this.mergeConfigs(config);
		const lines = csv.split('\n');

		// Store headers in an array if needed
		let headers;
		if (config.headers) {
			// Shift is used, so functions further down don't need to be concerned about skipping the first index
			headers = lines.shift().split(config.delimiter);
		}

		const data = lines.map(l => {
			if (!headers) return l.split(config.delimiter);
			else {
				const entries = l.split(config.delimiter);
				const rtn = {};
				for (let i = 0; i < entries.length; i++) {
					rtn[headers[i]] = entries[i];
				}
				return rtn;
			}
		});

		return { data, config };
	}

	/**
	 * Parses CSV synchronously
	 *
	 * @param csv CSV to parse
	 * @param config Optional configuration
	 */
	parse(csv, config = {}) {
		return this.parseString(csv, config);
	}

	/**
	 * Parses CSV asynchronously
	 *
	 * @param csv CSV to parse
	 * @param config Optional configuration
	 */
	parseAsync(csv, config = {}) {
		return new Promise(res => {
			res(this.parseString(csv, config));
		});
	}

	/**
	 * Parses a CSV file synchronously
	 *
	 * @param file File to parse
	 * @param config Optional configuration
	 */
	parseFile(file, config = {}) {
		const csv = fs.readFileSync(file).toString();
		return this.parseString(csv, config);
	}

	/**
	 * Parses a CSV file asynchronously
	 *
	 * @param file File to parse
	 * @param config Optional configuration
	 */
	parseFileAsync(file, config = {}) {
		return new Promise(res => {
			const csv = fs.readFileSync(file).toString();
			res(this.parseString(csv, config));
		});
	}

	/**
	 * Merges the global config with the local config
	 *
	 * @param config Local config
	 */
	mergeConfigs(config) {
		const keys = Object.keys(this.config);

		if (keys.length === 0) return this.config;
		else {
			let configMerged = {};
			keys.forEach(k => {
				// Use value from local config if exists, otherwise use global config
				configMerged[k] = k in config ? config[k] : this.config[k];
			});
			return configMerged;
		}
	}
}

module.exports = Parser;
