
function initialization(goodsId,loadIndex,index){
    let jsonReq={
        goodsId : goodsId
    };
    $.post(domain+'/goods/details',objToJson(jsonReq),function (res) {
        if(res){
            layer.close(loadIndex);
        }
        if(res.code ===200){
            let data =res.data;
            $('#goods-name').attr('placeholder',data.name);
            $("#pic-img img").remove()
            $.each(data.picUrls, function (index, pic) {
                $("#pic-img").append('<td><img class="layui-upload-img" src="'+pic+'" style="height: 100px"></td>');
            });
            layer.photos({
                photos: '#pic-img'
                ,anim: 0
            });
            $("#detail-pic-img img").remove()
            $.each(data.detailPicUrls, function (index, pic) {
                $("#detail-pic-img").append('<td><img class="layui-upload-img" src="'+pic+'" style="height: 100px"></td>');
            });
            layer.photos({
                photos: '#detail-pic-img'
                ,anim: 0
            });

            $('#goods-synopsis').attr('placeholder',data.synopsis);

            let goods_category = $('#goods-category');
            let goods_tag = $('#goods-tag');
            let goods_supplier = $('#goods-supplier');
            let physical_or_virtual = $('#physical-or-virtual')
            if(index===1){
                goods_category.attr('placeholder',data.categoryName);
                goods_tag.attr('placeholder',data.tagName);
                goods_supplier.attr('placeholder',data.supplier);
                physical_or_virtual.attr('placeholder',data.physicalOrVirtual);
            }else if(index===2){
                let o ={
                    categoryId:data.categoryId,
                    tagId:data.tagId
                };
                $.post(domain+'/goods/details/goodsVariety',objToJson(o),function (resp) {
                    if(resp.code===200){
                        set_category_tag(resp.data.rows);
                    }else {
                        $("#goods_category_select").html('<option value="0">直接选择或搜索选择分类</option>');
                        $("#goods_tag_select").html('<option value="0">直接选择或搜索选择标签</option>');
                    }
                });
            }
            $('#market-price').attr('placeholder','￥'+data.marketPrice);
            $('#purchase-price').attr('placeholder','￥'+data.purchasePrice);

            let goodsStatus = $('#goods-status');
            if(data.status===2){
                goodsStatus.addClass("layui-btn-disabled");
            }
            goodsStatus.text(data.statusStr);
            let goodsCheckStatus = $('#good-check-status');
            if(data.checkStatus===1){
                goodsCheckStatus.removeClass("layui-btn-disabled")
                $("#confirmation-audit").remove();
            }
            goodsCheckStatus.text(data.checkStatusStr);

            $('#goods-toExamine-people').attr('placeholder',data.toExamine);
            $('#goods-toExamine-time').attr('placeholder',data.toExamineTime);
            $('#goods-founder').attr('placeholder',data.founder);
            $('#goods-founder-time').attr('placeholder',data.createTime);
            $('#goods-modifier').attr('placeholder',data.modifier);
            $('#goods-modify-time').attr('placeholder',data.modificationTime);
            if(index===2){
                $("#pic-img").append('<td><button title="添加商品主图" class="layui-btn layui-btn-primary add-img-edit">+</button></td>');
                $("#detail-pic-img").append('<td><button title="添加商品详情图" class="layui-btn layui-btn-primary add-img-edit">+</button></td>')
            }
        }else {
            layer.msg(res.msg)
        }
    });
}
function set_category_tag(goodVrietyList) {
    let form = layui.form;
    let $ = layui.$;
    let goodVriety = "";
    let goodVrietySelectStr = '';
    let goods_category_select = $("#goods_category_select");
    for (let i = 0, len = goodVrietyList.length; i < len; i++) {
        goodVriety = goodVrietyList[i];
        goodVrietySelectStr +="<option value='" + goodVriety.vrietyId + "'>" + goodVriety.vrietyName + "</option>"
    }
    goods_category_select.html(goodVrietySelectStr);

    let selectGoodVriety = goods_category_select.val();

    let goodTagsList="";
    for (let i in goodVrietyList){
        if(goodVrietyList[i].vrietyId === parseInt(selectGoodVriety)){
            goodTagsList = goodVrietyList[i].goodTagsList
        }
    }
    let goodTags = "";
    let goodTagsSelectStr = "";
    for (let i = 0; i < goodTagsList.length; i++) {
        goodTags = goodTagsList[i];
        goodTagsSelectStr += "<option value='" + goodTags.tagId + "'>" + goodTags.tagName + "</option>"
    }
    $("#goods_tag_select").html(goodTagsSelectStr);
    form.on('select(check_on_tag)', function(data){
        let obj={
            categoryId : data.value
        };
        $.post(domain+'/goods/details/get_tags_by_cate',objToJson(obj),function (resp) {
            if (resp.code === 200) {
                let goodTagsList = resp.data.rows;
                let tag = "";
                $.each(goodTagsList,function (index, data) {
                    tag += '<option value="'+data.tagId+'">'+data.tagName+'</option>';
                });
                $("#goods_tag_select").html(tag);
                form.render('select');
            } else {
                $("#goods_tag_select").html('<option value="0">直接选择或搜索选择标签</option>');
            }
        });
    });
    form.render('select');
}