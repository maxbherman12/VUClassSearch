const production = true;

export function getBaseUrlClient(){
    return production ? "https://vuclasssearch.herokuapp.com" : "http://localhost:8080"
}