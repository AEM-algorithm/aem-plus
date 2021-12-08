import {Injectable} from '@angular/core';

interface Data {
    data: any;
}

@Injectable({providedIn: 'root'})
export class MemoryProvider {
    private data;
    constructor() {
        this.data = {};
    }

    public setData(data: Data) {
        this.data = data;
    }

    public getData(): Data {
        return this.data;
    }

    public setResetData() {
        this.data = {};
    }
}
