const { src, dest, parallel } = require('gulp');

function buildIcons() {
	return src('nodes/CashfreePayments/*.{png,svg}')
		.pipe(dest('dist/nodes/CashfreePayments/'));
}

function buildNodes() {
	return src('nodes/**/*.js')
		.pipe(dest('dist/nodes/'));
}

function buildCredentials() {
	return src('credentials/**/*.js')
		.pipe(dest('dist/credentials/'));
}

exports['build:icons'] = buildIcons;
exports['build:nodes'] = buildNodes;
exports['build:credentials'] = buildCredentials;
exports['build'] = parallel(buildIcons, buildNodes, buildCredentials);
