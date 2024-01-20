FROM golang:1.21.6 as builder

WORKDIR /listmonk-backend

COPY go.mod ./

COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o myapp ./

FROM alpine:latest

RUN apk --no-cache add ca-certificates

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /listmonk-backend/

COPY --from=builder /listmonk-backend/myapp /listmonk-backend/

# Set the user to the non-root user
USER appuser

EXPOSE 8080

ENTRYPOINT ["/listmonk-backend/myapp"]

