
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
            $("#pic-img img").remove()
            $.each(data.picUrls, function (index, pic) {
                $("#pic-img").append('<td><img class="layui-upload-img" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button" onclick="delete_img(this,1)"><i class="layui-icon"></i></button></td>');
            });
            layer.photos({
                photos: '#pic-img'
                ,anim: 0
            });
            $("#detail-pic-img img").remove()
            $.each(data.detailPicUrls, function (index, pic) {
                $("#detail-pic-img").append('<td><img class="layui-upload-img" onmouseover="set_delete_button_isShow(this,1)" onmouseout="set_delete_button_isShow(this,2)" src="'+pic+'"><button class="delete-img-button" onclick="delete_img(this,2)"><i class="layui-icon"></i></button></td>');
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
                if($("#pic-img img").length<6){
                    $("#pic-img").append('<td id="goods-add-img-edit-container"><button title="添加商品主图" class="layui-btn layui-btn-primary add-img-edit" id="goods-add-img-edit">+</button></td>');
                }
                Qiniu.uploader({
                    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                    browse_button: 'goods-add-img-edit',         // 上传选择的点选按钮，必需
                    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                    //uptoken : domain+'/upload/getQiniuToken', // uptoken是上传凭证，由其他程序生成
                    uptoken_url: domain + '/upload/getQiniuToken',// Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                    // uptoken_func: function(){    // 在需要获取uptoken时，该方法会被调用
                    //    // do something
                    //    return uptoken;
                    // },
                    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                    // downtoken_url: '/downtoken',
                    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                    //unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                    domain: 'http://static.gcc666.top/',     // bucket域名，下载资源时用到，必需
                    container: 'goods-add-img-edit-container',             // 上传区域DOM ID，默认是browser_button的父元素
                    max_file_size: '100mb',             // 最大文件体积限制
                    //flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                    max_retries: 3,                     // 上传失败最大重试次数
                    dragdrop: true,                     // 开启可拖曳上传
                    drop_element: 'goods-add-img-edit-container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function (up, files) {
                            plupload.each(files, function (file) {
                                // 文件添加进队列后，处理相关的事情
                            });
                        },
                        'BeforeUpload': function (up, file) {
                            // 每个文件上传前，处理相关的事情
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时，处理相关的事情
                        },
                        'FileUploaded': function (up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            let qiniuHeadKey = JSON.parse(info).key;
                            let src = up.getOption('domain') + qiniuHeadKey;
                            let goods_add_img_edit_container=$("#goods-add-img-edit-container");
                            goods_add_img_edit_container.before('<td><img class="layui-upload-img" src="'+src+'"></td>')
                            goods_add_img_edit_container.css("display",'none');
                            if($("#pic-img img").length<6){
                                goods_add_img_edit_container.css("display",'block');
                            }else {
                                layer.msg("商品主图最多6张图片,不可继续增加！！")
                            }
                            layer.photos({
                                photos: '#pic-img'
                                ,anim: 0
                            });
                        },
                        'Error': function (up, err, errTip) {
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后，处理相关的事情
                        },
                        'Key': function (up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            /*   var key = "";
                        // do something with key here
                        return key*/
                        }
                    }
                });

                if($("#detail-pic-img img").length<6){
                    $("#detail-pic-img").append('<td id="goods-add-detail-img-edit-container"><button title="添加商品详情图" class="layui-btn layui-btn-primary add-img-edit" id="goods-add-detail-img-edit">+</button></td>')
                }
                Qiniu.uploader({
                    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                    browse_button: 'goods-add-detail-img-edit',         // 上传选择的点选按钮，必需
                    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                    //uptoken : domain+'/upload/getQiniuToken', // uptoken是上传凭证，由其他程序生成
                    uptoken_url: domain + '/upload/getQiniuToken',// Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                    // uptoken_func: function(){    // 在需要获取uptoken时，该方法会被调用
                    //    // do something
                    //    return uptoken;
                    // },
                    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                    // downtoken_url: '/downtoken',
                    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                    //unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                    domain: 'http://static.gcc666.top/',     // bucket域名，下载资源时用到，必需
                    container: 'goods-add-detail-img-edit-container',             // 上传区域DOM ID，默认是browser_button的父元素
                    max_file_size: '100mb',             // 最大文件体积限制
                    //flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                    max_retries: 3,                     // 上传失败最大重试次数
                    dragdrop: true,                     // 开启可拖曳上传
                    drop_element: 'goods-add-detail-img-edit-container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function (up, files) {
                            plupload.each(files, function (file) {
                                // 文件添加进队列后，处理相关的事情
                            });
                        },
                        'BeforeUpload': function (up, file) {
                            // 每个文件上传前，处理相关的事情
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时，处理相关的事情
                        },
                        'FileUploaded': function (up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            let qiniuHeadKey = JSON.parse(info).key;
                            let src = up.getOption('domain') + qiniuHeadKey;
                            let goods_add_img_edit_container=$("#goods-add-detail-img-edit-container");
                            goods_add_img_edit_container.before('<td><img class="layui-upload-img" src="'+src+'"></td>')
                            goods_add_img_edit_container.css("display",'none');
                            if($("#detail-pic-img img").length<6){
                                goods_add_img_edit_container.css("display",'block');
                            }else {
                                layer.msg("商品详情图最多6张图片,不可继续增加！！")
                            }
                            layer.photos({
                                photos: '#detail-pic-img'
                                ,anim: 0
                            });
                        },
                        'Error': function (up, err, errTip) {
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后，处理相关的事情
                        },
                        'Key': function (up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            /*   var key = "";
                        // do something with key here
                        return key*/
                        }
                    }
                });
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



