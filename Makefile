install:
	npm ci

publish:
	npm publish --dry-run && sudo npm link
