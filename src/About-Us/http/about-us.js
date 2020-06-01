import axios from "axios";

import { aboutUsUrl } from "../config";

export const fetchOrganizationData = async (organizationName) => (
    axios.get(`${aboutUsUrl}/get_organization_info/`, {
        params: {
            organizationName,
        },
    })
);
