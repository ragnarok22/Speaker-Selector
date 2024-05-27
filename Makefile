.PHONY: build clean
.DEFAULT_GOAL := build

build:
	@echo "Building..."
	@npm run build
	@zip -r speaker-selector.zip dist


clean:
	@echo "Cleaning..."
	@rm -rf dist
	@rm -f speaker-selector.zip
