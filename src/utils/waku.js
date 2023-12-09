import { createLightNode } from "@waku/sdk";
import protobuf from "protobufjs";

// Create and start a Light Node
let node;

// Create a message structure using Protobuf
export const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("sender", 2, "string"))
    .add(new protobuf.Field("amount", 3, "string"))
    .add(new protobuf.Field("message", 4, "string"));

export async function initNode() {
    node = await createLightNode({ defaultBootstrap: true });
    await node.start();
}

export async function getWakuNode() {
    if (node && node.isStarted()) {
        return node;
    }
}