SHELL				:= /bin/bash
VERSION				?= 0.0.1
BUILD				:= $(shell date -u +%FT%T%z)
GIT_HASH			:= $(shell git rev-parse HEAD)
GIT_REPO			:= $(shell git config --get remote.origin.url)
BUILDKITE_COMMIT	?= $(GIT_HASH)
APP_NAME 			?= client_portal-help
IMAGE_REPOSITORY	?= 896069866492.dkr.ecr.eu-west-1.amazonaws.com/client_portal-analytics-frontend
IMAGE_REPO_NAME		?= client_portal-analytics-frontend

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

.PHONY: up
up:
	docker-compose up --force-recreate --build -d
	docker-compose exec app yarn install
	docker-compose exec app yarn run start

.PHONY: down
down:
	docker-compose down --remove-orphans

.PHONY: tag-prod-image
tag-prod-image:
	.buildkite/put_ecr_tag.sh ${IMAGE_REPO_NAME} ${BUILDKITE_COMMIT}

.PHONY: image-scan
image-scan:
	.buildkite/ecr_scan_findings.sh ${IMAGE_REPO_NAME} ${BUILDKITE_COMMIT}
	