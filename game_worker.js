import { CreateAnimatronics } from "./modules/animatronics.js";

onmessage = function(e) {
    const e = e.data;
    if (e.type === "start") {
        new CreateAnimatronics;
    }
}