const Parser = require('../index');

test('parse string synchronously with headers', () => {
	const csv = 'name,age\nkasper,22\ntina,28';
	const parsed = new Parser().parse(csv);
	expect(parsed.data).toEqual([
		{ name: 'kasper', age: '22' },
		{ name: 'tina', age: '28' }
	]);
});

test('parse string synchronously without headers', () => {
	const csv = 'name,age\nkasper,22\ntina,28';
	const parsed = new Parser().parse(csv, { headers: false });
	expect(parsed.data).toEqual([
		['name', 'age'],
		['kasper', '22'],
		['tina', '28']
	]);
});

test('parse string asynchronously with headers', () => {
	const csv = 'name,age\nkasper,22\ntina,28';
	new Parser().parseAsync(csv).then(res => {
		expect(res.data).toEqual([
			{ name: 'kasper', age: '22' },
			{ name: 'tina', age: '28' }
		]);
	});
});

test('parse string asynchronously without headers', () => {
	const csv = 'name,age\nkasper,22\ntina,28';
	new Parser().parseAsync(csv, { headers: false }).then(res => {
		expect(res.data).toEqual([
			['name', 'age'],
			['kasper', '22'],
			['tina', '28']
		]);
	});
});
