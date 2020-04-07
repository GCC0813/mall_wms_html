let domain = 'http://localhost:10001/wms-api';

function objToJson(Obj) {
    return JSON.stringify(Obj);
}


function dateToCurr(date) {
    return new Date(date+' 00:00:00:000').getTime()/1000;
}

function check(v) {
    if(v.length>0){
        return true;
    }else {
        return false;
    }
}

function popupMsg(a) {
    layer.msg(a)
}

function setSessionID(id) {
    window.sessionStorage.setItem('ID',id);
}