FROM golang:1.22.2 as builder

WORKDIR /listmonk-backend

COPY go.mod ./

COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o myapp ./

FROM alpine:3.19.1

RUN apk --no-cache add ca-certificates=20240226-r0

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

WORKDIR /listmonk-backend/

COPY --from=builder /listmonk-backend/myapp /listmonk-backend/

EXPOSE 8080

ENTRYPOINT ["/listmonk-backend/myapp"]

