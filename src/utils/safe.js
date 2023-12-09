import { SafeAuthPack } from "@safe-global/auth-kit";
import Web3 from "web3";

const safeAuthInitOptions = {
    // enableLogging: true,
    showWidgetButton: false,
    chainConfig: {
        chainId: "0x13881",
        rpcTarget: `${"https://rpc-mumbai.maticvigil.com"}`,
    },
};

const safeAuthPack = new SafeAuthPack();
export let safeProvider;

export async function safeSignin() {
    await initSafeAuthPack();

    const authKitSignData = await safeAuthPack.signIn();
    localStorage.setItem("address", authKitSignData.eoa);
    console.log("Auth kit here", authKitSignData);
}

export async function getSafeProvider() {
    await initSafeAuthPack();
    return safeAuthPack.getProvider();
}

export async function initSafeAuthPack() {
    await safeAuthPack.init(safeAuthInitOptions);
}

export async function getWeb3() {
    const p = await getSafeProvider();
    console.log("provider here", p)
    const web3 = new Web3(p);
    return web3;
}