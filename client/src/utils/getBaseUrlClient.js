const production = true;

const deployedUrl = "https://vuclasssearch.herokuapp.com"

export function getBaseUrlClient(){
    return production ? deployedUrl : "http://localhost:8080"
}