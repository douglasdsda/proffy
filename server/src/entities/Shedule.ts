export default class Shedule {
    id: number;

    class_id: number;

    week_day: number;

    from: string;

    to: string;
}

export interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
    class_id: number;
    id?: number;
}
