
function initialization(goodsId,loadIndex,index){
    let jsonReq={
        goodsId : goodsId
    };
    let form = layui.form;
    $.post(domain+'/goods/details',objToJson(jsonReq),function (res) {
        if(res){
            layer.close(loadIndex);
        }
        if(res.code ===200){
            let data =res.data;
            $('#goods-name').attr('placeholder',data.name);
            if(data.picUrls!==null&&data.picUrls.length>0){
                $("#pic-img img").remove();
                if(index===1){
                    $.each(data.picUrls, function (index, pic) {
                        //$("#goods-add-img-edit-container").before('<td><img class="layui-upload-img" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button" onclick="delete_img(this,1)"><i class="layui-icon"></i></button></td>')
                        $("#pic-img").append('<td><img class="layui-upload-img layui-anim layui-anim-scale" src="'+pic+'"></td>');
                    });
                }
                if(index===2){
                    $.each(data.picUrls, function (index, pic) {
                        $("#goods-add-img-edit-container").before('<td><img class="layui-upload-img layui-anim layui-anim-scale" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button" onclick="delete_img(this,1)"><i class="layui-icon"></i></button></td>')
                        /*$("#pic-img").append('<td><img class="layui-upload-img" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button" onclick="delete_img(this,1)"><i class="layui-icon"></i></button></td>');*/
                    });
                }
            }
            layer.photos({
                photos: '#pic-img'
                ,anim: 0
            });
            if(data.detailPicUrls!==null&&data.detailPicUrls.length>0){
                $("#detail-pic-img img").remove();
                if(index===1){
                    $.each(data.detailPicUrls, function (index, pic) {
                        $("#detail-pic-img").append('<td><img class="layui-upload-img layui-anim layui-anim-scale" src="'+pic+'"></td>');
                    });
                }
                if(index===2){
                    $.each(data.detailPicUrls, function (index, pic) {
                        $("#goods-add-detail-img-edit-container").before('<td><img class="layui-upload-img layui-anim layui-anim-scale" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button layui-anim layui-anim-scale" onclick="delete_img(this,2)"><i class="layui-icon"></i></button></td>');
                    });
                }
            }
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
            }else if(index===2) {
                let o = {
                    categoryId: data.categoryId,
                    tagId: data.tagId
                };
                $.post(domain + '/goods/details/goodsVariety', objToJson(o), function (resp) {
                    if (resp.code === 200) {
                        set_category_tag(resp.data.rows);
                    } else {
                        $("#goods_category_select").html('<option value="0">直接选择或搜索选择分类</option>');
                        $("#goods_tag_select").html('<option value="0">直接选择或搜索选择标签</option>');
                    }
                });
                if (data.isPhysicalOrVirtual === 0) {
                    $("#physical-or-virtual").html('<option value="0">虚拟</option><option value="1">实物</option>')
                } else if (data.isPhysicalOrVirtual === 1) {
                    $("#physical-or-virtual").html('<option value="0">实物</option><option value="1">虚拟</option>')
                }
                form.render('select');
                let supplier = {
                    supplierId: data.supplierId
                };
                $.post(domain + '/goods/details/supplier', objToJson(supplier), function (resp) {
                    if (resp.code === 200) {
                        let supplierList = resp.data.rows;
                        let supplier_select = '<option value="' + data.supplierId + '">' + data.supplier + '</option>';
                        $.each(supplierList, function (index, supplier) {
                            supplier_select += '<option value="' + supplier.id + '">' + supplier.name + '</option>'
                        });
                        $("#goods-supplier").html(supplier_select);
                    } else {
                        $("#goods-supplier").html('<option value="0">直接选择或搜索选择分类</option>');
                    }
                    form.render('select');
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
                if($("#pic-img img").length>=6){
                    $("#goods-add-img-edit-container").css("display",'none');
                    //$("#pic-img").append('<td id="goods-add-img-edit-container"><button title="添加商品主图" class="layui-btn layui-btn-primary add-img-edit" id="goods-add-img-edit">+</button></td>');
                }

                if($("#detail-pic-img img").length>=6){
                    $("#goods-add-detail-img-edit-container").css("display",'none');
                    //$("#detail-pic-img").append('<td id="goods-add-detail-img-edit-container"><button title="添加商品详情图" class="layui-btn layui-btn-primary add-img-edit" id="goods-add-detail-img-edit">+</button></td>')
                }

            }
        }else if(res.code===102) {
            layer.msg(res.msg,{icon:5,offset: '20px'},function () {
                top.location='../login.html'
            })
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
            } else {
                $("#goods_tag_select").html('<option value="0">直接选择或搜索选择标签</option>');
            }
            form.render('select');
        });
    });
    form.render('select');
}

function set_delete_button_isShow(oc,id) {
    let button =  $(oc).next();
    if(id===1){
        button.css("display",'inline-block').css("opacity",1)
    }else if(id===2){
        button.css("display",'none')
    }
}

function delete_img(th,cos) {
    layer.confirm('本次删除是静态删除,可以通过刷新页面重新选择删除,是否确认？',
        {btn: ["确认","取消"]},function(index){
        $(th).prev().remove();
        layer.close(index);
        if(cos===1){
            if($("#pic-img img").length<6){
                $("#goods-add-img-edit-container").css("display",'block');
            }
            layer.photos({
                photos: '#pic-img'
                ,anim: 0
            });
        }else if(cos===2) {
            if($("#detail-pic-img img").length<6){
                $("#goods-add-detail-img-edit-container").css("display",'block');
            }
            layer.photos({
                photos: '#detail-pic-img'
                ,anim: 0
            });
        }
    });
}




