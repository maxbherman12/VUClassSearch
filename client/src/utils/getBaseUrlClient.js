const production = false;

export function getBaseUrlClient(){
    return production ? "https://vuclasssearch.herokuapp.com" : "http://localhost:8080"
}