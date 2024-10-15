import { CreateAnimatronics } from "./modules/animatronics.js";

window.addEventListener("message", event => {
    const e = e.data;
    if (e.type === "start") {
        new CreateAnimatronics;
    }
});