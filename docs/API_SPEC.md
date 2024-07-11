# API 명세서 <!-- omit in toc -->
- [유저 토큰 발급 API](#유저-토큰-발급-api)
- [예약 가능 날짜 조회 API](#예약-가능-날짜-조회-api)
- [예약 가능 좌석 조회 API](#예약-가능-좌석-조회-api)
- [좌석 예약 요청 API](#좌석-예약-요청-api)
- [잔액 충전 API](#잔액-충전-api)
- [잔액 조회 API](#잔액-조회-api)
- [결제 API](#결제-api)


> [!NOTE] Common Response 
> ```json
> {
> 	"statusCode": "number",
> 	"message": "string"
> }

## 유저 토큰 발급 API
- Endpoint: `/api/v1/auth/token`
- Method: `POST`
- Request Body:
	```json
	{
		"userId": "uuid"
	}
	```
- Response:
	```json
	{
		"token": "string",
		"queueInfo": {
			"position": "number",
			"estimatedWaitTime": "number"
		}
	}
	```
## 예약 가능 날짜 조회 API
- Endpoint: `/api/v1/concerts/reservations/dates`
- Method: `GET`
- Response:
	```json
	{
		"dates": ["YYYY-MM-DD", "YYYY-MM-DD"]
	}
	```
## 예약 가능 좌석 조회 API
 Endpoint: `/api/v1/concerts/reservations/seats`
- Method: `GET`
- Request Query Params:
	- date: "YYYY-MM-DD"
- Response:
	```json
	{
		"seats": [1, 2, 3, ..., 50]
	}
	```
## 좌석 예약 요청 API
- Endpoint: `/api/v1/concerts/reservations`
- Method: `POST`
- Request Body:
	```json
	{
		"date": "YYYY-MM-DD",
		"seat": 1,
		"token": "string"
	}
	```
- Response:
	```json
	{
		"reservationId": "number",
		"status": "RESERVED",
		"reservedUtil": "YYYY-MM-DDTHH:MM:SS"
	}
	```
## 잔액 충전 API
- Endpoint: `/api/v1/payment/charge`
- Method: `POST`
- Request Body:
	```json
	{
		"userId": "uuid",
		"amount": 100.0
	}
	```
- Response:
	```json
	{
		"balance": 200.0
	}
	```
## 잔액 조회 API
- Endpoint: `/api/v1/payment/balance/:userId`
- Method: `GET`
- Request Params:
	- userId: "uuid"
- Response:
	```json
	{
		"balance": 200.0
	}
	```
## 결제 API
- Endpoint: `/api/v1/payment`
- Method: `POST`
- Request Body:
	```json
	{
		"amount": 100.0,
		"reservationId": "number",
		"token": "string"
	}
	```
- Response:
	```json
	{
		"reservationId": "number",
		"status": "COMPLETED"
	}
	```
