import { Component, OnInit } from "@angular/core";
import { JsonService } from "../_services/json.service";
import { Router } from "@angular/router";

declare var $: any;
@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    public talents = {
        "Freedom": [],
        "Prosperity": [],
        "Resistance": [],
        "Diligence": [],
        "Ballad": [],
        "Gold": []
    };
    public charPath: string = "../../assets/resources/characters/";
    public weapons = {
        "Decarabian": [],
        "Relic": [],
        "Fang": [],
        "Dango": [],
        "Shackle": [],
        "Aerosiderite": []
    };
    public weapPath: string = "../../assets/resources/items/";
    
    constructor(
        private json: JsonService,
        private router: Router
    ) { }

    ngOnInit() {
        console.log("Router: " + this.router.url);
        const parsedUrl = new URL(window.location.href);
        const baseUrl = parsedUrl.origin;
        console.log("windowlocation" + baseUrl);

        this.json.getJSON("assets/resources/items/_weapons.json")
            .subscribe((data: any) => {
                for (let type in this.weapons) {
                    for (let quality of data[type]) {
                        this.weapons[type].push({
                            name: quality.name.replace("_", " "),
                            quality: quality.quality,
                            path: this.weapPath + quality.name + ".png"
                        }); 
                    }
                }
            });

        this.json.getJSON("assets/resources/talents/_talents.json")
            .subscribe((data: any) => {
                for (let type in this.talents) {
                    for (let char of data[type]) {
                        this.talents[type].push({
                            name: char,
                            path: this.charPath + char + ".png"
                        });
                    }
                }
            });
    }

}
