import { default as axios } from "axios";
import { SERVER_URL } from "../constant";

export const createBill = async function (payment) {
    try {
        const response = await axios.post(SERVER_URL + `/bill`, { payment }, {
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
