let domain = 'http://localhost:10001/wms-api';

function getData(url,obj) {
    return $.post(url, objToJson(obj),function (data) {
        return data;
    });
}


function objToJson(Obj) {
    return JSON.stringify(Obj);
}