SHELL				:= /bin/bash
VERSION				?= 0.0.1
BUILD				:= $(shell date -u +%FT%T%z)
GIT_HASH			:= $(shell git rev-parse HEAD)
GIT_REPO			:= $(shell git config --get remote.origin.url)
BUILDKITE_COMMIT	?= $(GIT_HASH)
APP_NAME 			?= client_portal-help
IMAGE_REPOSITORY	?= quay.io/reevoo/client_portal-analytics-frontend

export APP_NAME
export IMAGE_REPOSITORY
export BUILDKITE_COMMIT

.PHONY: test
test:
	docker run -v ${HOME}/.ssh:/root/.ssh -v ${PWD}:/app/ -it ${IMAGE_REPOSITORY}:${BUILDKITE_COMMIT} .buildkite/test.sh

.PHONY: build
build:
	docker build -t ${IMAGE_REPOSITORY}:${BUILDKITE_COMMIT} .

.PHONY: publish
publish: build
	docker push ${IMAGE_REPOSITORY}:${BUILDKITE_COMMIT}

.PHONY: deploy
deploy:
	docker run -v ${HOME}/.ssh:/root/.ssh -v ${HOME}/.aws:/root/.aws -v ${PWD}:/app/ -it ${IMAGE_REPOSITORY}:${BUILDKITE_COMMIT} /app/deploy.sh ${ENV}

.PHONY: clean
clean:
	echo "There is no clean action"
