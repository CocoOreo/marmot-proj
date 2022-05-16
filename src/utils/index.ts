export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

const isVoid = (value: unknown) => {
    return value === undefined || value === null || value === "";
}
export const cleanObject = (obj: { [key: string]: unknown }) => {
    // [key:string]: unknown
    // Limit the form of obj {key:value,...}
    // To delete the empty param in http request
    // Create correct request params
    // http://localhost:3001/projects?name=&personId=0
    // For example, the name param should be removed if it doesn't have a value
    const result = { ...obj }
    Object.keys(result).forEach((key) => {
            if (isVoid(result[key])) {
                delete result[key]
            }
    })
    return result
}

export const resetRoute = ()=>{
    window.location.href = window.location.origin
}