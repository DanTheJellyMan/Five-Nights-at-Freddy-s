import { CreateAnimatronics } from "./modules/animatronics.js";

self.onmessage = function(event) {
    const e = event.data;
    console.log(event, e);
    if (e.type === "start") {
        console.log(new CreateAnimatronics());
    }
}