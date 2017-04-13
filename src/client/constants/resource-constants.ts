
let baseURL:string = window.location.protocol + "//" + window.location.host;

let apiBase:string = "https://mdengage-test.apigee.net/api/v1";

if (process.env.NODE_ENV === "development") {
    apiBase = baseURL + "/api/v1";
}

export const Resources = {

    URL:{

        base:baseURL,
        apiBase:apiBase,
    },

    REQUEST:{

        contentTypeJSON:"application/json",
        methods:{
            GET:"get",
            POST:"post",
            PUT:"put",
            DELETE:"delete"
        },
        headers:{
            AUTHORIZATION:"Authorization",
            ACCEPT:"Accept",
            CONTENT_TYPE:"Content-Type"
        }
    }
};