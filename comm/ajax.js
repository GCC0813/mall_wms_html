let domain = 'http://127.0.0.1:10001/wms-api';

function getData(url,obj) {
    return $.post(url, objToJson(obj),function (data) {
        return data;
    });
}


function objToJson(Obj) {
    return JSON.stringify(Obj);
}