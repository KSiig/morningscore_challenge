const Parser = require('../index');

test('parse file synchronously with headers', () => {
	const parsed = new Parser().parseFile('./tests/data.csv');
	expect(parsed.data).toEqual([
		{ name: 'kasper', age: '22' },
		{ name: 'tina', age: '28' }
	]);
});

test('parse file synchronously without headers', () => {
	const parsed = new Parser().parseFile('./tests/data.csv', { headers: false });
	expect(parsed.data).toEqual([
		['name', 'age'],
		['kasper', '22'],
		['tina', '28']
	]);
});

test('parse file asynchronously with headers', () => {
	new Parser().parseFileAsync('./tests/data.csv').then(res => {
		expect(res.data).toEqual([
			{ name: 'kasper', age: '22' },
			{ name: 'tina', age: '28' }
		]);
	});
});

test('parse file asynchronously without headers', () => {
	new Parser()
		.parseFileAsync('./tests/data.csv', { headers: false })
		.then(res => {
			expect(res.data).toEqual([
				['name', 'age'],
				['kasper', '22'],
				['tina', '28']
			]);
		});
});
