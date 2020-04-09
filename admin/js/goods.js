
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
                $.post(domain+'/goods/details',objToJson(jsonReq),function (res) {

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