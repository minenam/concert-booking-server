import { Seat } from './seat.entity';

export class Concert {
  id?: number | null;
  name: string;
  seats?: Seat[];
}

export class ConcertDates {
  dates: string[];
}
