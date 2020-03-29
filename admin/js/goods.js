function f() {
    var provinceArray = "";
    var provicneSelectStr = "";
    for (var i = 0, len = province.length; i < len; i++) {
        provinceArray = province[i];
        provicneSelectStr = provicneSelectStr + "<option value='" + provinceArray[0] + "'>" + provinceArray[1] + "</option>"
    }
    $("#cate-select-one").html(provicneSelectStr);

    var selectCity = $("#cate-select-one").val();
    var citylist = city[selectCity];
    var cityArray = "";
    var citySelectStr = "";
    for (var i = 0, len = citylist.length; i < len; i++) {
        cityArray = citylist[i];
        citySelectStr = citySelectStr + "<option value='" + cityArray[0] + "'>" + cityArray[1] + "</option>"
    }
    $("#tag-select-two").html(citySelectStr);

    /*var selectschool = $("#city").val();
    var schoolUlStr = "";
    var schoolListStr = allschool[selectschool];
    for(var i=0,len=schoolListStr.length;i<len;i++){
        schoolUlStr = schoolUlStr + "<option >"+schoolListStr[i][2]+"</option>";
    }
    schoolUlStr = schoolUlStr + "<option value='999'>其它</option>";
    $("#school").html(schoolUlStr);*/
//省切换事件
    $('#cate-select-one').change(function () {
        var selectCity = $("#cate-select-one").val();
        var citylist = city[selectCity];
        var cityArray = "";
        var citySelectStr = "";
        if (citylist != null) {
            for (var i = 0, len = citylist.length; i < len; i++) {
                cityArray = citylist[i];
                citySelectStr = citySelectStr + "<option value='" + cityArray[0] + "'>" + cityArray[1] + "</option>"
            }
        }

        $("#tag-select-two").html(citySelectStr);
        /*   $("#school1").show();
           $("#school2").hide();
           var selectschool = $("#city").val();
           var schoolUlStr = "";
           var schoolListStr = allschool[selectschool];
           for(var i=0,len=schoolListStr.length;i<len;i++){
               schoolUlStr = schoolUlStr + "<option >"+schoolListStr[i][2]+"</option>";
           }
           schoolUlStr = schoolUlStr + "<option value='999'>其它</option>";
           $("#school").html(schoolUlStr);*/
    });
/*//切换城市事件
    $("#city").change(function () {
        $("#school1").show();
        $("#school2").hide();
        var selectschool = $("#city").val();
        var schoolUlStr = "";
        var schoolListStr = allschool[selectschool];
        for (var i = 0, len = schoolListStr.length; i < len; i++) {
            schoolUlStr = schoolUlStr + "<option >" + schoolListStr[i][2] + "</option>";
        }
        schoolUlStr = schoolUlStr + "<option value='999'>其它</option>";
        $("#school").html(schoolUlStr);
    });
    $("#school").change(function () {
        if ($("#school").val() == "999") {
            $("#school1").hide();
            $("#school2").show();
        }
    });
    $("#second").show();
    $("#restart").css("backgorund", "url('assets/images/chongxintijiao.jpg') no-repeat");*/
}