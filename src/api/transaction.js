import { default as axios } from "axios";

export const getTransactionsByAccount = async function (add) {
    try {
        const response = await axios.get(
            `https://api.celoscan.io/api?module=account&action=txlist&address=${add}&sort=desc&apikey=MZ78JFG7CT5UFGU9QKA2W65EJQVHT7B2NG`, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};