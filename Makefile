install:
	npm install

build:
	gulp build

lint:
	node_modules/.bin/stylelint app/**/*.scss lint --fix

local:
	gulp