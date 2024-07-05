## ERD
```mermaid
erDiagram
    USER {
        UUID id PK
        DECIMAL balance "default: 0"
    }

    QUEUE {
        INT id PK "AutoIncrement"
        UUID user_id FK
        INT position
        DATETIME created_at "default: CURRENT_TIMESTAMP"
    }

	CONCERT {
		INT id PK "AutoIncrement"
		CHAR name
	}

	CONCERT_SCHEDULE {
		INT id PK "AutoIncrement"
		INT concert_id FK
		INT schedule_id FK
		INT seat_id FK
	}

	SCHEDULE {
        INT id PK "AutoIncrement"
		DATE date
    }

    SEAT {
        INT id PK "AutoIncrement"
        INT seat_number
        ENUM status "PENDING, RESERVED, COMPLETED, CANCELLED"
		DECIMAL price
    }

	RESERVATION {
        INT id PK "AutoIncrement"
		INT seat_id FK
		UUID user_id FK
		DATETIME reserved_until	"Nullable"
    }

    PAYMENT {
        INT id PK "AutoIncrement"
        UUID user_id FK
		INT reservation_id FK
        DECIMAL amount
        DATETIME timestamp
    }

    USER ||--o{ QUEUE: has
    USER ||--o{ RESERVATION: makes
    USER ||--o{ PAYMENT: performs
    PAYMENT |o--|| RESERVATION: includes
	CONCERT_SCHEDULE }|--|| SCHEDULE: has
	CONCERT ||--|{ CONCERT_SCHEDULE: has
	CONCERT_SCHEDULE }|--|| SEAT: has
	RESERVATION }o--|| SEAT: has