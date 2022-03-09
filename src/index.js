import Server from "./server.js";

const server = Server.listen(3000, () => {
    console.log("Running", server.address().port);
});
