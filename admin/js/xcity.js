$.fn.xcity = function(pName,cName){

    this.p = $(this).find('select[id=cate-select-one]');

    this.c = $(this).find('select[id=tag-select-two]');

    this.cityList = [];

    this.showP  = function(provinceList) {
        let cateSelect = document.getElementById("cate-select-one");
        /*cateSelect.innerHTML='';*/

        is_pName = false;
        
        for (var i in provinceList) {
            if(pName===provinceList[i].name){
                is_pName = true;
                this.cityList = provinceList[i].cityList;
                cateSelect.innerHTML+="<option value='"+provinceList[i].name+"'>"+provinceList[i].name+"</option>";
                /*this.p.append("<option selected value='"+provinceList[i].name+"'>"+provinceList[i].name+"</option>")*/
            }else{
                cateSelect.innerHTML+="<option value='"+provinceList[i].name+"'>"+provinceList[i].name+"</option>";
                /*this.p.append("<option value='"+provinceList[i].name+"'>"+provinceList[i].name+"</option>")*/
            }
        }
        if(!is_pName){
            this.cityList = provinceList[0].cityList;
        }
        
    }

    this.showC = function (cityList) {
        let tagSelect = document.getElementById("tag-select-two");
       /* this.c.html('');*/

        is_cName = false;

        for (var i in cityList) {
            if(cName===cityList[i].name){
                is_cName = true;
                tagSelect.innerHTML+="<option selected value='"+cityList[i].name+"'>"+cityList[i].name+"</option>";
               /* this.c.append("<option selected value='"+cityList[i].name+"'>"+cityList[i].name+"</option>")*/
            }else{
                tagSelect.innerHTML+="<option selected value='"+cityList[i].name+"'>"+cityList[i].name+"</option>";
            }
        }
    }

    /*this.showA = function (areaList) {
        this.a.html('');

        for (var i in areaList) {
            
            if(aName==areaList[i]){
                this.a.append("<option selected value='"+areaList[i]+"'>"+areaList[i]+"</option>")
            }else{
                this.a.append("<option value='"+areaList[i]+"'>"+areaList[i]+"</option>")
            }
        }
    }*/

    this.showP(provinceList);
    this.showC(this.cityList);
    /*this.showA(this.areaList);*/



/*    form.render('select');

    form.on('select(province)', function(data){
        var pName = data.value;
        $(data.elem).parents(".x-city").xcity(pName);
    });

    form.on('select(city)', function(data){
        var cName = data.value;
        var pName = $(data.elem).parents(".x-city").find('select[lay-filter=province]').val();
        $(data.elem).parents(".x-city").xcity(pName,cName);
    });*/

    return this;
}
var provinceList = [
    {
        name:'请选择类别',
        cityList:[
            {name:'请选择标签'}
        ]
    },





{name:'北京', cityList:[
{name:'市辖区'},
{name:'县'}
]},
{
    name:'昊南',
    cityList:[
        {name:'666'},
        {name:'123'}
    ]
}



];
