import pgp from "pg-promise";

class Driver {
    id: number;
    name: string;
    driver_code: string;

    rawType: boolean;

    constructor(id: number, driver_code: string, name: string) {
        this.rawType = true;
        this.id = id;
        this.driver_code = driver_code;
        this.name = name;
    }

    toPostgres() {
        return pgp.as.format(
            'drives(id, driver_vode, name) values($1, $2, $3)',
            [this.id, this.driver_code, this.name],
        );
    }
}