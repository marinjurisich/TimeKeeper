export class ClockInItem {

    type: "clock_in" | "clock_out";
    time: Date;

    constructor(type: any, time: Date) {
        this.type = type;
        this.time = time;
    }

    getTime() {
        return this.time.toISOString().substring(11, 16);
    }

    getDate() {
        return this.time.toISOString().substring(0, 10);
    }
}
