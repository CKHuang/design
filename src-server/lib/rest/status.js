export default {
    Ok: 200,
    No_Content: 204,
    Bad_Request: 400,
    Unauthorized: 401,
    Forbidden: 403,
    Not_Found: 404,
    Internal_Server_Error: 500,
    Not_Implemented: 501,

    throw(status,error = ``) {
        const err = error instanceof Error ? error : new Error(error.toString());
              err.status = status;
        throw err
    }
}