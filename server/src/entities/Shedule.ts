export default class Shedule {
    id: number;

    class_id: number;

    week_day: number;

    from: string;

    to: string;

    created_at: string;

    updated_at: string;
}

export interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
    class_id: number;
    id?: number;
    created_at?: string;
    updated_at?: string;
}
