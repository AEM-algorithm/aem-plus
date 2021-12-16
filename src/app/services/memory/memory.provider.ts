import {Injectable} from '@angular/core';
import _ from 'lodash';

interface Data {
    data: any;
    version: number;
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

    public hasData(): boolean {
        return !_.isEmpty(this.data);
    }
}
