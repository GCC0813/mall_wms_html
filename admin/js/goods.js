function set_goods_list_select(goodVrietyList) {
    let goodVriety = "";
    let goodVrietySelectStr = '';
    for (let i = 0, len = goodVrietyList.length; i < len; i++) {
        goodVriety = goodVrietyList[i];
        goodVrietySelectStr = goodVrietySelectStr + "<option value='" + goodVriety.vrietyId + "'>" + goodVriety.vrietyName + "</option>"
    }
    $("#cate-select-one").html(goodVrietySelectStr);

    let selectGoodVriety = $("#cate-select-one").val();
    let goodTagsList = goodVrietyList[selectGoodVriety].goodTagsList;
    let goodTags = "";
    let goodTagsSelectStr = "";
    for (let i = 0; i < goodTagsList.length; i++) {
        goodTags = goodTagsList[i];
        goodTagsSelectStr = goodTagsSelectStr + "<option value='" + goodTags.tagId + "'>" + goodTags.tagName + "</option>"
    }
    $("#tag-select-two").html(goodTagsSelectStr);
    $('#cate-select-one').change(function () {
        let selectGoodVriety = $("#cate-select-one").val();
        let goodTagsList = goodVrietyList[selectGoodVriety].goodTagsList;
        let goodTags = "";
        let goodTagsSelectStr = "";
        if (goodTagsList != null && goodTagsList.length>0) {
            for (let i = 0; i < goodTagsList.length; i++) {
                goodTags = goodTagsList[i];
                goodTagsSelectStr = goodTagsSelectStr + "<option value='" + goodTags.tagId + "'>" + goodTags.tagName + "</option>"
            }
        }
        $("#tag-select-two").html(goodTagsSelectStr);
    });
}