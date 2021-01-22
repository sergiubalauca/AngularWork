import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
    providedIn: 'root'
})
export class Connectivity {
    private status = 'ONLINE' || 'OFFLINE';

    public connectionStatus() {
        console.log("Connection status: " + this.status);
        return this.status;
    }

    isConnected = false;

    constructor(private connectionService: ConnectionService) {
        this.connectionService.monitor().subscribe(connectionStatus => {
            this.isConnected = connectionStatus;

            if (this.isConnected) {
                this.status = "ONLINE";
            }
            else {
                this.status = "OFFLINE";
            }
        })
    }
}