import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { WeeklySchedule } from 'src/app/shared/models/weekly-list.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async setSchedule(key: string, value: WeeklySchedule) {
    this._storage?.set(key, value);
  }

  public async getSchedule(key: string) : Promise<WeeklySchedule> {
    const retVal = await this._storage?.get(key);
    const schedule = new WeeklySchedule();
    console.log("Getting Schedule" + schedule);
    return retVal ?? new WeeklySchedule();
  }
}
