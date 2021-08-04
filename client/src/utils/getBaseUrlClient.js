const production = true;

const deployedUrl = "https://www.vuclasssearch.com"

export function getBaseUrlClient(){
    return production ? deployedUrl : "http://localhost:8080"
}