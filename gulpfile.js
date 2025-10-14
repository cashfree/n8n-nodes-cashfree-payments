const { src, dest } = require('gulp');

function buildIcons() {
	return src('nodes/CashfreePayments/*.{png,svg}')
		.pipe(dest('dist/nodes/CashfreePayments/'));
}

exports['build:icons'] = buildIcons;
