install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-watch:
	node --experimental-vm-modules node_modules/jest/bin/jest.js --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
