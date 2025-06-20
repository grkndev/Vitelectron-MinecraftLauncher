import EML from "eml-lib"
import MCCore from "minecraft-launcher-core"

async function launchMinecraft(mainWindow?: any) {
    const launcher = new EML.Launcher({
        account: new EML.CrackAuth().auth("GrknDev"),
        serverId: "minecraft",
        minecraft: {
            version: "1.21.6",
        }

    })
    try {
        launcher.launch().then(() => {
            // console.log("launch success")
            if (mainWindow) {
                setTimeout(() => {
                    mainWindow.webContents.send('launch-success')
                }, 5_000)
               
            }
        }).catch((e) => {
            // console.log(e)
            if (mainWindow) {
                mainWindow.webContents.send('launch-error', e)
            }
        })

        launcher.on("launch_download", (e) => {
            // console.log("launch_download", e)
            if (mainWindow) {
                mainWindow.webContents.send('launch-download', e)
            }
        })

        launcher.on("download_progress", (e) => {
            // console.log("download_progress", e)
            if (mainWindow) {
                mainWindow.webContents.send('download-progress', e)
            }
        })

        launcher.on("download_end", (e) => {
            // console.log("download_end", e)
            if (mainWindow) {
                mainWindow.webContents.send('download-end', e)
            }
        })

        // NO LOGS
        // launcher.on("copy_progress",    (e) => console.log("copy_progress", e))
        // launcher.on("extract_progress",  (e) => console.log("extract_progress", e))
        // launcher.on("copy_debug",       () => console.log("copy_debug"))

        // EMPTY LOGS
        // launcher.on("copy_end",         () => console.log("copy_end"))
        // launcher.on("extract_end",       () => console.log("extract_end"))
        // launcher.on("launch_compute_download",   () => console.log("launch_compute_download"))

        // launcher.on("launch_data",               (e) => console.log("launch_data", e))
        // launcher.on("launch_install_loader",     (e) => console.log("launch_install_loader", e))
        // launcher.on("launch_close",              () => console.log("launch_close"))
        // launcher.on("launch_copy_assets",        () => console.log("launch_copy_assets"))
        // launcher.on("launch_extract_natives",    () => console.log("launch_extract_natives"))
        // launcher.on("launch_debug",              () => console.log("launch_debug"))
        // launcher.on("launch_patch_loader",       () => console.log("launch_patch_loader"))

    } catch (e) {
        console.log(e)
        if (mainWindow) {
            mainWindow.webContents.send('launch-error', e)
        }
    }
}

async function test() {
    console.log("launching minecraft async")
    const launcher = new MCCore.Client()
    let opts: MCCore.ILauncherOptions = {
        authorization: MCCore.Authenticator.getAuth("grkndev"),
        root: "./minecraft",
        version: {
            number: "1.21.6",
            type: "release",
        },
        memory: {
            max: "2G",
            min: "1G",
        },
    }

    launcher.launch(opts)
    launcher.on("data", (e) => console.log("data: ", e))
    // launcher.on("download", (e) => console.log("download: ", e))
    // launcher.on("progress", (e) => console.log("progress: ", e))
}
export default launchMinecraft