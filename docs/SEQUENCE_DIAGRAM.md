
# Sequence Diagram  <!-- omit in toc -->
- [유저 토큰 발급 및 대기열 관리](#유저-토큰-발급-및-대기열-관리)
- [예약 가능 날짜 / 좌석 조회](#예약-가능-날짜--좌석-조회)
- [좌석 예약 요청](#좌석-예약-요청)
- [잔액 충전 / 조회](#잔액-충전--조회)
- [결제 처리](#결제-처리)

### 유저 토큰 발급 및 대기열 관리
```mermaid
sequenceDiagram
    participant User
    participant Auth Controller
    participant Queue Service
    participant Auth Service

    User->>Auth Controller: 유저 토큰 발급 요청
    Auth Controller->>Auth Service: 유저 토큰 발급 요청
    Auth Service-->>Queue Service: 대기열 정보 확인 요청
    Queue Service->>Auth Service: 대기열 정보 확인 응답
    Auth Service->>Auth Service: 유저 토큰 생성
    Auth Service-->>Auth Controller: 유저 토큰 발급 응답
    Auth Controller-->>User: 유저 토큰 발급 응답
```

### 예약 가능 날짜 / 좌석 조회
토큰으로 대기열 검증을 통과했다는 전제하에 진행
```mermaid
sequenceDiagram
    participant User
    participant Concerts Controller
    participant Reservation Service

    User->>Concerts Controller: 예약 가능 날짜 조회 요청
    Concerts Controller->>Reservation Service: 예약 가능 날짜 조회 요청
    Reservation Service-->>Concerts Controller: 예약 가능 날짜 목록 응답
    Concerts Controller-->>User: 예약 가능 날짜 목록 응답

    User->>Concerts Controller: 예약 가능 좌석 조회 요청
    Concerts Controller->>Reservation Service: 예약 가능 좌석 조회 요청
    Reservation Service-->>Concerts Controller: 예약 가능 좌석 목록 응답
    Concerts Controller-->>User: 예약 가능 좌석 목록 응답
```
### 좌석 예약 요청
```mermaid
sequenceDiagram
    participant User
    participant Concerts Controller 
    participant Reservation Service
    participant Auth Service
    participant Queue Service

    User->>Concerts Controller : 좌석 예약 요청
    Concerts Controller ->>Auth Service: 유저 토큰 검증
    Auth Service-->>Queue Service: 대기열 정보 확인 요청
    Queue Service->>Auth Service: 대기열 정보 확인 응답
    Auth Service-->>Concerts Controller : 토큰 검증 완료
    Concerts Controller->>Reservation Service: 좌석 예약 요청
    Reservation Service-->>Concerts Controller : 좌석 예약 완료
    Concerts Controller-->>User: 좌석 예약 완료
```

### 잔액 충전 / 조회
```mermaid
sequenceDiagram
    participant User
    participant Payment Controller
    participant Payment Service

    User->>Payment Controller: 잔액 충전 요청
    Payment Controller->>Payment Service: 잔액 충전 요청
    Payment Service-->>Payment Controller: 잔액 충전 완료
    Payment Controller-->>User: 잔액 충전 완료

    User->>Payment Controller: 잔액 조회 요청
    Payment Controller->>Payment Service: 잔액 조회 요청
    Payment Service-->>Payment Controller: 잔액 조회 응답
    Payment Controller-->>User: 잔액 조회 응답
```

### 결제 처리
```mermaid
sequenceDiagram
    participant User
    participant Payment Controller
    participant Payment Service
    participant Reservation Service
    participant Queue Service
    participant Auth Service

    User->>Payment Controller: 결제 요청
    Payment Controller->>Auth Service: 유저 토큰 검증
    Auth Service-->>Payment Controller: 토큰 검증 완료
    Payment Controller->>Payment Service: 결제 요청
    Payment Service->>Reservation Service: 좌석 소유권 배정 요청
    Reservation Service->>Queue Service: 대기열 만료 요청
    Queue Service->>Reservation Service: 대기열 만료 응답
    Reservation Service-->>Payment Service: 좌석 소유권 배정 완료
    Payment Service-->>Payment Controller: 결제 완료 응답
    Payment Controller-->>User: 결제 완료 및 좌석 소유권 배정 응답
```

