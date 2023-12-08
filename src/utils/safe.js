import { SafeAuthPack } from "@safe-global/auth-kit";

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
    safeProvider = getSafeProvider();
}

export function getSafeProvider() {
    return safeAuthPack.getProvider();
}

export async function initSafeAuthPack() {
    await safeAuthPack.init(safeAuthInitOptions);
}
