import EML from "eml-lib"

async function launchMinecraft() {
    const launcher = new EML.Launcher({
        account: new EML.CrackAuth().auth("GrknDev"),
        serverId: "minecraft",
        minecraft: {
            version: "1.21.6",
        }

    })
    try {
        await launcher.launch()
        launcher.on("launch_debug", (e) => console.log(e))
        launcher.on("launch_data", (e) => console.log(e))
        launcher.on("launch_download", (e) => console.log(e))
    } catch (e) {
        console.log(e)
    }
}
export default launchMinecraft