APP=blog
VERSION?=latest
BUILD?=$(shell /bin/date +%Y%m%d%H%M%S)
# linux/amd64, linux/arm64
PLATFORM?=linux/arm64,linux/amd64
REGISTRY?=loneexile
HARBOR_REGISTRY?=harbor.voidbox.io/loneexile

ximage:
	docker buildx create --name imagebuilder --driver=remote tcp://buildkitd:1234 --bootstrap --use;
	cat ~/.docker/buildx/instances/imagebuilder;
	docker buildx build --cache-from=type=local,src=/var/lib/buildkit --cache-to=type=local,dest=/var/lib/buildkit,mode=max \
		-o type=registry --build-arg VERSION=$(VERSION) --build-arg BUILD=$(BUILD) \
		--platform=$(PLATFORM) . -t $(REGISTRY)/$(APP):$(BUILD) -t $(REGISTRY)/$(APP):latest \
		-t $(HARBOR_REGISTRY)/$(APP):$(BUILD) -t $(HARBOR_REGISTRY)/$(APP):latest
