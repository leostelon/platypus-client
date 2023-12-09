import { default as axios } from "axios";
import { SERVER_URL } from "../constant";

export const distributeFunds = async function (id) {
    try {
        const response = await axios.post(SERVER_URL + `/jwt/admin`, {
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
